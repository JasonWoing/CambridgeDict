class encn_MyDictionary {
    constructor() {
        // Define the base URL of the online dictionary.
        this.baseURL = 'https://dictionary.cambridge.org/dictionary/english/';
    }

    findTerm(word) {
        return new Promise((resolve, reject) => {
            // Formulate the URL for the online query.
            fetch(this.baseURL + word)
                .then(response => {
                    // Check if the request was successful.
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(html => {
                    // Parse the HTML content of the page.
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(html, 'text/html');
                    // Locate the definition element using the CSS selector.
                    let definitionElement = doc.querySelector('.def');
                    // Resolve the promise with the definition text or a default message if the element wasn't found.
                    resolve(definitionElement ? definitionElement.textContent.trim() : 'Definition not found.');
                })
                .catch(error => {
                    // Reject the promise with the error.
                    reject(error);
                });
        });
    }
}

// Example usage:
// Create an instance of the dictionary class.
let myDictionary = new ENEN_Will();
// Look up a term.
myDictionary.findTerm('example')
    .then(definition => {
        // Log the definition to the console.
        console.log(definition);
    })
    .catch(error => {
        // Log any errors to the console.
        console.error(error);
    });
