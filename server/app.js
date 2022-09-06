const express = require('express');
const {NoteRoutes, UserRoutes} = require("./Routes");
const {catchError} = require("./Middlewares/errors.middleware");
const connect = require("./Config/db.config");
const dotenv = require('dotenv').config();
const colors = require('colors');
const generalConfig = require('./Config/general.config');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/notes', NoteRoutes);
app.use('/api/users', UserRoutes);

app.use(catchError);
app.set('API_SECRET_KEY', generalConfig.API_SECRET_KEY);

connect().then()
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda dinleniyor...`.magenta.italic);
})
