
import fs from "fs/promises"

export function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

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

function choisit_nombre(){



}

console.log(await mot_aleatoires())