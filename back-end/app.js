const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes); // Certifique-se de que o caminho está correto

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
