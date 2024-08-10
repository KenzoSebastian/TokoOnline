USE sebastore;

-- table customers
CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    urlProfilePicture VARCHAR(100) NOT NULL DEFAULT "../../img/ProfilePicture/blankProfile.png",
    PRIMARY KEY(id)
) ENGINE = InnoDB;

-- table sellers
CREATE TABLE sellers (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    storeName VARCHAR(100) NOT NULL,
    storeAddress TEXT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

-- table auth_customers
CREATE TABLE auth_customers (
    id INT NOT NULL AUTO_INCREMENT,
    id_customers INT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    token VARCHAR(100) NOT NULL DEFAULT "no token",
    PRIMARY KEY(id),
    UNIQUE KEY id_customers_unique (id_customers),
    FOREIGN KEY fk_id_customers (id_customers) REFERENCES customers(id)
) ENGINE = InnoDB;

-- table auth_sellers
CREATE TABLE auth_sellers (
    id INT NOT NULL AUTO_INCREMENT,
    id_sellers INT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    token VARCHAR(100) NOT NULL DEFAULT "no token",
    PRIMARY KEY(id),
    UNIQUE KEY id_sellers_unique (id_sellers),
    FOREIGN KEY fk_id_sellers (id_sellers) REFERENCES sellers(id)
) ENGINE = InnoDB;


-- contohh
INSERT INTO auth_customers (id_customers) VALUES (14);

-- query
SELECT * FROM customers JOIN auth_customers ON customers.id = auth_customers.id_customers;
SELECT customers.username, auth_customers.status, auth_customers.token FROM customers JOIN auth_customers ON (customers.id = auth_customers.id_customers);

SELECT * FROM sellers JOIN auth_sellers ON sellers.id = auth_sellers.id_sellers;
SELECT sellers.username, auth_sellers.status, auth_sellers.token FROM sellers JOIN auth_sellers ON (sellers.id = auth_sellers.id_sellers);

-- update ketika login
UPDATE auth_customers SET status = FALSE, token = "token baru" WHERE id_customers = 1;