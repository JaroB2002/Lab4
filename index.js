const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // built-in express.json() middleware to parse JSON data

app.get('/api/v1/messages', (req, res) => {
  const user = req.query.user;
  res.json(messages);
  if(user){
    res.json({
        status: 'success',
        message: `User ${user} found`,
        });
    } else {
        res.json({
            status: 'succes',
            message: 'GET messages',
            data: [
                {
                    user: 'John',
                    message: 'Hello',
                },
                {
                    user: 'Doe',
                    message: 'World',
                },
            ],
        });
  }
});

app.get('/api/v1/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json({
        status: 'success',
        message: `GET message with id ${id}`,
    });
    });

app.post('/api/v1/messages', (req, res) => {
    const user = req.body.user;
    if(user){
        res.json({
            status: 'success',
            message: `User ${user} added`,
        });

    } else {
        res.json({
            status: 'error',
            message: 'POST FAILED',
        });
    }
});