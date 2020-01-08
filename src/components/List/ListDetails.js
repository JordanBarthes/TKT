import React from 'react';


import CircularProgress from '@material-ui/core/CircularProgress';

import config from '../../config';

async function GetResultOfYear(id) {

    try {
        return await fetch(`${config.url.result}${id}`, {

            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET',

            }),
        }).then(function (response) {
            console.log('response is : ' + response.data);
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
            console.log(error.config);
        });
        // console.log(data)
        // const json = await data.json()

        // console.log(json)
        // return json
    }
    catch (error) {
        console.log('ERROR', error)
        return error
    }
}

function Details({ results, classes }) {


    const lastYear = GetResultOfYear(results[0])

    console.log('ICIC', lastYear)
    // const AtYear = GetResultOfYear(results[1])

    if (!lastYear) {
        return <h3>ERROR</h3>
    }

    return (<div className={classes.root}>
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
