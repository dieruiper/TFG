<script>
	import axios from "axios";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import {pop} from "svelte-spa-router";
	import { onMount } from "svelte";
	export let params = {};
	let input = 0;
	let total = 0;
	let nuevoAlumno = {
			nombre: "",
			nombreCarta: "",
			valoracion: 0,
			posicion: "",
			pais: "",
			ritmo: 0,
			tiro: 0,
			pase: 0,
			regate: 0,
			defensa: 0,
			fisico: 0,
			profesor: "",
		};

onMount(getAlumno);
/*
async function getTodo (){
	console.log("Obteniendo...");
	const {data} = await axios("/api/profesores");
	$profesores = data;
}

async function addProfesor() {
		console.log("Añadiendo...");
		const response = await axios.post("/api/profesores", nuevoProfesor);
		$profesores = [response.data, ...$profesores];
		input = 0;
	}
async function removeProfesor(id) {
		console.log("Borrando...");
	  	const response = await axios.delete("/api/profesores/" + id);
	  	if (response.data.id === id) {
			$profesores = $profesores.filter(t => t._id !== id);
	  	}
	}
*/
async function getAlumno (){
	const {data} = await axios.get("/api/alumnos/"+params.nombre);
	nuevoAlumno = data[0];
	const response = await axios("/api/profesores");
	for(let i=0;i<response.data.length;i++){
		if (response.data[i].profesor === nuevoAlumno.profesor && nuevoAlumno.nombre === response.data[i].nombre){
			total = response.data[i].trimestre1 + response.data[i].trimestre2 +response.data[i].trimestre3;
			console.log(total);
		}
	}
}
	async function guardar(nombre,nombreCarta,total,posicion,pais,ritmo,tiro,pase,regate,defensa,fisico) {
        console.log("Actualizado..."+nombre);
        const res = await axios({
            method: "PUT",
            url:"/api/alumnos/"+nombre,
            data: {
                nombre: nombre,
                nombreCarta: nombreCarta,
                valoracion: total,
                posicion: posicion,
                pais: pais,
				ritmo: ritmo,
                tiro: tiro,
                pase: pase,
                regate: regate,
                defensa: defensa,
				nombre: nombre,
                fisico: fisico,
				profesor: nuevoAlumno.profesor
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
    }  
</script>
<main>
	<Table bordered>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>nombreCarta</th>
				<th>valoracion</th>
				<th>posicion</th>
				<th>pais</th>
				<th>ritmo</th>
				<th>tiro</th>
				<th>pase</th>
				<th>regate</th>
				<th>defensa</th>
				<th>fisico</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input readonly required bind:value = "{nuevoAlumno.nombre}" /></td>
				<td><Input required bind:value = "{nuevoAlumno.nombreCarta}" /></td>
				<td><Input readonly required bind:value = "{total}" /></td>
				<td><Input required bind:value = "{nuevoAlumno.posicion}" /></td>
				<td><Input required bind:value = "{nuevoAlumno.pais}" /></td>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.ritmo}" /></td>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.tiro}" /></td>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.pase}" /></td>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.regate}" /></td>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.defensa}" /></td>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.fisico}" /></td>
				{#if total>=(nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)}
				<td><Button outline color="primary" on:click={() => guardar(nuevoAlumno.nombre,nuevoAlumno.nombreCarta,total,nuevoAlumno.posicion,nuevoAlumno.pais,nuevoAlumno.ritmo,nuevoAlumno.tiro,nuevoAlumno.pase,nuevoAlumno.regate,nuevoAlumno.defensa,nuevoAlumno.fisico)}>Guardar</Button></td>
				{:else}
				<td><Button outline color="danger" >No puedes guardar</Button></td>
				{/if}
			</tr>
		</tbody>
	</Table>
	<body>
	{#await nuevoAlumno}
	Loading alumnos...
	{:then nuevoAlumno_}

<!-- ## carta ## -->
<div class="carta" >
	<div class="carta-parte-arriba">
		<div class="carta-parte-izquierda">
			<div class="valoracion">
				<span>{total}</span>
			</div>
			<div class="posicion">
				<span>{nuevoAlumno.posicion}</span>
			</div>
			<div class="pais">
				<!--<img src="https://selimdoyranli.com/cdn/carta/img/argentina.svg" alt="Argentina" draggable="false"/>-->
			</div>
		</div>
		<div class="carta-imagen">
			<!--<img src="https://selimdoyranli.com/cdn/carta/img/messi.png" alt="Messi" draggable="false"/>-->
			<div class="player-extra">
			</div>
		</div>
	</div>
	<div class="player-card-bottom">
		<div class="player-info">
			<!-- Player Name-->
			<div class="player-name">
				<span>{nuevoAlumno.nombreCarta}</span>
			</div>
			<!-- Player Features-->
			<div class="player-features">
				<div class="player-features-col">
					<span>
						<div class="player-feature-value">{nuevoAlumno.ritmo}</div>
						<div class="player-feature-title">RIT</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.tiro}</div>
						<div class="player-feature-title">TIR</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.pase}</div>
						<div class="player-feature-title">PAS</div>
					</span>
				</div>
				<div class="player-features-col">
					<span>
						<div class="player-feature-value">{nuevoAlumno.regate}</div>
						<div class="player-feature-title">REG</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.defensa}</div>
						<div class="player-feature-title">DEF</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.fisico}</div>
						<div class="player-feature-title">FIS</div>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
{/await}
</body>
</main>
<style>
	* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	font-family: 'Saira Semi Condensed', sans-serif;
	font-weight: 400;
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	min-height: 700px;
	/*background: url("https://media.playstation.com/is/image/SCEA/fifa-19-stadium-background-blur-01-ps4-us-08jun18?$native_nt$") no-repeat center center/cover;*/
}

