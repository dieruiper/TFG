<script>
    import axios from "axios";
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {
	  transactions,
	  sortedTransactions,
	  income,
	  expenses,
	  balance
	} from "../stores";

    let profesores = {};
    let updated_nombre = "";
    let updated_contraseña = "";
    let updated_trim_1 = 0;
    let updated_trim_2 = 0;
    let updated_trim_3 = 0;
    
    onMount(getTodo);

    async function getTodo (){
        console.log("Obteniendo...");
        const {data} = await axios("/api/transactions");
        $transactions = data;
    }
    
    async function confirmarUpdate() {
        console.log("Confirmando...");
    }

    async function actualizarDatos(nombre,contraseña,trimestre1,trimestre2,trimestre3) {
        console.log("Actualizado..."+nombre);
        console.log(contraseña);
        const res = await axios({
            method: "PUT",
            url:"/api/transactions/"+nombre,
            data: {
                nombre: nombre,
                contraseña: contraseña,
                trimestre1: trimestre1,
                trimestre2: trimestre2,
                trimestre3: trimestre3
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
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
			</tr>
		</thead>
		<tbody>
			{#each $transactions as transactions (transactions._id)}
			<tr>
				<td>{transactions.nombre}</td>
				<td><input required bind:value="{transactions.contraseña}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{transactions.trimestre1}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{transactions.trimestre2}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{transactions.trimestre3}"></td>
                <td><Button outline href="#/profesoresAPI/actualizar" color="primary" on:click={() => 
                    actualizarDatos(transactions.nombre,transactions.contraseña,transactions.trimestre1,transactions.trimestre2,transactions.trimestre3)}>Actualizar</Button></td>
				<td><Button outline color= "danger" on:click={() => removeTransaction(transactions._id)} >Borrar</Button></td>
			</tr>
			{/each}
			</tbody>
	</Table>
	{/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>