
//elements
const selectJornadaApi = document.getElementById("selectJornadaMasc");
const jornadaMasc = document.getElementById("jornadaMasc");
const jornadaNombreMasc= document.getElementById("jornadaNombre");
 
//FUNCIONS
//petició api football per mostrar travessa
//funció per mostrar les jornades per separat de l'api, la funció té com a parametre el nombre de la jornada
//A l'apartat d'events s'especifica com es tradueix el select jornada  al parametre 'j'
function mostrarJornades(j) {
    jornadaMasc.innerHTML = '';
    var settings = {
        "url": "https://v3.football.api-sports.io/fixtures?league=140&season=2022",
        "method": "GET",
        "timeout": 0,
        "headers": {
        "x-rapidapi-key": "c15f3b538bea5029bfa15f3e2354fe05",
        "x-rapidapi-host": "v3.football.api-sports.io"
        },
    };
    let index = 1;
    $.ajax(settings).done(function (response) {
        console.log(response);
        let results = response.response; 
        results.forEach(function(element) {
            jornadaNombreMasc.innerHTML = "<h2 class='text-center mt-3 mb-3'>Jornada " + j + "</h2>"
            let round = element.league.round;
            let jornada = round.substring(16);
            if(j == jornada) {
                let home = element.teams.home.name;
                let escutHome = element.teams.home.logo;
                let score = element.score.fulltime.home + " - " + element.score.fulltime.away;
                let marcadorLocal = element.score.fulltime.home;
                let marcadorVistant = element.score.fulltime.away;
                let away = element.teams.away.name;
                let escutAway = element.teams.away.logo;
                let match = home + " - " +  away;
                var partit_jornada = "<div class='row mt-2 d-flex justify-content-center'><div class='col-12'><div class='row partit " + index +"'><div class='col-1  text-center mx-3'><img id='escut' src='" + escutHome + "' alt='escut'/></div><div class='col-8 text-center'>" + match + "</div><div class='col-1 text-center ml-2 escut'><img id='escut' src='" + escutAway + "' alt='escut'/></div></div></div></div>";
                jornadaMasc.innerHTML += partit_jornada;
                jornadaMasc.innerHTML += '<hr>';
                let resultat = getResultat(marcadorLocal, marcadorVistant);
                guardarResultatApi(index, resultat);
                index++;
            }
        });
    });
}

//funció per mostrar totes les jornades des de l'api, 
//A l'apartat d'events s'especifica que quan l'opció del select és '0' s'executarà la funció
function mostrarTotesJornades() {
    jornadaMasc.innerHTML = '';
    var settings = {
        "url": "https://v3.football.api-sports.io/fixtures?league=140&season=2022",
        "method": "GET",
        "timeout": 0,
        "headers": {
        "x-rapidapi-key": "c15f3b538bea5029bfa15f3e2354fe05",
        "x-rapidapi-host": "v3.football.api-sports.io"
        },
    };
    let j = 1;
    let index = 1;
    $.ajax(settings).done(function (response) {
        console.log(response);
        let results = response.response; 
        results.forEach(function(element) {
            let round = element.league.round;
            let jornada = round.substring(16);
            jornadaNombreMasc.innerHTML = "<h2 class='text-center mt-3 mb-3'>Jornada 1</h2>"

            if(j == jornada) {
                let home = element.teams.home.name;
                let escutHome = element.teams.home.logo;
                let away = element.teams.away.name;
                let escutAway = element.teams.away.logo;
                let match = home + " - " +  away;
                var partit_jornada = "<div class='row mt-2 d-flex justify-content-center'><div class='col-12'><div class='row partit " + index +"'><div class='col-1  text-center mx-3'><img id='escut' src='" + escutHome + "' alt='escut'/></div><div class='col-8 text-center'>" + match + "</div><div class='col-1 text-center ml-2 escut'><img id='escut' src='" + escutAway + "' alt='escut'/></div></div></div></div>"
                jornadaMasc.innerHTML += partit_jornada;
                jornadaMasc.innerHTML += '<hr>';
                index++;
            } else {
                j++;
                jornadaMasc.innerHTML += '<br><br>';
                jornadaMasc.innerHTML += "<h2 class='text-center mt-3 mb-3'>Jornada " + jornada + "</h2>";
                jornadaMasc.innerHTML += '<br>';
                let home = element.teams.home.name;
                let escutHome = element.teams.home.logo;
                let away = element.teams.away.name;
                let escutAway = element.teams.away.logo;
                let match = home + " - " +  away;
                var partit_jornada = "<div class='row mt-2 d-flex justify-content-center'><div class='col-12'><div class='row partit " + index +"'><div class='col-1  text-center mx-3'><img id='escut' src='" + escutHome + "' alt='escut'/></div><div class='col-8 text-center'>" + match + "</div><div class='col-1 text-center ml-2 escut'><img id='escut' src='" + escutAway + "' alt='escut'/></div></div></div></div>"
                jornadaMasc.innerHTML += partit_jornada;
                jornadaMasc.innerHTML += '<hr>';
                index++;
            }
        });
    });
}

