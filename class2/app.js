const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("this aways runs");
    next();
})

app.use('/product' ,(req, res, next) => {
    console.log('In another middlerare');
    res.send('<h1>Hello from product</h1>');
});

app.use('/' ,(req, res, next) => {
    console.log('In another middlerare');
    res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
