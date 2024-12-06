/// ici, import du frameword ExpressJS
const express = require("express");
const mysql2 = require("mysql2");
const url = require("url");
const fs = require("fs");
const myConnection = require("express-myconnection");
const connection = require("express-myconnection");

const optionConnection = {
    host: "localhost",
    user: "root",
    password: "tanzelmy03@a",
    port: 3306,
    database: "restaurant",
};

// Je crée mon application ExpressJS
const app = express();

// Middleware de connection à la base de données
// 'pool' est la statégie de connection à la base de données
app.use(myConnection(mysql2, optionConnection, "pool"));

app.use(express.urlencoded({extended: false}));

CREATE TABLE chanteur(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT 
    nom VARCHAR(155),
    rolr VARCHAR(180),
);




// L'endroit ou se situent les vues qui saffichent sur la navigateur
app.set("views", "./views");

// Je précise le moteurde lecture de vues à savoir ejs
app.set("view engine", "ejs");

// précise le répertoire 'public' qui contient les fichiers statics
app.use(express.static("public"));

// Je vais crée une route "/accueil" en utilise la méthode de type "GET"
// J'ai crée une route 
// API
app.get("/accueil", (req, res) => {
    let date = new Date();
    let salutation = "Bonsoir"

    if(date.getHours() >15) {

    };
    utilisateur = { // Objet
        nom: ["Said", "Abdou", "Ibrahim"], // Liste de mon tableau
        prenom: "Iness",
        maSalutation: salutation,
    };
    res.render("accueil", utilisateur);  // renvoie en réponse le fichier accueil.ejs
});

// une route "/menu" avec la méthode "GET"
app.get("/menu", (req, res) => {

    // enregistrer dans la base de données
    req.getConnection((erreur, connection) => {
        // Vérifie si une erreur s'est produite.
        if(erreur) {
            // Affiche un message d'erreur dans la console si la connexion à la base de données échoue.
            console.log("erreur de connexion à la base de données:", erreur);
        // Si aucune erreur n'est survenue, exécuter le code suivant.    
        } else {
            // Exécute une requête SQL pour récupérer tous les enregistrements de la table "plat".
            connection.query("SELECT * FROM PLAT",[], (err, resultat) => {
                // Vérifie s'il y a une erreur lors de l'exécution de la requête ou du traitement.
                if (err) {
                    // Affiche un message d'erreur dans la console avec les détails de l'erreur si la requête échoue.
                    console.log("Erreur lors de l'éxécution de la requête:", err);
                } else {
                    // Affiche le contenu de la variable `resultat` dans la console pour vérifier les données.
                    console.log("resultat:", resultat);
                    // Envoyer les résultats au client ou les traiter
                    res.render('menu',{resultat: resultat});
                }
            });
        }
    });

    plats = {
        nom: ["thé au gingembre", "Mtsolola à la viande", "Ma Karara",]
    };
    res.render("menu", plats);
});



// route "/equipe" avec la méthode "GET"
app.get("/equipe", (req, res) => {  
    personnel = [{
        nom: "Ibrahim Combo", position:"Chef", nom: "Marie Ines", position:"serveuse", nom:"Youness Bacar", position:"sommelier"
    }];
    res.render("equipe", personnel);
});

// rOUTE "/contact" avec la méthode "GET"
app.get("/contact", (req, res) => {
    coordonnees = { // Objet
        numero: "01 23 45 67 89", // Propreté
        horaire: "Lundi - Vendredi : 08h00 - 22h00 et Samedi - Dimanche : 09h00 - 20h00 ",
    };
    res.render("contact", coordonnees); // Pour afficher la réponse
});

/*app.listen(3003, () => {
    console.log("Serveur écoute le port 3003");
});*/

