import { askQuestion } from './justone.mjs';

export async function demander_indices(mot,indice,noms){
    
    let indices=[];
    for (let i=0; i<noms.length;i++){
        if (i!=indice){
            console.log("A toi ", noms[i]);
            indices.push(await askQuestion("Donnez un indice pour le mot " +mot+ " :"));    //la lecture du mot marche pas
        }
    }
    return indices;
}
