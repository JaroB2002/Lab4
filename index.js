const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const messages = [
    {
        id: 1,
        user: 'John',
        message: 'Hello',
    },
    {
        id: 2,
        user: 'Doe',
        message: 'World',
    },
];

app.get('/api/v1/messages', (req, res) => {
    const user = req.query.user;

    if (user) {
        const foundUserMessages = messages.filter(msg => msg.user === user);
        res.json({
            status: 'success',
            message: `Messages for user ${user} found`,
            data: foundUserMessages,
        });
    } else {
        res.json({
            status: 'success',
            message: 'GET messages',
            data: messages,
        });
    }
});

app.get('/api/v1/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.find(msg => msg.id === id);

    if (message) {
        res.json({
            status: 'success',
            message: `GET message with id ${id}`,
            data: message,
        });
    } else {
        res.json({
            status: 'error',
            message: 'Message not found',
        });
    }
});

app.post('/api/v1/messages', (req, res) => {
    const user = req.body.user;

    if (user) {
        const newMessage = {
            id: messages.length + 1,
            user,
            message: req.body.message || '',
        };

        messages.push(newMessage);

        res.json({
            status: 'success',
            message: `Message from ${user} added`,
            data: newMessage,
        });
    } else {
        res.json({
            status: 'error',
            message: 'POST FAILED: User not provided',
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
