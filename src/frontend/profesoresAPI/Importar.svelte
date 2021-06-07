<script>
    import axios from "axios";
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import {
	  profesores,
	  sortedProfesores,
	  income,
	  expenses,
	  balance,
      user
	} from "../stores";
    import { userAlum } from "../storesAlum";
    async function addImportados(nombreImportado) {
        let nombre = nombreImportado;
		const response2 = await axios("/api/auth/user");
		let profesor = response2.data.user.username;
		const response = await axios.post("/api/profesores", {
            nombre: nombreImportado,
			contraseña: Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
			trimestre1: 0,
			trimestre2: 0,
			trimestre3: 0,
        });
		$profesores = [response.data, ...$profesores];
		let input = 0;
		let password = response.data.contraseña;        
        var signupvar = signup(nombreImportado,password,profesor);
        let nombreCartaSplit = nombre.split(" ");
        let nombreCarta = nombreCartaSplit[0]
		const response3 = await axios.post("/api/alumnos/", {
		nombre:nombre,
		nombreCarta:nombreCarta,
		valoracion: 0,
		posicion: "DC",
		pais: "Spain",
        equipo: "https://brandlogos.net/wp-content/uploads/2012/11/real-betis-logo-vector.png",
        squad: "https://img-premium.flaticon.com/png/512/1466/1466114.png?token=exp=1623057007~hmac=f3eb2b926191724ec34f394ca4eab863",
		ritmo:0,
		tiro:0,
		pase:0,
		regate:0,
		defensa:0,
		fisico:0,
		profesor:profesor,
        imagen: imagen
	  });
        //push("/alumnos/"+nombre);
      
	  
	}
    async function signup(nombre,password,profesor){
        const { data } = await axios.post("/api/authAlum/sign-up", {
          nombre,
          password,
          profesor
        });
        $userAlum = data.userAlum;
    }
    

async function Upload() { 
        var fileUpload = document.getElementById("fileUpload"); 
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/; 
        if (regex.test(fileUpload.value.toLowerCase())) { 
            if (typeof (FileReader) != "undefined") { 
                var reader = new FileReader(); 
                reader.onload = function (e) { 
                var table = document.createElement("table"); 
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) { 
                    var row = table.insertRow(-1); 
                    var cells = rows[i].split(","); 
                    for (var j = 0; j < cells.length; j++) { 
                        var cell = row.insertCell(-1); 
                        cell.innerHTML = cells[j]; 
                    } 
                    if(i>0 && cells[0] !== ""){
                        let nombreImportado = cells[1].substring(1,cells[1].length-2)+" "+cells[0].substring(1);                         
                        let llamarFuncion = addImportados(nombreImportado)
                    }
                } /*
  var dvCSV = document.getElementById("dvCSV"); 
  dvCSV.innerHTML = ""; 
  dvCSV.appendChild(table); */
            } 
   reader.readAsText(fileUpload.files[0],"ISO-8859-1"); 
    } else { 
        alert("Lo sentimos. Este buscador no soporta HTML5.\n Pruebe con Google Chrome"); 
    } 
} else { 
    alert("Por favor suba un fichero CSV. \n Asegurese de no tener espacios el nombre del fichero"); 
  }
  alert("Importado con éxito");
} 

let isActive = false;
    async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    $profesores = [];
    push("/");
  }

</script>
<main>
	{#await profesores}
		Loading profesores...
	{:then profesores_}
    <nav class="barraSup">
        <div class="contenedor">
          <div class="navbar-brand">
            <span class="title">Importar alumnos</span>
          <span
            class="navbar-burger burger"
            class:is-active={isActive}
            on:click={() => (isActive = !isActive)}
            aria-expanded="false"
            aria-label="menu">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </span>
          </div>
          <Button  color="light" on:click="{pop}">Atrás</Button><Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
        </div>
        </nav>
        <div class="importar">
            <div class="imp">
            <h5>Importar fichero CSV con alumnos</h5>
            <Input  type='file' id='fileUpload'/>
        </div>
            <p><Button color='primary' on:click="{Upload}">Confirmar</Button>  <Button  color="light" on:click="{pop}">Atrás</Button>
            </p>
            </div> 
        <div class="texto">
            <h3> Cómo exportar alumnos en el archivo CSV desde Séneca:</h3>
            <p></p>
            <ol>
                <h6><li>Acceder al apartado alumnado ➔ Seguimiento académico ➔ Mis alumnos y alumnas
                    <p></p>
                    <p><img class="center" src="images/columnaAlumnos.jpeg" alt="columna" /></p>
                </li></h6>
                <p></p>
                <h6><li>
                    Rellenar datos de los alumnos que se quieren obtener
                    <p></p>
                    <p><img  src="images/ElegirCurso.jpeg" alt="curso" width="100%"/></p>
                </li></h6>
                <p></p>
                <h6><li>
                    Hacer clic en el recuadro marcado en rojo y posteriormente seleccionar Fichero CSV
                    <p></p>
                    <p><img src="images/FicheroCSVExp.jpeg" alt="exporta" width="100%"/></p>
                </li></h6>
                <p></p>
                <h6><li>
                    Descargar el fichero e importarlo 
                </li></h6>
            </ol>
        </div>
        
	
	{/await}
  
</main>
<style>
      .contenedor{
	margin-left: 5vw;
	margin-right: 5vw;
	display: grid;
	grid-gap: 1vh;
	grid-template-rows: auto;
	grid-template-columns: auto 100px 120px;
}
.barraSup{
		background-color:#007bff;
		padding-top: 2vh;
		padding-bottom: 2vh;
		color:white;
	}
.importar{
    display: flex;
    flex-direction: column;
   justify-content: center;
   align-items: center;
   padding:20px;
   margin-left: 25%;
   margin-right: 25%;
   margin-top: 50px;
   background: rgb(211, 231, 240);
  border-radius: 10px;
  box-shadow: 0 7px 10px rgba(62, 9, 11, 0.3);
}
.imp{
    margin-bottom: 20px;
    width: 500px;
    text-align: center;
}
.texto{
    padding:20px;
   margin-left: 10%;
   margin-right: 10%;
   margin-top: 50px;
   background: rgb(211, 231, 240);
  border-radius: 10px;
  box-shadow: 0 7px 10px rgba(62, 9, 11, 0.3);
}
.center{
    display: block;
    margin-left: auto;
  margin-right: auto;
}
</style>