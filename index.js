const express = require('express')
const {users} = require("./profile/users");
const app = express()
const port = 3000
const usersData = require('./profile/users')
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/year-now', (req, res) => {
  res.send("Текущий год - " + new Date().getFullYear())

})

  app.get(`/my-profile/:userName`, (req, res) => {
    const userName = req.params.userName;
    const userData = usersData.find((user)=> user.username == userName);
    if (userData) {
      res.send(userData)
    } else {
      res.status(404).end('Not found))');
    }
  })

app.post(`/my-profile/:userName`, jsonParser, (req, res) => {
  const userName = req.params.userName;
  const userData = req.body;

  if (userData.username && userData.lastName && userData.country) {
    usersData.push(userData)
    res.set('Content-Type', 'text/plain');
    res.send('success')
  } else {
    res.status(400).end('Bad request1');
  }
})

const dir = './profile/avatars/';

app.get('/my-avatar/:avatarName', function (req, res) {
  const fileName = req.params.avatarName;
  const extCorrect = fileName.includes('.jpg');

  if (extCorrect) {
    const readStream = fs.createReadStream(dir + fileName);
    readStream.on('open', () => {
      res.set('Content-Type', 'image/jpg');
      readStream.pipe(res)
    })

    readStream.on('error', () => {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
    });
  } else {
    return res.status(403).end('Forbidden');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


