function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('theme-toggle-button');
    const isDarkMode = body.classList.toggle('dark-mode');
    themeButton.innerHTML = `<i class="fa-solid fa-${isDarkMode ? 'sun' : 'moon'}"></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark-mode'); // Set dark mode as default
    document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
});


submitbtn = document.getElementById("todo-button");
todoname = document.getElementById("todo-name");
tododescription = document.getElementById('todo-description');
// Add event listener
submitbtn.addEventListener('click', addTodo);

// Function to add a new todo

document.addEventListener('DOMContentLoaded', function() {
    displayTodos();
});
function addTodo() {
    // Get the values
    const name = todoname.value.trim();
    const description = tododescription.value.trim();
    
    // Validate
    if (name === '' || description === '') {
        alert('Please fill in both fields!');
        return;
    }
    
    // Create todo object
    const todo = {
        id: Date.now(),
        name: name,
        description: description,
        completed: false
    };
    
    // Save to localStorage
    saveTodoToLocalStorage(todo);
    
    // Clear inputs
    todoname.value = '';
    tododescription.value = '';
    
    // Update display
    displayTodos();
}

// Save todo to localStorage
function saveTodoToLocalStorage(todo) {
    let todos = getTodosFromLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get todos from localStorage
function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    return todos === null ? [] : JSON.parse(todos);
}

// Display todos in table
function displayTodos() {
    const todos = getTodosFromLocalStorage();
    const table = document.querySelector('table');
    
    // Remove old tbody
    const existingTbody = table.querySelector('tbody');
    if (existingTbody) {
        existingTbody.remove();
    }
    
    // Create new tbody
    const tbody = document.createElement('tbody');
    
    // Add each todo
    todos.forEach((todo, index) => {
        const row = document.createElement('tr');
        const completedClass = todo.completed ? 'completed-todo' : '';
        
        row.innerHTML = `
            <td class="sno">${index + 1}</td>
            <td class="todo-name ${completedClass}">${todo.name}</td>
            <td class="todo-description ${completedClass}">${todo.description}</td>
            <td class="todo-checkbox">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="toggleComplete(${todo.id})">
            </td>
            <td class="todo-delete">
                <button onclick="deleteTodo(${todo.id})" style="padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 0.375rem; cursor: pointer;"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
}

// Toggle complete status
function toggleComplete(id) {
    let todos = getTodosFromLocalStorage();
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

// Delete todo
function deleteTodo(id) {
    let todos = getTodosFromLocalStorage();
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}


