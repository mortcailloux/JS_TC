import { askQuestion } from './selection_mot_mystere.mjs';

export async function reponse(indices,i){
    console.log("A toi de deviner ",noms[i]," :");
    console.log("Voila tes indices:", indices);
    rep= await askQuestion("Quelle est ta reponse?");
    return rep;
}