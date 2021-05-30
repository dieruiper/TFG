<script>
  import { slide } from "svelte/transition";
  export let profesor;
  export let removeProfesor;
</script>

<style>
  .date {
    float: right;
  }
</style>

<div
  class="notification is-light {profesor.nombre > 0 ? 'is-success' : 'is-danger'}"
  transition:slide={{ duration: 500 }}>
  {profesor.nombre}
  <span class="is-size-7 has-text-grey date">
    {new Date(profesor.date).toLocaleString()}
  </span>
  <button class="delete" on:click={() => removeProfesor(profesor._id)} />
</div>
