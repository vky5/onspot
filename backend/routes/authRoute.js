const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    console.log('fuck you')
    res.send('hey')
})

module.exports = router;