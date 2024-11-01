const tips = [
    { 
        name: "St. Mark's Basilica", 
        tip: "To reach St. Mark's Basilica, take a vaporetto (water bus) to the San Marco stop. From there, follow the signs to the basilica, which is a short walk through the lively piazza. Arriving early in the morning or late afternoon helps avoid crowds." 
    },
    { 
        name: "Doge's Palace", 
        tip: "The Doge's Palace is located right next to St. Mark's Basilica, making it easy to visit both in one trip. Use the same vaporetto stop (San Marco) and head to the piazza. You can purchase skip-the-line tickets online to save time." 
    },
    { 
        name: "Rialto Bridge", 
        tip: "To get to the Rialto Bridge, take the vaporetto to the Rialto stop. The bridge is just a few steps away. Alternatively, you can enjoy a scenic walk from St. Mark's Square along the canal, which takes about 15 minutes." 
    },
    { 
        name: "Grand Canal", 
        tip: "The Grand Canal runs through the city, so you can take any vaporetto that travels along its route. For a memorable experience, consider taking the Vaporetto Line 1 for a scenic ride along the canal." 
    },
    { 
        name: "Bridge of Sighs", 
        tip: "The Bridge of Sighs is accessible from the Doge's Palace. After exploring the palace, simply follow the signs to the bridge. Alternatively, it can be viewed from the nearby waterfront." 
    },
    { 
        name: "Murano Island", 
        tip: "To reach Murano, take the vaporetto from Fondamente Nove or the main train station. The ride takes about 30 minutes. Follow the signs to the glass factories once you arrive, or join a guided tour for convenience." 
    },
    { 
        name: "Burano Island", 
        tip: "Take a vaporetto from Fondamente Nove or the main island to Burano. It’s about a 45-minute ride. Arrive early in the day to enjoy the vibrant streets and take stunning photos without the crowds." 
    },
    { 
        name: "Gallerie dell'Accademia", 
        tip: "The Gallerie dell'Accademia is located in the Dorsoduro district. Take the vaporetto to Accademia or the nearby Salute stop. It's an easy walk from both locations, and the scenic canal views along the way are an added bonus." 
    },
    { 
        name: "Peggy Guggenheim Collection", 
        tip: "From St. Mark’s Square, take a 15-minute walk along the Grand Canal to reach the Peggy Guggenheim Collection. Alternatively, you can take the vaporetto to the Salute stop and enjoy a pleasant stroll to the museum." 
    },
    { 
        name: "Teatro La Fenice", 
        tip: "To get to Teatro La Fenice, take the vaporetto to the San Marco or Rialto stops. It’s a short walk from either location. For an enhanced experience, consider booking a guided tour to explore the theater's history." 
    },
    { 
        name: "Santa Maria della Salute", 
        tip: "Take the vaporetto to the Salute stop. The basilica is directly across from the stop, offering beautiful views as you approach. Enjoy a leisurely walk along the waterfront to admire the architecture." 
    },
    { 
        name: "San Giorgio Maggiore", 
        tip: "To reach San Giorgio Maggiore, take the free vaporetto from St. Mark’s Square. The ride is just a few minutes, and once you arrive, climb the bell tower for breathtaking views of the city." 
    },
    { 
        name: "Campo Santa Margherita", 
        tip: "Campo Santa Margherita is easily accessible on foot from the Santa Croce or Dorsoduro districts. Alternatively, take the vaporetto to the San Toma stop and enjoy a pleasant 10-minute walk through the local neighborhood." 
    },
    { 
        name: "Ca' d'Oro", 
        tip: "Take the vaporetto to the Ca' d'Oro stop. The palace is just a short walk away along the Grand Canal. Look for the beautiful façade as you approach; it’s hard to miss!" 
    },
    { 
        name: "Basilica di Santa Maria Gloriosa dei Frari", 
        tip: "To reach the Frari, take the vaporetto to the San Toma stop. It’s a brief walk from there. The basilica is located in the San Polo district, a charming area worth exploring." 
    },
    { 
        name: "Jewish Ghetto", 
        tip: "The Jewish Ghetto is a short walk from the Cannaregio area. Take the vaporetto to the Ferrovia stop, then walk through the scenic streets. Look for signs directing you to the ghetto’s entrance." 
    },
    { 
        name: "Scuola Grande di San Rocco", 
        tip: "The Scuola Grande di San Rocco is located near the Frari. Take the vaporetto to the San Toma stop, then walk about 10 minutes. Follow the signs to avoid getting lost in the narrow streets." 
    },
    { 
        name: "Lido di Venezia", 
        tip: "To reach Lido di Venezia, take the vaporetto from San Marco or Fondamente Nove. The ride takes about 30 minutes. Once there, you can rent a bike or walk to the beach for a relaxing day." 
    },
    { 
        name: "Punta della Dogana", 
        tip: "Take the vaporetto to the Salute stop and enjoy a scenic 10-minute walk along the Grand Canal. The museum is located at the tip of the Dorsoduro district, providing stunning views of the city." 
    },
    { 
        name: "Palazzo Mocenigo", 
        tip: "From the San Toma vaporetto stop, it’s just a 10-minute walk to Palazzo Mocenigo. Follow the signs or use a map to navigate the picturesque streets of Santa Croce." 
    },
    { 
        name: "Casino di Venezia", 
        tip: "To reach the Casino di Venezia easily, take the vaporetto to the Ferrovia stop. It's just a short walk along the Grand Canal, and you can enjoy the beautiful views along the way." 
    }
];

export function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
}

export const randomTip = getRandomTip();
console.log(`Place: ${randomTip.name}\nTip: ${randomTip.tip}`);

export default tips;