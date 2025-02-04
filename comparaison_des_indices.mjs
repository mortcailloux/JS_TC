
export function supprime_doublons(indices){
    let tri = new Set(indices);
    indices=Array.from(tri);
    return indices;
}