<script>

import Button from "sveltestrap/src/Button.svelte";
import { onMount } from "svelte";
import axios from "axios";
import { userAlum } from "../storesAlum";
import { push } from "svelte-spa-router";
export let params = {};
let usuario;
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
async function logout() {
    await axios.post("/api/auth/logout");
    $userAlum = null;
    push("/");
  }

async function getAlumno (){
	const {data} = await axios.get("/api/alumnos/"+params.nombre);
	console.log(data[0])
	nuevoAlumno = data[0];
	usuario = nuevoAlumno.nombre
}
</script>
<main>
    {#await nuevoAlumno}
	Loading alumnos...
	{:then nuevoAlumno_}
	<nav class="barraSup">
		<div class="contenedor">
		  <div class="navbar-brand">
			  <span class="title">¡Bienvenido {usuario}!</span>
			<span
			  class="navbar-burger burger">
			  <span aria-hidden="true" />
			  <span aria-hidden="true" />
			  <span aria-hidden="true" />
			</span>
		  </div>
			<Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
		</div>
	  </nav>
	  <hr /> 
	  <h1>¡Elige dónde quieres ver tus puntos conseguidos!</h1>
    <body>
<div class="cartafifa" >
	<div class="cartafifa-parte-arriba">
		<div class="cartafifa-parte-izquierda">
			<div class="valoracion">
				<span></span>
			</div>
			<div class="posicion">
				<span></span>
			</div>
			<div class="pais">
			</div>
		</div>
		<div class="cartafifa-imagen">
			<img src="https://static.vecteezy.com/system/resources/previews/001/204/011/non_2x/soccer-ball-png.png" alt="Balon" draggable="false"/>
			<div class="player-extra">
			</div>
		</div>
	</div>
	<div class="player-card-bottom">
		<div class="player-info">
			<!-- Player Name-->
			<div class="player-name">
				<span></span>
			</div>
			<!-- Player Features-->
			<div class="player-features">
				<p></p>
			<div class="nombreCartaFifa">
			<h3>CARTA DE</h3>
			<h2>FÚTBOL: FIFA</h2>
			</div>
				<p><Button color="dark" href="#/alumnos/{nuevoAlumno.nombre}/cartaFifa">Elegir</Button></p>
			</div>
		</div>
	</div>
</div>
<div class="cartasuperheroe" >
    
	<div class="cartasuperheroe-parte-arriba">
        
		<div class="cartasuperheroe-parte-izquierda">

			<div class="valoracion">
				<span></span>
			</div>
			<div class="posicion">
				<span></span>
			</div>
			<div class="pais">
			</div>
		</div>
		<div class="cartasuperheroe-imagen">
            <img class="superfoto" src="images/mascara-superheroe.png" alt="Hero" draggable="false"/>
			<div class="player-extra">
			</div>
		</div>
	</div>
	<div class="player-card-bottom">
		<div class="player-info">
			<!-- Player Name-->
			<div class="player-name">
				<span></span>
			</div>
			<!-- Player Features-->
			<div class="player-features">
			<p></p>
		<div class="nombreCartaSuper">
			<h3>CARTA DE </h3>
			<h2>SUPERHEROES</h2>
		</div>
			<p><Button color="primary" href="#/alumnos/{nuevoAlumno.nombre}/cartaSuperheroe">Elegir</Button></p>
			</div>
		</div>
	</div>
</div>
</body>
{/await}
</main>
<style>
	* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
.superfoto{
	filter: invert(100%);
  -webkit-filter: invert(100%);
}
body {
	font-family: 'Saira Semi Condensed', sans-serif;
	font-weight: 400;
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: grid;
	grid-auto-flow: column;
	grid-template-rows: auto;
	grid-template-columns: auto auto;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	width: 100%;
	/*background: url("https://media.playstation.com/is/image/SCEA/fifa-19-stadium-background-blur-01-ps4-us-08jun18?$native_nt$") no-repeat center center/cover;*/
}
.nombreCartaSuper{
	background: rgb(203, 225, 253);
  border-radius: 10px;
  box-shadow: 0 7px 10px rgba(28, 61, 245, 0.74);
  text-align: center;
  padding:20px;
   margin-left: 25%;
   margin-right: 25%;
   margin-bottom: 20px;
}
.nombreCartaFifa{
	background: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0 7px 10px rgba(219, 205, 7, 0.74);
  text-align: center;
  padding:20px;
   margin-bottom: 20px;
}
body:after {
	font-size: 1rem;
	color: #aaa;
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 2;
}

h1{
	text-align: center;
	margin:10px;
	margin-left:15%;
	margin-right:15%;
	padding-top: 10px;
	padding-bottom: 10px;
	background: rgb(255,231,110);
background: linear-gradient(90deg, rgba(255,231,110,1) 0%, rgba(0,54,111,1) 100%);


	color: white;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 5px 5px rgba(8, 8, 1, 0.74);
}
/*
  *** cartafifa styles ***
*/

.cartafifa {
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

.cartasuperheroe {
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

.cartafifa .cartafifa-parte-arriba {
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	color: black;
	padding: 0 1.5rem;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda {
	position: absolute;
	line-height: 2.2rem;
	font-weight: 300;
	padding: 1.5rem 0;
	text-transform: uppercase;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda .valoracion {
	font-size: 2rem;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda .posicion {
	font-size: 1.4rem;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda .pais {
	display: block;
	width: 2rem;
	height: 25px;
	margin: 0.3rem 0;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda .pais img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda .player-club {
	display: block;
	width: 2.1rem;
	height: 40px;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-parte-izquierda .player-club img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-imagen {
	width: 200px;
	height: 200px;
	margin: 0 auto;
	overflow: hidden;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-imagen img {
	width: 80%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
	position: relative;
	right: -1.5rem;
	bottom: 0;
}

.cartafifa .cartafifa-parte-arriba .cartafifa-imagen .player-extra {
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

.cartafifa .cartafifa-parte-arriba .cartafifa-imagen .player-extra span {
	margin-left: 0.6rem;
	text-shadow: 2px 2px #333;
}

.cartafifa .player-card-bottom {
	position: relative;
}

.cartafifa .player-card-bottom .player-info {
	display: block;
	padding: 0.3rem 0;
	color: white;
	width: 90%;
	margin: 0 auto;
	height: auto;
	position: relative;
	z-index: 2;
}

.cartafifa .player-card-bottom .player-info .player-name {
	width: 100%;
	display: block;
	text-align: center;
	font-size: 1.6rem;
	text-transform: uppercase;
	border-bottom: 2px solid rgba(233, 204, 116, 0.1);
	padding-bottom: 0.3rem;
	overflow: hidden;
}

.cartafifa .player-card-bottom .player-info .player-name span {
	display: block;
	text-shadow: 2px 2px #111;
}

.cartafifa .player-card-bottom .player-info .player-features {
	margin: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.cartafifa .player-card-bottom .player-info .player-features .player-features-col {
	border-right: 2px solid rgba(233, 204, 116, 0.1);
	padding: 0 2.3rem;
}

.cartafifa .player-card-bottom .player-info .player-features .player-features-col span {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	font-size: 1.2rem;
	text-transform: uppercase;
}

.cartafifa .player-card-bottom .player-info .player-features .player-features-col span .player-feature-value {
	margin-right: 0.3rem;
	font-weight: 700;
	color: black;
}

.cartafifa .player-card-bottom .player-info .player-features .player-features-col span .player-feature-title {
	font-weight: 300;
	color: black;
}

.cartafifa .player-card-bottom .player-info .player-features .player-features-col:last-child {
	border: 0;
}

.cartasuperheroe .cartasuperheroe-parte-arriba {
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	color: black;
	padding: 0 1.5rem;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda {
	position: absolute;
	line-height: 2.2rem;
	font-weight: 300;
	padding: 1.5rem 0;
	text-transform: uppercase;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda .valoracion {
	font-size: 2rem;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda .posicion {
	font-size: 1.4rem;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda .pais {
	display: block;
	width: 2rem;
	height: 25px;
	margin: 0.3rem 0;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda .pais img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda .player-club {
	display: block;
	width: 2.1rem;
	height: 40px;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-parte-izquierda .player-club img {
	width: 100%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-imagen {
	width: 200px;
	height: 200px;
	margin: 0 auto;
	overflow: hidden;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-imagen img {
	width: 80%;
	height: 100%;
	-o-object-fit: contain;
	object-fit: contain;
	position: relative;
	right: -1.5rem;
	bottom: 0;
}

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-imagen .player-extra {
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

.cartasuperheroe .cartasuperheroe-parte-arriba .cartasuperheroe-imagen .player-extra span {
	margin-left: 0.6rem;
	text-shadow: 2px 2px #333;
}

.cartasuperheroe .player-card-bottom {
	position: relative;
}

.cartasuperheroe .player-card-bottom .player-info {
	display: block;
	padding: 0.3rem 0;
	color: rgb(18, 0, 119);
	width: 90%;
	margin: 0 auto;
	height: auto;
	position: relative;
	z-index: 2;
	font-weight: bold;
}

.cartasuperheroe .player-card-bottom .player-info .player-name {
	width: 100%;
	display: block;
	text-align: center;
	font-size: 1.6rem;
	text-transform: uppercase;
	border-bottom: 2px solid rgba(233, 204, 116, 0.1);
	padding-bottom: 0.3rem;
	overflow: hidden;
}

.cartasuperheroe .player-card-bottom .player-info .player-name span {
	display: block;
	text-shadow: 2px 2px #111;
}

.cartasuperheroe .player-card-bottom .player-info .player-features {
	margin: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.cartasuperheroe .player-card-bottom .player-info .player-features .player-features-col {
	border-right: 2px solid rgba(233, 204, 116, 0.1);
	padding: 0 2.3rem;
}

.cartasuperheroe .player-card-bottom .player-info .player-features .player-features-col span {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	font-size: 1.2rem;
	text-transform: uppercase;
}

.cartasuperheroe .player-card-bottom .player-info .player-features .player-features-col span .player-feature-value {
	margin-right: 0.3rem;
	font-weight: 700;
	color: rgb(1, 3, 131);
}

.cartasuperheroe .player-card-bottom .player-info .player-features .player-features-col span .player-feature-title {
	font-weight: 300;
	color: rgb(19, 0, 102);
}

.cartasuperheroe .player-card-bottom .player-info .player-features .player-features-col:last-child {
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
	grid-template-columns: auto  120px;
}
</style>