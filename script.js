
//Variables
var equipCasa = '';
var equipVisitant = '';
let nombrePartit= 0;
var partit = '';
let travessa = [];
let marcadorLocal  = '';
let marcadorVistant =  ''; 
let result = '';
let resultat = '';
let marcadorLocalFem  = '';
let marcadorVistantFem =  ''; 
let resultFem = '';
let resultatFem = '';
let quiniela = false;
let indexRandom = '';
let key = '';
let correcte = '';
let itr = 0;
let aposta_valor = '';
let escuts = [];

//Elements
const jornada1 = document.getElementById("botoJornada");
const travessaHTML = document.getElementById("travessa");
const botoMostrarResultats = document.getElementById("mostrarResultats");
const botoMostrarResultatsApi = document.getElementById("mostrarResultatsApi");
const selectJornada = document.getElementById("selectJornada");
const encerts = document.getElementById("encerts");
const contenidor = document.querySelector('#travessa');
const apostes = document.querySelectorAll('.partit .bet');
const index = document.getElementById('index');
const contador = document.getElementById('contador');
const row = document.querySelector('.partit .bet');

//FUNCIONS

//petició api football per mostrar travessa
//funció per mostrar les jornades per separat de l'api, la funció té com a parametre el nombre de la jornada
//A l'apartat d'events s'especifica com es tradueix el select jornada  al parametre 'j'.
//primer netegem el local storage per a poder posar la nova jornada i els seus respectius partits.
//després capturem i mostrem per pantalla els partits masculins de la jorna escollida
//després capturem els primers 4 partits de la mateixa jornada femenina i els mostrem amb un format de travessa
function mostrarTravessa(j) {
    
    localStorage.clear();
    correcte = 0;
    contador.innerText = '';
    botoMostrarResultatsApi.innerHTML = '';
    encerts.innerHTML = '';
    var settings = {
        "url": "https://v3.football.api-sports.io/fixtures?league=140&season=2022",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "x-rapidapi-key": "c15f3b538bea5029bfa15f3e2354fe05",
          "x-rapidapi-host": "v3.football.api-sports.io"
        },
    };
    var settings1 = {
        "url": "https://v3.football.api-sports.io/fixtures?league=142&season=2022",
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
        travessaHTML.innerHTML = "<h2 class='text-center'>Jornada " + j + "</h2><br>" 
        results.forEach(function(element) {
            let round = element.league.round;
            let jornada = round.substring(16);
            if(j == jornada) {
                let home = element.teams.home.name;
                let score = element.score.fulltime.home + " - " + element.score.fulltime.away;
                let marcadorLocal = element.score.fulltime.home;
                let marcadorVistant = element.score.fulltime.away;
                let away = element.teams.away.name;
                let match = home + " - " +  away;
                var partit_travessa = "<div class='row partit " + index +"'><div class='col-1 border text-center index'>" + index + "</div><div class='col-6 border text-center'>" + match 
                + "</div><div class='col-1 border bet local' id='local'>1</div><div class='col-1 border bet empat' id='empat'>X</div><div class='col-1 border bet visitant'  id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + index +"'></div></div>"
                travessaHTML.innerHTML += partit_travessa;
                let resultat = getResultat(marcadorLocal, marcadorVistant);
                guardarResultatApi(index, resultat);
                index++;
            }
        });
    });
    $.ajax(settings1).done(function (response) {
        var BreakException = {};
        console.log(response);
        let results = response.response;
        try {
            results.forEach(function(element) {
                let round = element.league.round;
                let jornada = round.substring(16);
                if(j == jornada) {
                    let home = element.teams.home.name;
                    let score = element.score.fulltime.home + " - " + element.score.fulltime.away;
                    let marcadorLocal = element.score.fulltime.home;
                    let marcadorVistant = element.score.fulltime.away;
                    let away = element.teams.away.name;
                    let match = home + " - " +  away;
                    var partit_travessa = "<div class='row partit " + index +"'><div class='col-1 border text-center index'>" + index + "</div><div class='col-6 border text-center'>" + match 
                    + "</div><div class='col-1 border bet local' id='local'>1</div><div class='col-1 border bet empat' id='empat'>X</div><div class='col-1 border bet visitant'  id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + index +"'></div></div>"
                    travessaHTML.innerHTML += partit_travessa;
                    let resultat = getResultat(marcadorLocal, marcadorVistant);
                    guardarResultatApi(index, resultat);
                    index++;
                    if (index === 15) throw BreakException;
                }
            });
        } catch(e) {
            if (e !== BreakException) throw e;
        }
    });
    botoMostrarResultats.innerHTML = '';
    
    var boto = "<button id='mostrarResultatsGenerats'>Resultats</button>";
    botoMostrarResultatsApi.innerHTML += boto;
    document.querySelector('#mostrarResultatsGenerats').disabled = true;
}

