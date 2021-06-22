<script>
	import Router, { wrap, push } from 'svelte-spa-router';
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
	import ActualizarProf from './profesoresAPI/ActualizarDatos.svelte';
	import { user } from "./stores";
	import { onMount } from "svelte";
	import axios from "axios";

	onMount(async () => {
    const { data } = await axios.get("api/auth/user");
    $user = data.user;
  });

	const routes =  {

		"/": Home,
		"/alumnos/:nombre/carta": ElegirCarta,
		"/profesores/importar/": Importar,
		"/profesores/ranking/": Ranking,
		"/alumnos/:nombre/cartaFifa": alumnosFifa,
		"/alumnos/:nombre/cartaSuperheroe": alumnosSuperheroe,
		"/profesores":profesores,
		"/profesores": profesoresAut,
		"/alumnos": alumnos,
		"/profesores/signup": SignUp,
		"/profesores/login": Login,
		"/alumnos/signup": SignUpAlum,
		"/alumnos/login": LoginAlum,
		"/profesores/perfil":PerfilProf,
		"/profileAlum": ProlifeAlum,
		"/profesores/actualizar": ActualizarProf,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>

<style>
</style>