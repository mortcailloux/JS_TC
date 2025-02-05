
import fs from "fs/promises"
import { askQuestion } from "./justone.mjs"
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
        let mot=(donnees[int_aleatoire]).toLowerCase()
        retour.push(mot)
    }
    return retour


}

function affiche_mots(mots){
    let len=mots.length
    for (let i=0;i<len;i++){
        console.log("Mot %d : %s",i+1,mots[i])


    }


}

async function joueur_actif_choisit_nombre(mots,nom){ 
    console.log("%s choisissez le mot que vous voudrez faire deviner, 1 premier mot, 5 dernier mot, vous ne pouvez pas voir les mots",nom)
    
    let rep=await askQuestion("")
    let i = parseInt(rep) // pour ne pas avoir de mauvaises surprises
    i-=1
    return mots[i]

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

export async function selection(i_joueur_actif,noms) {
    const carte=await mot_aleatoires()
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

