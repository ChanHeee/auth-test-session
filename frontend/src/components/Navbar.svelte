<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { nick, login } from '../store';
  // axios.defaults.baseURL = 'http://localhost:3000/api';
  // axios.defaults.withCredentials = true;

  onMount(async () => {
    const { data } = await axios.get('/api/auth/logincheck');
    if ('error' in data == false) {
      $nick = data.user.nick;
      $login = true;
    } else {
      $login = false;
    }
  });

  const logoutHandler = async () => {
    const { data } = await axios.get('/api/auth/logout');
    $login = false;
  };
</script>

<nav class="navbar px-10 py-2" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
    </a>

    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item"> Home </a>

      <a class="navbar-item"> Documentation </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"> More </a>

        <div class="navbar-dropdown">
          <a class="navbar-item"> About </a>
          <a class="navbar-item"> Jobs </a>
          <a class="navbar-item"> Contact </a>
          <hr class="navbar-divider" />
          <a class="navbar-item"> Report an issue </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons flex items-center">
          {#if !$login}
            <a class="button is-info" href="/#/signup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/#/login"><strong>Login</strong></a
            >
          {:else}
            <p class="mr-4 text-lg">
              <strong>{$nick}</strong>
            </p>
            <a class="button is-info mb-0" on:click={logoutHandler}>
              <strong>Logout</strong>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
