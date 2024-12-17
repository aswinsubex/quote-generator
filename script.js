const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteQuthor = document.getElementById('author');




let apiQuote = [];

function randomQuote () {
    let newRandmoQuote = apiQuote[Math.floor(Math.random() * apiQuote.length )];
    quoteText.textContent = newRandmoQuote.text;
    quoteQuthor.textContent = newRandmoQuote.author;
}


async function getQuote () {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
       const response = await fetch(apiUrl);
       apiQuote = await response.json();
       randomQuote ();
    } catch (error) {
        console.error (error.message)
    }
}

getQuote();