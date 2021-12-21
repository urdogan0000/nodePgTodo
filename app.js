const express = require("express");
const db = require("./db/db");


const app = express();
require("dotenv");
const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");
const session = require("express-session");
var redisStore = require("connect-redis");
const authMiddleware = require("./middlewares/authMiddleware");
const RedisStore=redisStore(session)
//=>for access req.body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
   // store: new RedisStore({client:rd_client}),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
  })
);
//ROUTES this routes redirect to todorouter
app.use("/users", userRouter);
app.use(authMiddleware)
app.use("/", todoRouter);



//server start on port 8080
app.listen(8080, () => {
  console.log("Server is listeninig on port 8080");
});
