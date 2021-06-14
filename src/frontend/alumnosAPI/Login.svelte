<script>
  import axios from "axios";
  import {pop} from "svelte-spa-router";
  import { userAlum } from "../storesAlum";
  import { push } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  let nombre;
  let password;
  let profesor;
  let errorMessage;
  let isActive = false;

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
      console.log(data)
      $userAlum = data.userAlum;
      console.log($userAlum)
      push("/alumnos/"+nombre+"/carta");
    } catch (error) {
      if (error.response.status === 401) {
        nombre = "";
        password = "";
        profesor = "";
        errorMessage = "Usuario o contraseña incorrecto";
      }
      if (error.response.status === 400) {
        nombre = "";
        password = "";
        profesor = "";
        errorMessage = "Credenciales incorrectas";
      }
    }
  }
</script>
<nav class="barraSup">
  <div class="container">
    <div class="navbar-brand">
    <a href="#/" class="navbar-item">
      <span class="title">🏠︎</span>
    </a>
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
    
  </div>
  </nav>
<div class="registro">
  <div class="form">
    <h1 class="title">Inicia sesión</h1>
    <div class="thumbnail"><img alt="gorro" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg"/></div>
    <hr />
    {#if errorMessage}
      <p class="errorlogin">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={login}>
      <div class="field">
        <div class="control">
          <input
          placeholder="Usuario"
            type="text"
            bind:value={nombre}
            class="input"
            required
            class:is-danger={errorMessage} />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
          placeholder="Contraseña"
            type="password"
            bind:value={password}
            class="input"
            required
            class:is-danger={errorMessage} />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
          placeholder="Profesor"
            type="text"
            bind:value={profesor}
            class="input"
            required
            class:is-danger={errorMessage} />

        </div>
      </div>
      <div class="control">
        <Input color="primary" type="submit" href="#/alumnos/{userAlum.nombre}/carta" class="button is-info is-light" value="Aceptar" />
      </div>
    </form>
    <hr />
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
  </div>
  
</div>
<style>
  	.barraSup{
		background-color:#007bff;
		padding-top: 2vh;
		padding-bottom: 2vh;
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
  margin: 20px auto;
  padding: 30px;
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
  padding: 50px 30px;
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

.errorlogin{
    background-color: rgba(247, 128, 128, 0.637);
    border-radius: 3px;
    padding-top:10px;
    padding-bottom:10px;
  }
</style>
