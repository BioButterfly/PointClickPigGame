function numeroRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spostaPulsante() {
    let randomNumber = numeroRandom(0,7);
    contenitoreListaBox.children[randomNumber].appendChild(buttonBt);
    console.log(velocita);
}

function alzaDifficolta() {
    alzaDifficoltaBt.onclick = function(){
        if(velocita > 200) {
            velocita -= 200;
            velocitaAttuale.innerText = velocita; //cambio la velocità visualizzata a schermo
            clearInterval(myInterval);
        }
    };
}

function abbassaDifficolta() {
    abbassaDifficoltaBt.onclick = function(){
        if(velocita < 2000) {
            velocita += 200;
            velocitaAttuale.innerText = velocita; //cambio la velocità visualizzata a schermo
            clearInterval(myInterval);
        }
    };
}

function buttonClickHandler() {
    punteggioAttualeStringa = document.getElementById("puntiFatti").innerText;

    let punteggioAttualeAumentato = parseInt(punteggioAttualeStringa);
    punteggioAttualeAumentato++;

    let nuovoPunteggio = punteggioAttualeStringa.replace(punteggioAttualeStringa, punteggioAttualeAumentato);
    puntiFatti.innerText = nuovoPunteggio;
}


//javascript
let contenitoreListaBox = document.getElementById("contenitoreListaBox"),
    box = document.querySelector(".box"),
    buttonBt = document.getElementById("btn"),
    alzaDifficoltaBt = document.getElementById("alzaDifficolta"),
    abbassaDifficoltaBt = document.getElementById("abbassaDifficolta"),
    startGameBt = document.getElementById("startGame"),
    puntiFatti = document.getElementById("puntiFatti"),
    tempoRimastoID = document.getElementById("tempoRimasto"),
    punteggioAttualeStringa = document.getElementById("puntiFatti").innerText,
    velocita = 200,
    tempoRimasto = 30,
    myInterval = null;

//Controllo la velocità attuale iniziale e la stampo a schermo
velocitaAttuale = document.getElementById("velocitaAttuale");
velocitaAttuale.innerText = velocita;

startGameBt.onclick = function(e){
    let alzaDifficoltaBtAttrDisable = document.createAttribute("disabled"),
    abbassaDifficoltaBtAttrDisable = document.createAttribute("disabled");

    alzaDifficoltaBt.setAttributeNode(alzaDifficoltaBtAttrDisable);
    abbassaDifficoltaBt.setAttributeNode(abbassaDifficoltaBtAttrDisable);

    myInterval = setInterval(spostaPulsante, velocita); //inizializzo l'intervallo per lo spostamento del div "Click Me"

    // Controllo del tempo rimasto
    setInterval(function(){
        let t = tempoRimasto--;
        tempoRimastoID.innerText = t;
        let punteggioTotale = document.getElementById("puntiFatti").innerText;
        if (t == 0) {

            if (velocita < 1000 && punteggioTotale > 10) {
                alert("Tempo scaduto! Punteggio totale: "+punteggioTotale+" click! - Complimenti, sei un pro del click velocissimi!");
            } else if (velocita > 1000 && punteggioTotale > 10) {
                alert("Tempo scaduto! Punteggio totale: "+punteggioTotale+" click! - Troppo facile se fai spostare il porco a due all'ora....");
            } else if (punteggioTotale > 10) {
                alert("Tempo scaduto! Punteggio totale: "+punteggioTotale+" click! - Sei stato bravo, ora prova a cambiare la difficoltà!");
            } else {
                alert("Tempo scaduto! Punteggio totale: "+punteggioTotale+" click! - Sei stato abbastanza scarso...");
            }

            clearInterval(myInterval);
            location.reload();
        }
    }, 1000);

    //riferimento al click
    buttonBt.onclick = buttonClickHandler;

};

alzaDifficolta();
abbassaDifficolta();