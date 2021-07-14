const inputField = document.querySelector(".input-todo");
const AddBtn = document.getElementById("add-todo");
const todos = document.querySelector(".todos");

AddBtn.addEventListener("click", uploadTodo);

function uploadTodo() {
    const inputValue = inputField.value;
    if(inputValue === "" || inputValue === " ") {
        return
    } else {
    add(inputValue);
    store.addTodo(inputValue);
    showMsg("todo added","success");
}
}

function formatTodo() {
    todos.addEventListener("click", (e) => {
        if(e.target.textContent === "delete") {
            const target = e.target.previousSibling.textContent;
            store.delete(target);
           e.target.parentElement.remove();
           
           showMsg("todo removed.","danger")
        } else if(e.target.textContent === "completed") {
            e.target.parentElement.classList.toggle("complete");
            showMsg("todo completed", "success");
        } else {
            return
        }
    })
}
formatTodo();

function showMsg(message,className) {
    const div = document.createElement("div");
    div.textContent = message;
    div.className = `alert ${className}`;
    const container = document.querySelector(".container");
    container.insertBefore(div,container.firstElementChild.nextSibling);

    setTimeout(() => document.querySelector(".alert").remove(),1500)
}

class store {
    static getTodo() {
        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
    }
    static addTodo(todo) {
        const  todos = store.getTodo();
        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    static upload() {
        const todos = store.getTodo();
        todos.forEach(todo => {
            add(todo);
        })
    }
    static delete(el) {
        let todos = store.getTodo();
        todos.forEach((todo,index) => {
            if(todo == el) {
                todos.splice(index,1);
            }
            localStorage.setItem("todos", JSON.stringify(todos));
        })
    }
}


function add(el) {
      // creating a todo div;
    const todo = document.createElement("li");
    todo.classList.add("todo");

    // creating h1 for the todo div
    const h1 = document.createElement("h1");
    h1.textContent = el;
    todo.appendChild(h1);

    // creating the button delete for the todo div
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "delete";
    todo.appendChild(deleteBtn);

    // creating the complete button for the todo div
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("completed");
    completeBtn.textContent = "completed";
    todo.appendChild(completeBtn);

    inputField.value = "";


 
    // adding the todo div to the todos container 
    todos.appendChild(todo);
}

document.addEventListener("DOMContentLoad",store.upload())