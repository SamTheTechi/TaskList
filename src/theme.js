const themeBtn = document.querySelector('.theme')

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
