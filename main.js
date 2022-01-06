let input = [];
let clear = null;
let summon = true;

document.body.addEventListener("keydown", (e) => {
  clearTimeout(clear);
  if(/[a-z]/.test(e.key) && e.key.length === 1) {
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

function createImg(link) {
  const image = document.createElement("img");
    
    image.setAttribute("src", link);
    image.classList.add("pokemonPal");
    image.setAttribute("draggable", false);
  
    document.querySelector("body").appendChild(image);
    
    let x = null;
    let y = null;
    let drag = null;
  
    image.addEventListener("mousedown", (event) => {
      x = event.pageX;
      y = event.pageY;
      drag = image;
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
    });

    image.addEventListener("dblclick", () => {
      image.remove();
    });
}
