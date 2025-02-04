
function supprime_doublons(indices){
    indices.map((x) => x.trim())
    let tri = new Set(indices);
    indices=Array.from(tri);
    return indices;
}


export function verification(indices){
    indices=supprime_doublons(indices)

    //emplacement pour rajouter des fonctions qui vont trier les indices

    return indices

}
