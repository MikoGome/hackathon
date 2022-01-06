document.addEventListener("keypress", (e) => {
  if(e.key !== "p") return;
  const image = document.createElement("img");
  image.setAttribute("src", "https://pngimg.com/uploads/pokemon/pokemon_PNG15.png")
  image.style.position = "absolute";
  image.style.zIndex = "1000"
  image.style.width = "25vw";
  image.style.left = "0";
  image.style.top = "0";
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
});