//funció que crea un objecte amb dos paràmetres, insereix l'objecte dins un array  i s'insereix l'array al local storage, l'executem dins la funció 'mostrarJornades(j)'
function guardarResultatApi(index, resultat) {
    let jornada = [];
    let encontre = {
        partit: index,
        marcador: resultat
    }
    jornada.push(encontre);
    localStorage.setItem( index, JSON.stringify(jornada));   
}

//funció que ens indica el resultat del partit segons el marcador local i el visitant
function getResultat (marcadorLocal, marcadorVistant){
    if(marcadorLocal > marcadorVistant) {
        return 1;
    } else if(marcadorLocal < marcadorVistant) {
        return 2;
    } else {
        return 'X';
    }
}

/*funció per a obtenir els partits de la jornada que previament hem generat al premer el botó generar jornada,
i aquesta jornada s'ha inserit al localstorage per nombre de partit de la jornada.
Executem un cicle for amb el limit que sigui el 'length' del localstorage i anem entrant als partits que siguin només femenins,
capturem l'equip local i visitant i els mostrem per pantalla amb 'innerHtml'
*/
function recuperarLocalStorageMasc(){
    let partitJornada = [];
    let index = 0;
    let equipCasa = '';
    let equipVisitant = '';
   
    if(localStorage.length > 0 ) {
        
        for(let i = 0; i < localStorage.length; i++){
            partitJornada = JSON.parse(localStorage.getItem(i + 1));
            if(partitJornada[0].divisio == 'masculi') {
                equipCasa = partitJornada[0].equipCasa;
                console.log(equipCasa);
                equipVisitant = partitJornada[0].equipVisitant;
                
                console.log(i + " => " + partitJornada[0].match);
                var partit_jornada = "<div class='row mt-2 d-flex justify-content-center'><div class='col-12'><div class='row partit " + index +"'><div class='col-1  text-center mx-3'><img id='escutDesc' src='./imatges/escuts_masculi/" + partitJornada[0].equipCasa + ".png' alt='escut'/></div><div class='col-9 text-center'><span id='equipCasa'>" + partitJornada[0].equipCasa + "</span id='guio'>-<span id='equipVisitant'>" + partitJornada[0].equipVisitant + "</span></div><div class='col-1 text-center ml-2 escut'><img id='escutDesc' src='./imatges/escuts_masculi/" + partitJornada[0].equipVisitant + ".png' alt='escut'/></div></div></div></div>"
                jornadaMasc.innerHTML += partit_jornada;
                jornadaMasc.innerHTML += '<hr>';
                index++;
            } 
        }
    } else {
        console.log('localstorage buit');
    }
}
//events
/*event listener que s'executa al canviar el 'select' de jornada capturant el nombre de la jornada i executant
 la funció de mostrar jornada segons el 'value' del select
 si el value de select és '0' executem la funció de mostrar totes les jornades*/
selectJornadaApi.addEventListener("change", (e) => {
    jornadaTravessaValor = +e.target.value;
    if(jornadaTravessaValor == 0) {
        mostrarTotesJornades();
    } else {
        mostrarJornades(jornadaTravessaValor);
    }
}, false);
//event on load que ens mostra per pantalla la jornada masculina generada al apartat travesses
window.addEventListener("load", recuperarLocalStorageMasc, false);
