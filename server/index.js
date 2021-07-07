const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;

app.get("hi", (req, res) => {
    res.send("hello!");
});

app.listen(PORT);