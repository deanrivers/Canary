require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/getDevices', async (req, res) => {

    //const response = await axios.get('https://fullstack-challenge-api.herokuapp.com/devices')
    const response = await axios.get('http://5d6ddcb7777f670014036266.mockapi.io/api/v1/devices')
    const data = await response.data
    res.send(data)
})

router.post('/postDevices', async (req,res)=>{
    
    const data = req.body
    //console.log(res)
    const response = await axios.post('https://fullstack-challenge-api.herokuapp.com/devices')
    
    console.log(response.status)
    console.log(response.data)
    //const data = response.data
    console.log('---------------')
    console.log('---------------')
    
    console.log(data)
    res.send(data)
})

app.use('/myapi', router);

app.listen(port, () => console.log(`Listening on port ${port}`));