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
            displayExercise(data.exercise);
        }   catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    const displayExercise = (exercises) => {
        const cards = document.querySelector(`#exercise-cards`);
        cards.innerHTML ="";
        exercises.forEach((exercise) => {
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
        });
    };
    getCardData();
    
});
