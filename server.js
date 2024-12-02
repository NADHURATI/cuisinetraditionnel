// Ici, j'importe la module "http"
const http = require("http");
const app = require("./app");

// Je déclare ma variable "3003"
const numPort = 3003;

app.set("port",numPort);

// Ici, je veux crée mon serveur
const server = http.createServer(app);

// Ici, je veux récupéré l'heure ici
// Ici, j'ai crée un nouvelle instance
const date = new Date();
// Ici, je déclare la variable "Heure"
const heure = date.getHours();
// Ici, je déclare la variable "Minutes"
const minutes = date.getMinutes();

server.listen(numPort, () => {
    console.log("le serveur est activé au port:", numPort);
    // Ici, j'achiffe heure te minutes.
    console.log(date.toLocaleDateString(), " ", date.toLocaleTimeString());
});