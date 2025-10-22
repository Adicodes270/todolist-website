function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('theme-toggle-button');
    const isDarkMode = body.classList.toggle('dark-mode');
    themeButton.innerHTML = `<i class="fa-solid fa-${isDarkMode ? 'sun' : 'moon'}"></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark-mode'); // Set dark mode as default
    document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
});