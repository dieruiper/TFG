<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import profesores from './profesoresAPI/App.svelte';
	import profesoresAut from "./profesoresAPI/Dashboard.svelte";
	import alumnos from './alumnosAPI/App.svelte';
	import alumnosAut from "./alumnosAPI/Dashboard.svelte";
	import NotFound from './NotFound.svelte';
	import SignUp from "./profesoresAPI/SignUp.svelte";
  	import Login from "./profesoresAPI/Login.svelte";
	import Importar from "./profesoresAPI/Importar.svelte";
	import SignUpAlum from "./alumnosAPI/Signup.svelte";
  	import LoginAlum from "./alumnosAPI/Login.svelte";
	import ProlifeProf from "./profesoresAPI/Profile.svelte";
	import ProlifeAlum from "./alumnosAPI/Profile.svelte";
	//import Dashboard from "./profesoresAPI/Dashboard.svelte";
	import Navbar from "./components/Navbar.svelte";
  	import Loading from "./components/Loading.svelte";
	import ActualizarProf from './profesoresAPI/ActualizarDatos.svelte';
	const routes =  {

		"/": Home,
		"/profesores/importar/": Importar,
		"/alumnos/:nombre/": alumnosAut,
		"/profesoresAPI": profesores,
		"/profesores": profesoresAut,
		"/alumnosAPI": alumnos,
		//"/alumnos": alumnosAut,
		"/profesoresAPI/signup": SignUp,
		"/profesoresAPI/login": Login,
		"/alumnosAPI/signup": SignUpAlum,
		"/alumnosAPI/login": LoginAlum,
		"/profileProf": ProlifeProf,
		"/profileAlum": ProlifeAlum,
		"/profesoresAPI/actualizar": ActualizarProf,
		"*": NotFound
	};
</script>

<main>
	<h3>TFG</h3>
	<Router {routes} />
</main>

<style>
	h3 {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		color: #1C1A67;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>