const aside = document.querySelector("aside");
const menuBtns = document.querySelectorAll(".menu-btn");

const changeLayout = () => {
  console.log("RESIZING!");

  if (window.innerWidth > window.innerHeight) {
    console.log("DESKTOP");
    showMenu();
    aside.classList.add("desktop");
    return;
  }
  console.log("MOBILE");
  hideMenu();
  aside.classList.remove("desktop");
}


const showMenu = () => {
  aside.classList.add("slide-to-right");
  aside.classList.remove("slide-to-left");
};

const hideMenu = () => {
  aside.classList.add("slide-to-left");
  aside.classList.remove("slide-to-right");
}

menuBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    aside.classList.contains("slide-to-left") ? showMenu() : hideMenu();
    console.log("CLICKED");
  });

})









window.addEventListener("resize", changeLayout);
changeLayout();