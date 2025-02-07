import { askQuestion } from './justone.mjs';

async function demande_deviner(){
    let rep=await askQuestion("Veux-tu deviner quel est le mot ? (oui/non)")
    rep=rep.toLowerCase()
    while (rep!="oui" && rep!="non"){
        console.log("réponse invalide, veuillez recommencer")
        rep=await askQuestion("Veux-tu deviner quel est le mot ? (oui/non)")
        rep=rep.toLowerCase()
    }
    return rep=="oui"
}


export async function reponse(indices,i,noms){
    console.log("A toi de deviner ",noms[i]," :");
    console.log("Voila tes indices:", indices);
    let repondre=await demande_deviner()
    let rep
    if (repondre){
         rep= await askQuestion("Quelle est ta reponse?");

    }
    else {
         rep="none"
    }
    return [rep,repondre];
}