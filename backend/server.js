const dotenv = require('dotenv');


const app = require('./main');


dotenv.config({path: './config.env'});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})