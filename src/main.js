document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".addbutton");
  const input = document.querySelector(".inputfield");
  const list = document.querySelector(".tasklist");
  const head = document.querySelector(".header");
  const description = document.querySelector(".description");

  const load = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    list.innerHTML = "";
    Object.keys(tasks).forEach((task) => {
      addTask(task);
    });
  };

  const addTask = (value) => {
    const li = document.createElement("div");
    const di = document.createElement("div");
    const remove = document.createElement("button");

    li.className = "taskitem";
    di.className = "textarea";
    remove.className = "itembtn";

    di.innerText = value;
    remove.innerText = "x";
    remove.onclick = () => removeEle(li, value);

    li.appendChild(di);
    li.appendChild(remove);

    li.style.flexShrink = "0";
    li.style.height = "2rem";

    di.addEventListener("click", () => loadDesc(value));

    setTimeout(() => {
      li.classList.add("added");
    }, 10);
    list.appendChild(li);
  };

  const saveDesc = (name, desc) => {
    const data = JSON.parse(localStorage.getItem("tasks")) || {};
    data[name] = desc;
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const loadDesc = (name) => {
    const data = JSON.parse(localStorage.getItem("tasks")) || {};
    description.value = data[name] || "";
    head.innerText = name;
    description.oninput = () => saveDesc(name, description.value);
  };

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (name) {
      addTask(name);
      saveDesc(name, "");
      input.value = "";
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("textarea")) {
      loadDesc(e.target.innerText);
    }
  });

  description.addEventListener("input", () => {
    const data = head.textContent;
    if (data) {
      saveDesc(data, description.value);
    }
  });

  function removeEle(el, name) {
    el.classList.add("removed");
    setTimeout(() => {
      el.remove();
      const data = JSON.parse(localStorage.getItem("tasks")) || {};
      delete data[name];
      localStorage.setItem("tasks", JSON.stringify(data));
    }, 500);
  }

  load();
});
