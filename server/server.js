const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');

let history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/clear', (req,res) => {
    history = [];
    res.send(history);
});

app.get('/math', (req,res) => {
    res.send(history);
});

app.post('/math', (req,res) => {
    // POST or 'add' TO THE MATH HISTORY
    console.log(req.body);

    const value1 = parseInt(req.body.value1);
    const value2 = parseInt(req.body.value2);
    const equationType = req.body.equationType;
    let answer = 0;

    if (equationType == 'add') {
        answer = value1 + value2;
    } else if(equationType == 'sub') {
        answer = value1 - value2;
    } else if(equationType == 'mul') {
        answer = value1 * value2;
    } else if(equationType == 'div') {
        answer = value1 / value2;
    } else {
        console.log('Not a valid eq type!');
    }

    let historyObject = {
        value1,
        value2,
        equationType,
        answer
    }

    history.push(historyObject);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});