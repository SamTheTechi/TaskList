import { detectDevice } from "./detect";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".addbutton");
  const input = document.querySelector(".inputfield");
  const list = document.querySelector(".tasklist");
  const head = document.querySelector(".header");
  const description = document.querySelector(".description");
  const content = document.querySelector(".content");
  const leftSection = document.querySelector(".leftsection");

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

    di.textContent = value;
    head.textContent = value;
    description.value = ""
    remove.textContent = "x";
    remove.onclick = () => removeEle(li, value);

    li.appendChild(di);
    li.appendChild(remove);

    li.style.flexShrink = "0";
    li.style.height = "2rem";

    li.addEventListener("click", () => loadDesc(value));

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
    head.textContent = name;
    content.classList.remove("hide");
    content.classList.add("show");
    description.oninput = () => saveDesc(name, description.value);
  };

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    const item = JSON.parse(localStorage.getItem("tasks")) || {};
    if (name && !item.hasOwnProperty(name)) {
      addTask(name);
      saveDesc(name, "");
      input.value = "";
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("textarea")) {
      loadDesc(e.target.textContent);
      if (detectDevice()) leftSection.classList.toggle("open");
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
      const keys = Object.keys(data);
      if (keys.length > 0) {
        const index = keys[0];
        head.textContent = index || "";
        description.value = data[index] || "";
      } else {
        content.classList.remove("show");
        content.classList.add("hide");
      }
    }, 500);
  }

  load();
});