// Gère les requêtes POST envoyées à l'URL "/plat".
app.post("/plat", (req,res) => {
    // Affiche le contenu du corps de la requête (les données envoyées) dans la console.
    console.log("corps de la requête Body:", req.body);
    // Affiche la valeur du champ "nom" dans le corps de la requête.
    console.log("Nom du plat:", req.body.nom);
    // Affiche la valeur du champ "prix" envoyé dans le corps de la requête.
    console.log("Prix du plat:", req.body.prix);

    // Récupère l'ID du plat depuis le corps de la requête et l'assigne à la variable `platID`.
    let nomPlat = req.body.nom;
    // Récupère le prix du plat depuis le corps de la requête et l'assigne à la variable `prixPlat`.
    let prixPlat = req.body.prix;
    
    // Déclare les variables `platId` et `requteSQL` qui seront utilisées plus tard.
    let platId, requteSQL;
    // Vérifie si le champ "id" dans le corps de la requête est vide.
    if (req.body.id === "") {
        // Initialise la variable `platId` avec la valeur null.
        platId = null;
        // Définit la requête SQL pour insérer un nouveau plat dans la table "plat".
        requeteSQL = "INSERT INTO plat(id, nom, prix) VALUES (?,?,?)"; 
    }else {
        // Assigne à la variable `platId` la valeur de l'ID récupérée depuis le corps de la requête.
        platId = req.body.id;
        // Définit la requête SQL pour mettre à jour un plat dans la table "plat" en modifiant son nom et son prix pour l'ID spécifié.
        requeteSQL = "DELETE plat SET nom = ?, prix = ? WHERE id = ?";
    }

    // Déclare une variable `ordreDoonees` qui contiendra les données à insérer ou à mettre à jour.
    let ordreDoonees
    // Vérifie si la variable `platId` est nulle (aucun ID spécifié).
    if(platId === null) {
        // Initialise `ordreDoonees` avec les valeurs pour insérer un nouveau plat : ID null, nom du plat et prix du plat.
        ordreDoonees = [null, nomPlat, prixPlat];
    }else {
        ordreDoonees = [null, nomPlat, prixPlat];
    }

    // Tente d'obtenir une connexion à la base de données. Si une erreur se produit, elle est gérée par `erreur`.
    req.getConnection((erreur, connection) => {
        if(erreur) {
            // Affiche l'erreur dans la console pour l'examiner.
            console.log(erreur);   
        }else {
            // Exécute la requête SQL (`requeteSQL`) en utilisant les données (`ordreDoonees`) pour insérer ou mettre à jour un plat dans la base de données.
            connection.query(requteSQL, ordreDoonees, (err, nouveauplat) => {
                if (err) {
                    // Affiche l'objet d'erreur dans la console pour examiner les détails de l'erreur.
                    console.log (err);
                } else {
                    // Affiche un message dans la console pour indiquer que l'insertion du plat a réussi.
                    console.log("insertion réussie ==");
                    // Envoie une réponse avec un code de statut 300 (Redirection) et redirige l'utilisateur vers la page "/menu".
                    res.render(300).render("/menu");
                }
            });
        }
    });
});


app.delete("/plat/:id", (req,res) => {
    let platId = req.params.id;  // récupérer l'id à partir de l'objet params

    req.getConnection((erreur,connection) => {
        if (erreur) { // tester la connection si il y'a une erreur
            console.log(erreur);
        } else {
            connection.query("DELETE FROM plat WHERE id = ?", [platId], (err, result) => {
                if(err) { 
                    console.log(err);
                } else {
                    console.log("Suppression réussie");
                    // redirigé dans la page accueil
                    res.status(20).json({routeRasine:"/menu"});
                }
            });
        }
    });

});


module.exports = app;







 CREATE TABLE chanson(
     id INT PRIMARY KEY AUTO_INCREMENT,
     titre VARCHAR(155),
     date_sortie DATE,
     id_chanteur INT
     FOREIGN KEY(id_chanteur) REFERENCES chanteur(id)
     );


