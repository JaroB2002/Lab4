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
        res.status(404).json({
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
        res.status(400).json({
            status: 'error',
            message: 'POST FAILED: User not provided',
        });
    }
});

app.put('/api/v1/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = messages.findIndex(msg => msg.id === id);

    if (index !== -1) {
        messages[index].message = req.body.message || '';
        res.json({
            status: 'success',
            message: `UPDATING a message with ID ${id}`,
            data: messages[index],
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: `Message with ID ${id} not found`,
        });
    }
});

app.delete('/api/v1/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = messages.findIndex(msg => msg.id === id);

    if (index !== -1) {
        const deletedMessage = messages.splice(index, 1)[0];
        res.json({
            status: 'success',
            message: `DELETING a message with ID ${id}`,
            data: deletedMessage,
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: `Message with ID ${id} not found`,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
