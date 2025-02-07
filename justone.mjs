import readline from 'readline';
import { demander_indices } from './choix_des_indices.mjs';
import { reponse } from './reponse.mjs';
import { verification } from './comparaison_des_indices.mjs';
import { gen_cartes, selection } from './selection_mot_mystere.mjs';
import { commentaire } from './commentaire_score.mjs';
import { removeAccents } from './comparaison_des_indices.mjs';
var nb_joueurs=5;
var nb_cartes=13;

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

export async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
            console.clear(); // Efface l'écran après chaque question (optionnel)
        });
    });
}
// Fonction pour poser une question et attendre la réponse


//le jeu est strucuté en 4 grosses étapes, il faut faire une fonction principale pour chaque étape
//on récupérera les fonctions dans les fichiers correspondants


async function tour(i_joueur_actif,noms,cartes) {
    var rep
    var repondre
    console.log("%s est le nom choisi",noms[i_joueur_actif])
    //selection du mot mystère
    let carte = cartes.shift()
    let mot=(await selection(i_joueur_actif,noms,carte));
    let indices= await verification(await demander_indices(mot,i_joueur_actif,noms));
    [rep,repondre] = (await reponse(indices,i_joueur_actif,noms));
    rep=rep.toLowerCase()
    console.log("votre reponse: "+rep.toLowerCase())
    console.log("la réponse attendue:"+ mot.toLowerCase())
    if (repondre) {
        if (removeAccents(rep).toUpperCase()===mot.toUpperCase()){ //pour être sûr qu'il n'y ait jamais de crash
            console.log("Bravo t'es trop fort(e)!");
            return [1,cartes];
        }
        else{
            console.log("C'etait pas ca non...");
            cartes.pop()
            return [0,cartes];
        }
    }
    else{
        cartes.push(carte);
        console.log("La carte est remise dans la pile")
        return [0,cartes];
    }
}

async function demande_nom(i) {
    let nom=await askQuestion(`Quel est le nom du joueur ${i+1} ?`) //f string ici
    while (nom.length==0){
        console.log("Veuillez entrer un nom")
        nom=await askQuestion(`Quel est le nom du joueur ${i+1} ?`)
    }
    return nom
}

// Fonction principale
async function main() {
    let score=0;
    let noms=[];
    let cartes=await gen_cartes(nb_cartes);
    console.log("Bienvenue dans cette partie de Just One ! Vous devez être 5 joueurs. L'un d'entre vous sera le joueur actif et devra deviner un mot mystère, tandis que les 4 autres devront l'aider en proposant chacun un indice. Cependant, si plusieurs joueurs donnent le même indice, celui-ci sera annulé et ne pourra pas être vu par le joueur actif. L'objectif est donc de choisir des indices pertinents tout en évitant les doublons. Le joueur actif n'a qu'une seule tentative pour deviner le mot. Bonne chance et faites preuve de créativité !")
    for (let i=0; i<nb_joueurs;i++){
        let nom=await demande_nom(i) //f string ici
        noms.push(nom)
    }
    let float_aleatoire=Math.random()*nb_joueurs; //nombre aléatoire entre 0 et 5
    let i_joueur_actif=Math.floor(float_aleatoire) //fonction floor des maths, renvoie le plus grand entier inférieur
    while (cartes.length>0){
        console.log("Nouveau tour!");
        let [ajout, cartesRestantes] = await tour(i_joueur_actif, noms, cartes);
        score+=ajout;
        cartes = cartesRestantes;  // Met à jour les cartes avec les cartes restantes
        i_joueur_actif=(i_joueur_actif+1)%nb_joueurs
        console.log("il reste %d cartes",cartes.length);
    }
    console.log("La partie est finie :(")
    console.log(commentaire(score));
    rl.close();
}


// Lancer le programme
main();
