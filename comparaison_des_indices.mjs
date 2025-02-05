import fs from "fs/promises"

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //séparation des lettres et des accents avec normalize
    //supprime ensuite les accents avec leur plage unicode en les remplaçant par ""
}

function supprime_doublons(indices){
    indices.map((x) => x.trim())
    let tri = new Set(indices);
    indices=Array.from(tri);
    return indices;
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
    const donnees=data.split("\n")
    const mots_langue_francaise = new Set(donnees); // Création du Set des mots

    return indices.filter(indice => mot_langue_francaise(indice, mots_langue_francaise));
}