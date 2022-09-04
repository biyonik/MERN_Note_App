const express = require('express');
const {NoteRoutes} = require("./Routes");
const {catchError} = require("./Middlewares/errors.middleware");
const connect = require("./Config/db.config");
const dotenv = require('dotenv').config();
const colors = require('colors');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/notes', NoteRoutes);

app.use(catchError);

connect().then()
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda dinleniyor...`.magenta.italic);
})
