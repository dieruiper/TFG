<script>
  import axios from "axios";
  import { user } from "../stores";
  import { push } from "svelte-spa-router";
  import {pop} from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  let username;
  let password;
  let errorMessage;

  async function login() {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password
      });
      $user = data.user;
      push("/profesores");
    } catch (error) {
      if (error.response.status === 401) {
        username = "";
        password = "";
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
				  class="navbar-burger burger">
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
            bind:value={username}
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
      <div class="control">
        <Input color="primary" type="submit" class="button is-info is-light" value="Aceptar" />
      </div>
    </form>
    <hr />
    <h6>
      ¿No tienes cuenta todavía?
      <p><a href="#/profesores/signup">¡Regístrate!</a></p>
    </h6>
    <hr />
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
  </div>
  
</div>
<style>
  .errorlogin{
    background-color: rgba(247, 128, 128, 0.637);
    border-radius: 3px;
    padding-top:10px;
    padding-bottom:10px;
  }
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


</style>