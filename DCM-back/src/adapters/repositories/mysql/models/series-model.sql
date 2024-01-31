CREATE TABLE series (
    id INT not null AUTO_INCREMENT,
    plot_id VARCHAR(255) REFERENCES Plot(id),
    vegetable_variety VARCHAR(255),
    nb_plank INT,
    PRIMARY KEY (id)
);