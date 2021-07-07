const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;

app.get("hi", (req, res) => {
    res.send("hello!");
});

// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}