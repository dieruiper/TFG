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
	  profesores,
	  sortedProfesores,
	  income,
	  expenses,
	  balance
	} from "../stores";

    let updated_nombre = "";
    let updated_contraseña = "";
    let updated_trim_1 = 0;
    let updated_trim_2 = 0;
    let updated_trim_3 = 0;
    
    onMount(getTodo);

    async function getTodo (){
        console.log("Obteniendo...");
        const {data} = await axios("/api/profesores");
        $profesores = data;
    }
    
    async function confirmarUpdate() {
        console.log("Confirmando...");
    }

    async function actualizarDatos(nombre,contraseña,trimestre1,trimestre2,trimestre3) {
        console.log("Actualizado..."+nombre);
        const res = await axios({
            method: "PUT",
            url:"/api/profesores/"+nombre,
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

    async function removeProfesor(id) {
		console.log("Borrando...");
	  	const response = await axios.delete("/api/profesores/" + id);
	  	if (response.data.id === id) {
			$profesores = $profesores.filter(t => t._id !== id);
	  	}
	}
</script>
<main>
	{#await profesores}
		Loading profesores...
	{:then profesores_}

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
			{#each $profesores as profesores (profesores._id)}
			<tr>
				<td>{profesores.nombre}</td>
				<td><input type="password" required bind:value="{profesores.contraseña}" readonly></td>
				<td><input required type="number" step="1" min="0" bind:value="{profesores.trimestre1}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{profesores.trimestre2}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{profesores.trimestre3}"></td>
                <td><Button outline href="#/profesoresAPI/actualizar" color="primary" on:click={() => 
                    actualizarDatos(profesores.nombre,profesores.contraseña,profesores.trimestre1,profesores.trimestre2,profesores.trimestre3)}>Actualizar</Button></td>
				<td><Button outline color= "danger" on:click={() => removeProfesor(profesores._id)} >Borrar</Button></td>
			</tr>
			{/each}
			</tbody>
	</Table>
	{/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>