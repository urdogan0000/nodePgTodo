
-- Creating database and tables with sql command just run this codes in psql terminal don't forget semicolumn =)
CREATE DATABASE todo_database;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR(255)
);

--create users
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) ,
    email VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    UNIQUE(email));