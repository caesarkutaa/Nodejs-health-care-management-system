const app = require('./app');

require("./DB/db").connect();

const PORT =  3000;

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})