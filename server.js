var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).json({ message: 'no files uploaded' });

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
