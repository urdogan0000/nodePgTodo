const jwt = require("jsonwebtoken");
const pool = require("../db/db");

module.exports = (req, res, next) => {
  try {
    //get token from request
    const token =req.body.token || req.query.token || req.headers.authorization;
    if (token == null) return res.sendStatus(401);

    //verify token
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRETKEY, async (err, resp) => {
      if (err) return res.sendStatus(403);
      const user = await pool.query("select * from users where user_id=$1", [
        resp.user_id,
      ]);
      req.user= resp.user_id
      if (user.rowCount > 0) next();
    });
  } catch (error) {
    if (err) return res.sendStatus(403);
  }
};
