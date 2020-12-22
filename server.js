const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello From Express');
});

app.listen(PORT, console.log(`Server is runnig on PORT ${PORT}`));
