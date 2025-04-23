/** 
 * @typedef Task
 * @type {object}
 * @property {string} id El id de la tarea
 * @property {string} task El nombre de la tarea
 * @property {boolean} taskChecked El status de la tarea
 */

/** 
 * @type {Task[]} */
let tasks = [];

/**
 * Agrega una tarea al array de 
 * @param {Task} newTask
 */
const addTask = (newTask) => {
  tasks = tasks.concat(newTask);
}

// Icons
const checkButtonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> 
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
`

const checkedIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>
`

/**
 * Renderiza las tareas
 * @param {Element} list La lista en el HTML donde vamos a cargar las tareas
 */

/**
 * Renderiza las tareas
 */
const renderTasks = (list) => {
	// Borrar la lista del html
	list.innerHTML = '';
    // 1. Por cada tarea del array, creo y agrego la tarea al HTML
    tasks.forEach(task => {
        // console.log(task);
        
        // 1. Crear el li
        const li = document.createElement('li');

        // 2. Agregar la clase al li
        li.classList.add('task-item');

        // 3. Agregar el id al li
        li.id = task.id;
        // 3.1 Establecer el status
        li.setAttribute('status', task.taskChecked ? 'enabled-checked-btn' : 'enabled-check-btn');

				// 4. Crear div del texto

        const textClass = task.taskChecked ? 'task-item-line-through-text' : 'task-item-text';
        const textClassDiv = `
          <p class="${textClass}">${task.task}</p>
        `;

				// 5. Crear div de los botones
				const btnsDiv = `
				<button class="task-item-delete-button">
                <svg class="delete-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            <button class="task-item-check-button">
                ${task.taskChecked ? checkedIcon : checkButtonIcon}
            </button>
        `;

				// 6. Crear la estructura del li
				const liChildren = `
				${textClassDiv}
				${btnsDiv}
				`;
				li.innerHTML = liChildren;
				// 7. Agregar el li a la ul
				list.appendChild(li)
				

    });
    
}

/**
 * Guarda el array de las tareas en el navegador
 */
const saveTasksInBrowser = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Obtener las tareas del navegador y guardarlos en el array
 */
const getTasksFromBrowser = () => {
  // 1. Obtener la lista de localStorage
	const tasksLocalJson = localStorage.getItem('tasks');
	// 2.Transformar de JSON a JavaScript
	const tasksLocal = JSON.parse(tasksLocalJson);
	// 3. Guardar las tareas
	tasks = tasksLocal ?? [];
}

/**
 * Elimina una tarea del array de tareas
 * @param {string} id El id de la tarea a eliminar
 */
const removeTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);

}


// NO SE SI LO NECESITO

/**
 * Checkear una tarea
 * @param {Task} updatedTask La tarea checkeada
 */

const updateTask = (taskId, updates) => {
  tasks = tasks.map(task => 
    task.id === taskId 
      ? { ...task, ...updates }
      : task
  );

  // tasks = tasks.map(task => {
  //   if (task.id === updatedTask.id) {
  //     return updatedTask;
  //   } else {
  //   return task;
  //   }
  // })
}

// NO SE SI LO NECESITO


  
export {
  addTask,
  renderTasks,
  saveTasksInBrowser,
  getTasksFromBrowser,
  removeTask,
  updateTask,
  checkButtonIcon,
  checkedIcon
}
