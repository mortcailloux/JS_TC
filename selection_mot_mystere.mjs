
import fs from "fs"

export function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

async function mot_aleatoires(){
//il faut lire depuis un fichier
    data= await fs.readFile("liste.de.mots.francais.frgut.txt",'utf8')
    donnees=data.split("\n")

}

function choisit_nombre(){



}