body:after {
	font-size: 1rem;
	color: #aaa;
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 2;
}


/*
  *** carta styles ***
*/

.carta {
	position: relative;
	width: 400px;
	height: 585px;
	background-image: url(/images/cartafifa.png);
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 3.8rem 0;
	z-index: 2;
	-webkit-transition: 200ms ease-in;
	-o-transition: 200ms ease-in;
	transition: 200ms ease-in;
}

.carta .carta-parte-arriba {
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	color: black;
	padding: 0 1.5rem;
}

.carta .carta-parte-arriba .carta-parte-izquierda {
	position: absolute;
	line-height: 2.2rem;
	font-weight: 300;
	padding: 1.5rem 0;
	text-transform: uppercase;
}

.carta .carta-parte-arriba .carta-parte-izquierda .valoracion {
	font-size: 2rem;
}

.carta .carta-parte-arriba .carta-parte-izquierda .posicion {
	font-size: 1.4rem;
}

.carta .carta-parte-arriba .carta-parte-izquierda .pais {
	display: block;
	width: 2rem;
	height: 25px;
	margin: 0.3rem 0;
}

.carta .carta-parte-arriba .carta-parte-izquierda .pais img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
}

.carta .carta-parte-arriba .carta-parte-izquierda .player-club {
	display: block;
	width: 2.1rem;
	height: 40px;
}

.carta .carta-parte-arriba .carta-parte-izquierda .player-club img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
}

.carta .carta-parte-arriba .carta-imagen {
	width: 200px;
	height: 200px;
	margin: 0 auto;
	overflow: hidden;
}

.carta .carta-parte-arriba .carta-imagen img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
	position: relative;
	right: -1.5rem;
	bottom: 0;
}

.carta .carta-parte-arriba .carta-imagen .player-extra {
	position: absolute;
	right: 0;
	bottom: -0.5rem;
	overflow: hidden;
	font-size: 1rem;
	font-weight: 700;
	text-transform: uppercase;
	width: 100%;
	height: 2rem;
	padding: 0 1.5rem;
	text-align: right;
	background: none;
}

.carta .carta-parte-arriba .carta-imagen .player-extra span {
	margin-left: 0.6rem;
	text-shadow: 2px 2px #333;
}

.carta .player-card-bottom {
	position: relative;
}

.carta .player-card-bottom .player-info {
	display: block;
	padding: 0.3rem 0;
	color: #e9cc74;
	width: 90%;
	margin: 0 auto;
	height: auto;
	position: relative;
	z-index: 2;
}

.carta .player-card-bottom .player-info .player-name {
	width: 100%;
	display: block;
	text-align: center;
	font-size: 1.6rem;
	text-transform: uppercase;
	border-bottom: 2px solid rgba(233, 204, 116, 0.1);
	padding-bottom: 0.3rem;
	overflow: hidden;
}

.carta .player-card-bottom .player-info .player-name span {
	display: block;
	text-shadow: 2px 2px #111;
}

.carta .player-card-bottom .player-info .player-features {
	margin: 0.5rem auto;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.carta .player-card-bottom .player-info .player-features .player-features-col {
	border-right: 2px solid rgba(233, 204, 116, 0.1);
	padding: 0 2.3rem;
}

.carta .player-card-bottom .player-info .player-features .player-features-col span {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	font-size: 1.2rem;
	text-transform: uppercase;
}

.carta .player-card-bottom .player-info .player-features .player-features-col span .player-feature-value {
	margin-right: 0.3rem;
	font-weight: 700;
	color: black;
}

.carta .player-card-bottom .player-info .player-features .player-features-col span .player-feature-title {
	font-weight: 300;
	color: black;
}

.carta .player-card-bottom .player-info .player-features .player-features-col:last-child {
	border: 0;
}
</style>
<!--
<main>
	
	{#await nuevoAlumno}
		Loading alumnos...
	{:then nuevoAlumno_}
	
	<Table bordered>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Nombre Carta</th>
				<th>valoracion</th>
				<th>posicion</th>
				<th>pais</th>
				<th>ritmo</th>
				<th>tiro</th>
				<th>pase</th>
				<th>regate</th>
				<th>defensa</th>
				<th>fisico</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ej. argentina" required bind:value = "{nuevoAlumno.nombre}" /></td>
				<td><Input required placeholder="Ej. 2020" bind:value = "{nuevoAlumno.nombreCarta}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoAlumno.valoracion}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoAlumno.ritmo}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{nuevoAlumno.tiro}" /></td>
			</tr>
			<tr>
				<td>{nuevoAlumno.nombre}</td>
				<td>{nuevoAlumno.nombreCarta}</td>
				<td>{nuevoAlumno.valoracion}</td>
				<td>{nuevoAlumno.posicion}</td>
				<td>{nuevoAlumno.pais}</td>
				<td>{nuevoAlumno.ritmo}</td>
				<td>{nuevoAlumno.tiro}</td>
				<td>{nuevoAlumno.pase}</td>
				<td>{nuevoAlumno.regate}</td>
				<td>{nuevoAlumno.defensa}</td>
				<td>{nuevoAlumno.fisico}</td>
			</tr>
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
</style>
  -->