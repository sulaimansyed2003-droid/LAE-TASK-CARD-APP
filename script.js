// Sample task data (replace with your actual source)
const tasks = [
    { id: 1, title: "Inspect Landing Gear", dueDate: "2025-08-14", manhours: 4 },
    { id: 2, title: "Check Engine Oil", dueDate: "2025-08-13", manhours: 2 },
    { id: 3, title: "Replace Brake Pads", dueDate: "2025-08-20", manhours: 6 }
];

// Show due soon tasks & calculate total man-hours
function showDueTasks() {
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    let dueTasks = tasks.filter(task => {
        let taskDate = new Date(task.dueDate);
        return taskDate >= today && taskDate <= threeDaysFromNow;
    });

    let totalManhours = 0;
    const dueTasksList = document.getElementById("dueTasksList");
    dueTasksList.innerHTML = "";

    dueTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = `${task.title} - Due: ${task.dueDate} - ${task.manhours} hrs`;
        dueTasksList.appendChild(li);
        totalManhours += task.manhours;
    });

    document.getElementById("totalManhours").textContent = totalManhours;

    if (dueTasks.length > 0) {
        sendNotification(`⚠ ${dueTasks.length} task(s) due soon! Total: ${totalManhours} hrs`);
    }
}

// Send notification
function sendNotification(message) {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification(message);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(message);
                }
            });
        }
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", showDueTasks);
