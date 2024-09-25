document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById("todo-input");
    const taskList = document.getElementById("list-container");

    // Function to add a new task
    document.querySelector("button").addEventListener("click", addTask);

    // Load existing tasks from localStorage when the page loads
    loadTasks();

    function addTask() {
        if (inputBox.value.trim() === '') {
            alert("Please enter a task!");
            return;
        }

        const li = document.createElement("li");
        li.textContent = inputBox.value.trim();

        // Create delete button
        const span = document.createElement("span");
        span.innerHTML = "&#10006;"; // Cross mark
        span.classList.add("delete");
        li.appendChild(span);

        // Add the new task to the task list
        taskList.appendChild(li);
        inputBox.value = ''; // Clear the input

        // Save tasks to localStorage
        saveTasks();
    }

    taskList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveTasks();
        } else if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
            saveTasks();
        }
    });

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => {
            return {
                text: li.textContent.replace("✖", "").trim(),
                checked: li.classList.contains("checked"),
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.text;

            // Check if the task is completed
            if (task.checked) {
                li.classList.add("checked");
            }

            // Create delete button
            const span = document.createElement("span");
            span.innerHTML = "&#10006;"; // Cross mark
            span.classList.add("delete");
            li.appendChild(span);

            taskList.appendChild(li);
        });
    }
});
