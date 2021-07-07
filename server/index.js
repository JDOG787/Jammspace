const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;

// send hello on hi route
app.get("/hi", (req, res) => { 
  res.send("Hello World!");
})

// listen on port 
app.listen(PORT, () => {   
  console.log(`Listening on ${PORT}`);
}