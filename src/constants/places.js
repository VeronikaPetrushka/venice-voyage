const places = [
    {
        name: 'St. Mark`s Basilica',
        fullName: 'St. Mark`s Basilica (Basilica di San Marco)',
        address: 'Piazza San Marco, 328, 30124 Venice, Italy',
        coordinates: [
            { lat: 45.4342591, lng: 12.3385089 },
        ],
        image: require('../assets/places/1.jpg'),
        description: 'St. Mark`s Basilica is one of the most iconic and important religious sites in Venice. Known for its Italo-Byzantine architecture, it is adorned with golden mosaics and intricate details. The structure is a combination of opulent design, with its blend of Eastern and Western influences. Built in the 9th century to house the remains of St. Mark the Evangelist, it stands as a testament to Venice’s rich religious and cultural history. Its majestic dome and stunning interior featuring detailed mosaics leave visitors in awe.',
        fact: 'Tourists are fascinated by the golden mosaics that tell the stories of the Bible, the Treasury with its collection of relics, and the panoramic view from the terrace over St. Mark`s Square.'
    },
    {
        name: 'Doge`s Palace',
        fullName: 'Doge`s Palace (Palazzo Ducale)',
        address: 'Piazza San Marco, 1, 30124 Venice, Italy',
        coordinates: [
            { lat: 45.4339, lng: 12.3401 },
        ],
        image: require('../assets/places/2.jpg'),
        description: 'The Doge`s Palace, an architectural masterpiece of Gothic design, was the residence of the Doge of Venice, the supreme authority of the former Venetian Republic. The palace, dating back to the 14th century, combines elegance and grandeur. Its ornate façade features pointed arches and intricate stonework, while inside, visitors will find opulent chambers, historical art, and the famous prison where prisoners, including Casanova, were once held. The palace also features the Golden Staircase and the impressive Council Hall, adorned with paintings by Venetian masters like Tintoretto and Veronese.',
        fact: 'Tourists are drawn to the history of Venetian politics and power, the beauty of the architecture, and the famous "Bridge of Sighs," which connects the palace to the prisons.'
    },
    {
        name: 'Rialto Bridge',
        fullName: 'Rialto Bridge (Ponte di Rialto)',
        address: 'Sestiere San Polo, 30125 Venice, Italy',
        coordinates: [
            { lat: 45.4379, lng: 12.3351 },
        ],
        image: require('../assets/places/3.jpg'),
        description: 'The Rialto Bridge is the oldest and most famous of the four bridges that span the Grand Canal. Completed in 1591, this stunning stone bridge is an engineering marvel of its time. It has served as a vital crossing and a symbol of Venetian commerce. The bridge features a central portico with small shops on either side, offering souvenirs, jewelry, and Murano glass. The arching design provides breathtaking views of the Grand Canal, making it a favorite spot for tourists. It was a major commercial hub during Venice’s golden age, and it still retains that lively atmosphere today.',
        fact: 'Tourists love walking across this iconic bridge for its historical significance, shopping opportunities, and excellent photo spots overlooking the Grand Canal.'
    },
    {
        name: 'Grand Canal',
        fullName: 'Grand Canal (Canale Grande)',
        address: 'Venice, Italy (Runs through the city center)',
        coordinates: [
            { lat: 45.4375, lng: 12.3358 },
        ],
        image: require('../assets/places/4.jpg'),
        description: 'The Grand Canal is Venice\'s main waterway, stretching about 3.8 kilometers in a large S-shape through the heart of the city. It is lined with centuries-old palaces, churches, and buildings reflecting Gothic, Renaissance, and Baroque styles. The canal has been a key commercial route for centuries and remains the main thoroughfare for both tourists and locals. Gondolas, vaporetti (water buses), and private boats fill the canal, offering a picturesque way to explore the city. The canal has been the subject of countless paintings and continues to be one of the most photographed locations in Venice.',
        fact: 'Visitors enjoy taking a gondola or water taxi ride along the canal, where they can admire the city\'s historic buildings, including Ca\' d\'Oro and Ca\' Rezzonico.'
    },
    {
        name: 'Bridge of Sighs',
        fullName: 'Bridge of Sighs (Ponte dei Sospiri)',
        address: 'Piazza San Marco, 1, 30124 Venice, Italy',
        coordinates: [
            { lat: 45.4343, lng: 12.3401 },
        ],
        image: require('../assets/places/5.jpg'),
        description: 'The Bridge of Sighs is a small, enclosed bridge made of white limestone, connecting the Doge\'s Palace to the historic prisons. Built in 1600, the bridge earned its name from the sighs of prisoners as they caught their last glimpse of freedom before being led to their cells. The bridge has a melancholic but fascinating history, with its stone windows offering views of the Venetian lagoon. Its Baroque design makes it a standout architectural feature in the heart of Venice, and it has become one of the city’s most romantic symbols, especially when seen from the canals below.',
        fact: 'Tourists are drawn by its evocative history, and many couples kiss under the bridge while passing in a gondola, believing it will ensure eternal love.'
    },
    {
        name: 'Murano Island',
        fullName: 'Murano Island (Glass Factories)',
        address: 'Murano Island, Venice, Italy',
        coordinates: [
            { lat: 45.4585, lng: 12.3535 },
        ],
        image: require('../assets/places/6.jpg'),
        description: 'Murano is a small island just north of Venice, renowned for its long history of glassmaking. Since the 13th century, glassmakers have been creating delicate and beautiful glassworks here. Today, the island is home to glass factories and workshops, where visitors can watch glassblowers create intricate pieces right before their eyes. The Museo del Vetro (Glass Museum) on the island showcases the evolution of glass art over the centuries. Murano’s charm lies in its quiet streets, colorful houses, and the artisans keeping ancient traditions alive.',
        fact: 'Tourists enjoy visiting the glass workshops, buying unique glass souvenirs, and learning about the centuries-old techniques still used today.'
    },
    {
        name: 'Burano Island',
        fullName: 'Burano Island (Colorful Houses and Lace)',
        address: 'Burano Island, Venice, Italy',
        coordinates: [
            { lat: 45.4852, lng: 12.4177 },
        ],
        image: require('../assets/places/7.jpg'),
        description: 'Burano is a small island in the Venetian lagoon, famous for its brightly colored houses and traditional lace-making. Each house is painted in vibrant hues, making the island one of the most picturesque spots in Venice. Historically, the local women were known for creating exquisite lace, and today visitors can see lace being made by hand and visit the Lace Museum (Museo del Merletto). The island’s laid-back atmosphere, charming canals, and colorful facades make it a favorite destination for photographers and those seeking a peaceful escape from the busier parts of Venice.',
        fact: 'Visitors come to explore the beautiful streets, shop for handmade lace, and take in the stunning views of brightly painted houses reflecting in the canals.'
    },
    {
        name: 'Gallerie dell\'Accademia',
        fullName: 'Gallerie dell\'Accademia',
        address: 'Campo della Carità, Dorsoduro, 1050, 30123 Venice, Italy',
        coordinates: [
            { lat: 45.4315, lng: 12.3280 },
        ],
        image: require('../assets/places/8.jpg'),
        description: 'The Gallerie dell\'Accademia is Venice’s premier art gallery, housing a vast collection of Venetian masterpieces from the 14th to 18th centuries. The museum’s collections include works by famous Venetian artists such as Titian, Veronese, and Tintoretto. The gallery is housed in the former Santa Maria della Carità church and its adjacent monastery buildings, making the architecture as much a part of the experience as the art itself. One of the most famous pieces housed here is Leonardo da Vinci\'s drawing "Vitruvian Man." The gallery offers visitors a deep dive into Venice’s rich artistic heritage.',
        fact: 'Art lovers appreciate the chance to see Renaissance and Baroque masterpieces, while the gallery\'s peaceful atmosphere provides a serene retreat from the bustling city.'
    },
    {
        name: 'Peggy Guggenheim Collection',
        fullName: 'Peggy Guggenheim Collection',
        address: 'Dorsoduro, 701-704, 30123 Venice, Italy',
        coordinates: [
            { lat: 45.4304, lng: 12.3310 },
        ],
        image: require('../assets/places/9.jpg'),
        description: 'The Peggy Guggenheim Collection is one of Italy\'s most important museums dedicated to modern art. Housed in the Palazzo Venier dei Leoni along the Grand Canal, the museum showcases the personal art collection of American heiress Peggy Guggenheim. The collection features works by major artists of the 20th century, including Picasso, Pollock, Dalí, and Miró. Guggenheim was an influential figure in the art world, and her former home now stands as a testament to her legacy. The museum also features a beautiful sculpture garden, offering visitors a tranquil space to reflect on the art.',
        fact: 'Modern art enthusiasts will enjoy the world-class collection, while the museum\'s scenic location on the Grand Canal makes it a perfect stop for any visitor to Venice.'
    },
    {
        name: 'Teatro La Fenice',
        fullName: 'Teatro La Fenice (Venice Opera House)',
        address: 'Campo San Fantin, 1965, 30124 Venice, Italy',
        coordinates: [
            { lat: 45.4331, lng: 12.3342 },
        ],
        image: require('../assets/places/10.jpg'),
        description: 'Teatro La Fenice is Venice’s most famous opera house, and one of the most renowned in Europe. It has hosted premieres of operas by composers such as Rossini, Verdi, and Bellini. Despite being destroyed by fire multiple times, most recently in 1996, the theater has been faithfully restored to its former glory. La Fenice, meaning "The Phoenix," lives up to its name, continually rising from the ashes. Its opulent interior, with gilded balconies and an ornate ceiling, offers a breathtaking setting for performances of opera, ballet, and classical concerts.',
        fact: 'Even if not attending a performance, tourists can take guided tours to admire the theater’s stunning interior and learn about its dramatic history.'
    },
    {
        name: 'Santa Maria della Salute',
        fullName: 'Basilica di Santa Maria della Salute',
        address: 'Dorsoduro, 1, 30123 Venice, Italy',
        coordinates: [
            { lat: 45.4300, lng: 12.3340 }
        ],
        image: require('../assets/places/11.jpg'),
        description: 'The Basilica di Santa Maria della Salute, commonly known as "La Salute," is a striking Baroque church situated at the entrance of the Grand Canal. Built in the 17th century as a votive offering to the Virgin Mary after Venice was spared from a devastating plague, the church is one of the most recognizable landmarks in Venice. Its distinctive domed architecture stands out against the Venetian skyline, symbolizing hope and salvation. Inside, visitors will find works by Titian and Tintoretto, as well as a serene atmosphere for reflection. The annual "Festa della Salute" is still celebrated here each November.',
        fact: 'Tourists are captivated by the basilica\'s magnificent dome and its location on the water, making it one of Venice\'s most picturesque spots for photos, especially at sunset.'
    },
    {
        name: 'San Giorgio Maggiore',
        fullName: 'Basilica di San Giorgio Maggiore',
        address: 'Isola di San Giorgio Maggiore, 30133 Venice, Italy',
        coordinates: [
            { lat: 45.4291, lng: 12.3434 }
        ],
        image: require('../assets/places/12.jpg'),
        description: 'San Giorgio Maggiore is a small island located across from St. Mark’s Square, home to the beautiful Basilica di San Giorgio Maggiore. Designed by renowned architect Andrea Palladio, the church is a masterpiece of Renaissance architecture. Its clean lines and classical proportions stand in contrast to Venice\'s more Gothic architecture. Inside, the basilica houses important works by Tintoretto. Visitors can also take the elevator to the top of the bell tower for breathtaking panoramic views of Venice, the lagoon, and the Dolomite mountains in the distance.',
        fact: 'The bell tower provides one of the best vantage points in Venice for panoramic photography, while the tranquility of the island offers a peaceful retreat from the busy city.'
    },
    {
        name: 'Campo Santa Margherita',
        fullName: 'Campo Santa Margherita',
        address: 'Campo Santa Margherita, Dorsoduro, 30123 Venice, Italy',
        coordinates: [
            { lat: 45.4347, lng: 12.3227 }
        ],
        image: require('../assets/places/13.jpg'),
        description: 'Campo Santa Margherita is one of the largest and liveliest squares in Venice, located in the heart of the Dorsoduro district. This bustling square is a favorite gathering spot for both locals and tourists. Lined with cafes, restaurants, and bars, it offers a lively atmosphere throughout the day and into the night. The square also hosts a local market where visitors can find fresh produce, fish, and local goods. Its relaxed vibe and vibrant energy make it a perfect spot for people-watching or enjoying a leisurely coffee.',
        fact: 'Tourists love the local feel of the square, the lively markets, and the chance to experience Venice away from the major tourist crowds.'
    },
    {
        name: 'Ca\' d\'Oro',
        fullName: 'Ca\' d\'Oro (Golden House)',
        address: 'Cannaregio, 3932, 30121 Venice, Italy',
        coordinates: [
            { lat: 45.4412, lng: 12.3366 }
        ],
        image: require('../assets/places/14.jpg'),
        description: 'The Ca\' d\'Oro, or "Golden House," is one of the most beautiful and well-preserved palaces along the Grand Canal. Its name comes from the gilded and polychrome decorations that once adorned its exterior. Built in the 15th century in the Venetian Gothic style, the palace is now a museum known as the Galleria Giorgio Franchetti, which houses a collection of Renaissance art, sculptures, and tapestries. The palace’s interior is just as impressive as its façade, with a stunning marble staircase and a lovely inner courtyard. Visitors can also enjoy exceptional views of the Grand Canal from its loggia.',
        fact: 'Tourists are drawn by the palace’s artistic treasures, beautiful Gothic architecture, and the opportunity to explore one of Venice’s most historic residences.'
    },
    {
        name: 'Santa Maria Gloriosa dei Frari',
        fullName: 'Basilica di Santa Maria Gloriosa dei Frari',
        address: 'San Polo, 3072, 30125 Venice, Italy',
        coordinates: [
            { lat: 45.4387, lng: 12.3264 }
        ],
        image: require('../assets/places/15.jpg'),
        description: 'The Basilica di Santa Maria Gloriosa dei Frari, commonly known as the Frari, is one of the largest churches in Venice. Built in the 14th century by the Franciscan order, it features an impressive Gothic brick exterior and a richly decorated interior. The basilica is home to numerous masterpieces of Renaissance art, including Titian\'s "Assumption of the Virgin" and his tomb. The Frari also houses important works by Bellini and Donatello. The church is a serene and spiritual space that holds centuries of Venetian history within its walls.',
        fact: 'Visitors come to admire the breathtaking art, including Titian’s paintings, and to explore one of Venice’s most historically significant churches.'
    },
    {
        name: 'Jewish Ghetto',
        fullName: 'Ghetto di Venezia',
        address: 'Campo di Ghetto Nuovo, Cannaregio, 30121 Venice, Italy',
        coordinates: [
            { lat: 45.4452, lng: 12.3273 }
        ],
        image: require('../assets/places/16.jpg'),
        description: 'The Jewish Ghetto of Venice, established in 1516, is the world’s first "ghetto," where the city’s Jewish population was confined. Despite this segregation, the ghetto became a thriving center of Jewish culture, education, and religion. Today, the area is home to synagogues, a Jewish museum, and kosher restaurants. Visitors can explore the unique architecture of the tall, narrow buildings—built this way due to limited space—and learn about the history of the Jewish community in Venice. The Ghetto remains a symbol of both the challenges and contributions of the Jewish population in Venice.',
        fact: 'Tourists are fascinated by the rich history of the Jewish community, the preserved synagogues, and the quiet, atmospheric streets of this historic neighborhood.'
    },
    {
        name: 'Scuola Grande di San Rocco',
        fullName: 'Scuola Grande di San Rocco',
        address: 'Campo San Rocco, 3052, 30125 Venice, Italy',
        coordinates: [
            { lat: 45.4372, lng: 12.3248 }
        ],
        image: require('../assets/places/17.jpg'),
        description: 'The Scuola Grande di San Rocco is a stunning Renaissance building that houses one of the most important collections of works by the Venetian painter Tintoretto. The Scuola was founded in the 15th century as a charitable institution, and its interior is lavishly decorated with Tintoretto’s monumental paintings, including his masterpieces “Crucifixion” and “The Last Supper.” The opulence of the halls, with their gilded ceilings and dramatic lighting, makes visiting the Scuola an immersive artistic experience. It is often referred to as Venice’s "Sistine Chapel" due to its grandiose ceiling paintings.',
        fact: 'Art lovers will be enchanted by Tintoretto’s masterpieces, while others will appreciate the grandeur and historical significance of the building.'
    },
    {
        name: 'Lido di Venezia',
        fullName: 'Lido di Venezia (Beach Area)',
        address: 'Lido di Venezia, Venice, Italy',
        coordinates: [
            { lat: 45.4030, lng: 12.3540 }
        ],
        image: require('../assets/places/18.jpg'),
        description: 'The Lido di Venezia is a long, narrow island that forms a natural barrier between the Venetian Lagoon and the Adriatic Sea. Known for its golden sandy beaches, the Lido is a popular summer destination for both Venetians and tourists. The island also hosts the prestigious Venice Film Festival every year, which draws international celebrities and filmmakers. In addition to its beaches, the Lido offers a peaceful escape from the crowded city center, with tree-lined avenues, luxury hotels, and excellent restaurants.',
        fact: 'Tourists enjoy relaxing on the beach, swimming in the Adriatic Sea, and exploring the quieter side of Venice. The Venice Film Festival also draws film buffs to the island.'
    },
    {
        name: 'Punta della Dogana',
        fullName: 'Punta della Dogana (Modern Art Center)',
        address: 'Dorsoduro, 2, 30123 Venice, Italy',
        coordinates: [
            { lat: 45.4296, lng: 12.3343 }
        ],
        image: require('../assets/places/19.jpg'),
        description: 'Punta della Dogana is a contemporary art museum housed in a restored customs building at the tip of Venice\'s Dorsoduro district. The museum, part of the François Pinault Foundation, showcases rotating exhibitions of modern and contemporary art. The building itself is a striking piece of architecture, offering panoramic views of the Grand Canal and the Venetian lagoon. The exhibitions often feature cutting-edge works by international artists, making it a must-visit for those interested in contemporary art.',
        fact: 'Art enthusiasts enjoy the avant-garde exhibitions, while others appreciate the museum’s stunning location and views over the lagoon.'
    },
    {
        name: 'Palazzo Mocenigo',
        fullName: 'Palazzo Mocenigo (Museum of Fabric and Perfume)',
        address: 'Santa Croce, 1992, 30135 Venice, Italy',
        coordinates: [
            { lat: 45.4385, lng: 12.3267 }
        ],
        image: require('../assets/places/20.jpg'),
        description: 'Palazzo Mocenigo is a grand 17th-century palace that now serves as a museum dedicated to the history of textiles and fashion in Venice, as well as the art of perfume-making. Visitors can explore the elegant rooms, which are furnished with period pieces and display historical costumes, fabrics, and accessories. The museum also offers a fascinating insight into the world of Venetian perfume, with a section devoted to the ingredients and techniques used in historical perfume production. The palace is a hidden gem for those interested in fashion, history, and sensory experiences.',
        fact: 'Tourists are intrigued by the unique combination of fashion history and perfume-making, and the beautiful setting of the palace enhances the experience.'
    }    
];

export default places;