/*funció on es genera la jornada utilitzant un for recorre l'array d'equips masculins agafa el primer i l'enfronta contra
un visitant què és escollit utilitzant una funció que conté un math random
creem un marcador tant pel local com pel visitant amb un métode que torna a autilitzar un math.random de 0 a 5 gols possibles
creem un resultat a partir d'una altre funció que ho determina segons els marcadors creats anteriorment
eliminem l'equp visitant de l'array amb 'splice' per a que no ens pugui tornar a sortir
Guardem tots aquests paametres al localstorage atraves d'un altre mètode que ja ha creat un objecte
i seguim el cicle 'for' fins que ens hagi creat 10 partits.
Finalment feim el mateix procès amb l'array femení amb la diferència que només els 4 primers partits tindran 
un parametre travessa=true que farà que descarti els 3 últims per a entrar a la travessa.
Acabem mostrant la travessa amb un altre mètode*/

function generarJornada(){
    
    nombrePartit = 0;
    localStorage.clear();
    correcte = 0;
    botoMostrarResultatsApi.innerHTML = '';
    contador.innerText = 0;
    encerts.innerText = '';
    let jorn = 1;
    let eliminats = [];
    let genere = '';
    
    for(let i = 0; i < primeraMasc.length; i++) {
        genere = 'masculi';
        nombrePartit++;
        equipCasa = primeraMasc[i];
        
        indexRandom = getMarcador((i + 1), primeraMasc.length);
        equipVisitant = primeraMasc[indexRandom];
        
        console.log(equipVisitant);
        console.log(primeraMasc);
        console.log(eliminats);
        
        partit = equipCasa + " VS " + equipVisitant;
        marcadorLocal  = getMarcador(0, 5);
        marcadorVistant =  getMarcador(0, 5); 
        result = equipCasa + " " + marcadorLocal + " - " + equipVisitant + " " + marcadorVistant;
        resultat = getResultat(marcadorLocal, marcadorVistant);
        quiniela = true;
        
        primeraMasc.splice(indexRandom, 1);
        eliminats.push(equipVisitant);
        key = nombrePartit;
        guardarLocalStorage(equipCasa, equipVisitant, key, partit, marcadorLocal, marcadorVistant, result, resultat, quiniela, jorn, genere);
        travessa.push(partit);
        console.log(i + " " + partit);
        if(i == 9){
            console.log(primeraMasc);
            eliminats.forEach(function(valor){
                primeraMasc.push(valor);
            });
            while(eliminats.length > 0){
                eliminats.pop();
            };
            console.log(primeraMasc);
            i = 0;
            break;
        }    
    }

    let indexFem = 10;
    let equipCasaFem = '';
    let equipVisitantFem = '';
   
    eliminats = [];
    for(let i = 0; i < segonaFem.length; i++) {
        genere = 'femeni';
        equipCasaFem = segonaFem[i];
        indexFem++;
        indexRandom = getMarcador((i + 1), segonaFem.length);
        equipVisitantFem = segonaFem[indexRandom];
        
        console.log(equipVisitant);
        console.log(primeraMasc);
        console.log(eliminats);
        
        partit = equipCasaFem + " VS " + equipVisitantFem;
        marcadorLocal  = getMarcador(0, 5);
        marcadorVistant =  getMarcador(0, 5); 
        result = equipCasaFem + " " + marcadorLocal + " - " + equipVisitantFem + " " + marcadorVistant;
        resultat = getResultat(marcadorLocal, marcadorVistant);
        
        segonaFem.splice(indexRandom, 1);
        eliminats.push(equipVisitantFem);
        key = indexFem;
        if(i < 4) {
            travessa.push(partit);   
        } else {
            quiniela = false;
        }
        guardarLocalStorage(equipCasaFem, equipVisitantFem, key, partit, marcadorLocal, marcadorVistant, result, resultat, quiniela, jorn, genere);
        if(i == 6){
            eliminats.forEach(function(valor){
                segonaFem.push(valor);
            });
            while(eliminats.length > 0){
                eliminats.pop();
            };
            console.log(segonaFem);
            break;
        }    
    }
    console.log(eliminats);  
    mostrarTravessaHtml();
}

