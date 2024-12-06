CREATE TABLE chanteur(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT?
    nom VARCHAR(155),
    role VARCHAR(100)
);

CREATE TABLE chanson(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(155),
    id_chanteur INT?
    date_sortie DATE,
    FOREIGN KEY (id_chanteur) REFERENCE chanteur(id)
);

INSERT INTO chanson(titre,id_chanteur,date_sortie) VALUES ('Sambi tsara',1,'2023-10-20');