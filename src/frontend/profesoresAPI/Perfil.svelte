<script>
  import axios from "axios";
  import { user } from "../stores";
  import { push } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  import {pop} from "svelte-spa-router";
  let oldPassword;
  let newPassword;

  let errorMessage;
  let successMessage;

  $: if (oldPassword) {
    errorMessage = null;
  }

  async function changePassword() {
    try {
      await axios.post("/api/auth/update-password", {
        oldPassword,
        newPassword
      });
      oldPassword = "";
      newPassword = "";
      successMessage = "Password was updated correctly";
    } catch (error) {
      if (error.response.data.message === "IncorrectPasswordError") {
        oldPassword = "";
        newPassword = "";
        errorMessage = "Wrong old password";
      }
    }
  }
</script>

<div class="container">
  <div class="section">
    <h2 class="title">Cambiar Contraseña</h2>
    <hr />
    {#if successMessage}
      <div class="notification is-success">{successMessage}</div>
    {/if}
    <form on:submit|preventDefault={changePassword}>
      <div class="field">
        <label class="label">Contraseña Antigua</label>
        <div class="control">
          <input
            type="password"
            bind:value={oldPassword}
            class="input"
            required
            class:is-danger={errorMessage} />
          {#if errorMessage}
            <p class="help is-danger">{errorMessage}</p>
          {/if}
        </div>
      </div>
      <div class="field">
        <label class="label">Nueva Contraseña</label>
        <div class="control">
          <input
            type="password"
            bind:value={newPassword}
            class="input"
            required />
        </div>
      </div>
      <div class="control">
        <input type="submit" class="button is-info is-light" value="Aceptar" />
      </div>
    </form>
  </div>
  <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</div>
