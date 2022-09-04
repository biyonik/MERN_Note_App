const express = require('express');
const {NoteRoutes} = require("./Routes");
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();


app.use('/api/notes', NoteRoutes);

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda dinleniyor...`);
})
