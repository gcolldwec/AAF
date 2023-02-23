

//variables
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

//elements
// const jornadaM = document.getElementById("jornadaM");
// const jornadaF= document.getElementById("jornadaF");
const jornada1 = document.getElementById("botoJornada");
const travessaHTML = document.getElementById("travessa");
const botoMostrarResultats = document.getElementById("mostrarResultats");
const selectJornada = document.getElementById("selectJornada");
const encerts = document.getElementById("encerts");
//FUNCIONS

//funció generar jornada
function generarJornada(){
    let jorn = 1;
    let eliminats = [];
    let genere = '';
    // while(jorn < 20) {
        
        for(let i = 0; i < primeraMasc.length; i++) {
            genere = 'masculi';
            nombrePartit++;
            equipCasa = primeraMasc[i];
            
            indexRandom = getMarcador((i + 1), primeraMasc.length);
            equipVisitant = primeraMasc[indexRandom];
            
            console.log(equipVisitant);
            console.log(primeraMasc);
            console.log(eliminats);
            // console.log( primeraMasc.splice(indexRandom, 1)); 
            // console.log(primeraMasc);
            partit = equipCasa + " VS " + equipVisitant;
            // jornadaM.innerHTML += equipCasa + " VS " + equipVisitant + "<br>";
            marcadorLocal  = getMarcador(0, 5);
            marcadorVistant =  getMarcador(0, 5); 
            result = equipCasa + " " + marcadorLocal + " - " + equipVisitant + " " + marcadorVistant;
            resultat = getResultat(marcadorLocal, marcadorVistant);
            quiniela = true;
            let partitJornada = [];
            var partita = '';
            var partit_registrat = false;

            for(let i = localStorage.length; i >  0; i--){
                partitJornada = JSON.parse(localStorage.getItem(i));
                partita = partitJornada[0].match;
                
                if(partita == partit){
                    partit_registrat = true;
                    nombrePartit--;
                    console.log(partita);
                    console.log(partit);
                    console.log("partit duplicat");
                    // if(eliminats.length > 7){
                    //     partit = equipVisitant + " VS " + equipCasa;
                    //     partit_registrat = false;
                    // }
                } 
            };
            if(partit_registrat){
                i--;  
            } else {
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
        }
    //     console.log("jornada " + jorn)
    //     jorn++;
    // }
    // let indexKey = '';
    // do {
    //     indexKey = key;
        
    //     for(let i = 0; i < primeraMasc.length; i++) {
    //         nombrePartit++;
    //         equipCasa = primeraMasc[i];
    //         for(let j = 0; j < primeraMasc.length; j++) {
    //             equipVisitant = primeraMasc[j];
    //             if(equipCasa != equipVisitant ) {
    //                 partit = equipCasa + " VS " + equipVisitant;
    //                 marcadorLocal  = getMarcador(0, 5);
    //                 marcadorVistant =  getMarcador(0, 5); 
    //                 result = equipCasa + " " + marcadorLocal + " - " + equipVisitant + " " + marcadorVistant;
    //                 resultat = getResultat(marcadorLocal, marcadorVistant);
    //                 quiniela = true;
    //                 let partitJornada1 = [];
    //                 var partita = '';
    //                 var partit_registrat = false;

    //                 for(let k = localStorage.length; k >  0; k--){
    //                     partitJornada1 = JSON.parse(localStorage.getItem(k));
    //                     partita = partitJornada1[0].match;
                        
    //                     if(partita == partit){
    //                         partit_registrat = true;
    //                         nombrePartit--;
    //                         console.log(partita);
    //                         console.log(partit);
    //                         console.log("partit duplicat");
    //                     } 
    //                 };
    //                 if(!partit_registrat){
    //                     primeraMasc.splice(i, 1);
    //                     primeraMasc.splice(j, 1);
    //                     indexKey++;
    //                     key = indexKey;
    //                     guardarLocalStorage(equipCasa, equipVisitant, key, partit, marcadorLocal, marcadorVistant, result, resultat, quiniela, jorn, genere);
    //                     travessa.push(partit);
    //                     console.log(i + " " + partit);
    //                     break;
    //                 }
    //                 if(key == 190) {
    //                     break;
    //                 }
    //             }
    //             if(key == 190) {
    //                 break;
    //             }
    //         } 
    //         if(key == 190) {
    //             break;
    //         }   
    //     }
    // }  while(key != 190) ;
    

    let indexFem = 10;
    let equipCasaFem = '';
    let equipVisitantFem = '';
    jorn = 1;

    let indexTravessa = 0;
    let indexValids = 0;
    // while(jorn < 14) {
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
            
            let partitJornada = [];
            var partita = '';
            var partit_registrat = false;

            for(let i = localStorage.length; i >  0; i--){
                
                partitJornada = JSON.parse(localStorage.getItem(i));
                if (partitJornada[0].genere == 'femeni') {
                    partita = partitJornada[0].match;
                
                    if(partita == partit){
                        partit_registrat = true;
                        indexFem--;
                        console.log(partita);
                        console.log(partit);
                        console.log("partit duplicat");
                        // if(eliminats.length > 4){
                        //     partit = equipVisitantFem + " VS " + equipCasaFem;
                        //     partit_registrat = false;
                        // }
                    } 
                }
            };
            if(partit_registrat){
                i--;
                
            } else {
                segonaFem.splice(indexRandom, 1);
                eliminats.push(equipVisitantFem);
                key = indexFem;
                guardarLocalStorage(equipCasaFem, equipVisitantFem, key, partit, marcadorLocal, marcadorVistant, result, resultat, quiniela, jorn, genere);
                if(i < 4) {
                    travessa.push(partit);
                }
                
            }    
        }
    //     console.log("jornada " + jorn)
    //     jorn++;
    // }
    mostrarTravessaHtml();
}
function mostrarTravessa() {
   
    
   
    let itr = 0;
    // travessa.innerHTML += "<h2 class='text-center'>Jornada " + jornadaTravessa + "<h2><br>";
    // for(let i = 0; i < localStorage.length; i++){
    //     itr++;
    //     partitJornada = JSON.parse(localStorage.getItem(i + 1));
    //     // if(partitJornada[0].travessa == true && partitJornada[0].jornada == jornadaTravessa) {
    //     if(partitJornada[0].travessa == true) {
    //         var partitTravessa = partitJornada[0].match;
    //         var partit_travessa = "<div class='row partit'><div class='col-1 border text-center index'>" + (itr) + "</div><div class='col-6 border text-center'>" + partitTravessa + "</div>
    //         + "<div class='col-1 border aposta' id='local'><input type='checkbox' id='checkbox'/><label>1</label></div><div class='col-1 border aposta' id='empat'>X</div><div class='col-1 border aposta' id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + (i + 1) +"'></div></div>"
    //         travessaHTML.innerHTML += partit_travessa;
       
    //     }
    // }
    travessaHTML.innerHTML = "<h2 class='text-center'>Jornada 1</h2><br>" 
    let partitJornada = [];
    // let jornadaTravessa = jornadaTravessaValor; 

    // travessa.innerHTML += "<h2 class='text-center'>Jornada " + jornadaTravessa + "<h2><br>";
    for(let i = 0; i < travessa.length; i++){
        itr++;
        partitJornada = JSON.parse(localStorage.getItem(i + 1));
       
            var partitTravessa = partitJornada[0].match;
            var partit_travessa = "<div class='row partit "+ itr +"'><div class='col-1 border text-center index'>" + (i + 1) 
            + "</div><div class='col-6 border text-center'>" + partitTravessa 
            + "</div><div class='col-1 border bet local' id='local'>1</div><input type='checkbox' id='checkbox'/><label>1</label><div class='col-1 border bet empat' id='empat'>X</div><div class='col-1 border bet visitant' onclick='classePare()' id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + (i + 1) +"'></div></div>"
            travessaHTML.innerHTML += partit_travessa;
       
        
    }
}
let itr = 0;
let aposta_valor = '';
function mostrarTravessaHtml() {
   
    travessaHTML.innerHTML = "<h2 class='text-center'>Jornada 1</h2><br>" 
    let partitJornada = [];
    
    for(let i = 0; i < travessa.length; i++){
        itr++;
        partitJornada = JSON.parse(localStorage.getItem(i + 1));
       
        var partitTravessa = partitJornada[0].match;
        var partit_travessa = "<div class='row partit "+ itr +"'><div class='col-1 border text-center index'>" + (i + 1) 
        + "</div><div class='col-6 border text-center'>" + partitTravessa 
        + "</div><div class='col-1 border bet local' id='local'>1</div><div class='col-1 border bet empat' id='empat'>X</div>" + 
        "<div class='col-1 border bet visitant' id='visitant'>2</div><div class='col-1' id='buit'></div><div class='col-1 border resultat' id='resultat" + (i + 1) +"'></div></div>"
        travessaHTML.innerHTML += partit_travessa; 
    }
}


