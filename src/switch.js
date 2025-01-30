const back = document.querySelector('.rightsection')
const btn = document.querySelector('.imageback')
const themeBtn = document.querySelector('.theme')

const background = ['beach', 'dawn', 'field', 'snow', 'dusk'];
let index = 0;

btn.addEventListener('click', () => {
  index = (index + 1) % background.length;
  changeBack(background[index])
})

const changeBack = (name) => {
  const newImage = new Image();
  newImage.src = `${name}.webp`;
  newImage.onload = () => {
    back.style.backgroundImage = `url(${newImage.src})`
    localStorage.setItem("background", name);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const wallpaper = localStorage.getItem("background") || "dawn";
  changeBack(wallpaper);
  index = background.indexOf(wallpaper);
});


const themes = ['light', 'dark'];
let indexTheme = 0;

themeBtn.addEventListener("click", () => {
  indexTheme = (indexTheme + 1) % themes.length;
  changeTheme(themes[indexTheme])
})

function changeTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  changeTheme(savedTheme);
  indexTheme = themes.indexOf(savedTheme);
});

document.addEventListener("DOMContentLoaded", () => {
  const spinner = document.querySelector(".spinner");
  const leftSection = document.querySelector(".leftsection");

  spinner.addEventListener("click", () => {
    leftSection.classList.toggle("open");
  });
})
