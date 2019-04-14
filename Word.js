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
        //console.log(word);
        return word;
    }

    update(character) {
        for (let i=0; i < this.word.length; i++) {
            this.word[i].guess(character);
        }
    }
    
}

module.exports = Word;