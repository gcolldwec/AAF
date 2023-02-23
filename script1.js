//elements
const jornadaMasc = document.getElementById("jornadaMasc");
const jornadaFem = document.getElementById("jornadaFem");


function recuperarLocalStorageMasc(){
    let partitJornada = [];
    let jornada = 1; 
    let index = 0;
    
    jornadaMasc.innerHTML += "<h2 class='text-center titolJornada'>Jornada " + jornada + "<h2>";
    for(let i = 0; i < localStorage.length; i++){
        partitJornada = JSON.parse(localStorage.getItem(i + 1));
        if(partitJornada[0].divisio == 'masculi') {
            console.log(i + " => " + partitJornada[0].match);
            jornadaMasc.innerHTML += "<span id='nombrePartit'>" + (index + 1) +  ".</span><span id='equipCasa'>" + partitJornada[0].equipCasa + "</span id='guio'>-<span id='equipVisitant'>" + partitJornada[0].equipVisitant + "</span><br>";
            index++;
            if(index == 10){
                jornada++;
                index = 0;
                // if(jornada < 20) {
                //     jornadaMasc.innerHTML += "<br><h2 class='text-center'>Jornada " + jornada + "<h2><br>";
                // }
            }
        } 
    };
}
function recuperarLocalStorageFem(){
    let nombreJornadaFem = 1;
    let indexFem = 0;

    jornadaFem.innerHTML += "<h2 class='text-center titolJornada'>Jornada " + nombreJornadaFem + "<h2>";
    for(let i = 0; i < localStorage.length; i++){
        partitJornada = JSON.parse(localStorage.getItem(i + 1));
        if(partitJornada[0].divisio == 'femeni') {
        console.log(i + " => " + partitJornada[0].match);
        jornadaFem.innerHTML += "<span id='nombrePartit'>" + (indexFem + 1) +  ".</span><span id='equipCasa'>" + partitJornada[0].equipCasa + "</span id='guio'>-<span id='equipVisitant'>" + partitJornada[0].equipVisitant + "</span><br>";
        indexFem++;
            if(indexFem == 7){
                nombreJornadaFem++;
                indexFem = 0;
                // if(nombreJornadaFem < 14) {
                //     jornadaFem.innerHTML += "<br><h2 class='text-center'>Jornada " + nombreJornadaFem + "<h2><br>";
                // }
            }
        }
    }
}

window.addEventListener("load", recuperarLocalStorageMasc, false);
window.addEventListener("load", recuperarLocalStorageFem, false);
