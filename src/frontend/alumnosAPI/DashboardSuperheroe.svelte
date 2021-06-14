<script>
	import axios from "axios";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import {pop} from "svelte-spa-router";
	import { onMount } from "svelte";
	import { userAlum } from "../storesAlum";
	import { findFlagUrlByCountryName } from "country-flags-svg";
	export let params = {};
	let isActive;
	let input = 0;
	let usuario;
	let bandera = "";

	let nuevoAlumno = {
			nombre: "",
			nombreCarta: "",
			valoracion: 0,
			posicion: "",
			pais: "",
			equipo: "",
			squad: "",
			ritmo: 0,
			tiro: 0,
			pase: 0,
			regate: 0,
			defensa: 0,
			fisico: 0,
			profesor: "",
			imagen: ""
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
async function logout() {
    await axios.post("/api/auth/logout");
    $userAlum = null;
    push("/");
  }
async function getAlumno (){
	const {data} = await axios.get("/api/alumnos/"+params.nombre);
	nuevoAlumno = data[0];
	
	usuario = nuevoAlumno.nombre
	bandera = findFlagUrlByCountryName(nuevoAlumno.pais);
	console.log(bandera)
	
	 console.log(nuevoAlumno.squad)
	 console.log(nuevoAlumno.imagen)
}
	async function guardar(nombre,nombreCarta,valoracion,posicion,pais,equipo,squad,ritmo,tiro,pase,regate,defensa,fisico) {
		if (valoracion <= ((ritmo+tiro+pase+regate+defensa+fisico)/6)){
			alert("ERROR: La media aritmética de tus atributos no puede ser mayor a tu valoración");
		}else{
        console.log("Actualizado..."+nombre);
        const res = await axios({
            method: "PUT",
            url:"/api/alumnos/"+nombre,
            data: {
                nombre: nombre,
                nombreCarta: nombreCarta,
                valoracion: valoracion,
                posicion: posicion,
                pais: pais,
				equipo: equipo,
				squad: squad,
				ritmo: ritmo,
                tiro: tiro,
                pase: pase,
                regate: regate,
                defensa: defensa,
				nombre: nombre,
                fisico: fisico,
				profesor: nuevoAlumno.profesor,
				imagen: nuevoAlumno.imagen
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
		getAlumno()
		alert("Guardado con éxito")
    }  
	}
	let  avatar, fileinput;
	
	const onFileSelected =(e)=>{
  		let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target.result
            };
			nuevoAlumno.imagen = avatar;
			console.log(nuevoAlumno.imagen)
}
</script>
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
	  <Button class="upload" color="light" on:click={()=>{fileinput.click();}}> Elegir imagen</Button>
	  <input style="display:none" type="file" accept=".jpg, .jpeg, .png" bind:value={nuevoAlumno.imagen} on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
	  <Button  color="success" on:click={() => guardar(nuevoAlumno.nombre,nuevoAlumno.nombreCarta,nuevoAlumno.valoracion,nuevoAlumno.posicion,nuevoAlumno.pais,nuevoAlumno.equipo,nuevoAlumno.squad,nuevoAlumno.ritmo,nuevoAlumno.tiro,nuevoAlumno.pase,nuevoAlumno.regate,nuevoAlumno.defensa,nuevoAlumno.fisico)}>Guardar</Button>
	  
		<Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
	</div>
  </nav>
<main>
	<div class="tabla1">
	<Table >
		<tr>
			<th>Nombre</th>
			<td><Input readonly required bind:value = "{nuevoAlumno.nombre}" /></td>
		</tr>
		<tr>
			<th>Nombre carta</th>
			<td><Input required bind:value = "{nuevoAlumno.nombreCarta}" /></td>

		</tr>
		<tr>
			<th>Valoracion</th>
			<td><Input readonly required bind:value = "{nuevoAlumno.valoracion}" /></td>

		</tr>
		<tr>
			<th>País</th>
			<td><Input type="select" name="country" id="country" bind:value ={nuevoAlumno.pais}>
				<option value="Argentina">Argentina</option>
				<option value="Belgium">Bélgica</option>
				<option value="Brazil">Brasil</option>
				<option value="France">Francia</option>
				<option value="Portugal">Portugal</option>
				<option value="Spain">España</option>
				<option value="Italy">Italy</option>
			  </Input></td>
		</tr>
		<tr>
			<th>Squad</th>
			<td><Input type="select" name="squad" id="squad" bind:value ={nuevoAlumno.squad}>
				<option value="https://img-premium.flaticon.com/png/512/1466/1466103.png?token=exp=1623057057~hmac=411a7d63ce44df92cce8de3642af3f7b">Catwoman</option>
				<option value="https://img-premium.flaticon.com/png/512/1466/1466137.png?token=exp=1623057070~hmac=7bc7bebd14822e4a7a687cdcba0cacc8">Superwoman</option>
				<option value="https://img-premium.flaticon.com/png/512/1388/1388513.png?token=exp=1623057150~hmac=e8e3e24135573bf1ac0a7164dac7fafa">Superheroína</option>
				<option value="https://image.flaticon.com/icons/png/512/1466/1466117.png">Hulk</option>
				<option value="https://img-premium.flaticon.com/png/512/1466/1466114.png?token=exp=1623057007~hmac=f3eb2b926191724ec34f394ca4eab863">Flash</option>
				<option value="https://img-premium.flaticon.com/png/512/1466/1466111.png?token=exp=1623057009~hmac=6cf0bba8a5b3177c922828488ab41452">Deadpool</option>
				<option value="https://img-premium.flaticon.com/png/512/1674/1674294.png?token=exp=1623058104~hmac=36fc649d92e97644872d071f8f6a38df">Spiderman</option>
				<option value="https://img-premium.flaticon.com/png/512/1466/1466118.png?token=exp=1623057015~hmac=2fec8dd58e383c0cb235aa5aef658d49">Iron Man</option>
				<option value="https://img-premium.flaticon.com/png/512/1466/1466102.png?token=exp=1623057055~hmac=0887d22f76eb32e0a2e8bbbc99ab4092">Batman</option>
				
				<option value="https://img-premium.flaticon.com/png/512/1466/1466106.png?token=exp=1623057101~hmac=0b3824ff77238e4c09edd4543911ca7e">Capitán América</option>
				<option value="https://img-premium.flaticon.com/png/512/1352/1352423.png?token=exp=1623057132~hmac=f1cf71ca935b5cf401a8f7c3b6db5f46">Superman</option>
			</Input></td>
		</tr>
</Table>
</div>
	<body>
	{#await nuevoAlumno}
	Loading alumnos...
	{:then nuevoAlumno_}
	<div class="desbloqueado">
		<p>¡Consigue puntos, desbloquea las squad de tus superhéroes favoritos
		y consigue tu carta personalizada para ser un auténtico superhéroe!</p>
	</div>
<!-- ## carta ## -->
<div class="carta" >
	<div class="carta-parte-arriba">
		<div class="carta-parte-izquierda">
			<div class="valoracion">
				<span>{nuevoAlumno.valoracion}</span>
			</div>
			<div class="pais">
				<img src={bandera} alt="Pais" draggable="false" class="imagen"/>
			</div>
			<div class="equipo">
				<img src={nuevoAlumno.squad} alt="Squad" draggable="false" class="imagen"/>
			</div>
		</div>
		<div class="carta-imagen">
			{#if avatar}
			<img class="avatar2" src="{avatar}" alt="d" />
			{:else}
			<img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
			{/if}
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
						<div class="player-feature-title">ATA</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.tiro}</div>
						<div class="player-feature-title">DEF</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.pase}</div>
						<div class="player-feature-title">INT</div>
					</span>
				</div>
				<div class="player-features-col">
					<span>
						<div class="player-feature-value">{nuevoAlumno.regate}</div>
						<div class="player-feature-title">VEL</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.defensa}</div>
						<div class="player-feature-title">FUE</div>
					</span>
					<span>
						<div class="player-feature-value">{nuevoAlumno.fisico}</div>
						<div class="player-feature-title">RES</div>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
{/await}
</body>
<div class="tabla2">
	<Table >
		<tr>
			<th>Media atributos</th>
			{#if ((nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)/6).toFixed()>nuevoAlumno.valoracion}
			<td class="mediarojo">{((nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)/6).toFixed()}</td>
			{:else}
			<td class="mediaverde">{((nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)/6).toFixed()}</td>
			{/if}
		</tr>
			<tr>
				<th>Ataque</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 max=99 bind:value = "{nuevoAlumno.ritmo}" /></td>
			</tr>
			<tr>
				<th>Defensa</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.tiro}" /></td>
				</tr>
				<tr>
					<th>Inteligencia</th>
					<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.pase}" /></td>
				</tr>
				<tr>
					<th>Velocidad</th>
					<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.regate}" /></td>
				</tr>
				<tr>
					<th>Fuerza</th>
					<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.defensa}" /></td>
				</tr>
				<tr>
					<th>Resistencia</th>
					<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.fisico}" /></td>
				</tr>
		</Table>
	</div>
