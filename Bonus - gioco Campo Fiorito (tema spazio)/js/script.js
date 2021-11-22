// Riempio header
document.querySelector('header').innerHTML = `
    <h1 class="text-center text-uppercase fw-bold my_blue_color mb-1">space minesweeper</h1>
`;

// Riempio main 
document.querySelector('main').innerHTML = `
    <button type="submit" class="active start_button btn text-uppercase text-center my_blue_borders my_blue_color fs-1 fw-bold p-5">start game</button>
` + `
    <div class="game_main_wrapper w-75 my_blue_borders rounded py-4">
        <div class="container-fluid h-100">
            <div class="row row-cols-10 gy-4">

            </div>
        </div>
    </div>
` + `
    <div class="win_loss_overlay w-100 vh-100 position-fixed flex-column justify-content-center align-items-center">
        <h2 class="text-center text-uppercase fw-bold my_blue_color you_won_message">you won!</h2>
        <h2 class="active text-center text-uppercase fw-bold my_blue_color game_over_message">game over!</h2>
        <button type="submit" class="restart_button btn text-uppercase text-center my_blue_borders my_blue_color fs_25 fw-bold px-2">restart</button>
    </div>
` + `
    <div class="rules_wrapper w-50 h-50 justify-content-center align-items-center">
        <p class="text-center text-uppercase fw-bold my_blue_color rules_message fs-4 my_blue_borders p-5">
            In this game, 8 astronauts over 100 will make you lose, so don't click them!<br>
            To win, you have to click all the 92 safe astronauts. Good luck!
        </p>
    </div>
`;
 
// Riempio footer
document.querySelector(`footer`).innerHTML = `
    <button class="active rules_button btn text-uppercase text-center my_blue_borders my_blue_color fs_25 fw-bold">how to play</button>
    <button class="rules_back_button btn text-uppercase text-center my_blue_borders my_blue_color fs_25 fw-bold">back</button>
`;

// Creo la variabile per il pulsante start
const startButton = document.querySelector('.start_button');

// Variabile flag per la sezione rules
let rulesCheck = false;

// Counter per debug animazioni al click tasto back
let backDebug = 0;

// Variabile flag per rendere astronauti normal e Rules non cliccabili in quel secondo che passa fino alla scritta game over
// Poi ne faccio una parallela apposta per gli astronauti che danno game over, cosi da poter gestire entrambi
let gameOver;
let gameOver2;

// Variabile counter per capire se l'utente vince
let userWins = 0;

