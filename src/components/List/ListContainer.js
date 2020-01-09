import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CircularProgress from '@material-ui/core/CircularProgress';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


import config from '../../config';

import ListDetails from './ListDetails';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp, value) {
    const newArray = value ? array.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
    }) : array;

    const stabilizedThis = newArray.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
    { id: 'id', label: 'id' },
    { id: 'sector', label: 'Secteur' },
    { id: 'name', label: 'Name' },
    { id: 'siren', label: 'Siren' },
];

function EnhancedTableHead(props) {
    const { classes, onRequestSort, order, orderBy } = props;
    const createSortHandler = property => event => onRequestSort(event, property);
    return (
        <div className={classes.header}>
            {headCells.map(headCell => (
                <div key={headCell.id} className={classes.headerName} onClick={createSortHandler(headCell.id)}>
                    <Typography className={classes.heading}>{headCell.label}</Typography>
                    {order === 'asc' && orderBy === headCell.id && <KeyboardArrowUpIcon />}
                    {order === 'desc' && orderBy === headCell.id && <KeyboardArrowDownIcon />}
                </div>
            ))}
        </div>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: 25
    },
    header: {
        padding: 24,
        cursor: 'pointer',
        display: 'flex',
        boxShadow: '0px 2px 7px -2px'
    },
    fullWidth: {
        width: '100%'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 16
    },
    elementList: {
        fontSize: 16
    },
    column: {
        flexBasis: '33.33%',
    },
    headerName: {
        flexBasis: '33.33%',
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 450,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    panel: {
        paddingBottom: 5,
        paddingTop: 5,
        boxShadow: '0px 2px 7px -2px',
        '&:hover': {
            backgroundColor: 'rgb(238, 238, 238, 0.8)',
            elevation: 3
        }
    }
}));


export default function ListData(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        fetch(config.url.biz).then(json => json.json())
            .then(data => {
                setLoading(false);
                setResults(data);
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            })
    }, []);

    if (loading || error) {
        return loading ? <div style={{ textAlign: 'center', marginTop: 250 }}>
            <CircularProgress />
        </div> : error.message;
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = name => setSelected(selected === name ? '' : name);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected === name;

    const data = stableSort(results, getSorting(order, orderBy), props.inputValue)

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableHead
                    classes={classes}
                    nameSelected={selected}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={results.length}
                />
                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        return (
                            <div key={index} className={classes.fullWidth}>
                                <ExpansionPanel className={classes.panel} expanded={isItemSelected}
                                    onChange={() => handleClick(row.name)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-content`}
                                    >
                                        <div className={classes.column}>
                                            <Typography className={classes.elementList}>{row.id}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.elementList}>{row.sector}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.elementList}>{row.name}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.elementList}>{row.siren}</Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className={classes.details}>
                                        {isItemSelected && <ListDetails
                                            results={row.results}
                                            classes={classes} />}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        );
                    })}
            </Paper>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}
