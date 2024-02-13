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
    


        filteredExercises.forEach((exercise) => {
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

            card.appendChild(nameElement);
            card.appendChild(typeElement);
            card.appendChild(lengthElement);
            card.appendChild(intensityElement);

            cards.appendChild(card);

            card.addEventListener('click', () => {
                window.location.href = `./pages/product.html?name=${encodeURIComponent(exercise.name)}`;
            });
        });
    };

    // Assuming your li elements have a class 'filter-option'
    const filterOptions = document.querySelectorAll('.filter-option');

    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedType = this.innerText; // or this.getAttribute('data-type') if you're storing the type in a data attribute
            getCardData().then(data => displayExercise(data, selectedType));
        });
    });
    getCardData().then(data => displayExercise(data, "All")); // Call displayExercise() here
});