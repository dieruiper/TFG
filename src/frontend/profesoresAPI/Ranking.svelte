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
    import Input from "sveltestrap/src/Input.svelte";
    import {
	  profesores,
	  sortedProfesores,
	  income,
	  expenses,
	  balance,
      user,
      ranking
	} from "../stores";
    import { userAlum } from "../storesAlum";
    onMount(getTodo);
    let array = []
    let alumnosOrdenados;
    async function getTodo (){
        console.log("Obteniendo...");
        const {data} = await axios("/api/profesores");
        $ranking = data
        for(let i=0;i<data.length;i++){
            let total = data[i].trimestre1 + data[i].trimestre2 +data[i].trimestre3;
            array.push({nombre: data[i].nombre,total: total})
        }
        function compare(a, b) {
        const bandA = a.total;
        const bandB = b.total;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
        }
        let arrayOrdenado = array.sort(compare)
        $ranking = arrayOrdenado.slice(0,5)
        
        console.log( $ranking)

        /*
	const response = await axios("/api/profesores");
	for(let i=0;i<response.data.length;i++){
		if (response.data[i].profesor === nuevoAlumno.profesor && nuevoAlumno.nombre === response.data[i].nombre){
			total = response.data[i].trimestre1 + response.data[i].trimestre2 +response.data[i].trimestre3;
			console.log(total);
		}
	}*/
    }

    

</script>
<main>
	{#await  ranking}
		Loading alumnosOrdenados...
	{:then ranking_}   
    {#each $ranking as ranking}
        <div>Alumno: {ranking.nombre} , Puntos totales: {ranking.total}</div>
    <hr />
    {/each}
	{/await}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>