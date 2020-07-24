const express = require("express");

const Hobbits = require("../hobits/hobbitsModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
    Hobbits.getAll()
        .then(hobbits => {
            res.status(200).json(hobbits);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.post('/hobbits', (req, res) => {
    Hobbits.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.message })
        })
})

server.delete('/hobbits/:id', (req, res) => {
    const { id } = req.params;
    Hobbits.remove(id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({ errMessage: err.message })
        })
})
module.exports = server;