// Click del pulsante
startButton.addEventListener('click', function(){
    
    // La variabile flag di rules diventa vera al click
    rulesCheck = true;
    // Falsa invece quella del check del game over
    gameOver = false;
    gameOver2 = true;

    // Faccio apparire il game wrapper e sparire il pulsante
    startButton.classList.remove('active');
    document.querySelector(`.game_main_wrapper`).classList.add('active');

    // Mi creo un array per gli astronauti
    const spaceMenArray = [];

    // Riempio quindi la row e l'array
    for(let i = 0; i < 100; i++){
        document.querySelector('.row-cols-10').innerHTML += `
            <div class="col">
                <div class="game_box d-flex justify-content-center align-items-center">
                    <i class="fas fa-user-astronaut astronaut_${i} my_blue_color my_blue_borders p-2 rounded-circle"></i>
                </div>
            </div>
        `;
        const currentSpaceMan = document.querySelector(`.astronaut_${i}`);
        spaceMenArray.push(currentSpaceMan);
    }

    // Creo una lista di indici vuota (mi servirà per non selezionare più volte lo stesso astronauta)
    const selectedNumbers = [];
    
    // Il while va avanti finché non ho 8 numeri diversi nell'array
    while(selectedNumbers.length < 8){
        // Variabile flag per capire se un numero è già uscito
        // Ritornerà false di default ad ogni inizio iterazione così da eseguire il controllo ogni volta
        let sameNumber = false;
        // Genero un numero random 
        const currentNumber = Math.floor(Math.random() * spaceMenArray.length - 1 + 1) + 0;

        // Escludendo la prima volta (in cui non posso aggiungere un astronauta uguale perché sto aggiungendo ora il primo)
        // se trovo con un for un numero nell'array uguale a quello appena generato
        // la variabile flag diventa true. il controllo verrà ripetuto sempre sulla lunghezza attuale della lista
        if(selectedNumbers.length > 0){
            for(let i = 0; i < selectedNumbers.length; i++){
                if(currentNumber === selectedNumbers[i]){
                    sameNumber = true;
                }
            }
        }
        // Aggiungo alla lista il numero e assegno la classe selected solo se la flag è false
        if(!sameNumber){
            document.querySelector(`.astronaut_${currentNumber}`).classList.add(`selected_astronaut_${selectedNumbers.length}`);
            selectedNumbers.push(currentNumber);
        }
    }

    // A questo punto ho bisogno di una lista dei 92 numeri non usciti
    const normalNumbers = [];
    // Uso lo stesso metodo di prima, ma stavolta il controllo numero uguale avviene da subito
    // poiché selectedNumbers ha già una length, e il controllo avviene anche sui normalNumbers stessi
    // Se trovo un numero uguale a uno dei selezionati o uguale a uno dei normali stessi, non lo considero
    while(normalNumbers.length < (100 - selectedNumbers.length)){
        // Variabile flag per capire se un numero è già uscito
        // Ritornerà false di default ad ogni inizio iterazione così da eseguire il controllo ogni volta
        let sameNumber = false;
        // Genero un numero random
        const currentNumber = Math.floor(Math.random() * spaceMenArray.length - 1 + 1) + 0;

        // Controllo indice uguale sui selected
        for(let i = 0; i < selectedNumbers.length; i++){
            if(currentNumber === selectedNumbers[i]){
                sameNumber = true;
            }
        }
        // Controllo indice uguale sui normal stessi
        for(let i = 0; i < normalNumbers.length; i++){
            if(currentNumber === normalNumbers[i]){
                sameNumber = true;
            }
        }
        // Aggiungo alla lista il numero e assegno la classe normal solo se la flag è false
        if(!sameNumber){
            document.querySelector(`.astronaut_${currentNumber}`).classList.add(`normal_astronaut_${normalNumbers.length}`);
            normalNumbers.push(currentNumber);
        }
    }

    // Assegno con un for l'evento del click a ciascuno degli astronauti selected
    for(let i = 0; i < selectedNumbers.length; i++){
        document.querySelector(`.selected_astronaut_${i}`).addEventListener('click', function(){
            gameOver = true;
            if(gameOver2){
                // Animazione per il selected astronaut clickato
                document.querySelector(`.selected_astronaut_${i}`).classList.add('clicked');
                // Animazione per i rimanenti selected astronauts
                for(let counter = 0; counter < selectedNumbers.length; counter++){
                    document.querySelector(`.selected_astronaut_${counter}`).classList.add('active');        
                }
                // Animazione per scritta game over (ritardo di 1.5s)
                setTimeout(function(){document.querySelector('.win_loss_overlay').classList.add('game_over')}, 1500);
                // game over 2 va false cosi non posso più cliccare gli astronauti rossi fino alla scritta game over
                gameOver2 = false;
                // Il counter per capire se l'utente vince torna a 0
                userWins = 0;
                // Do display none al titolo "you won" e faccio vedere il titolo game over
                document.querySelector(`.you_won_message`).classList.remove('active');
                document.querySelector(`.game_over_message`).classList.add('active');
            }
        });
    }

    // Assegno con un for l'evento del click a ciascuno degli astronauti normal
    for(let i = 0; i < normalNumbers.length; i++){
        document.querySelector(`.normal_astronaut_${i}`).addEventListener('click', function(){
            // Gli astronauti normali sono clickabili solo se non ho ancora perso
            if(!gameOver){
                document.querySelector(`.normal_astronaut_${i}`).classList.add('clicked', 'debug_astronaut');
                // Il counter del debug aumenta
                backDebug++;
                // Anche il counter per capire se l'utente vince aumenta
                // Ma solo se non clicco su un astronauta invisibile e già cliccato
                // Per farlo, farò aumentare il counter in modo identico alla lunghezza
                // della lista dei debug astronauts, che aumenta di 1 solo la prima volta che clicco un normal
                // Poi la lista debug si svuota al restart, userWins si resetta e torneranno a 0
                userWins = document.getElementsByClassName('debug_astronaut').length;
                
                // Condizione per la vittoria dell'utente
                if(userWins === normalNumbers.length){
                    // game over va true cosi non posso aprire la sezione rules nel 1.5s che ci mette l'animazione ad entrare in gioco
                    gameOver = true;
                    // game over 2 va false cosi non posso più cliccare gli astronauti rossi fino alla scritta game over
                    gameOver2 = false;
                    // L'ultimo astronauta clickato diventa verde
                    document.querySelector(`.normal_astronaut_${i}`).classList.add('win_event'); 
                    // Animazione per scritta game over (ritardo di 1.5s)
                    setTimeout(function(){document.querySelector('.win_loss_overlay').classList.add('game_over')}, 1500);
                    // Do display none al titolo game over e faccio vedere il titolo "you won"
                    document.querySelector(`.game_over_message`).classList.remove('active');
                    document.querySelector(`.you_won_message`).classList.add('active');
                    // il counter userWins torna a 0 così da ricominciare a contare da 0 al restart
                    userWins = 0;
                } 
            }  
        });
    }

    // Variabile per il tasto restart
    const restartButton = document.querySelector('.restart_button');

    // Evento al click del tasto restart
    restartButton.addEventListener('click', function(){
        // Svuoto la row
        document.querySelector('.row').innerHTML = '';
        // Rimuovo l'active al game wrapper
        document.querySelector(`.game_main_wrapper`).classList.remove('active');
        // Rimuovo l'effetto overlay del game over
        document.querySelector('.win_loss_overlay').classList.remove('game_over');
        // Ritorna il pulsante start
        startButton.classList.add('active');
        // La flag per la sezione rules torna falsa
        rulesCheck = false;
        // Anche il counter per il debug Back torna a 0
        backDebug = 0;
        // Il check del game over torna false così posso aprire la pagina Rules anche dalla homepage
        gameOver = false;
    });
});

