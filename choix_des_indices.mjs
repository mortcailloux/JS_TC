import { askQuestion } from './justone.mjs';

export async function demander_indices(mot,indice_prio,noms){
    let indices=[];
    let indice
    for (let i=0; i<noms.length;i++){
        if (i!=indice_prio){ //patch
            console.log("A toi ", noms[i]);
            indice=await askQuestion("Donnez un indice pour le mot " +mot+ " :")
            indice=indice.toLowerCase()
            if (indice.toUpperCase()!=mot){
                indices.push(indice);//on n'ajoute pas le mot si c'est exactement le même que celui donné
            }//la lecture du mot marche pas
        }
    }
    return indices;
}
