const shownav = ()=>{
  const headerElement = document.getElementById("headerElement");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 230) {
      headerElement.classList.add("scroll-down")
    } else {
      headerElement.classList.remove("scroll-down")
    }
  })
}

export default shownav;

