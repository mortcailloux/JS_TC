import { demander_indices } from './choix_des_indices.mjs';
import { reponse } from './reponse.mjs';
import { supprime_doublons } from './comparaison_des_indices.mjs';
import readline from 'readline';
import { selection } from './selection_mot_mystere.mjs';

var nb_joueurs=5;
var nb_tours=1;

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

export function askQuestion(question) {
    
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}
// Fonction pour poser une question et attendre la réponse


//le jeu est strucuté en 4 grosses étapes, il faut faire une fonction principale pour chaque étape
//on récupérera les fonctions dans les fichiers correspondants


async function tour(i_joueur_actif,noms) {
    console.log("%s est le nom choisi",noms[i_joueur_actif])
    //selection du mot mystère
    let mot=await selection(i_joueur_actif,noms[i_joueur_actif]);
    let indices= supprime_doublons(await demander_indices(mot,i_joueur_actif,noms));
    let rep = (await reponse(indices,i_joueur_actif,noms)).toLowerCase();
    if (rep===mot){
        console.log("Bravo t'es trop fort(e)!");
        return 1;
    }
    else{
        console.log("C'etait pas ca non...");
        return 0;
    }
}


// Fonction principale
async function main() {
    let score=0;
    let noms=[];
    for (let i=0; i<nb_joueurs;i++){
        let nom=await askQuestion(`Quel est le nom du joueur ${i+1} ?`) //f string ici
        noms.push(nom)
    }

    let float_aleatoire=Math.random()*nb_joueurs; //nombre aléatoire entre 0 et 5
    console.log('float aleatoire: %d', float_aleatoire )
    let i_joueur_actif=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    console.log("int aleatoire %d",i_joueur_actif) //fonction floor des maths, renvoie le plus grand entier inférieur
    for (let i=0; i<nb_tours; i++){
        score+=await tour(i_joueur_actif,noms);
        i_joueur_actif=(i_joueur_actif+1)%5;
    }
    console.log(score);
    rl.close();
}


// Lancer le programme
main();
