<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import profesores from './profesoresAPI/App.svelte';
	import profesoresAut from "./profesoresAPI/Dashboard.svelte";
	import alumnos from './alumnosAPI/App.svelte';
	import alumnosFifa from "./alumnosAPI/DashboardFifa.svelte";
	import alumnosSuperheroe from "./alumnosAPI/DashboardSuperheroe.svelte";
	import ElegirCarta from "./alumnosAPI/ElegirCarta.svelte";
	import NotFound from './NotFound.svelte';
	import SignUp from "./profesoresAPI/SignUp.svelte";
  	import Login from "./profesoresAPI/Login.svelte";
	import Importar from "./profesoresAPI/Importar.svelte";
	import SignUpAlum from "./alumnosAPI/SignUp.svelte";
  	import LoginAlum from "./alumnosAPI/Login.svelte";
	import PerfilProf from "./profesoresAPI/Perfil.svelte";
	import Ranking from "./profesoresAPI/Ranking.svelte";
	import ProlifeAlum from "./alumnosAPI/Profile.svelte";
	//import Dashboard from "./profesoresAPI/Dashboard.svelte";
  	import Loading from "./components/Loading.svelte";
	import ActualizarProf from './profesoresAPI/ActualizarDatos.svelte';
	
	const routes =  {

		"/": Home,
		"/alumnos/:nombre/carta": ElegirCarta,
		"/profesores/importar/": Importar,
		"/profesores/ranking/": Ranking,
		"/alumnos/:nombre/cartaFifa": alumnosFifa,
		"/alumnos/:nombre/cartaSuperheroe": alumnosSuperheroe,
		"/profesoresAPI": profesores,
		"/profesores": profesoresAut,
		"/alumnosAPI": alumnos,
		//"/alumnos": alumnosAut,
		"/profesoresAPI/signup": SignUp,
		"/profesoresAPI/login": Login,
		"/alumnosAPI/signup": SignUpAlum,
		"/alumnosAPI/login": LoginAlum,
		"/profesores/perfil": PerfilProf,
		"/profileAlum": ProlifeAlum,
		"/profesoresAPI/actualizar": ActualizarProf,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>

<style>
</style>