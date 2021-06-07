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
	import Banderas from "country-flags-svg";
	import { findFlagUrlByCountryName } from "country-flags-svg";
	export let params = {};
	let isActive;
	let usuario;
	let input = 0;
	let total = 0;
	
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
			imagen:"",
		};
		let bandera = "";
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
	usuario = nuevoAlumno.nombre
	 bandera = findFlagUrlByCountryName(nuevoAlumno.pais);
	console.log(bandera)
	
	 console.log(nuevoAlumno.equipo)
	 console.log(nuevoAlumno.imagen)
}

async function logout() {
    await axios.post("/api/auth/logout");
    $userAlum = null;
    push("/");
  }
  var imgPath = '/path/to/some/img.png';
	async function guardar(nombre,nombreCarta,total,posicion,pais,equipo,squad,ritmo,tiro,pase,regate,defensa,fisico,imagen) {
        console.log("Actualizado..."+nombre);
		/*
        nuevoAlumno.imagen.data = fs.readFileSync(imgPath);
		nuevoAlumno.imagen.contentType = 'image/png';
		nuevoAlumno.save(function (err, nuevoAlumno) {

      	console.error('saved img to mongo');
		})*/
		const res = await axios({
            method: "PUT",
            url:"/api/alumnos/"+nombre,
            data: {
                nombre: nombre,
                nombreCarta: nombreCarta,
                valoracion: total,
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
	  {#if total>=(nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)}
	  <Button  color="success" on:click={() => guardar(nuevoAlumno.nombre,nuevoAlumno.nombreCarta,total,nuevoAlumno.posicion,nuevoAlumno.pais,nuevoAlumno.equipo,nuevoAlumno.squad,nuevoAlumno.ritmo,nuevoAlumno.tiro,nuevoAlumno.pase,nuevoAlumno.regate,nuevoAlumno.defensa,nuevoAlumno.fisico,nuevoAlumno.imagen)}>Guardar</Button>
	  {:else}
	  <Button  color="danger" >No puedes guardar</Button>
	  {/if}<Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
	</div>
  </nav>
<main>
	<div class="tabla1">
	<Table>
		
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
				<td><Input readonly required bind:value = "{total}" /></td>

			</tr>
			<tr>
				<th>Posición</th>
				<td><Input required bind:value = "{nuevoAlumno.posicion}" /></td>

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
					<option value="Italy">Italia</option>
				  </Input></td>
			</tr>
			<tr>
				<th>Equipo</th>
				<td><Input type="select" name="equipo" id="equipo" bind:value ={nuevoAlumno.equipo}>
					<option value="https://brandlogos.net/wp-content/uploads/2012/11/real-betis-logo-vector.png">Real Betis</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/03/sevilla-fc-vector.jpg">Sevilla FC</option>
					<option value="https://brandlogos.net/wp-content/uploads/2014/07/fc-barcelona-logo.png">Barcelona FC</option>
					<option value="https://brandlogos.net/wp-content/uploads/2014/10/real-madrid-logo-preview.png">Real Madrid</option>
					<option value="https://brandlogos.net/wp-content/uploads/2011/06/granada-logo-vector.png">Granada CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/recreativo-de-huelva-logo-vector.png">Recreativo de Huelva</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/cadiz-logo-vector.png">Cádiz CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/cordoba-logo-vector.png">Córdoba CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/04/malaga-logo-vector-01.png">Málaga CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/real-jaen-logo-vector.png">Real Jaén</option>
				</Input></td>
			</tr>
	</Table>
</div>
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
				<img src={bandera} alt="Pais" draggable="false" class="imagen"/>
			</div>
			<div class="equipo">
				<img src={nuevoAlumno.equipo} alt="Equipo" draggable="false" class="imagen"/>
			</div>
			
		</div>
		<div class="carta-imagen">
			<!--<img src="https://selimdoyranli.com/cdn/carta/img/messi.png" alt="Messi" draggable="false"/>-->
			
			{#if avatar}
			<img class="avatar" src="{avatar}" alt="d" />
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
<div class="tabla2">
<Table >
		<tr>
			<th>Ritmo</th>
			<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.ritmo}" /></td>
		</tr>
		<tr>
			<th>Tiro</th>
			<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.tiro}" /></td>
			</tr>
			<tr>
				<th>Pase</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.pase}" /></td>
			</tr>
			<tr>
				<th>Regate</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.regate}" /></td>
			</tr>
			<tr>
				<th>Defensa</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 bind:value = "{nuevoAlumno.defensa}" /></td>
			</tr>
			<tr>
				<th>Físico</th>
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
th{
	background-color: #e9cc74;
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
    background: url(https://media.playstation.com/is/image/SCEA/fifa-19-stadium-background-blur-01-ps4-us-08jun18?$native_nt$) no-repeat center center/cover;
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
.country {
    margin: 10px;
    padding: 4px 6px;
    display: inline-block;
    font-family: tahoma;
    font-size: 12px
}
.country i {
    background: url(https://dl.dropboxusercontent.com/s/izcyieh1iatr4n5/flags.png) no-repeat;
    display: inline-block;
    width: 16px;
    height: 11px;
}
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
    display: grid;
    grid-template-columns: auto auto;
    color: black;
    padding: 0 1.5rem;
}

.carta .carta-parte-arriba .carta-parte-izquierda {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    padding-top: 10px;
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
}


.carta .carta-parte-arriba .carta-parte-izquierda .equipo {
	margin: 15px auto auto;
}

.carta .carta-parte-arriba .carta-parte-izquierda .equipo img {
	vertical-align: middle;
    border-style: none;
    width: 60px;
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
    padding-top: 25px;
    color: black;
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
	font-weight: bold;
}

.carta .player-card-bottom .player-info .player-name span {
	display: block;
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
	border-right: 2px solid rgba(233, 204, 116, 0.979);
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