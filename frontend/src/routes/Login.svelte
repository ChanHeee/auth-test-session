<script>
  import Navbar from './../components/Navbar.svelte';
  import { pop, push } from 'svelte-spa-router';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { login } from '../store';
  // axios.defaults.baseURL = 'http://localhost:3000/api';
  // axios.defaults.withCredentials = true;

  onMount(() => {
    if ($login) {
      pop();
    }
  });

  let email = '';
  let password = '';
  let remember = false;

  let emailInfo = false;
  let emailMessage = '';
  let passwordInfo = false;
  let passwordMessage = '';

  const inputFocus = () => {
    emailInfo = false;
    passwordInfo = false;
  };

  const loginHandler = async () => {
    if (email == '') {
      emailInfo = true;
      emailMessage = 'Please enter email.';
    } else if (password == '') {
      passwordInfo = true;
      passwordMessage = 'Please enter password.';
    } else {
      console.log('here', email, password);
      const { data } = await axios.post('/api/auth/login', { email, password });
      if ('error' in data == false) {
        push('/');
      } else {
        passwordInfo = true;
        passwordMessage = data.error.message;
      }
    }
  };
</script>

<div class="h-screen bg-slate-100">
  <Navbar />
  <div class="p-12 flex flex-col items-center">
    <h3 class="title ">Login</h3>
    <hr class="flex h-2 bg-blue" />
    <p class="subtitle">Please login to proceed.</p>
    <div
      class="flex flex-col max-w-lg min-w-[40%] mx-auto px-10 py-8 bg-white rounded-xl "
    >
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input py-5 text-xl {emailInfo && 'is-danger'}"
            bind:value={email}
            on:focus={inputFocus}
            type="email"
            placeholder="hello@example.com"
          />
        </div>
        <p class="ml-2 mt-2 help text-lg is-danger {emailInfo || 'hidden'}">
          {emailMessage}
        </p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input py-5 text-xl {passwordInfo && 'is-danger'}"
            bind:value={password}
            on:focus={inputFocus}
            type="password"
            placeholder="********"
          />
        </div>
        <p class="ml-2 mt-2 help text-lg is-danger {passwordInfo || 'hidden'}">
          {passwordMessage}
        </p>
      </div>

      <div class="flex justify-center">
        <label class="checkbox mt-2">
          <input type="checkbox" bind:checked={remember} />
          Remember me
        </label>
      </div>

      <button
        class="button mt-5 py-5 text-xl is-info font-medium"
        on:click={loginHandler}><strong>Login</strong></button
      >
    </div>
  </div>
</div>
