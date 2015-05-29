DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS classes;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  username TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE cohorts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  user_id INTEGER
);
