"use strict";

//Wortarray
let words =["auszeit", "freizeit", "ausflug", "hobby", "ferienlager", "wohlfühlurlaub",
            "feriensaison", "ferienlager", "pauschalreise", "schiffahrt"];
//Buchstabenarray
let letters= ["a","b","c","d","e","f","g","h","i","j","k","l","m",
              "n","o","p","q","r","s","t","u","v","w","y","x","z",
              "ä","ö","ü"];
let word, fehler, versuche;
let contains=false, gameOver = false, victory = false;

//Onload Funktionen
window.onload=()=>{
    buildLetters();    
    createWord();       
    init();
}

//Onclick Funktionen
window.onclick=(event)=>{
    if(!gameOver ){
        if(event.target.classList.contains("letter") && !event.target.classList.contains("clicked") ){
            event.target.classList.add("clicked");
            let letter = event.target.innerHTML;
            versuche++;        
            checkLetter(letter);            
        }
        document.getElementById("versuche").innerHTML=versuche;
    }
}

//Neues Spiel erstellen
let newGame=()=>{
    word = "";
    contains=false;
    gameOver=false;
    victory=false;

    let container = document.getElementById("wort_container");
    let cont = document.getElementById("wort");
    container.removeChild(cont);
    cont = document.createElement("div");
    cont.setAttribute("id", "wort");
    container.append(cont);
    
    init();
    createWord();
    removeClasses();
}

//Löschen der Clicked-Klasse
let removeClasses=()=>{
    let posList = document.querySelectorAll(".letter");
    for(let i=0; i<posList.length; i++){
        if (posList[i].classList.contains("clicked")){
            posList[i].classList.remove("clicked");
        }
    }
}



//Initialisierung
let init=()=>{
    let canvas = document.getElementById("gallows");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);

    fehler=0;
    versuche=0;
    document.getElementById("versuche").innerHTML=versuche;
    document.getElementById("fehler").innerHTML=fehler;

}

//Suche nach dem Buchstaben im Wort und eintragen
let checkLetter=(letter)=>{
    contains = false;
    let positions = [];
    //Check in Word
    for (let i=0; i<word.length; i++){
        if(word.charAt(i)==letter){
            positions.push(i);
        }   
    }
    if(positions.length >0 ) contains = true;
    if(contains==true){
        insertLetters(positions, letter);     
    }else{
        fehler++;
        drawGallows();
    }
    checkWin();   
}

//Check Win -> Hab ich gewonnen?!
let checkWin=()=>{
    let posList= document.querySelectorAll(".letter_word");
    let freePos = 0;
    for (let i=0; i<posList.length; i++){
        if(posList[i].innerHTML ===""){
            freePos++;
        }
    }
    freePos === 0 ? victory = true : false;
    if(victory === true){
        //Game Ende
        alert("Du hast gewonnen");
    }
}

//Galgen zeichnen
let drawGallows=()=>{
    let canvas = document.getElementById("gallows");
    let ctx = canvas.getContext("2d");
    switch(fehler){
        case 1 :
            //Erster Fehler
            ctx.strokeStyle = "red";
            ctx.moveTo(50,450);
            ctx.lineTo(250,450);
            ctx.stroke();
        break;

        case 2 :
            //Zweiter Fehler
            ctx.moveTo(50,450);
            ctx.lineTo(50,150);
            ctx.stroke();
        break;

        case 3 :
            //Dritter Fehler
            ctx.moveTo(50,150);
            ctx.lineTo(250,150);
            ctx.stroke();
        break;

        case 4 :
            //Vierter Fehler
            ctx.moveTo(250,150);
            ctx.lineTo(250,200);
            ctx.stroke();
        break;

        case 5 :
            //Fünfter Fehler
            ctx.beginPath();
            ctx.arc( 250, 220, 20, 0, Math.PI * 2, false);
            ctx.stroke();
        break;

        case 6 :
            //Sechster Fehler
            ctx.moveTo(250,240);
            ctx.lineTo(250,300);
            ctx.stroke();
        break;

        case 7 :
            //Siebter Fehler
            ctx.moveTo(250,300);
            ctx.lineTo(200,350);
            ctx.stroke();
        break;

        case 8 :
            //Achter Fehler
            ctx.moveTo(250,300);
            ctx.lineTo(300,350);
            ctx.stroke();
        break;

        case 9 :
            //Neunter Fehler
            ctx.moveTo(250,280);
            ctx.lineTo(200,250);
            ctx.stroke();
        break;

        case 10 :
            //Zehnter Fehler
            ctx.moveTo(250,280);
            ctx.lineTo(300,250);
            ctx.stroke();
        break;
    }
    if (fehler <10){
        document.getElementById("fehler").innerHTML= fehler;        
    }else{
        document.getElementById("fehler").innerHTML= "GAME OVER";        
        gameOver=true;
    }
}

//Buchstaben im Lösungsbereich eintragen
let insertLetters=(positions, letter)=>{
    let posList = document.querySelectorAll(".letter_word");
    for(let i=0; i<positions.length; i++){
        let newTextNode = document.createTextNode(letter);
        posList[positions[i]].appendChild(newTextNode);
    }
}

//Buchstabenaufbauen
let buildLetters=()=>{
    let display = document.getElementById("letter_container");
    for (let i=0; i<letters.length; i++){
        let newLetterBox = document.createElement("div");
        newLetterBox.setAttribute("class", "letter");
        let newLetterText = document.createTextNode(letters[i]);
        newLetterBox.appendChild(newLetterText);
        display.appendChild(newLetterBox);
    }
}

//Aufbau der einzelnen Buchstabenpositionen
let createWord=()=>{
    let max = words.length;
    let pos = Math.floor(Math.random()*((max)-0)+0);
    word = words[pos];
    buildWord();
}

//Buchstaben in das Wort eintragen
let buildWord=()=>{
    let display = document.getElementById("wort");
    for (let i=0; i<word.length; i++){
        let newLetterBox = document.createElement("div");
        newLetterBox.setAttribute("class", "letter_word");
        display.appendChild(newLetterBox);
    }
}