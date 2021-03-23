<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import Pagination from "sveltestrap/src/Pagination.svelte";
	import {
		pop
    } from "svelte-spa-router";
    
	let profesores = [];
	let new_profesores = {
		"nombre": "",
		"year": 0,
		"trim_1": 0,
		"trim_2": 0,
		"trim_3":0
	};

	/* Select variables */
	let nombres = [];
	let years = [];
	let current_nombre= "-";
	let current_year= "-";
	let from= "-";
	let to= "-";
	let offset = 0;
	let limit = 10;
	let MensajeError = false;
	let MensajeCorrecto = false;

	onMount(get_all_profesores);

	async function get_all_profesores(offset) {
		console.log("Fetching get_all_profesores...");
		const res = await fetch("/api/v1/profesores?limit="+limit + "&offset="+ offset);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			profesores = json;

			nombres = json.map((d) => {
				return d.nombre;
			});
			nombres = Array.from(new Set(nombres));
				
			years = json.map((d) => {
				return d.year;
			});
			years = Array.from(new Set(years));
			console.log("Recibido " + profesores.length);
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insert_profesor() {
		console.log("Inserting profesor...");
		if (new_profesores.nombre == ""
			|| new_profesores.nombre == null
			|| new_profesores.year == ""
			|| new_profesores.year == null
			|| new_profesores.trim_1 == ""
			|| new_profesores.trim_1 == null
			|| new_profesores.trim_2 == ""
			|| new_profesores.trim_2 == null
			|| new_profesores.trim_3 == ""
			|| new_profesores.trim_3 == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
			const res = await fetch("/api/v1/profesores", {
				method: "POST",
				body: JSON.stringify(new_profesores),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if(res.status==409){
					alert("Profesor ya existentes");
				}else{
				get_all_profesores(offset);
				alert("Profesor insertada con éxito");
				}
			});
		};
	}

	async function delete_profesor(nombre, year) {
		console.log("Borrando profesor...");
		const res = await fetch("/api/v1/profesores" + "/" + nombre + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_profesores(offset);
			alert("Profesor borrada con éxito");
		});
	}

	async function delete_all_profesores() {
		console.log("Borrando todas las profesores...");
		const res = await fetch("/api/v1/profesores", {
			method: "DELETE"
		}).then(function (res) {
			get_all_profesores(offset);
			alert("Todas las profesores borradas con éxito");
		});
	}
	async function searchYears(nombre){
        console.log("Buscando por año...");
		const res = await fetch("/api/v1/profesores/" + nombre)
		
		if (res.ok){
            const json = await res.json();
			profesores = json;
			
			profesores.map((d)=>{
			return d.year;
			});
			alert("Busqueda encontrada");
			console.log("Años actualizados")
		}else {
			alert("No existe");
			console.log("ERROR!")
			get_all_profesores(offset);
		}
	}
	
	async function search(nombre, year){
        console.log("Buscando: " + nombre + "y " + year);
		
		var url = "/api/v1/profesores";

		if(nombre != "-" && year != "-") {
			url = url + "?nombre=" + nombre+ "&year=" + year;
		}else if(nombre != "-" && year == "-"){
			url = url + "?nombre=" + nombre;
		} else if(nombre == "-" && year != "-"){
			url = url + "?year=" + year;
		} 
		
		const res = await fetch(url);
        if (res.ok){
            console.log("OK:");
            const json = await res.json();
            profesores = json;
            alert("Busqueda encontrada");
            console.log("Found " + profesores.length);
        }else{
			alert("No existe");
			console.log("ERROR!");
			get_all_profesores(offset);
        }
	}
	
	async function searchRange(from, to){
        console.log("Buscando: " + from + "hasta" + to);
		
		var url = "/api/v1/profesores";

		if(from != "-" && to != "-") {
			url = url + "?from=" + from+ "&to=" + to;
		}else if(from != "-" && to == "-"){
			url = url + "?from=" + from;
		} else if(from == "-" && to != "-"){
			url = url + "?to=" + to;
		} 
		
		const res = await fetch(url);
        if (res.ok && from != "-" && to != "-"){
            console.log("OK:");
            const json = await res.json();
            profesores = json;
            alert("Busqueda encontrada");
            console.log("Found " + profesores.length);
        }else{
			alert("Introduzca el rango");
			console.log("ERROR!");
			get_all_profesores(offset);
        }
	}


	async function nextPage() {
		const res = await fetch("/api/v1/profesores/");
		const recursos = await res.json();
		if(offset < recursos.length - 10 ){
			offset = offset + 10;
			get_all_profesores(offset);
		}
	};
	async function previousPage() {
		if ( 0 <= offset - 10){
			offset = offset - 10;
			get_all_profesores(offset);
		}
	};
	async function loadInitialData() {
		console.log("Reiniciando recursos...");
		const res = await fetch("/api/v1/profesores/loadInitialData", {
			method: "GET"
		}).then(function (res) {
			get_all_profesores(offset);
			alert("Datos iniciales cargados");
		});
	}

