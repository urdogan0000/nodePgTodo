const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users where email=$1 ", [
      email,
    ]);
    if (user.rowCount > 0) {
      var token = jwt.sign({ user_id: user.rows[0].user_id }, process.env.JWT_SECRETKEY, {
        expiresIn: "1h",
      });

      bcrypt.compare(password, user.rows[0].password, async (err, isMatch) => {
        if (isMatch) {
          req.session.token = token;
         
          res.status(200).json(token);
        } else {
          res.status(400).json({
            status: "failed due to wrong credantiels",
            err,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//get user with params id http://localhost:8080/user/17   17 is params.id
exports.getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await pool.query("SELECT * FROM users where user_id=$1 ", [
      user_id,
    ]);
    res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(400).json(error);
  }
};

//create todos
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userRegisteredBefore = await pool.query(
      "select * from users where email=$1",
      [email]
    );

    //check the user if registered before
    if (userRegisteredBefore.rowCount > 0) {
      return res.status(401).send("this user registered before");
    }

    //hash the password

    let hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await pool.query(
      "insert into users (name,email,password) values ($1,$2,$3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(200).json(createdUser.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    pool.query("delete from users where  user_id=$1 ", [user_id]);
    res.status(200).json("user deleted");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logoutUser = (req, res) => {
  console.log(req.session.token);
  req.session.destroy(() => {
    res.json("çıkış yapıldı");
  });
};
