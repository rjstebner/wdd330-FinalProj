// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const exerciseName = urlParams.get('name');
const exerciseType = urlParams.get('type');
const exerciseLength = urlParams.get('length');
const exerciseIntensity = urlParams.get('intensity');

// Display the exercise details
document.getElementById('exercise-name').textContent = exerciseName;
document.getElementById('exercise-type').textContent = exerciseType;
document.getElementById('exercise-length').textContent = exerciseLength;
document.getElementById('exercise-intensity').textContent = exerciseIntensity;