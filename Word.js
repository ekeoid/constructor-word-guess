const Letter = require("./Letter.js");

class Word {

    constructor(wordtoguess) {
        this.word = [];

        for (let i=0; i < wordtoguess.length; i++) {
            this.word.push(new Letter(wordtoguess[i]));
        }
    }

    get print() {
        let word="";

        for (let i=0; i < this.word.length; i++) {
            word += this.word[i].print;
        }
        console.log(word);
        return word;
    }

    update(character) {
        for (let i=0; i < this.word.length; i++) {
            this.word[i].guess(character);
        }
    }
    

    //An array of new Letter objects representing the letters of the underlying word

    //A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    
    //A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
}

module.exports = Word;