/**funció que recupera els partits guardats al localstorage amb el mètode anterior i els va pintant amb format travessa */
function mostrarTravessaHtml() {
    itr = 0;
    travessaHTML.innerHTML = "<h2 class='text-center'>Jornada 1</h2><br>" 
    let partitJornada = [];
    
    for(let i = 0; i < travessa.length; i++){
        itr++;
        partitJornada = JSON.parse(localStorage.getItem(i + 1));
        if(partitJornada[0].travessa == true) {
            var partitTravessa = partitJornada[0].match;
            var partit_travessa = "<div class='row partit "+ itr +"'><div class='col-1 border text-center index'>" + (i + 1) 
            + "</div><div class='col-6 border text-center'>" + partitTravessa 
            + "</div><div class='col-1 border bet local' id='local'>1</div><div class='col-1 border bet empat' id='empat'>X</div>" + 
            "<div class='col-1 border bet visitant' id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + (i + 1) +"'></div></div>"
            travessaHTML.innerHTML += partit_travessa; 
        } else {
            console.log('localstorage buit');
        }
    }   
    var boto = "<button id='mostrarResultatsGenerats'>Resultats</button>";
    botoMostrarResultats.innerHTML += boto;
    document.querySelector('#mostrarResultatsGenerats').disabled = true;
}

/*funció per a obtenir els partits de la travessa que previament hem generat al premer el botó generar jornada,
i aquesta jornada s'ha inserit al localstorage per nombre de partit de la travessa.
Executem un cicle for amb el limit que sigui el 'length' del localstorage i anem entrant als partits que tenguin el paràmetre 'travessa=true',
capturem l'equip local i visitant i els mostrem per pantalla amb 'innerHtml' adaptat al format travessa
*/
function recuperarLocalStorageTravessa(){
    itr = 0;
    let partitJornada = [];
    
        
    for(i = 0; i < localStorage.length; i++){
        
            itr++;
            partitJornada = JSON.parse(localStorage.getItem(i + 1));
            if(partitJornada[0].travessa == true) {
                var partitTravessa = partitJornada[0].match;
                var partit_travessa = "<div class='row partit "+ itr +"'><div class='col-1 border text-center index'>" + (i + 1) 
                + "</div><div class='col-6 border text-center'>" + partitTravessa 
                + "</div><div class='col-1 border bet local' id='local'>1</div><div class='col-1 border bet empat' id='empat'>X</div>" + 
                "<div class='col-1 border bet visitant' id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + (i + 1) +"'></div></div>"
                travessaHTML.innerHTML += partit_travessa; 
            } else {
                console.log('localstorage buit');
            }
        
    } 
    var boto = "<button id='mostrarResultatsGenerats'>Resultats</button>";
    botoMostrarResultats.innerHTML += boto;
    document.querySelector('#mostrarResultatsGenerats').disabled = true; 
}

