const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

// Event: Tambah tugas
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "" || taskDate === "") {
    alert("Harap isi semua form!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText} - <small>${taskDate}</small></span>
    <button class="delete-btn">X</button>
  `;

  // Tandai selesai kalau di-klik
  li.addEventListener("click", function(e) {
    if (e.target.tagName !== "BUTTON") {
      li.classList.toggle("done");
    }
  });

  // Hapus tugas
  li.querySelector(".delete-btn").addEventListener("click", function() {
    li.remove();
  });

  taskList.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
});

// Event: Filter tugas
function sortByDate() {
  const tasks = Array.from(document.querySelectorAll("#taskList li"));

  // ambil elemen <small> yang berisi tanggal
  tasks.sort((a, b) => {
    const dateA = new Date(a.querySelector("small").textContent);
    const dateB = new Date(b.querySelector("small").textContent);
    return dateA - dateB; // ascending (dari tanggal paling awal)
  });

  // hapus isi list, lalu masukkan ulang sesuai urutan baru
  taskList.innerHTML = "";
  tasks.forEach(task => taskList.appendChild(task));
}

function deleteAll() {
  if (confirm("Yakin mau hapus semua tugas?")) {
    taskList.innerHTML = ""; // hapus semua <li>
  }
}