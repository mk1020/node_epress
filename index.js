const express = require('express')
const {users} = require("./profile/users");
const app = express()
const port = 3000
const usersData = require('./profile/users')
const path = require('path');
const fs = require('fs');

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

usersData.forEach((user) => (
  app.post(`/my-profile/${user.username}`, (req, res) => {
    res.send(user)
  })
))

const dir = './profile/avatars/';

app.get('*', function (req, res) {
  const isAvatarsDirectory = req.path.includes('my-avatar');  // возможно не самое хорошее решение) не стал заморачиваться)
  const extCorrect = req.path.includes('.jpg'); //потенциально слабое место) но маловероятно, что в папке будут файлы c расширениями .jpg*

  if (isAvatarsDirectory) {
    if (extCorrect) {
      const reqPath = req.path.split(path.sep);
      const fileName = reqPath[reqPath.length - 1];

      const readStream = fs.createReadStream(dir + fileName);
      readStream.on('open', () => {
        res.set('Content-Type', 'image/jpg'); //а зачем нужно задавать этот Content-Type? работает и без него)
        readStream.pipe(res)
      })

      readStream.on('error', () => {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
      });
    } else {
      return res.status(403).end('Forbidden');
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


