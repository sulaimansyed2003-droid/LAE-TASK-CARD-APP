let isSignedIn = false; // Track login status

// Example task data (will be loaded after sign-in in real app)
const tasks = [
    { number: "TC-001", title: "Inspect Landing Gear", dueDate: "2025-08-15", manhours: 4 },
    { number: "TC-002", title: "Check Hydraulic Lines", dueDate: "2025-08-20", manhours: 3 },
    { number: "TC-003", title: "Replace Brake Pads", dueDate: "2025-08-14", manhours: 2 }
];
{
    number: "TC-001",
    title: "Inspect Landing Gear",
    dueDate: "2025-08-15",
    manhours: 4
}

// Example sign-in function
function signIn() {
    isSignedIn = true;
    renderTasks();
}

function renderTasks() {
    const taskContainer = document.getElementById("taskList");
    taskContainer.innerHTML = "";

    tasks.forEach(task => {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task-card");

        // Task number always visible
        let html = `<h3>${task.number} - ${task.title}</h3>`;

        // Show due date + manhours ONLY if signed in
        if (isSignedIn) {
            html += `
                <p><strong>Due:</strong> ${task.dueDate}</p>
                <p><strong>Man-hours:</strong> ${task.manhours}</p>
            `;
        }

        taskEl.innerHTML = html;
        taskContainer.appendChild(taskEl);
    });
}
function renderTasks(taskArray) {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    taskArray.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task-card");

        // Always show number + title
        let cardHTML = `<h3>${task.number} - ${task.title}</h3>`;

        // Show manhours & due date only if signed in
        if (isSignedIn) {
            cardHTML += `
                <p><strong>Due:</strong> ${task.dueDate}</p>
                <p><strong>Man-hours:</strong> ${task.manhours}</p>
            `;
        }

        card.innerHTML = cardHTML;
        container.appendChild(card);
    });
}
signIn() {
    isSignedIn = true;
    renderTasks(tasks); // Re-render with manhours & due
}

// Initial render (no sign-in yet)
renderTasks();
