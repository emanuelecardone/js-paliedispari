// Palindroma
// Chiedere all’utente di inserire una parola
// Creare una funzione per capire se la parola inserita è palindroma


// Chiedo all'utente la parola
// Aggiungo il toLowerCase per evitare errori
let userWord = '';
while(userWord === '' || !isNaN(userWord)){
    userWord = prompt(`Inserisci una parola`);
    if(userWord !== null){
        userWord = userWord.toLowerCase();
    } else{
        alert(`Hai annullato l'operazione`);
        break;
    }
}

// Se l'utente non annulla, vado avanti
if(!(userWord === null)){
    // Creo la variabile per registrare il risultato della funzione
    const answerForUser = wordIsPalindrome(userWord);

    // Do la risposta all'utente
    if(answerForUser){
        alert(`${userWord} è palindroma`);
    } else{
        alert(`${userWord} non è palindroma`);
    }
}


// FUNZIONI

// Funzione per capire se una parola è palindroma
//
// word -> parola da analizzare per capire se è palindroma
//
// return = vero se è palindroma, falso se non lo è
//
// Descrizione: 
// 1) Creo una variabile undefined che rappresenterà la parola al contrario
// 2) Uso un for al contario per "percorrere" la word (argomento funzione)
// 3) Ogni lettera di word letta al contrario, viene aggiunta a reversedWord
// 4) Solo la prima volta, reversedWord assume il valore della prima lettera
// 5) Dalla seconda volta in poi, reversedWord assume il valore di sé stessa più la lettera corrente
// 6) Se word è uguale a reversedWord, vuol dire che è palindroma, quindi ritorna vero. Altrimenti falso
function wordIsPalindrome(word){
    let reversedWord;
    let answer;
    for(let i = word.length - 1; i >= 0; i--){
        if(i === word.length - 1){
            reversedWord = word[i];
        } else{
            reversedWord += word[i];
        }
    }
    if(reversedWord === word){
        answer = true;
    } else{
        answer = false;
    }
    return answer;
}