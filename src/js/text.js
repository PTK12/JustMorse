export let dictionary = [];

// iso 639-1
async function load_language(language) {
    const x = await fetch(`./json/${language}.json`);
    dictionary = await x.json();
}

export function load_words(n = 100) {
    let words = [];
    
    for (let i = 0; i < n; i++) {
        words.push(dictionary[Math.floor(Math.random() * dictionary.length)]);
    }

    return words.join(" ")
}

await load_language("en-gb");
