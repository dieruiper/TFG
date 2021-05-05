<main>
	<body>
		<profesores>
			<h1><p><a href="#/profesoresAPI"> PROFESORES </a></p></h1>
			<a href="#/profesoresAPI"><img src="images/profesores.jpg" alt="profesores"  /></a>
			<p><a href='https://www.freepik.es/vectores/personas'>Vector de Personas creado por freepik - www.freepik.es</a></p>
		
		</profesores>
		<alumnos>
			<h1><p><a href="#/alumnosAPI"> ALUMNOS </a></p></h1>
			<a href="#/alumnosAPI"><img src="images/alumnos.jpg" alt="alumnos" /></a>
			<p><a href='https://www.freepik.es/vectores/fondo'> Vector de Fondo creado por iconicbestiary - www.freepik.es</a></p>
		</alumnos>
	</body>
</main>

<style>
	main {
		text-align: center;
		margin: 0;
  		padding: 0;
  		box-sizing: border-box;
		--color-main: hsl(206, 47%, 9%);
		--gradiente-main: linear-gradient(to bottom,#fff6dd,#d1bc75,#aa800f);
		background-color: var(--color-main);
  		background-image: var(--gradiente-main);
	}
	body{
		display: grid;
		place-content: center stretch;
		margin: 10vh;
		height: auto;
		gap: 10px ;
		grid-template-columns: auto auto;
		--color-main: hsl(206, 47%, 9%);
		--gradiente-main: linear-gradient(to bottom,#fff6dd,#d1bc75,#aa800f);
		background-color: var(--color-main);
  		background-image: var(--gradiente-main);
	}
	profesores{
		text-align: center;
	}
	alumnos{
		text-align: center;
	}
	img {
		width: 30vw;
		height: 50vh;
		border-radius: 40px;
	}
</style>
