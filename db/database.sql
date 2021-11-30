
-- Creating database and tables with sql command just run this codes in psql terminal don't forget semicolumn =)
CREATE DATABASE todo_database;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);