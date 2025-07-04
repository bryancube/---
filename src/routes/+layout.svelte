<script>
	import { redirect } from '@sveltejs/kit';
	import '../app.css';
	import { goto } from '$app/navigation';
  import { onMount } from "svelte";
  let { children } = $props();
  
  let isMenuOpen = $state()

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }
</script>

<nav class="bg-gray-600 p-4">
  <div class="container mx-auto flex items-center justify-between flex-wrap">
    <a href="/" class="text-white text-2xl font-bold">
      로고
    </a>

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
        <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          홈
        </a>
        <a href="/about" class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          소개
        </a>
        <a href="/services" class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          서비스
        </a>
        <a href="/contact" class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white lg:mr-4">
          문의
        </a>
        
       
        
      </div>
    </div>
  </div>
</nav>


{@render children()}
