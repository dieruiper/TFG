<script>
  import { slide } from "svelte/transition";
  export let alumno;
  export let removeAlumno;
</script>

<style>
  .date {
    float: right;
  }
</style>

<div
  class="notification is-light {alumno.nombre > 0 ? 'is-success' : 'is-danger'}"
  transition:slide={{ duration: 500 }}>
  {alumno.nombre}
  <span class="is-size-7 has-text-grey date">
    {new Date(alumno.date).toLocaleString()}
  </span>
  <button class="delete" on:click={() => removeAlumno(alumno._id)} />
</div>
