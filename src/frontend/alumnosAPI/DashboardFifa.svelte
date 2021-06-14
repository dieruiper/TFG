<script>
	import axios from "axios";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import Tooltip from 'sveltestrap/src/Tooltip.svelte';
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
	console.log(nuevoAlumno)
	//const response = await axios("/api/profesores");
	/*
	for(let i=0;i<response.data.length;i++){
		if (response.data[i].profesor === nuevoAlumno.profesor && nuevoAlumno.nombre === response.data[i].nombre){
			total = response.data[i].trimestre1 + response.data[i].trimestre2 +response.data[i].trimestre3;
			console.log(total);
		}
	}*/
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
	async function guardar(nombre,nombreCarta,valoracion,posicion,pais,equipo,squad,ritmo,tiro,pase,regate,defensa,fisico,imagen) {
        console.log("Actualizado..."+nombre);
		if (valoracion >= ((ritmo+tiro+pase+regate+defensa+fisico)/6)){
			alert("ERROR: La media aritmética de tus atributos no puede ser mayor a tu valoración");
		}else{

		
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
	  <!--{#if nuevoAlumno.valoracion>=((nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)/6)}
	  <Button  color="success" on:click={() => guardar(nuevoAlumno.nombre,nuevoAlumno.nombreCarta,nuevoAlumno.valoracion,nuevoAlumno.posicion,nuevoAlumno.pais,nuevoAlumno.equipo,nuevoAlumno.squad,nuevoAlumno.ritmo,nuevoAlumno.tiro,nuevoAlumno.pase,nuevoAlumno.regate,nuevoAlumno.defensa,nuevoAlumno.fisico,nuevoAlumno.imagen)}>Guardar</Button>
	  {:else}
	  <Button  color="danger" >No puedes guardar</Button>
	  {/if}-->
	  <Button  color="success" on:click={() => guardar(nuevoAlumno.nombre,nuevoAlumno.nombreCarta,nuevoAlumno.valoracion,nuevoAlumno.posicion,nuevoAlumno.pais,nuevoAlumno.equipo,nuevoAlumno.squad,nuevoAlumno.ritmo,nuevoAlumno.tiro,nuevoAlumno.pase,nuevoAlumno.regate,nuevoAlumno.defensa,nuevoAlumno.fisico,nuevoAlumno.imagen)}>Guardar</Button>
	  <Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
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
				<td><Input readonly required bind:value = "{nuevoAlumno.valoracion}" /></td>

			</tr>
			<tr>
				<th>Posición</th>
				<td><Input type="select" name="posicion" id="posicion" bind:value = "{nuevoAlumno.posicion}">
					{#if nuevoAlumno.valoracion<=50}
					<option disabled value="DC">Delantero</option>
					{:else}
					<option value="DC">Delantero</option>
					{/if}
					{#if nuevoAlumno.valoracion<=40}
					<option disabled value="EI">Extremo Izquierda</option>
					<option disabled value="ED">Extremo Derecha</option>
					{:else}
					<option value="EI">Extremo Izquierda</option>
					<option value="ED">Extremo Derecha</option>
					{/if}
					{#if nuevoAlumno.valoracion<=30}
					<option disabled value="MC">Medio Centro</option>
					<option disabled value="MI">Medio Izquierda</option>
					<option disabled value="MD">Medio Derecha</option>
					{:else}
					<option value="MC">Medio Centro</option>
					<option value="MI">Medio Izquierda</option>
					<option value="MD">Medio Derecha</option>
					{/if}
					{#if nuevoAlumno.valoracion<=15}
					<option disabled value="DF">Defensa</option>
					<option disabled value="LI">Lateral izquierdo</option>
					<option disabled value="LD">Lateral derecho</option>
					{:else}
					<option value="DF">Defensa</option>
					<option value="LI">Lateral izquierdo</option>
					<option value="LD">Lateral derecho</option>
					{/if}
					{#if nuevoAlumno.valoracion<=50}
					<option disabled value="PT">Portero</option>
					{:else}
					<option value="PT">Portero</option>
					{/if}					
				  </Input><Tooltip target="posicion" placement="right">
					<strong>VALORACIÓN MÍNIMA PARA DESBLOQUEAR CADA POSICIÓN</strong>
					<ul>
						<li>Delantero: 50 </li>
						<li>Extremos: 40 </li>
						<li>Mediocentros: 30 </li>
						<li>Defensas: 15 </li>
						<li>Portero: 50 </li>
					</ul>
				  </Tooltip></td>
			</tr>
			<tr>
				<th>País</th>
				<td><Input type="select" name="pais" id="pais" bind:value ={nuevoAlumno.pais}>
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
					{#if nuevoAlumno.valoracion<=15}
					<option disabled value="https://brandlogos.net/wp-content/uploads/2012/11/real-betis-logo-vector.png">Real Betis</option>
					<option disabled value="https://brandlogos.net/wp-content/uploads/2012/03/sevilla-fc-vector.jpg">Sevilla FC</option>
					<option disabled value="https://brandlogos.net/wp-content/uploads/2014/07/fc-barcelona-logo.png">Barcelona FC</option>
					<option disabled value="https://brandlogos.net/wp-content/uploads/2014/10/real-madrid-logo-preview.png">Real Madrid</option>
					{:else}
					<option value="https://brandlogos.net/wp-content/uploads/2012/11/real-betis-logo-vector.png">Real Betis</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/03/sevilla-fc-vector.jpg">Sevilla FC</option>
					<option value="https://brandlogos.net/wp-content/uploads/2014/07/fc-barcelona-logo.png">Barcelona FC</option>
					<option value="https://brandlogos.net/wp-content/uploads/2014/10/real-madrid-logo-preview.png">Real Madrid</option>
					{/if}
					<option value="https://brandlogos.net/wp-content/uploads/2011/06/granada-logo-vector.png">Granada CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/recreativo-de-huelva-logo-vector.png">Recreativo de Huelva</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/cadiz-logo-vector.png">Cádiz CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/cordoba-logo-vector.png">Córdoba CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/04/malaga-logo-vector-01.png">Málaga CF</option>
					<option value="https://brandlogos.net/wp-content/uploads/2012/12/real-jaen-logo-vector.png">Real Jaén</option>
				</Input><Tooltip target="equipo" placement="right">
					<strong>VALORACIÓN MÍNIMA PARA DESBLOQUEAR LOS SIGUIENTES EQUIPOS</strong>
					<ul>
						<li>Real Betis: 15 </li>
						<li>Sevilla FC: 15 </li>
						<li>Barcelona FC: 15 </li>
						<li>Real Madrid: 15 </li>
					</ul>
				  </Tooltip></td>
			</tr>
	</Table>
</div>
	<body>
	{#await nuevoAlumno}
	Loading alumnos...
	{:then nuevoAlumno_}
	<div class="desbloqueado">
		<p>¡Consigue puntos, desbloquea posiciones y equipos</p>
		<p>y consigue tu carta FIFA como un jugador profesional!</p>
	</div>
<div class="carta" >
	<div class="carta-parte-arriba">
		<div class="carta-parte-izquierda">
			<div class="valoracion">
				<span>{nuevoAlumno.valoracion}</span>
			</div>
			<div class="posicion">
				<span>{nuevoAlumno.posicion}</span>
			</div>
			<div class="pais">
				<img src={bandera} alt="Pais" draggable="false" class="imagen"/>
			</div>
			<div class="equipo">
				<img src={nuevoAlumno.equipo} alt="Equipo" draggable="false" class="imagen"/>
			</div>
			
		</div>
		<div class="carta-imagen">
			{#if avatar}
			<img class="avatar" src="{avatar}" alt="d" />
			{:else}
			<img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
			{/if}
		</div>
	</div>
	<div class="carta-parte-abajo">
		<div class="estadisticas">
			<div class="nombre-carta">
				<span>{nuevoAlumno.nombreCarta}</span>
			</div>
			<div class="atributos">
				<div class="atributos-col">
					<span>
						<div class="valor">{nuevoAlumno.ritmo}</div>
						<div class="titulo">RIT</div>
					</span>
					<span>
						<div class="valor">{nuevoAlumno.tiro}</div>
						<div class="titulo">TIR</div>
					</span>
					<span>
						<div class="valor">{nuevoAlumno.pase}</div>
						<div class="titulo">PAS</div>
					</span>
				</div>
				<div class="atributos-col">
					<span>
						<div class="valor">{nuevoAlumno.regate}</div>
						<div class="titulo">REG</div>
					</span>
					<span>
						<div class="valor">{nuevoAlumno.defensa}</div>
						<div class="titulo">DEF</div>
					</span>
					<span>
						<div class="valor">{nuevoAlumno.fisico}</div>
						<div class="titulo">FIS</div>
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
		<td class="mediarojo">
			{((nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)/6).toFixed()}</td>
		{:else}
		<td class="mediaverde">
			{((nuevoAlumno.ritmo+nuevoAlumno.tiro+nuevoAlumno.pase+nuevoAlumno.regate+nuevoAlumno.defensa+nuevoAlumno.fisico)/6).toFixed()}</td>
		{/if}
	</tr>
		<tr>
			<th>Ritmo</th>
			<td><Input type="number" required placeholder="0" step="1" min=0 max=99 bind:value = "{nuevoAlumno.ritmo}" /></td>
		</tr>
		<tr>
			<th>Tiro</th>
			<td><Input type="number" required placeholder="0" step="1" min=0  max=99 bind:value = "{nuevoAlumno.tiro}" /></td>
			</tr>
			<tr>
				<th>Pase</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 max=99 bind:value = "{nuevoAlumno.pase}" /></td>
			</tr>
			<tr>
				<th>Regate</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 max=99 bind:value = "{nuevoAlumno.regate}" /></td>
			</tr>
			<tr>
				<th>Defensa</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 max=99 bind:value = "{nuevoAlumno.defensa}" /></td>
			</tr>
			<tr>
				<th>Físico</th>
				<td><Input type="number" required placeholder="0" step="1" min=0 max=99 bind:value = "{nuevoAlumno.fisico}" /></td>
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

main{
	display: grid;
    grid-auto-flow: column;
    background: url(https://media.playstation.com/is/image/SCEA/fifa-19-stadium-background-blur-01-ps4-us-08jun18?$native_nt$) no-repeat center center/cover;
}

body {
	font-family: 'Saira Semi Condensed', sans-serif;
	font-weight: 400;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	min-height: 700px;
	background: transparent;
}

.desbloqueado{
	display: flex;
	flex-direction: column;
	height: 90px;
	width: 520px;
	padding:20px;
	border-radius: 5px;
	font-size: 18px;
	font-weight: bold;
	text-shadow: 2px 2px blanchedalmond;
	background-color:#eed882 ;
	justify-content: stretch;
	align-content: stretch;
	-webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 3px 2px 16px 8px rgba(0,0,0,0.42); 
	box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 3px 2px 16px 8px rgba(0,0,0,0.42);
}

th{
	background-color: #eed882;
	width: 80px;
	min-width: 80px;
	padding-left: 10px;
	padding-top: 7px;
}

td{
	width: 80px;
	min-width: 80px;
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

.pais {
    margin: 10px;
    padding: 4px 6px;
    display: inline-block;
}

.carta {
	width: 400px;
	height: 585px;
	background-image: url(/images/cartafifa.png);
	background-size: 100% 100%;
	padding: 58px 0;
}

.carta .carta-parte-arriba {
    display: grid;
    grid-template-columns: auto auto;
    color: black;
    padding: 0 25px;
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
}


.carta .carta-parte-arriba .carta-parte-izquierda .equipo {
	margin: 15px auto auto;
}

.carta .carta-parte-arriba .carta-parte-izquierda .equipo img {
    width: 60px;
}

.carta .carta-parte-arriba .carta-imagen {
	width: 200px;
	height: 200px;
	align-self: flex-end;
    margin-right: 40px;
	padding-right: 40px;
}

.carta .carta-parte-arriba .carta-imagen img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	position: relative;
	right: -25px;
}

.carta .carta-parte-abajo .estadisticas {
    padding-top: 25px;
    width: 80%;
    margin: 0 auto;
}

.carta .carta-parte-abajo .estadisticas .nombre-carta {
	text-align: center;
	font-size: 25px;
	text-transform: uppercase;
	border-bottom: 2px solid rgba(233, 204, 116, 0.397);
	padding-bottom: 5px;
	font-weight: bold;
}

.carta .carta-parte-abajo .estadisticas .atributos {
	margin: 10px auto;
	display: flex;
	justify-content: center;
}

.carta .carta-parte-abajo .estadisticas .atributos .atributos-col {
	border-right: 2px solid rgba(233, 204, 116, 0.979);
	padding: 0 40px;
}

.carta .carta-parte-abajo .estadisticas .atributos .atributos-col span {
	display: flex;
	font-size: 20px;
	text-transform: uppercase;
}

.carta .carta-parte-abajo .estadisticas .atributos .atributos-col span .valor {
	margin-right: 5px;
	font-weight: 700;
}

.carta .carta-parte-abajo .estadisticas .atributos .atributos-col span .titulo {
	font-weight: 300;
	
}

.carta .carta-parte-abajo .estadisticas .atributos .atributos-col:last-child {
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