// Setting Game Name
    let gameName = "Guess The World";
    document.title = gameName;
    document.querySelector("h1").innerHTML = gameName;
    document.querySelector("footer").innerHTML = `${gameName} Game - Created By Feras Alkilani`;


    // Setting Game options
    let numbersOfTries = 6;
    let numbersOfLetters = 6;
    let currentTry = 1;
    let numberOfHints = 2;

    // Manage hints
    document.querySelector(".hint span").innerHTML = numberOfHints + "    ";
    const getHintButton = document.querySelector(".hint");
    getHintButton.addEventListener("click", getHint);



    //Manage Words

    let wordToGuess ="";
    const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Babama", "Mamama"];
    wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
    let messageArea = document.querySelector(".message");

    //console.log(wordToGuess);


    function generateInput (){
        const inputsContainer = document.querySelector(".inputs");

        // Create Main Try Div
        for (let i=1; i<=numbersOfTries; i++){
            const tryDiv = document.createElement("div");
            tryDiv.classList.add(`try-${i}`);
            //tryDiv.setAttribute("max-length","1")
           
            tryDiv.innerHTML = `<span>Try ${i}</span>`;

            if(i!==1) tryDiv.classList.add("disabled-inputs");

            // Create Inputs
            for (let j=1; j<=numbersOfLetters;j++){

                const input = document.createElement("input");

                input.type="text";  
                input.id=`guess-${i}-letter-${j}`;                              
                input.setAttribute("maxLength",1);
                input.onkeyup = function(){input.value = input.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase()};  
           
                tryDiv.appendChild(input);           
                   
            
            
            inputsContainer.appendChild(tryDiv);
            }

inputsContainer.children[0].children[1].focus();

//Disabled All inputs Except first One
const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
inputsInDisabledDiv.forEach(input => input.disabled = true);


const inputs = document.querySelectorAll("input");
inputs.forEach((input , index) => {
    input.addEventListener("input",  function() {
        this.value = this.value.toUpperCase();
        
        //console.log(this);


        const letter= input.value.toLowerCase();
    //console.log("letter is: " + letter);
    const actualLetter= wordToGuess[index];
   // console.log("Actual letter is: " + actualLetter);

        const nextInput = inputs[index + 1];
        if (nextInput) 

       {
       
    //Game Logic

    //Letter is Correct and in Place
    if(letter === actualLetter){

        this.classList.add("yes-in-place");
        console.log("Letter is Correct and in correct Place");
       
        nextInput.focus ();

        //Letter is Correct and not in Place 
    }else if(wordToGuess.includes(letter) && letter !== ""){          
        console.log("Letter is Correct and in wrong Place");
            this.classList.add("not-in-place");
           
            messageArea.innerHTML = "Letter is Correct but in wrong Place";        
            input.onkeydown = function(){messageArea.innerHTML = "Letter is Correct but in wrong Place";};
            nextInput.focus ();
        }else{
            // letter is Incorrect
            this.classList.add("no");
            console.log("Letter is Incorrect ");
           this.focus();
            messageArea.innerHTML = "Letter is Incorrect ";
            nextInput.focus ();
           
        }
       }
       
});

input.addEventListener("keydown",  function(event) {

    //console.log(event);

    const currentIndex = Array.from(inputs).indexOf(event.target);// Or this
    if (event.key === "ArrowRight"){
        const nextInput = currentIndex + 1;

        if (nextInput < inputs.length ) inputs[nextInput].focus ();
    }

    if (event.key === "ArrowLeft"){
        const prevInput = currentIndex - 1;

        if (prevInput >=0 ) inputs[prevInput].focus ();
    }
    
    
});


});
}}

console.log(wordToGuess);


const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses(){
    let successGuess = true;
    for (let i = 1; i <= numbersOfLetters; i++){
    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter= inputField.value.toLowerCase();
    //console.log(letter);
    const actualLetter= wordToGuess[i-1];


    //Game Logic

    //Letter is Correct and in Place
    if(letter === actualLetter){
        inputField.classList.add("yes-in-place");
 

        //Letter is Correct and not in Place 
    }else if(wordToGuess.includes(letter) && letter !== ""){
            
            inputField.classList.add("not-in-place");
            successGuess = false;
           
        }else{
            // letter is Incorrect
           inputField.classList.add("no");
            successGuess = false;
        }

    }
        // Check if user Win or Lose
        if(successGuess){
           
        messageArea.innerHTML = `You Won! The word Is <span>${wordToGuess}</span>`;
        if (numberOfHints === 2) {
            messageArea.innerHTML += `<p>Congratz ! You Didn't Use Hints</p>` ;
        }


        //Add Disabled Class on All Try Divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        // Disable Guess Button
        guessButton.disabled = true;
        getHintButton.disabled = true;
    }else{
        
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));

        currentTry++;

       const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
       nextTryInputs.forEach((input) => (input.disabled = false));


        let el = document.querySelector(`.try-${currentTry}`);
        if (el){
            document.querySelector(`.try-${currentTry}`).classList.remove(`disabled-inputs`);
            el.children[1].focus();
        }else{
            guessButton.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = "You Lost! The word Was <span>"+wordToGuess+"</span>";
            
        }
        
    }
          
        
    }

    // GetHint Function

    function getHint(){
        if (numberOfHints > 0) { 
            numberOfHints--;
            document.querySelector(".hint span").innerHTML = numberOfHints + "    ";
           
    }

    if (numberOfHints === 0) {

        getHintButton.disabled = true;
    }


    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    console.log(enabledInputs);

    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    console.log(emptyEnabledInputs);

    if(emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    //     randomInput.value = wordToGuess[indexToFill];
    //     console.log(randomIndex);
    //     console.log(randomInput);
    //    console.log(indexToFill);
    
    if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
        
    }
    }
}




    function handleBackspace(event) {
        if (event.key === "Backspace" ){
        const inputs = document.querySelectorAll("input:not([disabled])");
       const currentIndex = Array.from(inputs).indexOf(document.activeElement); 
    //    console.log(currentIndex)
    
    if (currentIndex > 0) {
       const currentInput = inputs[currentIndex];
       const prevInput = inputs[currentIndex - 1];
      currentInput.value="";	
       prevInput.value="";	
       prevInput.focus();
        
}}
    }



document.addEventListener("keydown", handleBackspace) ;
        
    window.onload = function(){
        generateInput();
    };