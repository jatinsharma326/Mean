const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbConfig = require('./config/secret')
const schema = require('./models/user.js')
const userRoutes = require('./route/router');
const cors = require('cors')


app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{useNewUrlParser:true});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use(bodyParser.json());
app.use('/api/v1/users',userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("I am running");
})