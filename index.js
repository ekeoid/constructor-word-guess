const inquirer = require("inquirer");
const Word = require("./Word.js");
const fs = require("fs");

var guess;

var numGuesses = 7;
var guessed = {
    letters: [],
    right: [],
    words: []
};

getWord();
//playAgain();

function formatString(string, character) {
    // format string to insert spaces
    let colorString = string.split("").join(" ");

    if (character != null) {

        // ANSI color scheme for letters
        let color = {
            highlight: "\033[38;5;190m",    // 11 length
            default: "\033[0m"              // 04 length
        };

        // format string to highlight a specific letter
        for (let i = colorString.toLowerCase().indexOf(character); i < colorString.length; i++) {
            //console.log("i: " + (i < 10 ? " " + i : i) + "  @  " + colorString[i] + " @   " + colorString.length + "  |  " + colorString);
            if (colorString[i].toLowerCase() == character) {
                colorString =               // 2 length because of additional space from formatting
                    colorString.substr(0, i) +
                    color.highlight +
                    colorString.substr(i, 2) +
                    color.default +
                    colorString.substr(i + 2);

                i += color.highlight.length + color.default.length + 1;
            }
        }
    }
    return colorString;
}

function getWord() {
    // read list of words from an external file list
    
    // Did not add feature for non-repeating words.
    // However 'guessed.words' tracks all words used.
    let filename = "wordlist.txt";
    
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split("\n");
        
        init_game( data[Math.floor( Math.random() * data.length + 1 )] );
    });
    
}


function init_game(word) {
    let array = [196, 160, 124, 124, 88, 88, 52, 52, 52,  88, 88, 124, 124, 160];
    let title = {
        name: "   Welcome to the Word Guess Game\n\n Characters from the Game of Thrones",
        color: ""
    };
    
    for (let i=0; i < title.name.length; i++) {
        title.color += "\033[38;5;" + array[i % array.length] + "m" + title.name[i] + "\033[0m";
    }

    console.log("\n" + title.color + "");
    guessed.words.push(word);
    guess = new Word(word);

    guess.update(" ");  // reveal spaces
    console.log("\n\n" + "    " + formatString(guess.print, null) + "\n\n");

    play();
}

function play() {
    inquirer.prompt([
        {
            name: "guessedLetter",
            message: "Guess a letter!" + "\033[38;5;238m" + " (type \"quit\" to exit) "
        }

    ]).then(function (input) {

        checkQuit(input);
        checkGuess(input);
        
    });
}

function playAgain() {
    inquirer.prompt([
        {
            name: "confirm",
            message: "Do you want to play again? ",
            type: "confirm"
        }

    ]).then(function (input) {

        if (input.confirm) {
            numGuesses = 7;
            guessed = {
                letters: [],
                right: [],
                words: guessed.words
            };

            getWord();

        } else {
            console.log("\n" + "\033[38;5;123m" + "GOOD BYE!!!" + "\033[0m" + "\n");
            process.exit();
        }       
    });
}

function printBoard(letter) {
    console.log("\n\n\n\n" + "    " + formatString(guess.print, letter) + "\n");
    console.log("Guessed letters: " + "\033[38;5;81m" + guessed.letters.join("\033[0m, \033[38;5;81m"));
}

function checkQuit(input) {
    
    if (input.guessedLetter == "quit") {
        console.log("\r");
        process.exit();
    }
}

function checkGuess(input) {
    if (input.guessedLetter.length === 1 && input.guessedLetter.match(/[a-z]/i)) {
        //console.log("\n" + "You picked " + "\033[38;5;81m" + input.guessedLetter);
        let letter = input.guessedLetter.toLowerCase();

        if (guessed.letters.indexOf(letter) == -1) {
            guessed.letters.push(letter);

            guess.update(letter);
            //console.log ("GW: " + guessed.words[guessed.words.length - 1]);
            //console.log ("GP: " + guess.print);
            
            if (guess.print.toLowerCase().indexOf(letter) >= 0) {
                
                printBoard(letter);                
                console.log("\n" + "\033[38;5;28m" + "CORRECT!!!" + "\033[0m" + "\n\n");
                guessed.right.push(letter);

            } else {

                printBoard(null);
                console.log("\n" + "\033[38;5;183m" + "INCORRECT!!!" + "\033[0m" + "\n");
                
                numGuesses--;
                console.log("\033[38;5;124m" + numGuesses + "\033[0m" + " guesses remaining!!!" + "\n\n");
                

                if (numGuesses <= 0) {

                    console.log("\n" + "\033[0m" + "Answer was " + 
                                "\033[38;5;123m" + guessed.words[guessed.words.length - 1] + "\n" + 
                                "\033[38;5;183m" + "YOU RAN OUT OF GUESSES.  GAME OVER!!!" + "\033[0m" + "\n\n");
                    playAgain();

                }
            }
            
            if (guess.print == guessed.words[guessed.words.length - 1]) {

                console.log("\n" + "\033[38;5;123m" + "YOU GUESSED IT!  GOOD JOB!!!" + "\033[0m" + "\n\n");
                
                playAgain();

            } else {
                if (numGuesses > 0) {
                    play();
                }
            }
        } else {
            // Still has some errors on some repeat characters
            // when the repeat character is not in the word to guess.
            // Not best fix, but added guessed.right
            printBoard( guessed.right[guessed.right.length-1] );
            console.log("\n" + "\033[38;5;124m" + "You already guessed " + input.guessedLetter + "\033[0m" +"\n");
            play();

        }
            
    } else {

        printBoard(null);
        console.log ("\n" + "\033[38;5;124m" + "Please enter a letter [a..z]\n");
        play();
    }
}

