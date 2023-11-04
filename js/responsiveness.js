const aside = document.querySelector("aside");

const changeLayout = () => {
  console.log("RESIZING!");

  if (window.innerWidth > window.innerHeight) {
    console.log("DESKTOP");
    aside.classList.add("slide-to-right");
    aside.classList.remove("slide-to-left");

    aside.classList.add("desktop");
    return;
  }
  console.log("MOBILE");
  aside.classList.add("slide-to-left");
  aside.classList.remove("slide-to-right");
  aside.classList.remove("desktop");
}

window.addEventListener("resize", changeLayout);
changeLayout();