ompleTravessa();
//funció amb dos parametres que concorden amb l'objecte creat i que després es guarda al localstorage
/** aquí es fa un query selector amb la fila i el resultat del partit de la travessa generada
 * creem un comptador per a contar que s'han fet les 14 apostes
*/
function ferAposta(keyLS, aposta_valor){
    
    const aposta = document.querySelectorAll('.partit .bet.seleccionada');
   
    let apostaObj = {
        partit : keyLS,
        travessa: aposta_valor
    }
    
    localStorage.setItem(keyLS, JSON.stringify(apostaObj));
    const contadorApostaSeleccionada = aposta.length;
    
    contador.innerText = contadorApostaSeleccionada;
    console.log(contador);
    controlApostesNumero(contadorApostaSeleccionada);
}

//funció que amb un foreach recorre totes les apostes i li afegeix la classe selecccionada a cada una
function ompleTravessa() {
    const apostaSeleccionada = JSON.parse(localStorage.getItem('apostaSeleccionada'));

    if(apostaSeleccionada !== null && apostaSeleccionada.length > 0) {
        apostes.forEach((bet, index) => {
            if(apostaSeleccionada.indexOf(index) > -1) {
                bet.classList.add('seleccionada');
            }
        });
    }
}   

//Funció controlar si apostes.length == 14 s'habilita el boto per a comprovar el resultat de l'aposta
function controlApostesNumero(contador) {
    if(contador === 14) {
        document.querySelector('#mostrarResultatsGenerats').disabled = false;
        document.querySelector('#mostrarResultatsApi').disabled = false;
    }
}

/*en aquesta funció recorrem el localstorage i ens quedem amb aquells partits guardats amb la key partit(nº) des de l'api on sabrem el resultat real,
i amb les apostes que hem guardat al localstorage amb la key (nº) capturem el resultat real del partit i el de l'aposta
i els comparem, si el resultat coincidex a l'element html i
afegim la classe correcte i la mostrem per pantalla, sino li afegim la classe error i la mostrem per pantalla*/

function mostrarResultatApi() {
    let partitJornada = [];
    for(let i = 1; i < 15 ; i++) {
        partitJornada = JSON.parse(localStorage.getItem(i));
        getAposta = JSON.parse(localStorage.getItem('partit ' + i));
        
        console.log(getAposta);
        document.getElementById("resultat" + i).innerHTML += partitJornada[0].marcador;
        resultat_real = partitJornada[0].marcador;
        resultat_aposta = getAposta.travessa;
        if(resultat_real == resultat_aposta) {
            document.getElementById("resultat" + i).classList.toggle('correcte');
            correcte++;
            encerts.innerHTML = "<h3 class='text-center mt-5'>Ha encertat " + correcte + " partits.</h3>"
        } else {
            document.getElementById("resultat" + i).classList.toggle('error');
        }
    }
}

/*el mateix que anteriormenr però en aquest cas comparem l'aposta que hem fet amb el resultat generat dels partis de la jornada generada*/
function mostrarResultat(){
    let partitJornada = [];
    for(let i = 1; i < travessa.length +1 ; i++){
        partitJornada = JSON.parse(localStorage.getItem(i));
        getAposta = JSON.parse(localStorage.getItem('partit ' + i));
        console.log(partitJornada);
        if(partitJornada[0].travessa == true){
            console.log(partitJornada[0].resultat);
            document.getElementById("resultat" + i).innerHTML += partitJornada[0].resultat;
            resultat_real = partitJornada[0].resultat;
            resultat_aposta = getAposta.travessa;
            if(resultat_real == resultat_aposta) {
                document.getElementById("resultat" + i).classList.toggle('correcte');
                correcte++;
                encerts.innerHTML = "<h3 class='text-center mt-5'>Ha encertat " + correcte + " partits.</h3>"
            } else {
                document.getElementById("resultat" + i).classList.toggle('error');
            }
        }
    }
    document.querySelector('#mostrarResultatsGenerats').disabled = true;
}

