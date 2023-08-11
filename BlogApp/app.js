const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes'); 
const blogrouter = require('./routes/blog-routes');

const app = express();

app.use(express.json());
app.use('/api/users', userRouter); 

app.use('/api/blog', blogrouter);


mongoose.connect('mongodb+srv://admin:sohammodi@cluster0.gns0z8k.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => app.listen(8001))
    .then(() => console.log('Connected successfully '))
    .catch((err) => console.log(err));
