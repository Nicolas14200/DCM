CREATE TABLE plot (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code_name VARCHAR(255) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    area INT NOT NULL,
    ph INT NOT NULL,
    pebbles INT NOT NULL, 
    plank INT,
    sub_plot INT,
    UNIQUE (code_name)
);