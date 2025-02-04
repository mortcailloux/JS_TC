import { demander_indices } from './choix_des_indices.mjs';
import { reponse } from './reponse.mjs';
import { supprime_doublons } from './comparaison_des_indices.mjs';
import readline from 'readline';

var nb_joueurs=5;

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





// Fonction principale
async function main() {
    let noms=[]
    for (let i=0; i<nb_joueurs;i++){
        let nom=await askQuestion(`Quel est le nom du joueur ${i+1} ?`) //f string ici
        noms.push(nom)
    }

    let float_aleatoire=Math.random()*nb_joueurs //nombre aléatoire entre 0 et 5
    console.log('float aleatoire: %d', float_aleatoire )
    let int_aleatoire=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    console.log("int aleatoire %d",int_aleatoire)
    let nom_tire=noms[int_aleatoire]
    console.log("%s est le nom choisi",nom_tire)
    //selection du mot mystère
    let mot="abeille";
    let indices= supprime_doublons(await demander_indices(mot,int_aleatoire,noms));
    let rep = (await reponse(indices,int_aleatoire,noms)).toLowerCase();
    if (rep===mot){
        console.log("Bravo t'es trop fort(e)!");
    }
    else{
        console.log("C'etait pas ca non...");
    }

    rl.close();
}


// Lancer le programme
main();