</script>



<main>
	{#await profesores}
		Loading profesores...
	{:then profesores_}
	<Table >
		<tr>
			<td>
		<FormGroup> 
			
			<b><Label for="selectnombre">Búsqueda por nombre </Label></b>
				<Input type="select" name="selectnombre" id="selectnombre" bind:value="{current_nombre}">
				{#each nombres as nombre}
				<option>{nombre}</option>
				{/each}
				<option>-</option>
				</Input>
			
		
		</FormGroup>
		</td>
		<td>
		<FormGroup>
				<b><Label for="selectYear">Búsqueda por año</Label></b>
				
					<Input type="select" name="selectYear" id="selectYear" bind:value = "{current_year}">
					{#each years as year}
					<option>{year}</option>
					{/each}
					<option>-</option>
					</Input>
		</FormGroup>
		</td>
		<td class="align-middle" align="center">
		<Button outline color="secondary" on:click="{search(current_nombre, current_year)}">Buscar</Button>
	</td>	
	</tr>
		<p></p>
		<h6>Búsqueda por rango de años</h6>
		<tr>
		<td>
		<FormGroup>
			<Label for="selectFrom">Desde</Label>
			<Input type="select" name="selectFrom" id="selectFrom" bind:value = "{from}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
		</td>
		<td>	
		<FormGroup>
			<Label for="selectTo">Hasta</Label>
			<Input type="select" name="selectTo" id="selectTo" bind:value = "{to}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
	</td>	
		<td class="align-middle" align="center">
			<Button outline color="secondary" on:click="{searchRange(from, to)}">Buscar</Button>
		</td>
	</tr>
	</Table>
	<p></p>
	<Table bordered>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Año</th>
				<th>Trimestre 1</th>
				<th>Trimestre 2</th>
				<th>Trimestre 3</th>
				<th> Acciones </th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ej. argentina" bind:value = "{new_profesores.nombre}" /></td>
				<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_profesores.year}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{new_profesores['trim_1']}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{new_profesores['trim_2']}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{new_profesores['trim_3']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_profesor}>Insertar</Button></td>
			</tr>

			{#each profesores_ as profesores}
				<tr>

				
					<td>
						<a href="#/profesores/{profesores.nombre}/{profesores.year}"> 
						{profesores.nombre}
					</a>
					</td>
					<td>{profesores.year}</td>
					<td>{profesores['trim_1']}</td>
					<td>{profesores['trim_2']}</td>
					<td>{profesores['trim_3']}</td>
					<td><Button outline color= "danger" on:click = "{delete_profesor(profesores.nombre,profesores.year)}">Borrar</Button></td>
				</tr>
			{/each}
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</Table>
	{/await}
	<p align="center">
		<Button outline color="secondary" on:click="{previousPage}"> <b><strong><h4> &lt;</h4></strong></b></Button>
		<Button outline color="secondary" on:click="{nextPage}"><b><strong><h4> &gt;</h4> </strong></b></Button>
	</p>
		
		
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
	<Button outline color= "danger" on:click = {delete_all_profesores}>Borrar todo</Button>
	<Button outline color="primary" on:click="{loadInitialData}">Datos Iniciales</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>