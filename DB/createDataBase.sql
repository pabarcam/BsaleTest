CREATE DATABASE bsale_test;

USE bsale_test;

CREATE TABLE product(
  id INT,
  name VARCHAR,
  url_image VARCHAR,
  price FLOAT,
  discount INT,
  category INT,
)

DESCRIBE product;

CREATE TABLE category(
  id INT,
  name VARCHAR
)

SELECT * FROM prodcut;
SELECT * FROM category;
