import fs from "fs/promises"

export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //séparation des lettres et des accents avec normalize
    //supprime ensuite les accents avec leur plage unicode en les remplaçant par ""
}

function supprime_doublons(indices){
    let suppr=false
    let liste_doublons=[]
    let mot1
    let mot2
    let temp_suppr
    for (let i=0;i<indices.length;i++){
        mot1=indices[i]
        temp_suppr=false
        for (let j=0;j<indices.length;j++){
            if (i==j){
                continue //on évite de comparer le mot à lui même, ça causerait des bugs
            }
            mot2=indices[j]
            temp_suppr=removeAccents(mot1).toUpperCase()==removeAccents(mot2).toUpperCase()
            suppr=suppr || temp_suppr
            if (!liste_doublons.includes(mot1) && temp_suppr){ // en fait j'aurais probablement pu slice la liste au dessus et utiliser cette méthode pour vérifier s'il y avait un doublon
                liste_doublons.push(mot1)
                break
            }
            

        }
    }

    if (suppr){
        let mot_a_filtrer
        for (let i=0;i<liste_doublons.length;i++){
            mot_a_filtrer=liste_doublons[i]
            indices=indices.filter(x => x!=mot_a_filtrer)
        }

    }
    return indices
}

export async function verification(indices){
    indices=supprime_doublons(indices)
    indices = await tri_francais(indices)
    //emplacement pour rajouter des fonctions qui vont trier les indices

    return indices

}

function mot_langue_francaise(indice,mots_langue_francaise){
    let indice2=removeAccents(indice)
    return mots_langue_francaise.has(indice2.toUpperCase()) //on vérifie si indice est dans le set de mots

}

async function tri_francais(indices) {
    const data= await fs.readFile("pli07.txt",'utf8') 
    const donnees=data.split("/\r?\n/")
    const mots_langue_francaise = new Set(donnees); // Création du Set des mots

    return indices.filter(indice => mot_langue_francaise(indice, mots_langue_francaise));
}