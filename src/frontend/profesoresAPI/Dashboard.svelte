<script>
	import axios from "axios";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import Transaction from "../components/Transaction.svelte";
	import SummaryCard from "../components/SummaryCard.svelte";
	import Loading from "../components/Loading.svelte";
	import {pop} from "svelte-spa-router";
	import { onMount } from "svelte";
	import {
	  transactions,
	  sortedTransactions,
	  income,
	  expenses,
	  balance
	} from "../stores";
  
	let input = 0;
  
	const newTransaction = {
			nombre: "",
			contraseña: "",
			trimestre1: 0,
			trimestre2: 0,
			trimestre3: 0,
		};

onMount(getTodo);

async function getTodo (){
	console.log("Obteniendo...");
	const {data} = await axios("/api/transactions");
	$transactions = data;
}

async function addTransaction() {
		console.log("Añadiendo...");
		const response = await axios.post("/api/transactions", newTransaction);
		$transactions = [response.data, ...$transactions];
		input = 0;
	}
async function removeTransaction(id) {
		console.log("Borrando...");
	  	const response = await axios.delete("/api/transactions/" + id);
	  	if (response.data.id === id) {
			$transactions = $transactions.filter(t => t._id !== id);
	  	}
	}

  </script>
<main>
	{#await transactions}
		Loading profesores...
	{:then transactions_}

	<Table bordered>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Contraseña</th>
				<th>Trimestre 1</th>
				<th>Trimestre 2</th>
				<th>Trimestre 3</th>
				<th><Button outline href="#/profesoresAPI/actualizar" color="primary">Modificar Datos</Button></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Input placeholder="Ej. argentina" required bind:value = "{newTransaction.nombre}" /></td>
				<td><Input required placeholder="Ej. 2020" bind:value = "{newTransaction.contraseña}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{newTransaction.trimestre1}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{newTransaction.trimestre2}" /></td>
				<td><Input type="number" required placeholder="0" step="1"  bind:value = "{newTransaction.trimestre3}" /></td>
				<td><Button outline color= "primary" on:click={addTransaction}>Insertar</Button></td>
			</tr>
			{#each $transactions as transactions (transactions._id)}
			<tr>
				<td>{transactions.nombre}</td>
				<td>{transactions.contraseña}</td>
				<td>{transactions.trimestre1}</td>
				<td>{transactions.trimestre2}</td>
				<td>{transactions.trimestre3}</td>
			</tr>
			{/each}
			</tbody>
	</Table>
	{/await}
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		margin: 0 auto;
	}
</style>
  