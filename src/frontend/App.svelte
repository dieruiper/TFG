<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import profesores from './profesoresAPI/App.svelte';
	import alumnos from './alumnosAPI/App.svelte';
	import edit_profesores from './profesoresAPI/Edit_profesores.svelte';
	import edit_alumnos from './alumnosAPI/Edit_alumnos.svelte';
	import NotFound from './NotFound.svelte';

	const routes =  {

		"/": Home,

		"/profesoresAPI": profesores,
		"/alumnosAPI": alumnos,

		"/profesores/:nombre/:year": edit_profesores,
		"/alumnos/:nombre/:year": edit_alumnos,

		"*": NotFound
	};
</script>

<main>
	<h3>SOS1920-05</h3>
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