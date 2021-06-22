<script>
	import Button from "sveltestrap/src/Button.svelte";
</script>
<main>
	<body>
		<!--Barra superior-->
		<nav class="barraSup">
			<div class="container">
			  <div class="navbar-brand">
				<a href="#/" class="navbar-item">
				  <span class="title"></span>
				</a>
				<span
				  class="navbar-burger burger">
				  <span aria-hidden="true" />
				  <span aria-hidden="true" />
				  <span aria-hidden="true" />
				</span>
			  </div>
			  
			</div>
		  </nav>
		<!--Principal-->
		<div class="menu">
			<div class="barra">
				
				<h1>BIENVENIDO</h1>
				
			</div>
		<div class="profesores">
			
			<h1><p><Button color="primary" href="#/profesores/login"> ACCESO PARA PROFESORES </Button></p></h1>
			<a href="#/profesores/login"><img src="images/profesores.jpg" alt="profesores"  /></a>
			<p class="fuente_pequeña"></p>
		
		</div>
		<div class="alumnos">
		
			<h1><p><Button size="x-large" color="primary" href="#/alumnos/login">ACCESO PARA ALUMNOS </Button></p></h1>
			<a href="#/alumnos/login"><img src="images/alumnos.jpg" alt="alumnos" /></a>
			<p class="fuente_pequeña"></p>
		
		</div>
		<div class="atribuido">
			<p class="fuente_pequeña"><a  href='https://www.freepik.es/vectores/personas'>Vector de Personas creado por freepik - www.freepik.es</a></p>
		</div>
	</div>
	</body>

</main>
<style>
	main {
		text-align: center;
		margin: 0;
  		padding: 0;
  		box-sizing: border-box;
	}
	.menu{
		display: grid;
		height: 100vh;
		width: 100vw;
		grid-template-rows: 15vh auto 10vh;
		grid-template-columns: auto auto;
	}
	.barra{
		background-color: #007bff;
		grid-column-start:1;
		grid-column-end: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: xx-large;
		margin-top: 5vh;
		margin-left: auto;
		margin-right: auto;	
		padding: 5vh;
		color: white;
		border-radius: 10px;
	}
	.atribuido{
		grid-column-start:1;
		grid-column-end: 3;
		text-align: center;
	}

	.profesores{
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.alumnos{
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.fuente_pequeña{
		font-size:x-small;
		
	}
	img {
		width: 600px;
		height: 400px;
		border-radius: 40px;
		box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.35);
	}
	.barraSup{
		background-color:#007bff;
		padding-top: 2vh;
		padding-bottom: 2vh;
	}
	
</style>
