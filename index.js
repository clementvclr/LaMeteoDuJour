const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '168e630fd5d0a4aed300ae523f0ab051'; // Clé API pour accéder au service OpenWeatherMap
    const city = document.querySelector('.search-box input').value; // Récupère le nom de la ville saisie

    if (city === '') // Si aucune ville n'est saisie, on quitte
        return;

    // Requête vers l'API OpenWeatherMap avec la ville et l'unité en Celsius
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') { // Gère le cas où la ville n'est pas trouvée
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block'; // Affiche l'erreur
                error404.classList.add('fadeIn'); // Animation d'apparition
                return;
            }

            error404.style.display = 'none'; // Cache le message d'erreur si la ville est valide
            error404.classList.remove('fadeIn');

            // Récupère les éléments HTML pour afficher les données météo
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Change l'image en fonction de la météo
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = ''; // Cas par défaut si aucune correspondance
            }

            // Met à jour les données affichées (température, description, humidité et vent)
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Affiche les sections météo avec des animations
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px'; // Ajuste la hauteur du conteneur
        });
});
