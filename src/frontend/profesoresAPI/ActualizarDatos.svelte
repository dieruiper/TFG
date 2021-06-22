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
      user
	} from "../stores";
    import {
        alumnos,
	} from "../storesAlum";
    let updated_nombre = "";
    let updated_contraseña = "";
    let updated_trim_1 = 0;
    let updated_trim_2 = 0;
    let updated_trim_3 = 0;
	let busqueda ="";
    let nuevoAlumno = {
			nombre: "",
			nombreCarta: "",
			valoracion: 0,
			posicion: "",
			pais: "",
			equipo: "",
			squad: "",
			ritmo: 0,
			tiro: 0,
			pase: 0,
			regate: 0,
			defensa: 0,
			fisico: 0,
			profesor: "",
			imagen:"",
		};

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
        if(trimestre1+trimestre2+trimestre3>99){
            alert("La suma total debe ser menor que 100\nPor favor compruébelo y actualice")
        }
        else{
            const {data} = await axios.get("/api/alumnos/"+nombre);
	        nuevoAlumno = data[0];
            console.log(nuevoAlumno)

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
        
        const response3 = await axios.put("/api/alumnos/"+nombre, {
		nombre:nuevoAlumno.nombre,
		nombreCarta:nuevoAlumno.nombreCarta,
		valoracion: trimestre1 + trimestre2 + trimestre3,
		posicion: nuevoAlumno.posicion,
		pais: nuevoAlumno.pais,
		equipo: nuevoAlumno.equipo,
		squad: nuevoAlumno.squad,
		ritmo:nuevoAlumno.ritmo,
		tiro:nuevoAlumno.tiro,
		pase:nuevoAlumno.pase,
		regate:nuevoAlumno.regate,
		defensa:nuevoAlumno.defensa,
		fisico:nuevoAlumno.fisico,
		profesor:nuevoAlumno.profesor,
		imagen: nuevoAlumno.imagen
	  });
        }
    }

    async function removeProfesor(id) {
		console.log("Borrando...");
	  	const response = await axios.delete("/api/profesores/" + id);
	  	if (response.data.id === id) {
			$profesores = $profesores.filter(t => t._id !== id);
	  	}
	}
    async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    $profesores = [];
    push("/");
  }
  async function Buscar(nombre){
	const {data} = await axios("/api/profesores");
	$profesores = data;
	if(nombre != ""){
		let contador=0;
		console.log(nombre)
		for(let i=0;i<data.length;i++){
			if(data[i].nombre.toLowerCase().includes(nombre.toLowerCase())==true){
				contador = contador+1;
				$profesores = $profesores.filter(t => t.nombre.toLowerCase().includes(nombre.toLowerCase()) == true)
			}
		}
		if (contador==0){
			$profesores = "";
			alert("Búsqueda no encontrada:\n No se ha encontrado ningún nombre donde se incluya: "+nombre+".\n Pulse 🔄 si quiere volver a ver todos los alumnos" )
		}else{
			alert("Búsqueda encontrada:\n Se ha encontrado "+contador+" nombre(s) donde se incluya: "+nombre+".\n Pulse 🔄 si quiere volver a ver todos los alumnos")
		}
	/*for(let i=0;i<data.length;i++){
		if(data[i].nombre.includes(nombre)===true){
			$profesoresBusqueda = data[i]
		}
	}*/
	}
}
function compareNumerosDesc1(a, b) {
        const bandA = a.trimestre1;
        const bandB = b.trimestre1;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
    }

	function compareNumerosDesc2(a, b) {
        const bandA = a.trimestre2;
        const bandB = b.trimestre2;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
    }

	function compareNumerosDesc3(a, b) {
        const bandA = a.trimestre3;
        const bandB = b.trimestre3;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison * -1;
    }

function GetSortOrderDesc(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}   

function compareNumerosAsc1(a, b) {
        const bandA = a.trimestre1;
        const bandB = b.trimestre1;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison ;
    }

	function compareNumerosAsc2(a, b) {
        const bandA = a.trimestre2;
        const bandB = b.trimestre2;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison ;
    }

	function compareNumerosAsc3(a, b) {
        const bandA = a.trimestre3;
        const bandB = b.trimestre3;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison ;
    }

function GetSortOrderAsc(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
}   
async function ordenarNumerosDesc1(){
	$profesores = $profesores.sort(compareNumerosDesc1)
}

