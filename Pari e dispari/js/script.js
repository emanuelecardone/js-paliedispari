// Pari e Dispari
// L’utente sceglie pari o dispari e inserisce un numero da 1 a 5.
// Generiamo un numero random (sempre da 1 a 5) per il computer (usando una funzione).
// Sommiamo i due numeri
// Stabiliamo se la somma dei due numeri è pari o dispari (usando una funzione)
// Dichiariamo chi ha vinto.


// Chiedo all'utente se sceglie pari o dispari, uso il toLowerCase per evitare errori
let userChoice;
while(userChoice !== `pari` && userChoice !== `dispari`){
    userChoice = prompt(`Scegli pari o dispari`);
    if(userChoice !== null){
        userChoice = userChoice.toLowerCase();         
    } else{
        alert(`Hai annullato l'operazione`);
        break;
    }
}

// Se l'utente non annulla, vado avanti
if(!(userChoice === null)){
    // Chiedo poi all'utente di inserire un numero
    // I controlli sono molti, anche se inserisco una stringa invece che un numero
    let userNumber = '';
    while(userNumber === '' || isNaN(userNumber) || userNumber < 1 || userNumber > 5){
        userNumber = prompt(`Scegli un numero da 1 a 5`);
        if(userNumber !== null & userNumber !== ''){
            userNumber = parseInt(userNumber);
        }
        // I due if sono separati poiché se usavo l'else, nel caso della stringa vuota avrei avuto il break 
        if(userNumber === null){
            alert(`Hai annullato l'operazione`);
            break;
        }
    }

    // Se l'utente non annulla, vado avanti
    if(!(userNumber === null)){
        // Genero un numero per il computer tramite la funzione numberOneToFive
        const computerNumber = numberOneToFive();

        // A questo punto, tramite la funzione sumIsEvenOrOdd, stabilisco se la somma di due numeri è pari o dispari
        const gameResult = sumIsEvenOrOdd(userNumber, computerNumber);

        // Se la scelta dell'utente corrisponde col risultato della funzione even or odd, vince l'utente
        // Altrimenti vince il computer
        let wonOrLost = `Hai perso!`;
        if(userChoice === gameResult){
            wonOrLost = `Hai vinto!`;
        }
        // Output finale
        alert(`
            Numero tuo: ${userNumber}
            Numero computer: ${computerNumber}
            Somma: ${userNumber + computerNumber}
            La somma è ${gameResult} e hai scelto ${userChoice}
            ${wonOrLost}
        `);
    }
}


// FUNZIONI

// Funzione che genera un numero random da 1 a 5
// Non ci sono argomenti provenienti da fuori la funzione
//
// return = un numero random da 1 a 5
//
// Descrizione: 
// 1) La funzione genera un numero intero da 1 a 5, poi lo ritorna
function numberOneToFive(){
    const number = Math.floor(Math.random() * 5) + 1;
    return number;
}

// Funzione che calcola se la somma di due numeri è pari o dispari
//
// number1 -> primo dei due numeri da sommare
// number2 -> secondo dei due numeri da sommare
//
// return = pari se la somma è pari, dispari se la somma è dispari
//
// Descrizione:
// 1) Sommo i due numeri dati registrando la somma in una variabile sum
// 2) Controllo se la somma dei due numeri è pari o dispari
// 3) Se la somma è pari, la funzione ritorna `pari`. Altrimenti ritorna `dispari` 
function sumIsEvenOrOdd(number1, number2){
    let answer;
    const sum = number1 + number2;
    if(sum % 2 === 0){
        answer = `pari`;
    } else{
        answer = `dispari`;
    }
    return answer;
}
