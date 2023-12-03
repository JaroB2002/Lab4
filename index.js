const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // built-in express.json() middleware to parse JSON data

app.get('/api/v1/messages', (req, res) => {
  const user = req.query.user;
  if (user) {
    res.json({
      status: "success",
      message: `GET messages for user ${user}`,
    });
  } else {
    res.json({
      status: "success",
      message: "GET messages",
      data: [
        {
          user: "John Doe",
          message: "Hello World",
        },
        {
          user: "Jaro Brichau",
          message: "World Hello",
        },
      ],
    });
  }
});

app.get('/api/v1/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
    res.json({
      status: "success",
      message: `GETTING message with ID ${id}`,
    });
});

app.post('/api/v1/messages', (req, res) => {
  const user = req.body.message.user;
  
  if (user) {
    res.json({
      status: "success",
      message: `POSTING a new message for user ${user}`,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Post failed",
    });
  }
});

app.put('/api/v1/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    status: "success",
    message: `UPDATING a message with ID ${id}`,
  });
});

app.delete('/api/v1/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);
    res.json({
      status: "success",
      message: `DELETING a message with ID ${id}`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
