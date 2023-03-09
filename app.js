const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


function loadEnventListener() {
    loadEnventSubmit();
    loadEnventClick();
    clearTask();
    filterTask();
}


function loadEnventSubmit() {
    //peando o evento de submit do add task
    form.addEventListener('submit', (event) => {
        //checando de o valor mandado é vazio
        if (taskInput.value === '') {
            alert('Add a task');
        }

        //criando um lista com uma class collection-item
        const li = document.createElement('li');
        li.className = 'collection-item';

        //add o valor mandado para a li
        li.appendChild(document.createTextNode(taskInput.value));

        //criando um link com a classe delete...
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'

        //criando a tag i dentro do link <a><i></i></a>

        link.innerHTML = '<i class="fas fa-remove"></i>';

        //link é adicionado como um filho do elemento li 
        li.appendChild(link);

        //li é add como um filho de tasklist
        taskList.appendChild(li);

        //zera o valor do imput
        taskInput.value = '';

        event.preventDefault()

    });
}


function loadEnventClick() {
    taskList.addEventListener('click', (e) => {
        if (e.target.parentElement.classList.contains('delete-item')) {

            if (confirm('Are You Sure?')) {
                e.target.parentElement.parentElement.remove();
            }

        }

    })
}

function clearTask() {
    clearBtn.addEventListener('click', () => {
        //taskList.innerHTML = '';

        //+Rapido
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    })
}


function filterTask() {
    filter.addEventListener('keyup', (e) => {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach((task) => {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }

        });
        
    })
}


loadEnventListener();

