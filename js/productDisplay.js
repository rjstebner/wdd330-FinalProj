// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const exerciseName = urlParams.get('name');

// Fetch the JSON data
fetch('../data/exercises.json')
    .then(response => response.json())
    .then(data => {
        // Find the exercise with the name from the query parameters
        const exercise = data.exercise.find(ex => ex.name === exerciseName);

        // Display the exercise details
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-video').src = exercise.videoUrl;  
    })
    .catch(error => console.error(`Error: ${error}`));