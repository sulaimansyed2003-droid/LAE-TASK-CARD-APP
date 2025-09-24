<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Batik Air Task Card Live Sync</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
</head>
<body>
  <h2>Upload Excel (Officer)</h2>
  <input type="file" id="fileInput" accept=".xlsx" />

  <h2>Live Tasks (LAE sees this)</h2>
  <div id="allTasks"></div>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

    // 🔹 Firebase config (your project)
    const firebaseConfig = {
      apiKey: "AIzaSyCii_mcKN6cL7Ep8VYdfNnKHFgi2AYAMpI",
      authDomain: "batik-air-taskcard.firebaseapp.com",
      projectId: "batik-air-taskcard",
      storageBucket: "batik-air-taskcard.appspot.com",
      messagingSenderId: "396150494337",
      appId: "1:396150494337:web:a882db879da9eac5ade980"
    };

    // Init Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // ---------- Excel Upload + Save ----------
    async function handleTaskFile(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async function(e) {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: "array" });
        const sh = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sh, { defval: "" });

        // Map Excel → task objects
        const tasks = json.map(row => ({
          ata: row["ATA"] || "",
          card: row["TASK CARD NUM/ AMM REF"] || "",
          description: row["TASK DESCRIPTION"] || "",
          status: "pending"
        }));

        // Save to Firestore
        await setDoc(doc(db, "appData", "batikAir"), { tasks }, { merge: true });
        console.log("✅ Excel uploaded & tasks saved to Firestore");
      };
      reader.readAsArrayBuffer(file);
    }

    // ---------- Live Sync ----------
    function enableRealtimeSync() {
      onSnapshot(doc(db, "appData", "batikAir"), snap => {
        if (snap.exists()) {
          const data = snap.data();
          console.log("📲 Live update:", data.tasks);
          renderTasks(data.tasks || []);
        }
      });
    }

    // ---------- Render Tasks ----------
    function renderTasks(tasks) {
      const container = document.getElementById("allTasks");
      container.innerHTML = "";
      tasks.forEach(t => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "6px";
        div.style.margin = "4px 0";
        div.textContent = `${t.card} — ${t.description}`;
        container.appendChild(div);
      });
    }

    // Hook up file input
    document.getElementById("fileInput").addEventListener("change", ev => {
      handleTaskFile(ev.target.files[0]);
    });

    // Start listening
    enableRealtimeSync();
  </script>
</body>
</html>
