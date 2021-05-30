<script>
  import axios from "axios";
  import { userAlum } from "../storesAlum";
  import { push } from "svelte-spa-router";
  let nombre;
  let password;
  let profesor;
  let errorMessage;

  $: if (nombre || password) {
    errorMessage = null;
  }

  async function login() {
    try {
      const { data } = await axios.post("/api/authAlum/login", {
        nombre,
        password,
        profesor
      });
      $userAlum = data.userAlum;
      push("/alumnos/"+nombre);
    } catch (error) {
      if (error.response.status === 401) {
        nombre = "";
        password = "";
        profesor = "";
        errorMessage = "Invalid Credentials";
      }
    }
  }
</script>

<div class="container">
  <div class="section">
    <h1 class="title">Login</h1>
    <hr />
    {#if errorMessage}
      <p class="help is-danger">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={login}>
      <div class="field">
        <label class="label">Nombre</label>
        <div class="control">
          <input
            type="text"
            bind:value={nombre}
            class="input"
            required
            class:is-danger={errorMessage} />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            type="password"
            bind:value={password}
            class="input"
            required
            class:is-danger={errorMessage} />
        </div>
      </div>
      <div class="field">
        <label class="label">Profesor</label>
        <div class="control">
          <input
            type="text"
            bind:value={profesor}
            class="input"
            required
            class:is-danger={errorMessage} />

        </div>
      </div>
      <div class="control">
        <input type="submit" href="#/alumnosAPI/{userAlum.nombre}" class="button is-info is-light" value="Submit" />
      </div>
    </form>
    <hr />
  </div>

</div>
