// const a = [1, 2, 3]
// const b = [...a, 4]
// const c = [...b, ...a]

// console.log(c);

// Al parecer con el siguiente metodo se puede 
// document.getElementById('main-form-button').disabled = true;




// Importar todos los módulos de tareas desde tasks.js
import * as TasksModule from "./tasks.js";

// Selectores
const taskInput = document.querySelector("#task-input");
const form = document.querySelector("#main-form");
const formBtn = document.querySelector("#main-form-button");
const tasksList = document.querySelector("#task-list");
// console.log(taskInput, form, formBtn, tasksList);

// Regex
const TASK_REGEX = /^(?=.*\S).+$/;


// Validaciones
let isInputTaskValid = false;



// Funciones
const renderInputValidationStatus = (input, isInputValid) => {
    const helperText = input.nextElementSibling;
    if (input.value === "") {
        // Quitar lo colores y no mostrar el texto de ayuda
        input.classList.remove("input-invalid");
        input.classList.remove("input-valid");
        helperText?.classList.remove("show-helper-text");
    } else if (isInputValid) {
        // Ponerse verde y ocultar el texto de ayuda
        input.classList.add("input-valid");
        input.classList.remove("input-invalid");
        helperText?.classList.remove("show-helper-text");
    } else {
        // Ponerse rojo y mostrar el texto de ayuda
        input.classList.add("input-invalid");
        input.classList.remove("input-valid");
        helperText?.classList.add("show-helper-text");
    }
};

const renderFormBtnValidationStatus = () => {
    if (isInputTaskValid) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
};

// Eventos
taskInput.addEventListener("input", (e) => {
   isInputTaskValid = TASK_REGEX.test(taskInput.value);
   renderInputValidationStatus(taskInput, isInputTaskValid);
   renderFormBtnValidationStatus();
});


form.addEventListener("submit", (e) => {
     // Validar si las validaciones estan correctas
     if (!isInputTaskValid) {
        return;
    }

    // 1.Prevenir el evento predefinido
    e.preventDefault();

    // 2. Crear la estructura de la tarea
    const newTask = {
        id: crypto.randomUUID(),
        task: taskInput.value,
        taskChecked: false,
    };
    // console.log(newTask);

    taskInput.value = '';

    // 3. Guardar la tarea en el array
    TasksModule.addTask(newTask);
    // 4. Guardar la tarea en el navegador
    TasksModule.saveTasksInBrowser();
    // 5. Mostrar tareas en el html
    TasksModule.renderTasks(tasksList);
});

tasksList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".task-item-delete-button");
    const checkBtn = e.target.closest(".task-item-check-button");


    if (deleteBtn) {
        // 1. Obtener el id 
        const li = deleteBtn.parentElement;
        // console.log(li);
        
        // 2. Eliminar la tarea del array
        TasksModule.removeTask(li.id);
        // 3. Guardar las tareas en el navegador
        TasksModule.saveTasksInBrowser();
        // 4. Renderizar los tareas
        TasksModule.renderTasks(tasksList);
    }


    if (checkBtn) {
        // 1. Obtener el id de la tarea
        const li = checkBtn.parentElement;
        // 2. Obtener ambos inputs
        const status = li.getAttribute('status');
        
        if (status === 'enabled-check-btn') {


        // 1. Cambiar el status a enabled-checked-btn
        li.setAttribute('status', 'enabled-checked-btn')
        // 2. Cambiar el icono del boton
        checkBtn.innerHTML = TasksModule.checkedIcon;
        // 3. Cambiar a estilo de texto check a chekeado
        li.classList.remove('task-item-text');
        li.classList.add('task-item-line-through-text');

        }
        
        if (status === 'enabled-checked-btn') {

        // 1. Cambiar el status a enabled-check-btn 
        li.setAttribute('status', 'enabled-check-btn');        
        // 2. Cambiar el icono del boton 
            checkBtn.innerHTML = TasksModule.checkedIcon;
        // 3. Cambiar a estilo de texto chekeado a check
            taskInput.classList.add('task-item-text');
            taskInput.classList.remove('task-item-line-through-text');
            
            // 4. Actualizar
            const checkedTask = {
            id: li.id,
            Task: taskInput.textContent,
            isChecked: false
            }
    
            TasksModule.updateTask(checkedTask);
            // 5. Guardar las tareas en el navegador
            TasksModule.saveTasksInBrowser();
            // 6. Mostrar en el html
            TasksModule.renderTasks(tasksList);    
            
        }
    }
})

window.onload = () => {
    // 1. Obtener la lista de localStorage
    TasksModule.getTasksFromBrowser();
    // 2. Renderizar los tareas
    TasksModule.renderTasks(tasksList);
    
}