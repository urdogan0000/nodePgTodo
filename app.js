const express = require("express");
const db = require("./db/db");

const app = express();
require('dotenv')
const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");
const session = require('express-session')

//=>for access req.body

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}))
//ROUTES this routes redirect to todorouter
app.use("/", todoRouter);
app.use("/users",userRouter)


//server start on port 8080
app.listen(8080, () => {
  console.log("Server is listeninig on port 8080");
});
