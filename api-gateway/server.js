const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

routes(app);

app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});
