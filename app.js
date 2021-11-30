const express = require("express");
const db = require("./db/db");
const app = express();
const todoRouter = require("./routes/todoRoute");

//=>for access req.body
app.use(express.json()); 

//ROUTES this routes redirect to todorouter
app.use("/", todoRouter);


//server start on port 8080
app.listen(8080, () => {
  console.log("Server is listeninig on port 8080");
});
