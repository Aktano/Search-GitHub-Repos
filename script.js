const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

function displayResults(repositories) {
    searchResults.innerHTML = '';
    if (repositories.length === 0) {
        searchResults.textContent = 'Ничего не найдено';
        return;
    }
    repositories.slice(0, 10).forEach(repository => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = repository.html_url;
        a.target = '_blank';
        a.textContent = repository.name;
        li.appendChild(a);
        const description = document.createElement('p');
        description.textContent = repository.description;
        li.appendChild(description);
        const language = document.createElement('p');
        language.textContent = `Language: ${repository.language}`;
        li.appendChild(language);
        searchResults.appendChild(li);
    });
}

async function searchRepositories() {
    const searchQuery = searchInput.value;
    if (searchQuery.length < 3) {
        alert('Введите более 3 символов для поиска');
        return;
    }
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}`);
    if (!response.ok) {
        alert('Ошибка при выполнении поиска');
        return;
    }
    const data = await response.json();
    console.log(data);
    displayResults(data.items);
}

searchButton.addEventListener('click', searchRepositories);
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchRepositories();
    }
});
