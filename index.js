const inquirer = require("inquirer");
const Word = require("./Word.js");


var guess = new Word("Taylor Swift");
guess.update(" ");
guess.update("a");
guess.update("i");

guess.print;

function formatString(string, character) {
    // format string to insert spaces
    let colorString = string.split("").join(" ");
    
    // ANSI color scheme for letters
    let color = {
        highlight: "\033[38;5;190m",    // 11 length
        default: "\033[0m"              // 04 length
    };

    // format string to highlight a specific letter
    for (let i=colorString.indexOf(character); i < colorString.length; i++){
        console.log("i: " + (i < 10 ? " " + i : i) + "  @  " + colorString[i] + " @   " + colorString.length + "  |  " + colorString);
        if (colorString[i] == character) {
            colorString =               // 2 length because of additional space from formatting
                    colorString.substr(0, i) + 
                    color.highlight + 
                    colorString.substr(i, 2) + 
                    color.default + 
                    colorString.substr(i + 2);

            i += color.highlight.length + color.default.length;
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
            console.log("You picked " + input.guessedLetter);
            play();
        } else {
            console.log ("Please enter a letter [a..z]");
            play();
        }
    });
}

play();

//console.log(formatString("Taylor Swift is Cool", "o"));