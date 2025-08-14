let isSignedIn = false; // Track login status


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
// Example of adding/updating a task
db.collection("tasks").add({
    taskNumber: "TC-001",
    title: "Inspect Landing Gear",
    status: "Open",
    dueDate: "2025-08-20", // must be stored
    manhours: 5            // must be stored
});

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

tasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("task-card");

    card.innerHTML = `
        <h3>${task.taskNumber} - ${task.title}</h3>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Due Date:</strong> ${task.dueDate || "Not set"}</p>
        <p><strong>Man-hours:</strong> ${task.manhours || 0}</p>
    `;

    document.getElementById("taskCardsContainer").appendChild(card);
});

function seedDemo(){
  const t = [];
  t.push({
    id:uid(), 
    ata:'12', 
    tc:'COM-1532 / AMM —', 
    desc:'Cart - Servicing, Strut Oil', 
    tools: `COM-1532 Cart - Servicing, Strut Oil\n Part #: 1104 Supplier: 30188\n Part #: 8774B Supplier: 94861\n Part #: 8844 Supplier: 94861\n Part #: 8844B Supplier: 94861\n Part #: HM-GT1-C-VS Supplier: 1HV74\n Part #: PF53481-9P Supplier: 94861\n Part #: PF54124-3P Supplier: 94861\n Part #: PF55451-1 Supplier: 94861\n Part #: PF55451-23 Supplier: 94861\n Part #: SH001 Supplier: D2029\n Opt Part #: HM-GT1-C Supplier: 1HV74`, 
    cons: 'AEROSHELL-LGF', 
    rem: `SPL-1829 Valve - Drain, Landing Gear Shock Strut Oil\n Part #: J32108-16 Supplier: 81205\n\n( alternate to use a container )`, 
    dur:'—',
    manhours: 3.5,
    duedate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0] // 7 days from now
  });
  // ... rest of your demo data with similar additions
  state.tasks = t; 
  saveLocal();
  alert('Demo data for ATA 12 loaded.');
  render();
}
async function saveTask(){
  const t={
    ata: (document.getElementById('f_ata').value||'').trim(),
    tc: (document.getElementById('f_tc').value||'').trim(),
    desc: (document.getElementById('f_desc').value||'').trim(),
    tools: (document.getElementById('f_tools').value||'').trim(),
    cons: (document.getElementById('f_cons').value||'').trim(),
    rem: (document.getElementById('f_rem').value||'').trim(),
    dur: (document.getElementById('f_dur').value||'').trim(),
    manhours: parseFloat(document.getElementById('f_manhours').value) || 0,
    duedate: document.getElementById('f_duedate').value || ''
  };
  // ... rest of your saveTask function remains the same
}
function fillForm(t){
  state.editId=t.id;
  document.getElementById('formMode').textContent='Mode: Edit #'+t.tc;
  document.getElementById('f_ata').value=t.ata||'';
  document.getElementById('f_tc').value=t.tc||'';
  document.getElementById('f_desc').value=t.desc||'';
  document.getElementById('f_tools').value=t.tools||'';
  document.getElementById('f_cons').value=t.cons||'';
  document.getElementById('f_rem').value=t.rem||'';
  document.getElementById('f_dur').value=t.dur||'';
  document.getElementById('f_manhours').value=t.manhours||'';
  document.getElementById('f_duedate').value=t.duedate||'';
}
function resetForm(){
  state.editId=null;
  document.getElementById('formMode').textContent='Mode: Create';
  ['f_ata','f_tc','f_desc','f_tools','f_cons','f_rem','f_dur','f_manhours','f_duedate'].forEach(id=>document.getElementById(id).value='');
}
function parseExcelRows(rows){
  // ... existing code ...
  for(let r=0;r<rows.length;r++){
    // ... existing row processing ...
    out.push({ 
      ata, 
      tc, 
      desc, 
      tools, 
      cons, 
      rem, 
      dur,
      manhours: parseFloat(getCell(row, cols.manhours)) || 0,
      duedate: getCell(row, cols.duedate) || ''
    });
  }
  return out;
}
function renderList(){
  const wrap=document.getElementById('listWrap');
  if(!state.tasks.length){ wrap.innerHTML='<p class="muted">No task cards yet.</p>'; return; }
  let html='<table><thead><tr><th>ATA</th><th>Task Card</th><th>Description</th><th>Duration</th><th>Manhours</th><th>Due Date</th><th></th></tr></thead><tbody>';
  for(const t of state.tasks){
    html+=`<tr>
      <td>${escapeHTML(t.ata||'')}</td>
      <td>${escapeHTML(t.tc)}</td>
      <td>${escapeHTML(t.desc)}</td>
      <td>${escapeHTML(t.dur||'—')}</td>
      <td>${t.manhours || '—'}</td>
      <td>${t.duedate ? new Date(t.duedate).toLocaleDateString() : '—'}</td>
      <td style="text-align:right">
        <button class="btn ghost" onclick='editById("${t.id}")'>Edit</button>
        <button class="btn danger" onclick='removeTask("${t.id}")'>Delete</button>
      </td>
    </tr>`
  }
  html+='</tbody></table>';
  wrap.innerHTML=html;
}
function calculateTotalManhours() {
  const total = state.tasks.reduce((sum, task) => sum + (parseFloat(task.manhours) || 0, 0);
  document.getElementById('totalManhours').textContent = total.toFixed(1);
}

// Call this after any data changes:
calculateTotalManhours();
}
signIn() {
    isSignedIn = true;
    renderTasks(tasks); // Re-render with manhours & due
}
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
function renderUpcomingTasks() {
  const now = new Date();
  const upcoming = state.tasks
    .filter(t => t.duedate && new Date(t.duedate) > now)
    .sort((a,b) => new Date(a.duedate) - new Date(b.duedate))
    .slice(0, 5); // Show top 5 upcoming
  
  const container = document.getElementById('upcomingTasks');
  if(!upcoming.length) {
    container.innerHTML = '<p class="muted">No upcoming tasks</p>';
    return;
  }
  
  let html = '<ul style="padding-left: 20px;">';
  upcoming.forEach(t => {
    const daysLeft = Math.ceil((new Date(t.duedate) - now) / (1000 * 60 * 60 * 24));
    html += `<li>
      <b>${escapeHTML(t.tc)}</b> - Due in ${daysLeft} day(s)<br>
      <span class="muted">${escapeHTML(t.desc)}</span>
    </li>`;
  });
  html += '</ul>';
  container.innerHTML = html;
}
function render(){
  if(document.getElementById('tab-search').style.display!=='none') { 
    populateATAFilter(); 
    renderSearch(); 
  }
  if(document.getElementById('tab-manage').style.display!=='none') { 
    renderList(); 
    calculateTotalManhours();
    renderUpcomingTasks();
  }
}
// Initial render (no sign-in yet)
renderTasks();
