<script>
	import { redirect } from '@sveltejs/kit';
	import '../app.css';
	import { goto } from '$app/navigation';
  import { onMount } from "svelte";
  import auth from "$lib/authService"
  import { isAuthenticated, user, user_tasks, tasks } from "$lib/store";
  import TaskItem from "$lib/components/TaskItem.svelte";
  let newTask;
  let auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();
    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  
  let { children } = $props();
   async function login() {
    if (!auth0Client) {
      console.error("Auth0 클라이언트가 아직 초기화되지 않았습니다. 잠시 기다려주세요.");
      return;
    }
    try {
      console.log("Auth0 loginWithRedirect 호출...");
      // ✅ auth0Client 인스턴스의 loginWithRedirect 메서드를 직접 호출합니다.
      await auth0Client.loginWithRedirect();
    } catch (err) {
      console.error("로그인 리다이렉트 중 오류 발생:", err);
    }
  }
  function addItem() {
    let newTaskObject = {
      id: genRandom(),
      description: newTask,
      completed: false,
      user: $user.email
    };

    console.log(newTaskObject);

    let updatedTasks = [...$tasks, newTaskObject];

    tasks.set(updatedTasks);

    newTask = "";
  }

  function genRandom(length = 7) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  
  let isMenuOpen = $state()

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }
  function go(a) {
    toggleMenu();
    goto(a);
  }
  function logoclick() {
    isMenuOpen = false;
    goto('/')
  }
</script>

<nav class="bg-gray-600 p-4">
  <div class="container mx-auto flex items-center justify-between flex-wrap">
    <button
      class="text-white text-2xl font-bold cursor-pointer"
      onclick={logoclick}>
      (로고)
    </button>
    <div class="block lg:hidden">
      <button onclick={toggleMenu} class="text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
        </svg>
      </button>
    </div>

    <div class="w-full block flex-grow 
                lg:flex lg:items-center lg:w-auto
                transition-all duration-500 ease-in-out overflow-hidden
                {isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 lg:max-h-screen lg:opacity-100'}">
      <div class="text-sm lg:flex-grow lg:flex lg:justify-end lg:items-center">
        <button
         class="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
         onclick={() => go('/')}
         >
          홈
        </button>
        <button
         class="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
         onclick={() => go('/about')}
         >
          소개
        </button>
        <button
         class="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
         onclick={() => go('/services')}
         >
          서비스
        </button>
        <button
         class="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
         onclick={() => go('/contact')}
         >
          문의
        </button>
        {#if !user.isAuthenticated}
        <button
         class="block cursor-pointer mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
         onclick={login}
         >
          로그인
        </button>
        {:else}
        {user.name}님
        {/if}
      </div>
    </div>
  </div>
</nav>


{@render children()}
