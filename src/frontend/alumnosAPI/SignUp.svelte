<script>
    import axios from "axios";
    import { userAlum } from "../storesAlum";
    import { push } from "svelte-spa-router";
    let nombre;
    let password;
    let profesor;
    let errorMessage;
  
    $: if (nombre) {
      errorMessage = null;
    }
  
    async function signup() {
      try {
        const { data } = await axios.post("/api/authAlum/sign-up", {
          nombre,
          password,
          profesor
        });
        $userAlum = data.userAlum;
        push("/alumnos/"+nombre);
      } catch (error) {
        if (error.response.data.message === "UserExistsError") {
          nombre = "";
          password = "";
          profesor = "";
          errorMessage = "Username is already taken";
          console.log("ya existe")
        }
      }
    }
  </script>
  
  <div class="container">
    <div class="section">
      <h1 class="title">Regístrate</h1>
      <hr />
      <form on:submit|preventDefault={signup}>
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input
              type="text"
              bind:value={nombre}
              class="input"
              required
              class:is-danger={errorMessage} />
            {#if errorMessage}
              <p class="help is-danger">{errorMessage}</p>
            {/if}
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" bind:value={password} class="input" required />
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
          <div class="control">
            <input type="submit" href="#/alumnos/{userAlum.nombre}" class="button is-info is-light" value="Submit" />
          </div>
        </div>
      </form>
      <hr />
      <p>
        Do you have an account ?
        <a href="#/alumnos/login">Log in here</a>
      </p>
      <hr />
    </div>
  
  </div>
  