const express = require('express');
const mongoose = require('mongoose');
const registerRoutes = require('./routes/register');
const loginRoute = require('./routes/login')



let port = process.env.PORT || 5000;

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api', registerRoutes);
app.use('/', loginRoute)

mongoose.connect(
    'mongodb+srv://plateaumed:QafYxp4rnRCiOJex@cluster0.gclsr.mongodb.net/tasks',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
).then(() => {
    app.listen(port, ()=> {console.log('http://localhost:5000')});
}).catch((err)  => {
    console.log(err)
});

//QafYxp4rnRCiOJex