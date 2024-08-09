USE sebastore;

CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    urlProfilePicture VARCHAR(100) NOT NULL DEFAULT "../../img/ProfilePicture/blankProfile.png",
    PRIMARY KEY(id)
) ENGINE = InnoDB;

CREATE TABLE sellers (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

CREATE TABLE auth_customers (
    id INT NOT NULL AUTO_INCREMENT,
    id_customers INT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    token VARCHAR(100) NOT NULL DEFAULT "no token",
    PRIMARY KEY(id),
    UNIQUE KEY id_customers_unique (id_customers),
    FOREIGN KEY fk_id_customers (id_customers) REFERENCES customers(id)
) ENGINE = InnoDB;
-- contohh
INSERT INTO auth_customers (id_customers) VALUES (14);

-- query
SELECT * FROM customers JOIN auth_customers ON customers.id = auth_customers.id_customers;
SELECT customers.username, auth_customers.login FROM customers JOIN auth_customers ON (customers.id = auth_customers.id_customers);

-- update ketika login
UPDATE auth_customers SET status = FALSE, token = "token baru" WHERE id_customers = 1;