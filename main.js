let input = [];
let clear = null;
let summon = true;
let zIdx = 1000000;

document.body.addEventListener("keydown", (e) => {
  clearTimeout(clear);
  if(/[a-z]/i.test(e.key) && e.key.length === 1) {
    input.push(e.key);
    
  }
  if(input.join("").toLowerCase() === "pokepal") {
    
    if(summon) fetch("https://pokeapi.co/api/v2/pokemon?limit=898%27")
      .then(data => data.json())
      .then(pokemons => {
        app(pokemons)
      });
      summon = false;
  }
  clear = setTimeout(() => {
    input = [];
    summon = true;
  }, 2000);
});


function app(obj) {                               
  const pkmArr = obj.results;          //<-- arr is an array of pokemons
  const random = randomNum(pkmArr);
  pokemonImgSelector(pkmArr, random);
}

function pokemonImgSelector(arr, index) {
  fetch(arr[index].url)
    .then(data => data.json())
    .then(pokemon => {
      createImg(pokemon.sprites.other["official-artwork"]["front_default"]);
    }) 
}

function randomNum(arr) {
  return Math.floor(Math.random() * arr.length);
}

const pokeballs = ["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/net-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dive-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/nest-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repeat-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png", 
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-ball.png",
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heal-ball.png",
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png",
"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"]

const pokeballsPreload = [];
for(let i = 0; i < pokeballs.length; i++) {
  const pre = new Image();
  pre.src = pokeballs[i];
  pokeballsPreload.push(pre);
}

function createImg(link) {
  const image = document.createElement("img");
    
  image.setAttribute("src", link);
  image.classList.add("pokemonPal");
  image.style.zIndex = String(zIdx);
  image.setAttribute("draggable", false);
  
  document.querySelector("body").appendChild(image);
    
  let x = null;
  let y = null;
  let drag = null;
  
  image.addEventListener("mousedown", (event) => {
    x = event.pageX;
    y = event.pageY;
    drag = image;
    console.log(image.style.zIndex);
    image.style.zIndex = String(zIdx+1)
  });
  
  image.addEventListener("mousemove", (event) => {
    x2 = x - event.pageX;
    y2 = y - event.pageY;
    x = event.pageX;
    y = event.pageY;
    drag.style.left = `${drag.offsetLeft - x2 }px`;
    drag.style.top = `${drag.offsetTop - y2}px`;
  });
  
  image.addEventListener("mouseup", () => {
    drag = null;
    zIdx++;
  });

  image.addEventListener("mouseover", () => {
    image.style.cursor = `url(${pokeballs[Math.floor(Math.random() * pokeballs.length)]}), pointer`;
  });

  image.addEventListener("dblclick", () => {
    image.remove();
  });
}
