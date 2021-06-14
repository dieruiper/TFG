<script>
	import Sidebar from '../BarraLateral/Sidebar.svelte';
	import Hoverable from '../MostrarContraseñas/Hoverable.svelte';
	import Modal from '../BarraLateral/Modal.svelte';
	import axios from "axios";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import Icon from "sveltestrap/src/Icon.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
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
	let usuario;
	import { userAlum } from "../storesAlum";
	import { user} from "../stores";
	let input = 0;
	let profesor ;
	let password;
	let query;
	let nuevoProfesor = {
			nombre: "",
			contraseña: Array(3).fill("$%-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')+Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')+Array(7).fill("$%-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
			trimestre1: 0,
			trimestre2: 0,
			trimestre3: 0,
		};
	let busqueda ="";
	let profesoresBusqueda;
	let inicializaAlumno = {
		nombre:"",
		nombreCarta:"",
		valoracion: nuevoProfesor.trimestre1 + nuevoProfesor.trimestre2 + nuevoProfesor.trimestre3,
		posicion: "",
		pais: "",
		equipo: "",
		squad: "",
		ritmo:0,
		tiro:0,
		pase:0,
		regate:0,
		defensa:0,
		fisico:0,
		profesor:"",
		imagen: null

	}
	let sidebar_show = false;
	let sidebar_show_ordenar = false;

onMount(getTodo);

async function getTodo (){
	console.log("Obteniendo...");
	const {data} = await axios("/api/profesores");
	const response2 = await axios("/api/auth/user");
	usuario = response2.data.user.username;
	$profesores = data;
}

async function addProfesor(nombre,trimestre1,trimestre2,trimestre3) {
		console.log("Añadiendo...");
		let errorRegistro = false
		for(let i=0;i<$profesores.length;i++){
			if(nombre === $profesores[i].nombre){
				errorRegistro=true;
			}
		}
		if(errorRegistro===true){
            alert("ERROR: Ya existe ese alumno. Por favor revise el nombre")
        }else{
			if(trimestre1+trimestre2+trimestre3>99){
				alert("La suma total debe ser menor que 100\nPor favor compruébelo e inserte")
			}else{
		
		const response2 = await axios("/api/auth/user");
		profesor = response2.data.user.username; 
		const response = await axios.post("/api/profesores", nuevoProfesor);
		$profesores = [response.data, ...$profesores];
		input = 0;
		password = nuevoProfesor.contraseña.substring(3,13);
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
		nombreCarta:nombreCarta,
		valoracion: trimestre1 + trimestre2 + trimestre3,
		posicion: "BA",
		pais: "Spain",
		equipo: "https://brandlogos.net/wp-content/uploads/2021/01/la-liga-logo.png",
		squad: "https://img-premium.flaticon.com/png/512/1466/1466114.png?token=exp=1623057007~hmac=f3eb2b926191724ec34f394ca4eab863",
		ritmo:0,
		tiro:0,
		pase:0,
		regate:0,
		defensa:0,
		fisico:0,
		profesor:profesor,
		imagen: null
	  });
        //push("/alumnos/"+nombre);
      
	  nuevoProfesor = {
		nombre: "",
		contraseña: Array(3).fill("$%-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')+Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')+Array(7).fill("$%-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
			trimestre1: 0,
			trimestre2: 0,
			trimestre3: 0,
	  }
	}
}
}
async function removeProfesor(id) {
		console.log("Borrando...");
	  	const response = await axios.delete("/api/profesores/" + id);
	  	if (response.data.id === id) {
			$profesores = $profesores.filter(t => t._id !== id);
	  	}
	}

async function Buscar(nombre){
	const {data} = await axios("/api/profesores");
	$profesores = data;
	if(nombre != ""){
		let contador=0;
		console.log(nombre)
		for(let i=0;i<data.length;i++){
			if(data[i].nombre.toLowerCase().includes(nombre.toLowerCase())==true){
				contador = contador+1;
				$profesores = $profesores.filter(t => t.nombre.toLowerCase().includes(nombre.toLowerCase()) == true)
			}
		}
		if (contador==0){
			$profesores = "";
			alert("Búsqueda no encontrada:\n No se ha encontrado ningún nombre donde se incluya: "+nombre+".\n Pulse 🔄 si quiere volver a ver todos los alumnos" )
		}else{
			alert("Búsqueda encontrada:\n Se ha encontrado "+contador+" nombre(s) donde se incluya: "+nombre+".\n Pulse 🔄 si quiere volver a ver todos los alumnos")
		}
	/*for(let i=0;i<data.length;i++){
		if(data[i].nombre.includes(nombre)===true){
			$profesoresBusqueda = data[i]
		}
	}*/
	}
}

function compareNumerosDesc1(a, b) {
        const bandA = a.trimestre1;
        const bandB = b.trimestre1;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
    }

	function compareNumerosDesc2(a, b) {
        const bandA = a.trimestre2;
        const bandB = b.trimestre2;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
    }

	function compareNumerosDesc3(a, b) {
        const bandA = a.trimestre3;
        const bandB = b.trimestre3;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
    }

function GetSortOrderDesc(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}   

