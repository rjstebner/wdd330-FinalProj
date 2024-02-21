import darkModeToggle from '../js/utils.mjs';

window.onload = (function() {
    const url = '../data/exercises.json';   
    const cards = document.querySelector('#exercise-cards');

    async function getCardData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`failed to fetch data`);
            }

            const data = await response.json();
            return data.exercise; // Return the data here
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    const displayExercise = (exercises, type) => {
        cards.innerHTML = "";
        const filteredExercises = type !== 'All' ? exercises.filter(exercise => exercise.type === type) : exercises;
    


        filteredExercises.forEach((exercise, index) => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            

            const nameElement = document.createElement('h2');
            nameElement.textContent = exercise.name;

            const typeElement = document.createElement('p');
            typeElement.textContent = `Type: ${exercise.type}`;

            const lengthElement = document.createElement('p');
            lengthElement.textContent = `Length: ${exercise.length}`;

            const intensityElement = document.createElement('p');
            intensityElement.textContent = `Intensity: ${exercise.intensity}`;

            card.style.backgroundImage = `url(${exercise.imageurl})`;
            card.style.backgroundSize = '100% 100%';

            let favButton = document.createElement('button');
            favButton.textContent = '+';
            // Favorite button
            favButton.addEventListener('click', (event) => {
                event.stopPropagation();  // This prevents the card's click event from being triggered
            
                let favorites = localStorage.getItem('favorites');
                favorites = favorites ? JSON.parse(favorites) : [];
            
                if (favorites.includes(exercise.name)) {
                    // If the exercise is already a favorite, remove it
                    favorites = favorites.filter(fav => fav !== exercise.name);
                    favButton.textContent = '+';
                } else {
                    // If the exercise is not a favorite, add it
                    favorites.push(exercise.name);
                    favButton.textContent = '-';
                }
            
                localStorage.setItem('favorites', JSON.stringify(favorites));
            });




            card.appendChild(favButton);

            card.appendChild(nameElement);
            card.appendChild(typeElement);
            card.appendChild(lengthElement);
            card.appendChild(intensityElement);

            cards.appendChild(card);

            setTimeout(() => {
                card.classList.add('visible');
            }, (cards.childElementCount - 1) * 150); // Increase the delay for each card except the first one

            card.addEventListener('click', () => {
                window.location.href = `./pages/product.html?name=${encodeURIComponent(exercise.name)}`;
            });
        });
    };

    // Assuming your li elements have a class 'filter-option'
    const filterOptions = document.querySelectorAll('.filter-option');
    let selectedOption = null;

    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (selectedOption) {
                selectedOption.removeAttribute('id');
            }

            selectedOption = this;
            selectedOption.id = 'selected-option';

            const selectedType = this.innerText; // or this.getAttribute('data-type') if you're storing the type in a data attribute
            getCardData().then(data => displayExercise(data, selectedType));
        });
    });
    getCardData().then(data => displayExercise(data, "All")); // Call displayExercise() here
    darkModeToggle();
});