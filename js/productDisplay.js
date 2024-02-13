// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const exerciseName = urlParams.get('name');

// Fetch the JSON data
fetch('../data/exercises.json')
    .then(response => response.json())
    .then(data => {
        // Find the exercise that matches the name from the URL
        const exercise = data.exercise.find(ex => ex.name === exerciseName);

        // Display the exercise details
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-type').textContent = exercise.type;
        document.getElementById('exercise-length').textContent = exercise.length;
        document.getElementById('exercise-intensity').textContent = exercise.intensity;
        document.getElementById('exercise-video').src = exercise.videoUrl;  

        // Display additional information
        // For example, if your JSON data includes a description for each exercise:
        document.getElementById('exercise-description').textContent = exercise.description;
    })
    .catch(error => console.error(`Error: ${error}`));