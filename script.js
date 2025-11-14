const API_URL = 'https://carambar-api-back.onrender.com/api/v1/blagues/random';

// Sélection des éléments du DOM
const blagueTexte = document.getElementById('blague-texte');
const btnBlague = document.getElementById('btn-blague');
const loader = document.getElementById('loader');

// Fonction pour récupérer une blague aléatoire
async function getBlagueAleatoire() {
    try {
        // Affiche le loader et désactive le bouton
        loader.classList.remove('hidden');
        btnBlague.disabled = true;
        blagueTexte.style.opacity = '0.5';
        
        // Appel à l'API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Animation de changement de texte
        blagueTexte.style.opacity = '0';
        
        setTimeout(() => {
            // Formate le texte : retour à la ligne après " ?"
            const texteFormate = data.blague.texte.replace(' ?', ' ?<br><br>');
            blagueTexte.innerHTML = texteFormate;
            blagueTexte.style.opacity = '1';
        }, 300);
        
    } catch (error) {
        console.error('Erreur:', error);
        blagueTexte.textContent = '❌ Oups ! Impossible de charger une blague. Vérifie que l\'API est en ligne ou réessaye dans quelques instants.';
        blagueTexte.style.opacity = '1';
    } finally {
        // Cache le loader et réactive le bouton immédiatement
        loader.classList.add('hidden');
        btnBlague.disabled = false;
    }
}

// Écouteur d'événement sur le bouton
btnBlague.addEventListener('click', getBlagueAleatoire);

// Charge une première blague au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    // Petit délai pour l'effet visuel
    setTimeout(getBlagueAleatoire, 500);
});