</main>
<style>
	* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
.mediarojo{
	background: rgb(202, 83, 83);
	border-radius: 3px;
	padding: 6px 12px;
}
.mediaverde{
	background: rgb(121, 202, 83);
	border-radius: 3px;
	padding: 6px 12px;
}
th{
	background-color: #00044e;
	color: #e9cc74;
	width: 5rem;
	padding-left: 10px;
	padding-top: 7px;
}
td{
	width: 5rem;
}
.tabla1{
	display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
	margin-left:20vh;
	border-radius: 20px;
}
.tabla2{
	display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
	margin-right:20vh;
	border-radius: 20px;
}
main{
	display: grid;
    grid-auto-flow: column;
    background: linear-gradient(rgba(255,255,255,.2), rgba(46, 37, 37, 0.2)),url(https://images-na.ssl-images-amazon.com/images/I/61G7XVLHtwL._AC_SX466_.jpg) no-repeat center center/cover;
	
}
body {
	font-family: 'Saira Semi Condensed', sans-serif;
	font-weight: 400;
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	flex-direction: column;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	min-height: 700px;
	/*background: url("https://cdn.shopify.com/s/files/1/1699/5389/products/J01783_500x.jpg?v=1570143680") no-repeat center center/cover;*/
	background: transparent;
	
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
	background-image: url(/images/cartasuperheroe.png);
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
    display: grid;
    grid-template-columns: auto auto;
	color: #e9cc74;
	padding: 0 1.5rem;
}

.carta .carta-parte-arriba .carta-parte-izquierda {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    padding-top: 15px;
}

.carta .carta-parte-arriba .carta-parte-izquierda .valoracion {
	text-align: center;
    align-items: center;
    font-size: 50px;
    height: 60px;
	}

.carta .carta-parte-arriba .carta-parte-izquierda .posicion {
	text-align: center;
    font-size: 20px;
	}

.carta .carta-parte-arriba .carta-parte-izquierda .pais {
	margin: 10px auto auto;
}

.carta .carta-parte-arriba .carta-parte-izquierda .pais img {
	width: 60px;
	-o-object-fit: contain;
	object-fit: contain;
	align-self: center;
	padding-top: 10px;
	padding-bottom: 10px;
}

.carta .carta-parte-arriba .carta-parte-izquierda .equipo {
	margin: 15px auto auto;
}

.carta .carta-parte-arriba .carta-parte-izquierda .equipo img {
	vertical-align: middle;
    border-style: none;
    width: 70px;
}

.carta .carta-parte-arriba .carta-imagen {
	width: 200px;
	height: 200px;
	margin: 0 auto;
	overflow: hidden;
	align-self: flex-end;
    margin-right: 40px;
	padding-right: 40px;

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
    padding-top: 15px;
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
	color: #e9cc74;
}

.carta .player-card-bottom .player-info .player-features .player-features-col span .player-feature-title {
	font-weight: 300;
	color: #e9cc74;
}

.carta .player-card-bottom .player-info .player-features .player-features-col:last-child {
	border: 0;
}

.barraSup{
		background-color:#007bff;
		padding-top: 2vh;
		padding-bottom: 2vh;
		color:white;
	}
	.contenedor{
	margin-left: 5vw;
	margin-right: 5vw;
	display: grid;
	grid-gap: 1vh;
	grid-template-rows: auto;
    grid-template-columns: auto 200px 100px 120px;
}
.avatar{
	 filter: invert(100%); 
}
.desbloqueado{
	display: flex;
	flex-direction: column;
	height: 90px;
	width: 650px;
	padding:20px;
	border-radius: 5px;
	font-size: 18px;
	font-weight: bold;
	color: #e9cc74;
    text-shadow: 2px 2px #5d3f12;
	background-color:#00044e ;
	justify-content: stretch;
	align-content: stretch;
	-webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 3px 2px 16px 8px rgba(0,0,0,0.42); 
	box-shadow: -2px 0px 1px -7px #e6bc3d, 0px 0px 1px -2px #e6c963, 1px 2px 20px 5px rgb(230 201 116);
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