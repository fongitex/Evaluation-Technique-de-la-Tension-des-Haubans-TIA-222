function calculate() {
    // Récupérer les valeurs des champs de saisie
    const H = parseFloat(document.getElementById('height').value); // Hauteur du pylône
    const L = parseFloat(document.getElementById('length').value); // Longueur du hauban
    const D = parseFloat(document.getElementById('diameter').value) / 1000; // Diamètre du hauban en mètres
    const densitySteel = parseFloat(document.getElementById('density').value); // Densité du hauban
    const densityAir = 1.225; // Densité de l'air (kg/m³)
    const windSpeed = parseFloat(document.getElementById('windSpeed').value); // Vitesse du vent
    const d = parseFloat(document.getElementById('deflection').value); // Flèche
    const FS = parseFloat(document.getElementById('safetyFactor').value); // Facteur de sécurité
    const measuredTensionT = parseFloat(document.getElementById('measuredTension').value); // Tension mesurée en tonnes

    // Calcul de la surface projetée
    const A_proj = Math.PI * Math.pow(D / 2, 2); // Surface de la section du hauban

    // Calcul de la charge de vent
    const windLoad = 0.5 * densityAir * Math.pow(windSpeed, 2) * A_proj;

    // Calcul du poids linéaire du hauban
    const linearWeight = densitySteel * Math.PI * Math.pow(D / 2, 2) * L;

    // Calcul de la tension théorique
    const T_t = (linearWeight + windLoad) * L / (2 * d);

    // Calcul de la tension admissible
    const T_a = T_t / FS;

    // Recommandation si la tension mesurée dépasse la tension admissible
    let recommendation = "";
    let resultClass = "";
    if (measuredTensionT > T_a / 1000) { // Compare avec T_a en tonnes
        recommendation = "Attention : La tension mesurée dépasse la tension admissible. Il est recommandé de vérifier l'intégrité des haubans.";
        resultClass = "red-text";
    } else {
        recommendation = "Conformité : La tension mesurée est dans les limites admissibles.";
        resultClass = "green-text";
    }

    // Interprétation des résultats
    let interpretation = "";
    let interpretationClass = "";
    if (measuredTensionT > T_t / 1000) {
        interpretation = "Interprétation : La tension mesurée est supérieure à la tension théorique. Cela peut indiquer un surpoids sur le hauban ou des conditions de vent plus sévères que prévues.";
        interpretationClass = "red-text";
    } else if (measuredTensionT < T_t / 1000) {
        interpretation = "Interprétation : La tension mesurée est inférieure à la tension théorique. Cela pourrait signifier que le hauban fonctionne en dessous de sa capacité.";
        interpretationClass = "green-text";
    }

    // Affichage des résultats
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Résultats</h3>
        <p>Tension théorique (T_t) : ${T_t.toFixed(2)} N</p>
        <p>Tension admissible (T_a) : ${T_a.toFixed(2)} N</p>
        <p class="${resultClass}">${recommendation}</p>
        <p class="${interpretationClass}">${interpretation}</p>
    `;
}
