<script>

import Button from "sveltestrap/src/Button.svelte";
import { onMount } from "svelte";
import axios from "axios";
import { userAlum } from "../storesAlum";
import { push } from "svelte-spa-router";
export let params = {};
let isActive;
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
			<Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
		</div>
	  </nav>
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
				<!--<img src="https://selimdoyranli.com/cdn/cartafifa/img/argentina.svg" alt="Argentina" draggable="false"/>-->
			</div>
		</div>
		<div class="cartafifa-imagen">
			<!--<img src="https://selimdoyranli.com/cdn/cartafifa/img/messi.png" alt="Messi" draggable="false"/>-->
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
				<div class="player-features-col">
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">RIT</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">TIR</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">PAS</div>
					</span>
				</div>
				<div class="player-features-col">
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">REG</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">DEF</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">FIS</div>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
<Button href="#/alumnos/{nuevoAlumno.nombre}/cartaFifa">Elegir</Button>
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
				<!--<img src="https://selimdoyranli.com/cdn/cartafifa/img/argentina.svg" alt="Argentina" draggable="false"/>-->
			</div>
		</div>
		<div class="cartasuperheroe-imagen">
            
			<!--<img src="https://selimdoyranli.com/cdn/cartafifa/img/messi.png" alt="Messi" draggable="false"/>-->
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
				<div class="player-features-col">
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">RIT</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">TIR</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">PAS</div>
					</span>
				</div>
				<div class="player-features-col">
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">REG</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">DEF</div>
					</span>
					<span>
						<div class="player-feature-value"></div>
						<div class="player-feature-title">FIS</div>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
<Button href="#/alumnos/{nuevoAlumno.nombre}/cartaSuperheroe">Elegir</Button>
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
	width: 100%;
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
	color: #e9cc74;
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
	margin: 0.5rem auto;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
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
	color: white;
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
	width: 100%;
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
	color: #e9cc74;
	width: 90%;
	margin: 0 auto;
	height: auto;
	position: relative;
	z-index: 2;
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
	margin: 0.5rem auto;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
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
	color: #e9cc74;
}

.cartasuperheroe .player-card-bottom .player-info .player-features .player-features-col span .player-feature-title {
	font-weight: 300;
	color: #e9cc74;
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