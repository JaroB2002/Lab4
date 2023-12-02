const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // built-in express.json() middleware to parse JSON data

app.get('/api/v1/messages', (req, res) => {
  res.json(messages);
  const user = req.query.user;
  if(user){
    res.json({
        status: 'success',
        data: {
            message: `User ${user} found`,
        
        });
    } else {
        res.json({
            status: 'succes',
            message: 'GET messages',
            data: {
                messages: messages
            }
        });
    }
    
  }
});