import { demander_indices } from './choix_des_indices.mjs';
import { reponse } from './reponse.mjs';
import readline from 'readline';

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
    for (let i=0; i<5;i++){
        let nom=await askQuestion(`Quel est le nom du joueur ${i+1} ?`) //f string ici
        noms.push(nom)

    }
    
    let float_aleatoire=Math.random()*5 //nombre aléatoire entre 0 et 5
    console.log('float aleatoire: %d', float_aleatoire )
    let int_aleatoire=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    console.log("int aleatoire %d",int_aleatoire)
    let nom_tire=noms[int_aleatoire]
    console.log("%s est le nom choisi",nom_tire)
    //selection du mot mystère
    let indices= await demander_indices("abeille",int_aleatoire,noms);
    let rep = await reponse(indices,int_aleatoire,noms);
    console.log(rep);

    rl.close();
}


// Lancer le programme
main();
