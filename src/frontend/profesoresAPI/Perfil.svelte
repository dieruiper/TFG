<script>
  import axios from "axios";
  import { user,profesores } from "../stores";
  import { push } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  import {pop} from "svelte-spa-router";
  import Input from "sveltestrap/src/Input.svelte";
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
      alert("Se ha actualizado correctamente la contraseña.\n Pulsa el botón de volver para continuar");
      //successMessage = "Password was updated correctly";
    } catch (error) {
      if (error.response.data.message === "IncorrectPasswordError") {
        oldPassword = "";
        newPassword = "";
        errorMessage = "Wrong old password";
      }
    }
  }
  let isActive = false;
    async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    $profesores = [];
    push("/");
  }
</script>
<nav class="barraSup">
  <div class="contenedor">
    <div class="navbar-brand">
      <span class="title">Cambiar contraseña</span>
    <span
      class="navbar-burger burger"
      class:is-active={isActive}
      on:click={() => (isActive = !isActive)}
      aria-expanded="false"
      aria-label="menu">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </span>
    </div>
    <Button  color="light" on:click="{pop}">Atrás</Button><Button href="/" color= "danger" on:click={logout}>Cerrar sesión</Button>
  </div>
  </nav>
<div class="registro">
  <div class="form">
    <h2 class="title">Cambiar Contraseña</h2>
    <div class="thumbnail"><img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/User_login_man_profile_account.png" alt=""></div>
    <hr />
    {#if successMessage}
      <div class="notification is-success">{successMessage}</div>
    {/if}
    <form on:submit|preventDefault={changePassword}>
      <div class="field">
        
        <div class="control">
          <input
          placeholder="Antigua contraseña..."
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
        
        <div class="control">
          <input
          placeholder="Nueva contraseña..."
            type="password"
            bind:value={newPassword}
            class="input"
            required />
        </div>
      </div>
      <div class="control">
        <Input color="primary" type="submit" class="button is-info is-light" value="Aceptar" />
      </div>
    </form>
  </div>
  <hr />
  
</div>
<style>
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
  .registro {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 300px;
  margin: 40px auto;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  text-align: center;
}
.form .thumbnail {
  background: #007bff;
  width: 150px;
  height: 150px;
  margin: 0 auto 30px;
  padding: 30px 30px;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  box-sizing: border-box;
}
.form .thumbnail img {
  display: block;
  width: 100%;
}
.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  outline: 0;
  background: #EF3B3A;
  width: 100%;
  border: 0;
  padding: 15px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  color: #FFFFFF;
  font-size: 14px;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #EF3B3A;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
</style>