// Variabile per il pulsante rules
const rulesButton = document.querySelector(`.rules_button`);
// Variabile per il pulsante rules Back
const backButton = document.querySelector(`.rules_back_button`);

// Evento al click del pulsante rules
rulesButton.addEventListener('click', function(){
    // Al click sparisce il pulsante Start
    startButton.classList.remove(`active`);
    // Se non è game over, il pulsante fa apparire il pulsante Back, la sezione rules
    // Fa poi sparire il pulsante Rules stesso e il Game wrapper
    // Questo if fa si che se l'utente clicca "Rules" in quel 1.5s di tempo che l'overlay ci mette a coprire tutto
    // Non potrà aprire la sezione in quanto dopo creerebbe un bug
    if(!gameOver){
        backButton.classList.add(`active`);
        document.querySelector(`.rules_wrapper`).classList.add(`active`);
        rulesButton.classList.remove(`active`);
        document.querySelector(`.game_main_wrapper`).classList.remove('active'); 
    }
});

// Evento al click del pulsante rules Back
backButton.addEventListener('click', function(){
    // Al click spariscono la sezione Rules e pulsante Back stesso
    document.querySelector(`.rules_wrapper`).classList.remove(`active`);
    backButton.classList.remove(`active`);
    // Se mi trovo nella partita, sparisce il game wrapper. Altrimenti il pulsante start se sono in homepage
    if(rulesCheck){
        document.querySelector(`.game_main_wrapper`).classList.add('active');
    } else{
        startButton.classList.add(`active`);
    }
    // Ritorna in display il pulsante Rules
    rulesButton.classList.add(`active`);
    // Faccio si che gli astronauti che hanno già fatto un'animazione di scomparsa,
    // Non la rifacciano quando clicco back ma i rimanenti normal la faranno quando li clicco
    for(let i = 0; i < backDebug; i++){
        document.getElementsByClassName('debug_astronaut')[i].classList.add('no_animation');
    } 
});



