
import fs from "fs/promises"
import { askQuestion } from "./justone.mjs"
/**
 * Il faut absolument qu'on ait un compteur de carte à l'extérieur de la fonction pour ne pas générer trop de cartes
 * @returns liste de 5 mots générés pour la carte
 * 
 * 
 * 
 */
async function mot_aleatoires(nb_cartes){
    
//il faut lire depuis un fichier
    const data= await fs.readFile("dico.txt",'utf8') //sans le const ça fonctionnait pas
    const donnees=data.split("\r\n").map(mot => mot.trim());

    const motsSelectionnes = new Set();
    while (motsSelectionnes.size < (nb_cartes*5)) {
        let mot = donnees[Math.floor(Math.random() * donnees.length)];
        motsSelectionnes.add(mot);
    }
    return Array.from(motsSelectionnes); //converti le set en array
}

export async function gen_cartes(nb_cartes){
    let mots=await mot_aleatoires(nb_cartes);
    let cartes=[]
    for (let i=0; i<nb_cartes; i++){
        cartes[i]=[]
        for (let j=0; j<5; j++){
            cartes[i][j]=mots.pop();
        }
    }
    return cartes;
}


async function joueur_actif_choisit_nombre(mots,nom){ 
    console.log("%s choisissez le mot que vous voudrez faire deviner, 1 premier mot, 5 dernier mot, vous ne pouvez pas voir les mots",nom)
    while (true) {
        let rep = await askQuestion("");
        let i = parseInt(rep); // pour ne pas avoir de mauvaises surprises

        if (!isNaN(i) && i >= 1 && i <= 5) {
            return mots[i - 1]; // Ajustement pour correspondre à l'index du tableau
        }

        console.log("Entrée invalide. Veuillez entrer un nombre entre 1 et 5.");
    }
}

async function joueur_connait_mot(mot,nom){
    let rep=await askQuestion(`${nom}, connais tu le mot ${mot} ? (réponds oui/non)`)
    rep=rep.toLowerCase()
    while (rep!="oui" && rep!="non"){
        console.log("réponse invalide, veuillez recommencer")
        rep=await askQuestion(`${nom}, connais tu le mot ${mot} ? (réponds oui/non)`)
        rep=rep.toLowerCase()
    }
    return rep=="oui"
}

export async function selection(i_joueur_actif,noms,carte) {
    let joueur_contents=false
    let mot_choisi
    let nom
    while (!joueur_contents){
        mot_choisi=await joueur_actif_choisit_nombre(carte,noms[i_joueur_actif])
        //chaque joueur va dire s'il connait le mot
        joueur_contents=true
        for (let i=0;i<noms.length;i++){
            if (i==i_joueur_actif){
                continue //on ne pose pas la question au joueur actif
            }
            nom=noms[i]
            joueur_contents=joueur_contents && await joueur_connait_mot(mot_choisi,nom) //joueur_contents passe à faux si l'un des joueurs veut changer de mot
        }
    }
    //un mot convenant à tous a été choisi
    return mot_choisi
}

