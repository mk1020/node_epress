
const express = require('express')
const {users} = require("./profile/users");
const app = express()
const port = 3000
const usersData = require('./profile/users')
const path = require('path');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/year-now', (req, res) => {
  res.send("Текущий год - " + new Date().getFullYear())
})

usersData.forEach((user) => (
  app.get(`/my-profile/${user.username}`, (req, res) => {
    res.send(user)
  })
))

app.use('/my-avatar', express.static('./profile/avatars'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


