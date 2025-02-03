import { askQuestion } from './selection_mot_mystere.mjs';
import { demander_indices } from './choix_des_indices.mjs';
import { reponse } from './reponse.mjs';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour poser une question et attendre la réponse


//le jeu est strucuté en 4 grosses étapes, il faut faire une fonction principale pour chaque étape
//on récupérera les fonctions dans les fichiers correspondants





// Fonction principale
async function main() {
    noms=[]
    for (let i=0; i<5;i++){
        nom=await askQuestion(`Quel est le nom du joueur ${i+1} ?`) //f string ici
        noms.push(nom)

    }
    
    float_aleatoire=Math.random()*5 //nombre aléatoire entre 0 et 5
    console.log('float aleatoire: %d', float_aleatoire )
    int_aleatoire=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    console.log("int aleatoire %d",int_aleatoire)
    nom_tire=noms[int_aleatoire]
    console.log("%s est le nom choisi",nom_tire)
    //selection du mot mystère
    let indices= await demander_indices("abeille",int_aleatoire);
    console.log(indices);
    rep = await reponse(indices,int_aleatoire);
    console.log(rep);

    rl.close();
}


// Lancer le programme
main();
