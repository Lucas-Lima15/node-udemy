const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

// app.use((req, res ,next) => {
//     console.log("This is middleware");
//     next();
// });

// app.use((req, res ,next) => {
//     console.log("This is another middleware");
//     res.send('<h1>Hello</h2>');
// });

app.use('/users' ,(req, res ,next) => {
    console.log("This is another middleware");
    res.send('<h1>Users</h2>');
});

app.use('/' ,(req, res ,next) => {
    console.log("This is another middleware");
    res.send('<h1>Home</h2>');
});

app.listen(3002);