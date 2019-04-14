class Letter {

    constructor(character) {
        this.character = character;
        this.isGuessed = false;
    }

    get print() {
        if (this.isGuessed)
            return this.character;
        else
            return "_";
    }

    guess(character) {
        if (this.character == character)
            this.isGuessed = true;
    }

}

module.exports = Letter;