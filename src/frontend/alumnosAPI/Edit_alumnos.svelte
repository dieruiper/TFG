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
    let alumnos = {};
    let updated_nombre = "";
    let updated_year = "";
    let updated_trim1 = "";
    let updated_trim2 = "";
    let updated_trim3 = "";

    onMount(get_alumnos);

    async function get_alumnos() {
        console.log("Fetching alumnos...");
        const res = await fetch("/api/v1/alumnos/" + params.nombre + "/" + params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            alumnos = json;
            updated_nombre = alumnos.nombre;
            updated_year = alumnos.year;
            updated_trim1 = alumnos["trim1"];
            updated_trim2 = alumnos["trim2"];
            updated_trim3 = alumnos["trim3"];
            console.log("Received resource.");
        } else {
            console.log("ERROR!");
        }
    }
    async function update_alumnos() {
        console.log("Updating alumnos...");
        if (updated_nombre == ""
			|| updated_nombre == null
			|| updated_year == ""
			|| updated_year == null
			|| updated_trim1 == ""
			|| updated_trim1 == null
			|| updated_trim2 == ""
			|| updated_trim2 == null
			|| updated_trim3 == ""
			|| updated_trim3 == null) {
			alert("Es obligatorio completar todos los recursos");
			console.log("ERROR!");
		} else {
        const res = await fetch("/api/v1/alumnos/" + params.nombre + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                nombre: params.nombre,
                year: parseInt(params.year),
                "trim1": updated_trim1,
                "trim2": updated_trim2,
                "trim3": updated_trim3
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            get_alumnos();
            if(res.ok){
                alert("Datos actualizados");
            }else{
                alert("Introduce correctamente los datos");
            }
        })
        }}
</script>
<main>
    <h3>Editar datos: <strong>{params.nombre}</strong> <strong>{params.year}</strong> </h3>
    {#await alumnos}
        Loading alumnos...
    {:then alumnos}
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
                    <td><input required type="number" step="0.01" min="0" bind:value="{updated_trim1}"></td>
                    <td><input required type="number" step="0.01" min="0" bind:value="{updated_trim2}"></td>
                    <td><input required type="number" step="0.01" min="0" bind:value="{updated_trim3}"></td>
                    <td> <Button outline  color="primary" on:click={update_alumnos}>Editar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>