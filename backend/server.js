const dotenv = require('dotenv');


const app = require('./main');
const mongoose = require('mongoose');


dotenv.config({path: './config.env'});

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PSWD);

mongoose.connect(DB)
    .then(con=>{
        console.log('DB connected successful');
    }).catch(err=>{
        console.log(err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})