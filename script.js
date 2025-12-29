// Todo App JavaScript
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        
        this.init();
    }

    init() {
        // Event listeners
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Render existing todos
        this.renderTodos();
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.todoInput.value = '';
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.renderTodos();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    renderTodos() {
        this.todoList.innerHTML = '';

        if (this.todos.length === 0) {
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';

        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded-lg';
            
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''} 
                    onchange="todoApp.toggleTodo(${todo.id})"
                    class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                >
                <span class="flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}">${todo.text}</span>
                <button 
                    onclick="todoApp.deleteTodo(${todo.id})" 
                    class="px-2 py-1 text-red-500 hover:bg-red-100 rounded"
                >
                    ✕
                </button>
            `;

            this.todoList.appendChild(li);
        });
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// Initialize the app
const todoApp = new TodoApp();