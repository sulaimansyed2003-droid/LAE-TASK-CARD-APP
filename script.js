// Sample tasks data (you can replace with your actual data source)
const tasks = [
    { title: "Task A", dueDate: "2025-08-15", manhours: 5 },
    { title: "Task B", dueDate: "2025-08-14", manhours: 3 },
    { title: "Task C", dueDate: "2025-08-20", manhours: 2 }
];

const allTasksContainer = document.getElementById("allTasks");
const dueSoonContainer = document.getElementById("dueSoonTasks");

// Today's date
const today = new Date();
const threeDaysFromNow = new Date();
threeDaysFromNow.setDate(today.getDate() + 3);

// Render all tasks
tasks.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task-card");

    // Highlight if due soon
    const dueDateObj = new Date(task.dueDate);
    if (dueDateObj <= threeDaysFromNow && dueDateObj >= today) {
        taskEl.classList.add("due-soon");
    }

    taskEl.innerHTML = `
        <h3>${task.title}</h3>
        <p class="due-date">Due: ${task.dueDate}</p>
        <p class="manhours">Man-hours: ${task.manhours}</p>
    `;
    allTasksContainer.appendChild(taskEl);
});

// Render due soon tasks only
tasks
    .filter(task => {
        const dueDateObj = new Date(task.dueDate);
        return dueDateObj <= threeDaysFromNow && dueDateObj >= today;
    })
    .forEach(task => {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task-card", "due-soon");
        taskEl.innerHTML = `
            <h3>${task.title}</h3>
            <p class="due-date">Due: ${task.dueDate}</p>
            <p class="manhours">Man-hours: ${task.manhours}</p>
        `;
        dueSoonContainer.appendChild(taskEl);
    });
