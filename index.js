const inquirer = require("inquirer");
const Word = require("./Word.js");

var choosenWord = "Taylor Swift is the coolest";
var guess = new Word(choosenWord);


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
        for (let i=colorString.toLowerCase().indexOf(character); i < colorString.length; i++){
            //console.log("i: " + (i < 10 ? " " + i : i) + "  @  " + colorString[i] + " @   " + colorString.length + "  |  " + colorString);
            if (colorString[i].toLowerCase() == character) {
                colorString =               // 2 length because of additional space from formatting
                colorString.substr(0, i) + 
                color.highlight + 
                colorString.substr(i, 2) + 
                color.default + 
                colorString.substr(i + 2);
                
                i += color.highlight.length + color.default.length;
            }
        }
    }
    return colorString;
  }

function play() {

    inquirer.prompt([
        {
            name: "guessedLetter",
            message: "Guess a letter! ",
        }

    ]).then(function (input) {
        if (input.guessedLetter.length === 1 && input.guessedLetter.match(/[a-z]/i)) {
            //console.log("\n" + "You picked " + "\033[38;5;81m" + input.guessedLetter);
            let letter = input.guessedLetter.toLowerCase();

            guess.update(letter);

            if (guess.print.indexOf(letter) > 0) {
                
                console.log("\n\n\n\n" + formatString(guess.print, letter) + "\n");
                console.log("\n" + "\033[38;5;28m" + "CORRECT!!!" + "\033[0m" + "\n\n");
            } else {
                console.log("\n\n\n\n" + formatString(guess.print, null) + "\n");
                console.log("\n" + "\033[38;5;183m" + "INCORRECT!!!" + "\033[0m" + "\n\n");
            }
            
            if (guess.print == choosenWord) {
                console.log("\n" + "\033[38;5;28m" + "GOOD JOB!!!" + "\033[0m" + "\n\n");
            } else {
                play();
            }
            
        } else {
            console.log ("\n" + "\033[38;5;124m" + "Please enter a letter [a..z]\n");
            play();
        }
    });
}

guess.update(" ");  // reveal spaces
console.log("\n" + formatString(guess.print, null) + "\n");
play();
