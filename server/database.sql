CREATE DATABASE newtodo;
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_number VARCHAR(255) NOT NULL,
  user_address VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'basic',
  status VARCHAR(255) NOT NULL DEFAULT 'Unban',
  PRIMARY KEY (user_id)
);
CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO
  users (
    user_name,
    user_email,
    user_number,
    user_address,
    user_password
  )
VALUES
  (
    'duckkazzer',
    'kazzerduck@gmail.com',
    '+375333038098',
    'Brestkih Diviziy dom 2 kvartira 5',
    'time1999'
  );
INSERT INTO
  users (
    user_name,
    user_email,
    user_number,
    user_address,
    user_password
  )
VALUES
  (
    'Yoshi',
    'yoshiworld@gmail.com',
    '+375666777666',
    'Nintendo',
    'yahoo'
  );
INSERT INTO
  todos(user_id, description)
VALUES
  (
    '190daba6-02e9-42b7-9527-16f52057e346',
    'PLAY MGS3:Snake Eater'
  );
UPDATE
  users
SET
  role = 'admin'
WHERE
  user_name = 'duckkazzer';