# constructor-word-guess

### Overview 

With this assignment, a command line interface node app game was created which closely resembles *hangman*. This app will have a set of words picked where the user need to use the command line to guess the word that was randomly chosen. In the command line, it will provide some information to help with what you already guessed but watch out, you only have a limited number of guesses.

You can find the instructions for this assignment here: [homework-instructions.md][]

The overall goal of this assignment was using predefined classes to build out the rest of the application.

[homework-instructions.md]: https://github.com/ekeoid/UNC-Bootcamp-2019-Class/blob/master/01-Class-Content/11-js-constructors/02-Homework/Instructions/HomeworkInstructions.md

### Technologies Used
- [Node.JS](https://nodejs.org/en/docs/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [FS](https://nodejs.org/api/fs.html)


### Features
- Words with spaces can be used
- Guessing a letter is case insensitive
- Output displays all the letters that have been guessed
- Output displays the remaining nubmer of guesses, once you guessed incorrectly
- Output highlights in color the last correct letter guessed
- Output formats messages in color
- Traps user in state of the programs, untill quits.


### Usage




### Challenges
- Reading from a file asyncronously, let to the re-write of the code. It needed to recieve a string from the text file, but the syncronous part of the code would already run. Solved by trampolining function calls. Researched event looping.
- Coloring the highlight letters was challenging since it added escaped characters to the output string, but still needed to fo through the loop. Solved by adding number of charactes escaped to the current positions where the leter is colored.
