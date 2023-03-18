// selecionando elementos do DOM
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// função que carrega todos os event listeners
function loadEventListeners() {
    // event listener para submit do formulário
    form.addEventListener('submit', addTask);

    // event listener para click na lista de tarefas
    taskList.addEventListener('click', removeTask);

    // event listener para click no botão 'Clear Tasks'
    clearBtn.addEventListener('click', clearTasks);

    // event listener para filtro de tarefas
    filter.addEventListener('keyup', filterTasks);

    // carrega tarefas salvas em localStorage
    document.addEventListener('DOMContentLoaded', getTasks);
}


function getTasks() {
    // Declara uma variável para armazenar as tarefas
    let tasks;

    // Verifica se há tarefas armazenadas localmente
    if (localStorage.getItem('tasks') === null) {
      // Se não houver tarefas, define a variável de tarefas como um array vazio
      tasks = [];
    } else {
      // Se houver tarefas, obtém as tarefas do armazenamento local e as analisa como JSON
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Itera sobre as tarefas e cria elementos HTML para cada uma
    tasks.forEach((task) => {
      // Cria um elemento <li> com a classe 'collection-item'
      const li = document.createElement('li');
      li.className = 'collection-item';

      // Adiciona o valor da tarefa como um nó de texto ao elemento <li>
      li.appendChild(document.createTextNode(task));

      // Cria um elemento <a> com a classe 'delete-item' e 'secondary-content'
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content'

      // Cria um elemento <i> com a classe 'fas fa-remove' e adiciona-o como um nó filho ao elemento <a>
      link.innerHTML = '<i class="fas fa-remove"></i>';

      // Adiciona o elemento <a> como um filho ao elemento <li>
      li.appendChild(link);

      // Adiciona o elemento <li> como um filho ao elemento com o ID 'task-list'
      taskList.appendChild(li);
    })
  
}

// função para adicionar tarefa
function addTask(e) {
    // verifica se o campo de input está vazio
    if (taskInput.value === '') {
        alert('Adicione uma tarefa');
        return;
    }

    // cria elemento <li> para adicionar a tarefa
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // cria link para remover tarefa
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // adiciona elemento <li> com a tarefa à lista de tarefas
    taskList.appendChild(li);

    // salva tarefa em localStorage
    storeTaskInLocalStorage(taskInput.value);

    // limpa campo de input
    taskInput.value = '';

    e.preventDefault();
}

// função para remover tarefa
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// função para limpar todas as tarefas
function clearTasks() {
    // método 1 - mais lento
    // taskList.innerHTML = '';

    // método 2 - mais rápido
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

// função para filtrar tarefas
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// função para salvar tarefa em localStorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// função para remover tarefa de localStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    }); 
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}


loadEventListeners();