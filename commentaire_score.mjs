export function commentaire(score){
    if (score === 13) {
        return "Score parfait! Y arriverez-vous encore?";
    } else if (score === 12) {
        return "Incroyable! Vos amis doivent être impressionnés!";
    } else if (score === 11) {
        return "Génial ! C'est un score qui se fête!";
    } else if (score >= 9 && score <= 10) {
        return "Waouh, pas mal du tout!";
    } else if (score >= 7 && score <= 8) {
        return "Vous êtes dans la moyenne. Arriverez-vous à faire mieux?";
    } else if (score >= 4 && score <= 6) {
        return "C'est un bon début. Réessayez!";
    } else if (score >= 0 && score <= 3) {
        return "Essayez encore.";
    } else {
        return "Score invalide.";
    }
}