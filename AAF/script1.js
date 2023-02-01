//elements
const jornadaMasc = document.getElementById("jornadaMasc");
const jornadaFem = document.getElementById("jornadaFem");
   
function recuperarLocalStorage(){
    let partit = []
    for(let i = 1; i <= 10; i++){
        partit = JSON.parse(localStorage.getItem("partit" + i));
        console.log(partit.match);
        jornadaMasc.innerHTML += partit.match + "<br>";
    };
    for(let i = 11; i <= 17; i++){
        partit = JSON.parse(localStorage.getItem("partit" + i));
        console.log(partit.match);
        jornadaFem.innerHTML += partit.match + "<br>";
    };

}

window.addEventListener("load", recuperarLocalStorage, false);
// jornada1.addEventListener("click", function (){
//     jornadaMasc.style.display = "block";
//     jornadaFem.style.display = "block";
     
// }, false);