async function ordenarNumerosDesc2(){
	$profesores = $profesores.sort(compareNumerosDesc2)
}

async function ordenarNumerosDesc3(){
	$profesores = $profesores.sort(compareNumerosDesc3)
}

async function ordenarNombreDesc(){
	$profesores = $profesores.sort(GetSortOrderDesc("nombre"))
}

async function ordenarNumerosAsc1(){
	$profesores = $profesores.sort(compareNumerosAsc1)
}

async function ordenarNumerosAsc2(){
	$profesores = $profesores.sort(compareNumerosAsc2)
}

async function ordenarNumerosAsc3(){
	$profesores = $profesores.sort(compareNumerosAsc3)
}

async function ordenarNombreAsc(){
	$profesores = $profesores.sort(GetSortOrderAsc("nombre"))
}
</script>
<main>
	{#await profesores}
		Loading profesores...
	{:then profesores_}
    <nav class="barraSup">
		<div class="contenedor">
		  <div class="navbar-brand">
			  <span class="title">Actualizar datos alumnos</span>
			<span
			  class="navbar-burger burger">
			  <span aria-hidden="true" />
			  <span aria-hidden="true" />
			  <span aria-hidden="true" />
			</span>
		  </div>
			
	<Button color="light" on:click="{pop}">Atrás</Button><Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
		</div>
	  </nav>
	  <div class="busqueda">
		<Input placeholder="Búsqueda..." class="busqueda2" type="search" bind:value = "{busqueda}" /><Button outline on:click={Buscar(busqueda)} >🔎</Button><Button outline on:click={getTodo} >🔄</Button>
   </div>
	  <div class="tabla">
	<Table bordered hover>
		<thead>
			<tr>
				<th>Nombre  <Button  color="dark" outline size="sm" on:click={ordenarNombreDesc}>▼</Button>
					<Button  color="dark" outline size="sm"  on:click={ordenarNombreAsc}>▲</Button></th>
				<th>Trimestre 1  <Button color="dark" outline size="sm" on:click={ordenarNumerosDesc1} >▼</Button>
					<Button  color="dark" outline size="sm" on:click={ordenarNumerosAsc1}>▲</Button></th>
				<th>Trimestre 2  <Button  color="dark" outline size="sm" on:click={ordenarNumerosDesc2} >▼</Button>
					<Button  color="dark" outline size="sm"  on:click={ordenarNumerosAsc2}>▲</Button></th>
				<th>Trimestre 3  <Button  color="dark" outline size="sm" on:click={ordenarNumerosDesc3}>▼</Button>
					<Button  color="dark" outline size="sm"  on:click={ordenarNumerosAsc3} >▲</Button></th>
			</tr>
		</thead>
		<tbody>
			{#each $profesores as profesores (profesores._id)}
			<tr>
				<td>{profesores.nombre}</td>
				<td><input required type="number" step="1" min="0" bind:value="{profesores.trimestre1}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{profesores.trimestre2}"></td>
				<td><input required type="number" step="1" min="0" bind:value="{profesores.trimestre3}"></td>
                <td><Button outline href="#/profesores/actualizar" color="primary" on:click={() => 
                    actualizarDatos(profesores.nombre,profesores.contraseña,profesores.trimestre1,profesores.trimestre2,profesores.trimestre3)}>Actualizar</Button></td>
				<td><Button outline color= "danger" on:click={() => removeProfesor(profesores._id)} >Borrar</Button></td>
			</tr>
			{/each}
			</tbody>
	</Table>

</div>
	{/await}
</main>
<style>
		main {
		text-align: left;
		margin: 0 auto;
		display: grid;
	}
	body {
  align-items: center;
  justify-content: center;
  display: flex;
}
    .contenedor{
	margin-left: 5vw;
	margin-right: 5vw;
	display: grid;
	grid-gap: 1vh;
	grid-template-rows: auto;
	grid-template-columns: auto 100px 120px;
}
.barraSup{
		background-color:#007bff;
		padding-top: 2vh;
		padding-bottom: 2vh;
		color:white;
	}

	.busqueda{
	display: flex;
	margin: 40px;
	margin-left: 100px;
	justify-content: flex-start;
	width: 300px;
}
	.tabla {
    margin: auto auto;
	width: 1300px;
}
</style>