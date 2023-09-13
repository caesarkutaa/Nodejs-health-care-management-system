const app = require('./app');

const PORT =  3000;
app.listen(PORT, async () => {
    require("./DB/db").connect();
})