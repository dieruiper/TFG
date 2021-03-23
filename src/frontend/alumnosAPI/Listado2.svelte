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
    
	let alumnos = [];
	let new_alumnos = {
		"nombre": "",
		"year": 0,
		"trim1": 0,
		"trim2": 0,
		"trim3":0
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

	onMount(get_all_alumnos);

	async function get_all_alumnos(offset) {
		console.log("Fetching all alumnoss...");
		const res = await fetch("/api/v1/alumnos?limit="+limit + "&offset="+ offset);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			alumnos = json;

			nombres = json.map((d) => {
				return d.nombre;
			});
			nombres = Array.from(new Set(nombres));
				
			years = json.map((d) => {
				return d.year;
			});
			years = Array.from(new Set(years));
			console.log("Recibido " + alumnos.length);
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insert_alumno() {
		console.log("Inserting alumnos...");
		if (new_alumnos.nombre == ""
			|| new_alumnos.nombre == null
			|| new_alumnos.year == ""
			|| new_alumnos.year == null
			|| new_alumnos.trim1 == ""
			|| new_alumnos.trim1 == null
			|| new_alumnos.trim2 == ""
			|| new_alumnos.trim2 == null
			|| new_alumnos.trim3 == ""
			|| new_alumnos.trim3 == null) {
			alert("Es obligatorio completar todos los datos");
			console.log("ERROR!");
		} else {
			const res = await fetch("/api/v1/alumnos", {
				method: "POST",
				body: JSON.stringify(new_alumnos),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if(res.status==409){
					alert("Recurso ya existente");
				}else{
				get_all_alumnos(offset);
				alert("Recurso insertado con éxito");
				}
			});
		};
	}

	async function delete_alumno(nombre, year) {
		console.log("Borrando alumno...");
		const res = await fetch("/api/v1/alumnos" + "/" + nombre + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			get_all_alumnos(offset);
			alert("Recurso borrado con éxito");
		});
	}

	async function delete_all_alumnos() {
		console.log("Borrando todas los gastos...");
		const res = await fetch("/api/v1/alumnos", {
			method: "DELETE"
		}).then(function (res) {
			get_all_alumnos(offset);
			alert("Todos los recursos borrados");
		});
	}
	async function searchYears(nombre){
        console.log("Buscando por año...");
		const res = await fetch("/api/v1/alumnos/" + nombre)
		
		if (res.ok){
            const json = await res.json();
			alumnos = json;
			
			alumnos.map((d)=>{
			return d.year;
			});
			alert("Búsqueda encontrada");
			console.log("Años actualizados")
		}else {
			alert("No existe");
			console.log("ERROR!")
			get_all_alumnos(offset);
		}
	}
	
	async function search(nombre, year){
        console.log("Buscando: " + nombre + "y " + year);
		
		var url = "/api/v1/alumnos";

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
            alumnos = json;
            alert("Búsqueda encontrada");
            console.log("Found " + alumnos.length);
        }else{
			alert("No existe");
			console.log("ERROR!");
			get_all_alumnos(offset);
        }
	}
	
	async function searchRange(from, to){
        console.log("Buscando: " + from + "hasta" + to);
		
		var url = "/api/v1/alumnos";

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
            alumnos = json;
            alert("Búsqueda encontrada");
            console.log("Found " + alumnos.length);
        }else{
			alert("Introduzca el rango");
			console.log("ERROR!");
			get_all_alumnos(offset);
        }
	}


	async function nextPage() {
		const res = await fetch("/api/v1/alumnos/");
		const recursos = await res.json();
		if(offset < recursos.length - 10 ){
			offset = offset + 10;
			get_all_alumnos(offset);
		}
	};
	async function previousPage() {
		if ( 0 <= offset - 10){
			offset = offset - 10;
			get_all_alumnos(offset);
		}
	};

	async function loadInitialData() {
		console.log("Reiniciando recursos...");
		const res = await fetch("/api/v1/alumnos/loadInitialData", {
			method: "GET"
		}).then(function (res) {
			get_all_alumnos(offset);
			alert("Recursos Restablecidos");
		});
	}

</script>

	



<main>
	{#await alumnos}
		Loading alumnos...
	{:then alumnos_}
	<Table>
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
		</tr>
		<Button outline color="secondary" on:click="{search(current_nombre, current_year)}">Buscar</Button>
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
</tr>
		<Button outline color="secondary" on:click="{searchRange(from, to)}">Buscar</Button>
	
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
				<td><Input placeholder="Ej. argentina" bind:value = "{new_alumnos.nombre}" /></td>
				<td><Input type="number" required placeholder="Ej. 2020" bind:value = "{new_alumnos.year}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_alumnos['trim1']}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_alumnos['trim2']}" /></td>
				<td><Input type="number" required placeholder="0" step="0.01"  bind:value = "{new_alumnos['trim3']}" /></td>
				<td><Button outline color= "primary" on:click= {insert_alumno}>Insertar</Button></td>
			</tr>

			{#each alumnos_ as alumnos}
				<tr>

				
					<td>
						<a href="#/alumnos/{alumnos.nombre}/{alumnos.year}"> 
						{alumnos.nombre}
					</a>
					</td>
					<td>{alumnos.year}</td>
					<td>{alumnos['trim1']}</td>
					<td>{alumnos['trim2']}</td>
					<td>{alumnos['trim3']}</td>
					<td><Button outline color= "danger" on:click = "{delete_alumno(alumnos.nombre,alumnos.year)}">Borrar</Button></td>
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
	<p align="right">
		<Button outline color="secondary" on:click="{previousPage}"> <b><strong><h6> Página Anterior</h6></strong></b></Button>
		<Button outline color="secondary" on:click="{nextPage}"><b><strong><h6> Página Siguiente</h6> </strong></b></Button>
	</p>
		
		
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
	<Button outline color= "danger" on:click = {delete_all_alumnos}>Borrar todo</Button>
	<Button outline color="primary" on:click="{loadInitialData}">Restablecer recursos</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>