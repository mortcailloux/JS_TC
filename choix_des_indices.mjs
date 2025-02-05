import { askQuestion } from './justone.mjs';

export async function demander_indices(mot,indice,noms){
    let indices=[];
    for (let i=0; i<noms.length;i++){
        if (i!=indice){
            console.log("A toi ", noms[i]);
            let indice_joueur = await askQuestion(`Donne un indice pour le mot ${mot}:`);
            indices.push(indice_joueur.toLowerCase());
        }
    }
    return indices;
}
