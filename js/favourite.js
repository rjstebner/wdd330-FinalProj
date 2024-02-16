window.onload = () => {
    const url = '../data/exercises.json';   

    
    let favorites = localStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];


    async function getCardData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`failed to fetch data`);
            }

            const data = await response.json();
            return data.exercise; // Return the data here
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
         

    getCardData().then(data => {
        console.log(data); // Add this line
        const favoriteExercises = data.filter(exercise => favorites.includes(exercise.name)); 
        console.log(favoriteExercises); // Corrected variable name
        if (favoriteExercises.length > 0) {
            displayFavoriteExercises(favoriteExercises); 
        } else {
            document.getElementById('no-favorites-message').style.display = 'block';
        }
    });

    function displayFavoriteExercises(favoriteExercises) {
        const container = document.getElementById('favorite-exercise-cards');
        container.innerHTML = '';
    
        favoriteExercises.forEach(favoriteExercises => {
            const card = document.createElement('div');
            card.className = 'exercise-card';

            const nameElement = document.createElement('h2');
            nameElement.textContent = favoriteExercises.name;

            const typeElement = document.createElement('p');
            typeElement.textContent = `Type: ${favoriteExercises.type}`;

            const lengthElement = document.createElement('p');
            lengthElement.textContent = `Length: ${favoriteExercises.length}`;

            const intensityElement = document.createElement('p');
            intensityElement.textContent = `Intensity: ${favoriteExercises.intensity}`;

            card.style.backgroundImage = `url(${favoriteExercises.imageurl})`;
            card.style.backgroundSize = '100% 100%';
            

            card.appendChild(nameElement);
            card.appendChild(typeElement);
            card.appendChild(lengthElement);
            card.appendChild(intensityElement);

            container.appendChild(card);

            setTimeout(() => {
                card.classList.add('visible');
            }, (container.childElementCount - 1) * 150); // Increase the delay for each card except the first one

            card.addEventListener('click', () => {
                window.location.href = `./pages/product.html?name=${encodeURIComponent(exercise.name)}`;
            });
        });
    }
};