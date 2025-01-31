const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour poser une question et attendre la réponse
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

// Fonction principale
async function main() {
    const nom = await askQuestion("Quel est le nom du joueur 1 ?");
    const nom2 = await askQuestion("Quel est le nom du joueur 2 ?");
    const nom3 = await askQuestion("Quel est le nom du joueur 3 ?");

    const nom4 = await askQuestion("Quel est le nom du joueur 4 ?");

    const nom5 = await askQuestion("Quel est le nom du joueur 5 ?");


    afficherBienvenue(nom);
    afficherAgeEtVille(age, ville);

    rl.close();
}

function afficherBienvenue(nom) {
    console.log(`Bienvenue, ${nom} !`);
}

function afficherAgeEtVille(age, ville) {
    console.log(`Vous avez ${age} ans et vous habitez à ${ville}.`);
}

// Lancer le programme
main();
