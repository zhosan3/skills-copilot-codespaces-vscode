// Create web server
// npm init
// npm install express --save
// node comments.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let comments = [
    { id: 1, author: 'John', text: 'Hello' },
    { id: 2, author: 'Jack', text: 'I am Jack' },
    { id: 3, author: 'Mary', text: 'Good morning' },
    { id: 4, author: 'Peter', text: 'Good afternoon' },
    { id: 5, author: 'Tom', text: 'Good evening' },
];

// GET /api/comments
app.get('/api/comments', (req, res) => {
    res.send(comments);
});

// GET /api/comments/1
app.get('/api/comments/:id', (req, res) => {
    let comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    res.send(comment);
});

// POST /api/comments
app.post('/api/comments', (req, res) => {
    if (!req.body.author || !req.body.text) {
        res.status(400).send('Author and text are required.');
        return;
    }
    let comment = {
        id: comments.length + 1,