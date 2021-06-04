{#if show}
  <nav transition:fly={{x: 250, opacity: 1}}>
    <Button color= "primary" href="#/profesores/perfil" >Cambiar Contraseña</Button>
    <p></p>
    <Button color= "primary" href="#/profesores/importar" >Importar Alumnos</Button>
    <p></p>
    <Button color= "primary" href="#/profesores/ranking" >Top 5 Alumnos</Button>
    <p></p>
    <Button color= "danger" on:click={logout}>Cerrar sesión</Button>
  </nav>
{/if}
{#if ordenar}
  <nav transition:fly={{x: 250, opacity: 1}}>
    Nombre:
    <label>
      <input type=radio bind:group={scoops} value={1}>
      Ascendiente
    </label>
    <label>
      <input type=radio bind:group={scoops} value={2}>
      Descendiente
    </label>
    <p></p>
    Trimestre 1:
    <label>
      <input type=radio bind:group={scoops} value={3}>
      Ascendiente
    </label>
    <label>
      <input type=radio bind:group={scoops} value={4}>
      Descendiente
    </label>
    <p></p>
    Trimestre 2:
    <label>
      <input type=radio bind:group={scoops} value={5}>
      Ascendiente
    </label>
    <label>
      <input type=radio bind:group={scoops} value={6}>
      Descendiente
    </label>
    <p></p>
    Trimestre 3:
    <label>
      <input type=radio bind:group={scoops} value={7}>
      Ascendiente
    </label>
    <label>
      <input type=radio bind:group={scoops} value={8}>
      Descendiente
    </label>
    <p></p>
    <Button color= "primary" href="#/profesores/">Aplicar</Button>

  </nav>
{/if}
<Modal bind:show={modal_show} />
<Modal bind:ordenar={modal_show_ordenar} />

<script>
import { fly } from 'svelte/transition';
import Modal from './Modal.svelte';
import Button from "sveltestrap/src/Button.svelte";
import axios from "axios";
import { user, profesores } from "../stores";
import { push } from "svelte-spa-router";
export let show = false;
export let ordenar = false;
let modal_show = false;
let modal_show_ordenar = false;
let scoops = 1;
async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    $profesores = [];
    push("/");
  }

</script>
		
<style>
nav {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  padding: 2rem 1rem 0.6rem;
  border-left: 1px solid #aaa;
  background: #fff;
  overflow-y: auto;
	width: 10rem;
}
</style>