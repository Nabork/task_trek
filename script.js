//selectors

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');  
const todoList = document.querySelector('.todo-list');   

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
//event listener for the i got this button  
todoBtn.addEventListener('click',addTodo);

//to delete or check a task
todoList.addEventListener('click', deleteCheck);

//functions

function addTodo(event){
    //preventing default
     event.preventDefault(); 

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create  LI
    const newTodo = document.createElement('li');
    newTodo.innerText =todoInput.value; 
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //adding todo to the local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Push the new todo to the array
    todos.push(todoInput.value);

    // Save the updated array to local storage
    saveLocalTodos(todos);


    // adding button icons

    const iconBtn = document.createElement('button');
    iconBtn.innerHTML = '<i id="icon" class="bi bi-check-lg"></i>';
    iconBtn.classList.add('check-btn');
    todoDiv.appendChild(iconBtn);

    const iconBtn2 = document.createElement('button');
    iconBtn2.innerHTML = '<i id="icon" class="bi bi-trash3"></i>';
    iconBtn2.classList.add('trash-btn');
    todoDiv.appendChild(iconBtn2);

    //append to list
    todoList.appendChild(todoDiv); 

    //clear the input value after entering
    todoInput.value ="";

    

}

function deleteCheck(event){
    const item = event.target;  

    // deleting the todo item

    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
           todo.remove();
           removeLocalTodo(todo); 
        })
    }

    //checking the todo item
    if(item.classList.contains('check-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

    }

}

function saveLocalTodos(todos) {
    // Save the entire array of todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        //create  LI
        const newTodo = document.createElement('li');
        newTodo.innerText =todo; 
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        // adding button icons
    
        const iconBtn = document.createElement('button');
        iconBtn.innerHTML = '<i id="icon" class="bi bi-check-lg"></i>';
        iconBtn.classList.add('check-btn');
        todoDiv.appendChild(iconBtn);
    
        const iconBtn2 = document.createElement('button');
        iconBtn2.innerHTML = '<i id="icon" class="bi bi-trash3"></i>';
        iconBtn2.classList.add('trash-btn');
        todoDiv.appendChild(iconBtn2);
    
        //append to list
        todoList.appendChild(todoDiv);  
    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));

}