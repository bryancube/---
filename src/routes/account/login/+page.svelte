<script>
  let id = '';
  let password = '';

  function login() {
    
  }
  function pwInput(e) {
    if(e.key === 'Enter'){
      login()
    }
    // password = '•'.repeat(password.length)
  }
</script>

<main class="p-7 max-w-xl mx-auto">
  <h1 class="text-3xl font-bold mb-6 text-center">로그인 페이지</h1>

  <div class="flex gap-2 mb-4">
    <input
      type="text"
      bind:value={id}
      placeholder="ID"
      class="flex-1 p-2 border rounded"
      on:keyup={(e) => e.key === 'Enter' && login()}
    />
  </div>
<div class="flex gap-2 mb-4">
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      class="flex-1 p-2 border rounded"
      on:keyup={pwInput}
    />
  </div>
  <div class="flex gap-2 mb-4">
    <button
          on:click={login}
          class="block mt-4 lg:inline-block lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          로그인
        </button>
</main>

<style>
  main {
    font-family: 'Arial', sans-serif;
  }
</style>
