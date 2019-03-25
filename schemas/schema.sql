CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL, 
    department_name VARCHAR(100) NOT NULL, 
    price FLOAT NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

USE bamazon_db;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Once Upon a Time in Mexico - Blu-ray", "Movies", 19.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Catch Me If You Can - Blu-ray", "Movies", 14.99, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Se7en - Blu-ray", "Movies", 9.99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("The Dark Knight - Blu-ray", "Movies", 14.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Zoolander - Blu-ray", "Movies", 9.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Black Panther - Blu-ray", "Movies", 19.99, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Super Mario Bros. 3 - NES", "Video Games", 9.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Little Nemo: The Dream Master - NES", "Video Games", 12.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("The Legend of Zelda - NES", "Video Games", 11.99, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Ice Climber - NES", "Video Games", 10.99, 6);
