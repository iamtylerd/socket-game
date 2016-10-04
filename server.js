'use strict';

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const app = express()
const server = Server(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const MONGOD_URL = process.env.MONGOD_URL || 'mongodb://localhost:27017/tickietackietoe'
//set up pug
app.set('view engine', 'pug')


//middleware
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

mongoose.connect(MONGOD_URL, () => {
	server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
})
