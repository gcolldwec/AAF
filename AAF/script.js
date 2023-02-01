//variables
var equipCasa = '';
var equipVisitant = '';
var nombrePartit= '';
var partit = '';

primeraMasc = ["Almería", "Athletic Club", "Atlético de Madrid", "FC Barcelona", "Real Betis",
    "Cádiz", "Celta de Vigo", "Elche", "Espanyol", "Getafe", "Girona", "Real Mallorca", "Osasuna", 
    "Rayo Vallecano", "Real Madrid", "Real Sociedad", "Sevilla", "Valencia", "Valladolid", "Villarreal"];

segonaFem= ["Alavés", "Alhama", "Atlético Fem", "Barcelona Fem", "Tenerife",
    "Levante Fem"," Madrid CFF", "Betis Fem", "R. Madrid Fem", "R. Sociedad Fem", "Sevilla Fem",
    "Huelva Fem", "Valencia Fem", "Villarreal Fem"];

//elements
    const jornadaM = document.getElementById("jornadaM");
    const jornadaF= document.getElementById("jornadaF");
    const jornada1 = document.getElementById("botoJornada");

//FUNCIONS

//funció generar jornada
function generarJornada(){
    
    primeraMasc.forEach( function(valor, index) {
        console.log(valor);
        console.log(index);
        equipCasa = valor;
        nombrePartit = index + 1;
        if(index == 10){
            return false;
        } else {
            index = Math.floor(Math.random() * (primeraMasc.length - (index + 1)) );
            equipVisitant = primeraMasc[index];
            primeraMasc.splice(index, 1); 
            console.log(equipVisitant);
            partit = equipCasa + " VS " + equipVisitant;
            jornadaM.innerHTML += equipCasa + " VS " + equipVisitant + "<br>";
            guardarLocalStorage(nombrePartit, partit)
        }
    });

    let indexFem = 11;
    let equipCasaFem = '';
    let equipVisitantFem = '';
    segonaFem.forEach( function(valor, index) {
        
        console.log(valor);
        console.log(index);
        equipCasaFem = valor;

        if(index == 7){
            return false;
        } else {
            index = Math.floor(Math.random() * (segonaFem.length - (index + 1)) );
            equipVisitantFem = segonaFem[index];
            segonaFem.splice(index, 1); 
            console.log(equipVisitantFem);
            partit = equipCasaFem + " VS " + equipVisitantFem;
            jornadaF.innerHTML += equipCasaFem + " VS " + equipVisitantFem + "<br>";
            guardarLocalStorage(indexFem, partit);
            indexFem++;
        }
    });
}

function guardarLocalStorage(nombrePartit, partit){
    //creem un objecte amb dues keys(el nom de la paraula i el temps que tardem a endivinar-la)
    let jornada = {
        index: nombrePartit,
        match: partit
    }
   /**Primer comprovem que la paraula està o no dins el localstorage a través
    * del metode localStorage.getItem("aquí posem la variable que hem creat per a guardar partides")
    */
    if(localStorage.getItem(partit)){
    //si ja està dins l'agafem a través d'un JSON.parse( localStorage.getItem(nomParaula) i l'assignem a una variable
        let partitAntic = JSON.parse( localStorage.getItem(partit));
        /**entrem dins ella perque ara és un objecte(una vegada guardada era un string) a través del nom.key,
         * en aquest cas 'partidaAntiga.record' i mirem si el record anterior té més segons que el nou
        */
        if(partitAntic.index != nombrePartit){
            localStorage.setItem( "partit" + nombrePartit, JSON.stringify(jornada));   
        }

    } else {
        localStorage.setItem( "partit" + nombrePartit, JSON.stringify(jornada));   
    }   
}



//EVENTS
jornada1.addEventListener("click", generarJornada, { once: true });
