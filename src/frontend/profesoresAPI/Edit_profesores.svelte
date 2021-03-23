<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let profesores = {};
    let updated_nombre = "";
    let updated_year = "";
    let updated_trim_1 = "";
    let updated_trim_2 = "";
    let updated_trim_3 = "";

    onMount(get_profesores);

    async function get_profesores() {
        console.log("Fetching profesores...");
        const res = await fetch("/api/v1/profesores/" + params.nombre + "/" + params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            profesores = json;
            updated_nombre = profesores.nombre;
            updated_year = profesores.year;
            updated_trim_1 = profesores["trim_1"];
            updated_trim_2 = profesores["trim_2"];
            updated_trim_3 = profesores["trim_3"];
            console.log("Received profesor.");
        } else {
            console.log("ERROR!");
        }
    }
    async function update_profesores() {
        console.log("Updating profesores...");
        if (updated_nombre == ""
			|| updated_nombre == null
			|| updated_year == ""
			|| updated_year == null
			|| updated_trim_1 == ""
			|| updated_trim_1 == null
			|| updated_trim_2 == ""
			|| updated_trim_2 == null
			|| updated_trim_3 == ""
			|| updated_trim_3 == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
        const res = await fetch("/api/v1/profesores/" + params.nombre + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                nombre: params.nombre,
                year: parseInt(params.year),
                "trim_1": updated_trim_1,
                "trim_2": updated_trim_2,
                "trim_3": updated_trim_3
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            get_profesores();
            if(res.ok){
                alert("Profesor actualizada con éxito");
            }else{
                alert("Introduce correctamente los datos");
            }
        })
        }}
</script>
<main>
    <h3>Editar datos: <strong>{params.nombre}</strong> <strong>{params.year}</strong> </h3>
    {#await profesores}
        Loading profesores...
    {:then profesores}
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
                    <td>{updated_nombre}</td>
                    <td>{updated_year}</td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_trim_1}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_trim_2}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updated_trim_3}"></td>
                    <td> <Button outline  color="primary" on:click={update_profesores}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>