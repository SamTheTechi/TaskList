const back = document.querySelector('.rightsection')
const btn = document.querySelector('.imageback')

let index = 0;
const background = ['beach', 'dawn', 'field', 'snow', 'dusk'];

const changeBack = () => {
  index = (index + 1) % background.length;
  const newImage = new Image();
  newImage.src = `${background[index]}.webp`;
  newImage.onload = () => {
    back.style.backgroundImage = `url(${newImage.src})`
  }
}

btn.onclick = changeBack;
