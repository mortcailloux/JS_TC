import { askQuestion } from './justone.mjs';

export async function reponse(indices,i){
    console.log("A toi de deviner ",noms[i]," :");
    console.log("Voila tes indices:", indices);
    let rep= await askQuestion("Quelle est ta reponse?");
    return rep;
}