export const darkModeToggle = () => {
    const toggle = document.querySelector('#dark-mode-toggle');

    // Check if dark mode is enabled when the page loads
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save the dark mode state in localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', null);
        }
    });
};

export default darkModeToggle;