

	
	var word = "";
	var wordList = ["shrubbery", "witch", "dennis", "ni", "arthur", "grail", "coconut", "swallow", "tim", "elderberries"];
	var hiddenLetters = [];
	var guess = "";
	var letter = "";
	var numGuesses = 0;
	var guessesRemaining = 4;
	var lettersGuessed = [];
	var wins = 0;
	var lettersRemaining = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "z"];
	var images = ["assets/images/black-knight-0.png","assets/images/black-knight-1.png","assets/images/black-knight-2.png","assets/images/black-knight-3.png","assets/images/black-knight-4.png"];
	
	// function to see if value is in array
		
		function isInArray(value, array) {
		  return array.indexOf(value) > -1;
		}

	// 
		function restart() {
    			setTimeout(function(){ newGame(); }, 3000);
			}
	
	var newGame = function(){
		
		//reset variables 

		guess = "";
		numMisses = 0;
		lettersGuessed = [];
		document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
		hiddenLetters =[];
		guessesRemaining = 4;
		document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
		document.getElementById("winner").innerHTML = " ";
		lettersRemaining = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "z"];

		//choose new word randomly
		
		word = wordList[Math.floor((Math.random() * wordList.length))];

		//represent new word with dashes 

		word = word.split("");
		for (i=0;i<word.length;i++){
			hiddenLetters.push("_");			
		};
		console.log(word);
		console.log(hiddenLetters);

		
		//show dashed word represented by hiddenLetters into the page

		document.getElementById("hiddenWord").innerHTML = hiddenLetters.join(" ");

		// resets hangman image to first image

		document.getElementById('hangman').src=images[numMisses];
		
	};

	// when New Game button is pressed newGame function runs

	document.getElementById("newGame").addEventListener("click", newGame);


	

	document.onkeyup = function(event){
		//listens for letters typed 
		letter = String.fromCharCode(event.keyCode).toLowerCase();
		
		//puts guessed letters into an array
		lettersGuessed.push(letter);
		console.log("Letter already guessed: " + lettersGuessed);
		document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
		
		
		// if letter guessed matches a letter in word, change dash to corresponding letter
		// if not, increase number of misses and change the hangman image 

		for (i=0;i<=word.length;i++){
			
			if(letter === word[i]){
				// console.log("letter:" + letter + " equals " + word[i]);

				//sets the dash in hiddenLetters to the corresponding letter in the word that is hidden
				hiddenLetters[i] = word[i];
				console.log(hiddenLetters);

			 } 
			 
		}		

		// check to see if letter is in word 
		// if not, number of misses increases

		if (isInArray(letter,word) === false){
			numMisses++;
			console.log("Number of misses: " + numMisses);
			guessesRemaining--;

		}

		if (guessesRemaining >= 0){
		document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
		}
		
				
		// remove guessed letters from lettersRemaining 
		var index = lettersRemaining.indexOf(letter);
			if (index >= 0) {
  		lettersRemaining.splice( index, 1 );
		};
		// console.log(lettersRemaining);
		
		//insert hidden letters array into HTML document
		document.getElementById("hiddenWord").innerHTML = hiddenLetters.join(" ");

		//insert corresponding hangman image into HTML document
		if (numMisses < images.length){
		document.getElementById('hangman').src=images[numMisses];
		}

		// Player Wins
		if (isInArray("_",hiddenLetters) === false){
			console.log("Winner!");
			document.getElementById("winner").innerHTML = "Victory! Path defended!";
			wins++;
			restart();
		}

		document.getElementById('victories').innerHTML = wins;

		// Player Loses 
		// If number of misses equals or exceeds the number of hangman images the game is over. 
		if (numMisses >= images.length -1){
			console.log("Game Over");
			restart();			
		}



		
	};

	





