<script>
  let todos = [];
  let newTodo = '';

  function addTodo() {
    if (newTodo.trim() === '') return;
    todos = [...todos, { text: newTodo, completed: false }];
    newTodo = '';
  }

  function toggle(index) {
    todos[index].completed = !todos[index].completed;
  }

  function remove(index) {
    todos = todos.filter((_, i) => i !== index);
  }
</script>

<main class="p-8 max-w-xl mx-auto">
  <h1 class="text-3xl font-bold mb-6 text-center">할 일 목록</h1>

  <div class="flex gap-2 mb-4">
    <input
      type="text"
      bind:value={newTodo}
      placeholder="할 일을 입력하세요"
      class="flex-1 p-2 border rounded"
      onkeydown={(e) => e.key === 'Enter' && addTodo()}
    />
    <button
      onclick={addTodo}
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded cursor-pointer"
    >
      추가
    </button>
  </div>

  <ul class="space-y-2">
    {#each todos as todo, index}
      <li class="flex items-center justify-between p-2 border rounded bg-gray-50">
        <div
          class="flex items-center gap-2 cursor-pointer"
          onclick={() => toggle(index)}
        >
          <input type="checkbox" checked={todo.completed} />
          <span class={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.text}
          </span>
        </div>
        <button
          onclick={() => remove(index)}
          class="text-red-500 hover:text-red-600 cursor-pointer font-bold"
        >
          ✕
        </button>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    font-family: 'Arial', sans-serif;
  }
</style>