const contenidor = document.querySelector('#travessa');
const apostes = document.querySelectorAll('.partit .bet');
const index = document.getElementById('index');
const contador = document.getElementById('contador');
const row = document.querySelector('.partit .bet');



ompleTravessa();
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


function ompleTravessa() {
    const apostaSeleccionada = JSON.parse(localStorage.getItem('apostaSeleccionada'));
    console.log(apostaSeleccionada);
    if(apostaSeleccionada !== null && apostaSeleccionada.length > 0) {
        apostes.forEach((bet, index) => {
            if(apostaSeleccionada.indexOf(index) > -1) {
                bet.classList.add('seleccionada');
            }
        });
    }
}   

//Funció controlar apostes length == 14
function controlApostesNumero(contador) {
    if(contador == 14) {
        document.querySelector('#mostrarResultats').disabled = false;
    } else {
        document.querySelector('#mostrarResultats').disabled = true;
    }
}


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
    };
       
}

function guardarLocalStorage(equipCasa, equipVisitant, nombrePartit, partit, marcadorLocal, marcadorVistant, result, indexResultat, quiniela, nombreJornada, genereDivisio){
    //creem un objecte amb dues keys(el nom de la paraula i el temps que tardem a endivinar-la)
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
   /**
    * del metode localStorage.getItem("aquí posem la variable que hem creat per a guardar jornades")
    */
    let partitJornada = [];
    var partita = '';
    var partit_registrat = false;

    // for(let i = localStorage.length; i >  0; i--){
    //     partitJornada = JSON.parse(localStorage.getItem(i));
    //     partita = partitJornada[0].match;
        
    //     if(partita == partit){
    //         partit_registrat = true;
    //         console.log(partita);
    //         console.log(partit);
    //         console.log("partit duplicat");
    //     } 
    // };

    // if(!partit_registrat) {
    //     localStorage.setItem( nombrePartit, JSON.stringify(jornada));   
    // }   
    // if(localStorage.getItem(i)){
    // //si ja està dins l'agafem a través d'un JSON.parse( localStorage.getItem(nomParaula) i l'assignem a una variable
    //     let partitAntic = JSON.parse( localStorage.getItem(partit));
    //     /**entrem dins ella perque ara és un objecte(una vegada guardada era un string) a través del nom.key,
    //      * en aquest cas 'partidaAntiga.record' i mirem si el record anterior té més segons que el nou
    //     */
    //     if(partitAntic.index != nombrePartit){
    //         localStorage.setItem( nombrePartit, JSON.stringify(jornada));   
    //     }

    
        localStorage.setItem( nombrePartit, JSON.stringify(jornada));   
       
}

function getMarcador(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getResultat (marcadorLocal, marcadorVistant){
    if(marcadorLocal > marcadorVistant) {
        return 1;
    } else if(marcadorLocal < marcadorVistant) {
        return 2;
    } else {
        return 'X';
    }
}

function desordenarArray(array){
    var desordenar = array.sort(function(a,b) {return (Math.random()-0.5)});
    return [...desordenar];
}


    // function get_parent1 (node, selector, father) {
    //     father = node.closest(selector).getAttribute('class').substring(4);
    //     console.log(node.closest(selector).getAttribute('class'));
    // }

//EVENTS
jornada1.addEventListener("click", generarJornada, { once: true });
botoMostrarResultats.addEventListener("click", mostrarResultat, { once: true });
selectJornada.addEventListener("change", (e) => {
    jornadaTravessaValor = +e.target.value;
    mostrarTravessa(jornadaTravessaValor)
}, false);
contenidor.addEventListener('click', (e) => {
    if(e.target.classList.contains('local')) {
        var empat = e.target.nextSibling;
        var visitant = empat.nextSibling;
    
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
    /*utilizamos toggle para alternar el estado del elemento*/ 
});


ferAposta();