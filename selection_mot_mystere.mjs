
import fs from "fs/promises"

export function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}
/**
 * Il faut absolument qu'on ait un compteur de carte à l'extérieur de la fonction pour ne pas générer trop de cartes
 * @returns liste de 5 mots générés pour la carte
 * 
 * 
 * 
 */
async function mot_aleatoires(){
    
//il faut lire depuis un fichier
    const data= await fs.readFile("pli07.txt",'utf8') //sans le const ça fonctionnait pas
    const donnees=data.split("\n")

    const retour=[]
    for (let i=0; i<5;i++){
        let int_aleatoire=Math.floor(Math.random()*donnees.length)
        let mot=donnees[int_aleatoire]
        retour.push(mot)
    }
    return retour


}

async function joueur_actif_choisit_nombre(mots){ 
    console.log("Choisissez le mot que vous voudrez faire deviner, 1 premier mot, 5 dernier mot")
    console.log(mots)
    let rep=await askQuestion("")
    let i = parseInt(rep) // pour ne pas avoir de mauvaises surprises
    i-=1
    return mots[i]

}

async function joueur_connait_mot(i_joueur,mot){
    let rep=await askQuestion(`Joueur ${i_joueur}, connais tu le mot ${mot} ? (réponds oui/non)`)
    rep=rep.toLowerCase()
    while (rep!="oui" && rep!="non"){
        console.log("réponse invalide, veuillez recommencer")
        rep=await askQuestion(`Joueur ${i_joueur}, connais tu le mot ${mot} ? (réponds oui/non)`)
        rep=rep.toLowerCase()

    }
    
    return rep=="oui"


}

async function selection(i_joueur_actif) {
    const carte=await mot_aleatoires()
    let joueur_contents=false
    while (!joueur_contents){
        mot_choisi=await joueur_actif_choisit_nombre(carte)
        //chaque joueur va dire s'il connait le mot
        joueur_contents=True
        for (i=0;i<5;i++){
            if (i==i_joueur_actif){
                continue //on ne pose pas la question au joueur actif
            }
            joueur_contents=joueur_contents && joueur_connait_mot(i,mot_choisi) //joueur_contents passe à faux si l'un des joueurs veut changer de mot

        }
    }
    //un mot convenant à tous a été choisi

    return mot_choisi

    
}

console.log(await mot_aleatoires())