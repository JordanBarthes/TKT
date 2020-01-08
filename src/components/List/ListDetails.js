import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import config from '../../config';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Bar } from 'react-chartjs-2';

function Graph(props) {
    return <Bar
        data={props.chartData}
        width={50}
        height={15}
        options={{
            legend: {
                display: false,
            }
        }}
    />
}

Graph.propTypes = {
    chartData: PropTypes.object.isRequired,
};

function Details({ results, classes }) {

    const [stats, setStats] = useState([]);
    const [statsLastYear, setLastStats] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const map = results.map(async e => {
                    const data = await fetch(`${config.url.result}${e}/`)
                    return data.json()
                });

                Promise.all(map).then(function (values) {
                    if (values) {
                        setLoading(false);
                        setStats(values[0]);
                        setLastStats(values[1]);
                    }
                });

            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const chartData = {
        labels: [`Chiffre d'affaire ${statsLastYear.year}`, `Chiffre d'affaire ${stats.year}`, `Charges ${statsLastYear.year}`, `Charges ${stats.year}`, `Bénéfice ${statsLastYear.year}`, `Bénéfice ${stats.year}`, `Ebitda ${statsLastYear.year}`, `Ebitda ${stats.year}`],
        datasets: [
            {
                data: [
                    statsLastYear.ca,
                    stats.ca,
                    statsLastYear.loss,
                    stats.loss,
                    statsLastYear.margin,
                    stats.margin,
                    statsLastYear.ebitda,
                    stats.ebitda,
                ],
                backgroundColor: [
                    'rgb(51, 153, 255, 0.8)',
                    'rgb(255, 51, 51, 0.8)',
                    'rgb(51, 153, 255, 0.8)',
                    'rgb(255, 51, 51, 0.8)',
                    'rgb(51, 153, 255, 0.8)',
                    'rgb(255, 51, 51, 0.8)',
                    'rgb(51, 153, 255, 0.8)',
                    'rgb(255, 51, 51, 0.8)',
                ],
            }
        ]
    }

    if (loading || error) {
        return loading ? <div className={classes.root}>
            <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
                <CircularProgress />
            </div>
        </div>
            : error.message;
    }

    return (
        <div className={classes.root}>
            <div style={{ padding: 10 }}>
                <Graph chartData={chartData}></Graph>
            </div>
        </div>
    );
}

export default Details;
