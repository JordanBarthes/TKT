import React from 'react';


import CircularProgress from '@material-ui/core/CircularProgress';

import { useDataFetching } from '../../utils';
import config from '../../config';

function GetResultOfYear(id) {
    const { loading, results, error } = useDataFetching({
        url: `${config.url.result}${id}`,
        method: 'GET',
        body: null,
        statusCode: 200
    });
    console.log(`${config.url.result}${id}`)

    if (loading || error) {
        return loading ? <div style={{ textAlign: 'center', marginTop: 250 }}>
            <CircularProgress />
        </div> : error.message;
    }
    return results
}

function Details({ results, classes }) {

    const lastYear = GetResultOfYear(results[0])
    // const AtYear = GetResultOfYear(results[1])

    console.log(lastYear)

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', padding: 5 }}>

                </div>
                <div style={{ display: 'flex', padding: 5 }}>
                </div>
            </div>
        </div>
    );
}

export default Details;
