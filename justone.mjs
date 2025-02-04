import { demander_indices } from './choix_des_indices.mjs';
import { reponse } from './reponse.mjs';
import { supprime_doublons } from './comparaison_des_indices.mjs';
import readline from 'readline';
import { selection } from './selection_mot_mystere.mjs';
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
    let i_joueur_actif=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    console.log("int aleatoire %d",     i_joueur_actif=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
)
    let nom_tire=noms[     i_joueur_actif=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    ]
    console.log("%s est le nom choisi",nom_tire)
    //selection du mot mystère
    let mot=await selection(i_joueur_actif,noms[i_joueur_actif]);
    let indices= supprime_doublons(await demander_indices(mot,int_aleatoire,noms));
    let rep = await reponse(indices,int_aleatoire,noms);
    if (rep==mot){
        console.log("Bravo t'es trop fort(e)!");
    }
    else{
        console.log("C'etait pas ca non...");
    }

    rl.close();
}


// Lancer le programme
main();
