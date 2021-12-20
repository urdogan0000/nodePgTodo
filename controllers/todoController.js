const pool = require("../db/db");
const { rd_status, rd_client } = require("../db/redisDb");

//get all todos
exports.getAllTodo = async (req, res) => {
  try {
    console.log("Redis Status: " + RD_STATUS);

    if (global.RD_STATUS) {
      const toDos = await pool.query(
        "SELECT * FROM todo where user_id=$1 ORDER  BY todo_id ASC",
        [req.user]
      );

      toDos.rows.map(async (item) => {
        const todo = "todo:" + item.todo_id;

        await rd_client.set(todo, JSON.stringify(item));
      });

      res.status(200).json(toDos.rows);
    } else {
      const toDos = await pool.query(
        "SELECT * FROM todo where user_id=$1 ORDER  BY todo_id ASC",
        [req.user]
      );

      toDos.rows.map(async (item) => {
        const todo = "todo:" + item.todo_id;
      });
      console.log(toDos.rows);

      res.status(200).json(toDos.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

//get  todo
exports.getTodo = async (req, res) => {
  try {
    const todoId = req.params.todo_id;
    const toDo = await pool.query("SELECT * FROM todo where todo_id=$1 ", [
      todoId,
    ]);
    res.status(200).json(toDo.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
//create todos
exports.createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description,user_id) VALUES  ($1,$2) RETURNING *",
      [description, req.user]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

//update  todo
exports.updateTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const todoId = req.params.todo_id;
    const toDo = await pool.query(
      "UPDATE  todo SET description=$1 where todo_id=$2  RETURNING *",
      [description, todoId]
    );
    res.status(200).json(toDo.rows);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todo_id;
    await pool.query("DELETE  FROM todo  where todo_id=$1", [todoId]);
    res.status(200).json("toDo was succesfully deleted");
  } catch (error) {
    console.log(error);
  }
};