function compareNumerosAsc1(a, b) {
        const bandA = a.trimestre1;
        const bandB = b.trimestre1;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison ;
    }

	function compareNumerosAsc2(a, b) {
        const bandA = a.trimestre2;
        const bandB = b.trimestre2;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison ;
    }

	function compareNumerosAsc3(a, b) {
        const bandA = a.trimestre3;
        const bandB = b.trimestre3;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison ;
    }

function GetSortOrderAsc(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
}   
async function ordenarNumerosDesc1(){
	$profesores = $profesores.sort(compareNumerosDesc1)
}

async function ordenarNumerosDesc2(){
	$profesores = $profesores.sort(compareNumerosDesc2)
}

async function ordenarNumerosDesc3(){
	$profesores = $profesores.sort(compareNumerosDesc3)
}

async function ordenarNombreDesc(){
	$profesores = $profesores.sort(GetSortOrderDesc("nombre"))
}

async function ordenarNumerosAsc1(){
	$profesores = $profesores.sort(compareNumerosAsc1)
}

async function ordenarNumerosAsc2(){
	$profesores = $profesores.sort(compareNumerosAsc2)
}

async function ordenarNumerosAsc3(){
	$profesores = $profesores.sort(compareNumerosAsc3)
}

async function ordenarNombreAsc(){
	$profesores = $profesores.sort(GetSortOrderAsc("nombre"))
}

let modal_show = false;
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
			  <span class="title">¡Bienvenido {usuario}!</span>
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
			<Button color="light" class="Ajustes" on:click={() => sidebar_show = !sidebar_show}>Opciones</Button>
			<Sidebar bind:show={sidebar_show} />
			<Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
		</div>
	  </nav>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">


	<div class="busqueda">
		 <Input placeholder="Búsqueda..." class="busqueda2" type="search" bind:value = "{busqueda}" /><Button outline on:click={Buscar(busqueda)} >🔎</Button><Button outline on:click={getTodo} >🔄</Button>
	</div>
	<h2> Listado de tus alumnos</h2>
	<p></p>
	<div class="tabla">
	<Table  bordered hover>
		<thead>
			
			<tr>
				<th>Nombre (Contraseña)  <Button  color="dark" outline size="sm" on:click={() => modal_show = true}><Icon name="info-circle-fill"></Icon></Button>
					<Button  color="dark" outline size="sm" on:click={ordenarNombreDesc}>▼</Button>
					<Button  color="dark" outline size="sm"  on:click={ordenarNombreAsc}>▲</Button>
					 {#if modal_show} <Modal bind:show={modal_show} >
					La contraseña aparecerá al pasar el ratón por encima del alumno	</Modal>
					{/if}</th>
				<th>Trimestre 1 <Button color="dark" outline size="sm" on:click={ordenarNumerosDesc1} >▼</Button>
					<Button  color="dark" outline size="sm" on:click={ordenarNumerosAsc1}>▲</Button></th>
				<th>Trimestre 2 <Button  color="dark" outline size="sm" on:click={ordenarNumerosDesc2} >▼</Button>
					<Button  color="dark" outline size="sm"  on:click={ordenarNumerosAsc2}>▲</Button></th>
				<th>Trimestre 3 <Button  color="dark" outline size="sm" on:click={ordenarNumerosDesc3}>▼</Button>
					<Button  color="dark" outline size="sm"  on:click={ordenarNumerosAsc3} >▲</Button></th>
				<th><Button href="#/profesores/actualizar" color="primary">Modificar Datos</Button></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ej. Leopoldo Leo Leo" required bind:value = "{nuevoProfesor.nombre}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoProfesor.trimestre1}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoProfesor.trimestre2}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoProfesor.trimestre3}" /></td>
				<td><Button outline color= "primary" on:click={addProfesor(nuevoProfesor.nombre,nuevoProfesor.trimestre1,nuevoProfesor.trimestre2,nuevoProfesor.trimestre3)}>Insertar</Button></td>
			</tr>
			{#each $profesores as profesores (profesores._id)}
			<tr>
				<td><Hoverable let:hovering={active}>
						{#if active}
							<p>{profesores.contraseña.substring(3,13)}</p>
						{:else}
							<p>{profesores.nombre}</p>
						{/if}
				</Hoverable></td>
				<td>{profesores.trimestre1}</td>
				<td>{profesores.trimestre2}</td>
				<td>{profesores.trimestre3}</td>
			</tr>
			{/each}
			</tbody>
	</Table>
</div>
	{/await}
	
</main>

<style>
	main {
		text-align: left;
		margin: 0 auto;
		display: grid;
	}

body {
  align-items: center;
  justify-content: center;
  display: flex;
}
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
.busqueda{
	display: flex;
	margin: 40px;
	margin-bottom: 20px;
	margin-left: 100px;
	justify-content: flex-start;
	width: 300px;
}
.tabla {
	margin: auto auto;
	width: 1300px;
}
h2{
	text-align: center;
	background: rgb(211, 231, 240);
  border-radius: 10px;
  box-shadow: 0 7px 10px rgba(62, 9, 11, 0.3);
  padding:20px;
   margin-left: 25%;
   margin-right: 25%;
	}
</style>
  