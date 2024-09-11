let newsList = [];  //array to store the news articles fetched from the API
let currentPage = 1; //when pageload
let itemsPerPage = 6;  //array to store the news articles fetched from the API
 
// selecting the containers by specified ID
const fetchNewsBtn = document.querySelector('#fetchNews');
let newsContainer = document.querySelector('#news-container');
let paginationContainer = document.querySelector('#pagination-container');
let searchInput = document.querySelector('#search');
let sortingSelect = document.querySelector('#sorting');
// to fetch data using the API
fetchNewsBtn.addEventListener('click', async () => {
    await fetch(`https://newsapi.org/v2/everything?q=keyword&apiKey=9fd24d14ddd54ddcadda53c41d9f2d55`)
        .then((response) => response.json())
        .then((data) => newsList = data.articles)
        .catch((error) => console.error(error));
    displayNews();
});
// function to display the fetched data
function displayNews() {
    newsContainer.innerHTML = "";
    //filters the output based on search
    let filteredNews = newsList.filter(news => news.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    //sorting
    if (sortingSelect.value === 'latest') {
        filteredNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else {
        filteredNews.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    }
    //paginate
    let paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    for (let i = 0; i < paginatedNews.length; i++) {
        let newsImage = document.createElement('img');
        newsImage.src = paginatedNews[i].urlToImage;
        newsImage.className = "img-fluid mb-2";

        let title = document.createElement('h5');
        title.textContent = paginatedNews[i].title;

        let description = document.createElement('p');
        description.textContent = paginatedNews[i].description;

        let publishedAt = document.createElement('p');
        publishedAt.textContent = `Published on: ${new Date(paginatedNews[i].publishedAt).toLocaleDateString()}`;

        let container = document.createElement('div');
        container.className = "col-md-4 mb-4";
        container.appendChild(newsImage);
        container.appendChild(title);
        container.appendChild(description);
        container.appendChild(publishedAt);

        newsContainer.appendChild(container);
    }

    displayPagination(filteredNews.length);
}

searchInput.addEventListener('input', () => {
    currentPage = 1;
    displayNews();
});
// when either latest or oldest is selected then 
sortingSelect.addEventListener('change', () => {
    displayNews();
});
// pagination concept displaying
function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = "btn btn-secondary mx-1";
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayNews();
        });
        paginationContainer.appendChild(pageButton);
    }
}
