/// ici, import du frameword ExpressJS
const express = require("express");
const url = require("url");
const fs = require("fs");

// Je crée mon application ExpressJS
const app = express();

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

module.exports = app;




