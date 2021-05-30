<script>
	
	import axios from "axios";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import Icon from "sveltestrap/src/Icon.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import Profesor from "../components/Profesor.svelte";
	import SummaryCard from "../components/SummaryCard.svelte";
	import Loading from "../components/Loading.svelte";
	import {pop} from "svelte-spa-router";
	import { onMount } from "svelte";
	import {
	  profesores,
	  sortedProfesores,
	  income,
	  expenses,
	  balance
	} from "../stores";
	let visible = false;
	let nombre;
    let errorMessage;
	import { userAlum } from "../storesAlum";
	import { user} from "../stores";
	let input = 0;
	let profesor ;
	let password;
	let query;
	let nuevoProfesor = {
			nombre: "",
			contraseña: Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
			trimestre1: 0,
			trimestre2: 0,
			trimestre3: 0,
		};
	
	let inicializaAlumno = {
		nombre:"",
		nombreCarta:"",
		valoracion: 0,
		posicion: "",
		pais: "",
		ritmo:0,
		tiro:0,
		pase:0,
		regate:0,
		defensa:0,
		fisico:0,
		profesor:""

	}

onMount(getTodo);

async function getTodo (){
	console.log("Obteniendo...");
	const {data} = await axios("/api/profesores");
	$profesores = data;
}

async function addProfesor(nombre,trimestre1,trimestre2,trimestre3) {
		console.log("Añadiendo...");
		const response2 = await axios("/api/auth/user");
		profesor = response2.data.user.username;
		const response = await axios.post("/api/profesores", nuevoProfesor);
		$profesores = [response.data, ...$profesores];
		input = 0;
		password = nuevoProfesor.contraseña; 
		console.log(password)
		try {
        const { data } = await axios.post("/api/authAlum/sign-up", {
          nombre,
          password,
          profesor
        });
        $userAlum = data.userAlum;
		let nombreCartaSplit = nombre.split(" ");
        let nombreCarta = nombreCartaSplit[0]
		const response3 = await axios.post("/api/alumnos/", {
		nombre:nombre,
		nombreCarta:nombreCartaSplit,
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
      } catch (error) {
          errorMessage = "Username is already taken";
		  console.log("error")
        
      }
	  

	  nuevoProfesor = {
		nombre: "",
			contraseña: Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
			trimestre1: 0,
			trimestre2: 0,
			trimestre3: 0,
	  }
	}
async function removeProfesor(id) {
		console.log("Borrando...");
	  	const response = await axios.delete("/api/profesores/" + id);
	  	if (response.data.id === id) {
			$profesores = $profesores.filter(t => t._id !== id);
	  	}
	}

async function viewPassword(nombre)
{
  let passwordInput = document.getElementById(nombre);

  let passStatus = document.getElementById(nombre);

  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';
    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
}


  </script>

<main>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
	{#await profesores}
		Loading profesores...
	{:then profesores_}
	<Button color= "primary" href="#/profesores/importar">Importar</Button>
	<Table bordered>
		<thead>
			
			<tr>
				<th>Nombre</th>
				<th>Contraseña</th>
				<th>Trimestre 1</th>
				<th>Trimestre 2</th>
				<th>Trimestre 3</th>
				<th><Button outline href="#/profesoresAPI/actualizar" color="primary">Modificar Datos</Button></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ej. Leopoldo Leo Leo" required bind:value = "{nuevoProfesor.nombre}" /></td>
				<td>Generada aleatoriamente</td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoProfesor.trimestre1}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoProfesor.trimestre2}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoProfesor.trimestre3}" /></td>
				<td><Button outline color= "primary" on:click={addProfesor(nuevoProfesor.nombre,nuevoProfesor.trimestre1,nuevoProfesor.trimestre2,nuevoProfesor.trimestre3)}>Insertar</Button></td>
			</tr>
			{#each $profesores as profesores (profesores._id)}
			<tr>
				<td>{profesores.nombre}</td>
				<td><input readonly bind:value = "{profesores.contraseña}" type="password" id="{profesores.nombre}" /><Button type="button" class="fa fa-eye" on:click="{viewPassword(profesores.nombre)}" ></Button></td>
				<td>{profesores.trimestre1}</td>
				<td>{profesores.trimestre2}</td>
				<td>{profesores.trimestre3}</td>
			</tr>
			{/each}
			</tbody>
	</Table>
	{/await}
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}

body {
  align-items: center;
  justify-content: center;
  display: flex;
}

</style>
  