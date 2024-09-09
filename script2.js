document.addEventListener('DOMContentLoaded', () => {
    const fetchNewsButton = document.getElementById('fetch-news');
    const newsList = document.getElementById('news-list');

    // Function to fetch and display news data
    function fetchNews() {
        fetch('https://raw.githubusercontent.com/Anjali-215/webstack_exam/main/news.json') // raw link of the news.json file
            .then(response => response.json())
            .then(data => {
                displayNews(data);
            })
            .catch(error => {
                console.error('Error fetching the news:', error);
            });
    }

    // Function to display news articles
    function displayNews(news) {
        newsList.innerHTML = '';
        news.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}" alt="${article.title}">
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
                <p><small>Published at: ${new Date(article.publishedAt).toLocaleString()}</small></p>
            `;
            newsList.appendChild(articleElement);
        });
    }

    // Attach event listener to the button
    fetchNewsButton.addEventListener('click', fetchNews);

    
});