//funció que guarda al localstorage el resultat del partit de la jornada que hem escollit amb el select, aquesta informació ens la dona l'api
function guardarResultatApi(index, resultat) {
    let jornada = [];
    let encontre = {
        partit: index,
        marcador: resultat
    }
    jornada.push(encontre);
    localStorage.setItem( index, JSON.stringify(jornada));   
}

//funció on es crea un mega objecte amb els paràmetres que volem guardar per a després fer servir-lod
function guardarLocalStorage(equipCasa, equipVisitant, nombrePartit, partit, marcadorLocal, marcadorVistant, result, indexResultat, quiniela, nombreJornada, genereDivisio){
  
    let jornada = [];
   
    let encontre = {
        index: nombrePartit,
        equipCasa: equipCasa,
        equipVisitant:equipVisitant,
        match: partit,
        marcadorLocal: marcadorLocal,
        marcadorVistant: marcadorVistant,
        matchResultat: result,
        resultat: indexResultat,
        travessa: quiniela,
        jornada: nombreJornada,
        divisio: genereDivisio
    };

    jornada.push(encontre);
  
    localStorage.setItem( nombrePartit, JSON.stringify(jornada));   
       
}

//funció que ens indica el nombre de gols que guardar als paràmetres marcador local i el visitant del objecte partit
function getMarcador(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
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

//EVENTS
jornada1.addEventListener("click", generarJornada, false);
botoMostrarResultats.addEventListener("click", mostrarResultat, false);
botoMostrarResultatsApi.addEventListener("click", mostrarResultatApi, {once:true});
//event on load que ens mostra per pantalla la travessa generada 
window.addEventListener("load", recuperarLocalStorageTravessa, false);

/*event listener que s'executa al canviar el 'select' de jornada capturant el nombre de la jornada i executant
 la funció de mostrar jornada  a la qual volem apostar segons el 'value' del select
 */
selectJornada.addEventListener("change", (e) => {
    jornadaTravessaValor = +e.target.value;
    mostrarTravessa(jornadaTravessaValor)
}, false);

//event que ens permet marcar 1 de les 3 opcions posibles de l'aposta (1,X,2)
//Per això juguem amb les files de la travessa i anem jugant amb cada possible aposta
//dins una fila capturem el primer (1) i canviem la classe a seleccionat
//capturem els restants a partir del primer amb el mètode 'nextSibling' i deim que si seleccionem alguna opció les dues 
//altres passan a estar deseleccionades.
//amb el 'remove' llevem la classe seleccionada i amb el 'toggle' li afegim la classe
//així sempre ens assegurem que només es marca una de les 3 opcions possibles
contenidor.addEventListener('click', (e) => {
    if(e.target.classList.contains('local')) {
        var empat = e.target.nextSibling;
        var visitant = empat.nextSibling;
        /*utilizem toggle para alternar l'estat de l'element*/ 
        empat.classList.remove('seleccionada');
        visitant.classList.remove('seleccionada');
        e.target.classList.toggle('seleccionada');
        
        aposta_valor = 1;
    
        keyLS = e.target.closest('.partit').getAttribute('class').substring(4);
        
        console.log(keyLS);
       
    } else if(e.target.classList.contains('empat')) {
        var local = e.target.previousSibling;
        var visitant = e.target.nextSibling;
    
        local.classList.remove('seleccionada');
        visitant.classList.remove('seleccionada');
        e.target.classList.toggle('seleccionada');

        aposta_valor = 'X';

        keyLS = e.target.closest('.partit').getAttribute('class').substring(4);

    } else {
        var empat = e.target.previousSibling;
        var local = empat.previousSibling;
    
        local.classList.remove('seleccionada');
        empat.classList.remove('seleccionada');
        e.target.classList.toggle('seleccionada');

        aposta_valor = 2;

        keyLS = e.target.closest('.partit').getAttribute('class').substring(4);
    }
            
    ferAposta(keyLS, aposta_valor);
});

