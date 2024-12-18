const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const loader = document.getElementById('loader');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuote = [];

 // Show loading 
 function loading () {
     loader.hidden = false;
     quoteContainer.hidden = true;
}

// Hide loading 
function complete () {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new quote
function randomQuote () {
    // Pick random quote from apiQuote array
    let newRandmoQuote = apiQuote[Math.floor(Math.random() * apiQuote.length )];

    // If Author filed is blank , replace it with 'Unknown'
    if (!newRandmoQuote.author) {
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = newRandmoQuote.author;
    }
    
    // Dynmaically reducing size of text , if size is big

    if (newRandmoQuote.text.length > 50) {
    quoteText.classList.add('long-quote');
    } else {
    quoteText.classList.remove('long-quote');
    } 
    quoteText.textContent = newRandmoQuote.text;
}
async function getQuote () {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
       const response = await fetch(apiUrl);
       apiQuote = await response.json();
       randomQuote();
    

    // Stop loading and show quote
    complete();

    } catch (error) {
        getQuote();
    }
    }
// Tweet quote

function tweetQuote () {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
    window.open (twitterURL, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On load
getQuote();