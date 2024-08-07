const axios = require('axios');

async function callApi(config) {
    //console.log("config", config)
    try {
        const { data } = await axios(config)
        console.log('Response data:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error making API request:', error.message);
        return { success: false, data: error }
    }
}
async function callApiIpSnoof(config){
    console.log("config",config)
    try {
        const { data } = await axios(config)
        console.log('Response data:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error making API request:', error.message);
        return { success: false, data: error }
    }
}
async function callApiXNumTimes(config, numReq, proxyMode) {
    const promises = [];
    for (let i = 0; i < numReq; i++) {
        let promise;
        if (proxyMode === 'ipSnoof') {
            promise = callApiIpSnoof(config);
        } else {
            promise = callApi(config);
        }
        promises.push(promise)
    }
    console.log(promises)
    try {
        const start = Date.now();
        const results = await Promise.all(promises);
        const end = Date.now();
        const successfulRequests = results.filter(result => result.success).length;
        const failedRequests = results.length - successfulRequests;
        console.log('All API calls completed:', results);
        return {
            totalRequests: numReq,
            successfulRequests,
            failedRequests,
            timeTaken: (end - start) / 1000,
            results
        }
    } catch (error) {
        console.error('Error with Promise.all:', error.message);
    }
}

const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')
//serve static file
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
//endpoint
app.post('/', async (req, res) => {
    const { config, numReq, proxyMode } = req.body
    console.log(proxyMode)
    const data = await callApiXNumTimes(config, numReq, proxyMode);
    res.json(data)

})
app.post('/set-current-mode', async (req, res) => {
    //console.log(req.body)
    try {
        const { data } = await axios.post('http://localhost:5000/set-current-mode', req.body)
        // console.log(data)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})
//listening or starting the server
app.listen(port, () => {
    console.log(`starting the server successfully on ${port}`)
})