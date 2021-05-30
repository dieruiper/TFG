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
		pais: "ES",
		ritmo:0,
		tiro:0,
		pase:0,
		regate:0,
		defensa:0,
		fisico:0,
		profesor:profesor
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
                        let nombreImportadoEntero = cells[1].substring(1,cells[1].length-2)+" "+cells[0].substring(1);
                        let nombreImportadoCortado = nombreImportadoEntero.split(" ");
                        let nombreImportado =  nombreImportadoCortado[0]+" "+ nombreImportadoCortado[1].substring(0,3) +" "+ nombreImportadoCortado[2].substring(0,3);                          
                        let llamarFuncion = addImportados(nombreImportado)
                    }
                } /*
  var dvCSV = document.getElementById("dvCSV"); 
  dvCSV.innerHTML = ""; 
  dvCSV.appendChild(table); */
            } 
   reader.readAsText(fileUpload.files[0],"ISO-8859-1"); 
    } else { 
        alert("This browser does not support HTML5."); 
    } 
} else { 
    alert("Please upload a valid CSV file."); 
  }
  console.log("Importado con éxito");
} 

</script>
<main>
	{#await profesores}
		Loading profesores...
	{:then profesores_}

	<Input type='file' id='fileUpload'/><Button color='primary' on:click="{Upload}">Confirmar</Button>
	{/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>