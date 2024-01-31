CREATE TABLE event_culture (
    id VARCHAR(255) PRIMARY KEY,
    plot_id VARCHAR(255) REFERENCES Plot(id),
    type_event_culture VARCHAR(255),
    date DATE,
    note VARCHAR(255),
    machine VARCHAR(255),
    bring_type VARCHAR(255),
    quantity VARCHAR(255),
    vegetable VARCHAR(255),
    method VARCHAR(255),
    nb_human INT,
    nb_hours INT,
    succes INT,
    disease VARCHAR(255),
    bug VARCHAR(255)
);

