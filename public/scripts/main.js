// import * as data from './database/data.json';

// navigation
function navigation() {
  const nav = document.getElementById("nav");
  if (nav.className === "nav") {
    nav.className += " responsive";
  } else {
    nav.className = "nav";
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "80%";
  document.getElementById("page").style.marginRight = "80%";
  document.querySelector(".logo").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("page").style.marginRight = "0";
  document.querySelector(".logo").style.display = "block";
}

// scrolling to sections
$("a[href^='#']").click(function(e) {
  e.preventDefault();

  const position = $($(this).attr("href")).offset().top;

  $("body, html").animate({
    scrollTop: position
  });
  setTimeout(() => {
    closeNav();
  }, 500);
});




// carousel scrolling

// posto sam krenuo sa fetch a fetch ne prihvata relativnu putanju, 
// jer cita json samo preko live-server-a
// stavio sam i json fajl na net da moze da cita i na taj nacin

fetch("https://api.myjson.com/bins/a78hu")
// fetch("./database/data.json")
  .then(res => res.json())
  .then(data => {
    const heading = document.querySelector("#heading");
    const text = document.querySelector("#text");
    const button = document.querySelector("#button");
    heading.innerHTML = data[0].heading;
    text.innerHTML = data[0].text;
    button.innerHTML = data[0].button;

    // start slide
    let currentSlide = 0;

    const left = document.getElementById("left-arrow");
    left.addEventListener("click", () => {
      currentSlide -= 1;
      if (currentSlide === -1) return;
      let currentContentSlide = data.slice(currentSlide, currentSlide + 1);
      heading.innerHTML = currentContentSlide[0]["heading"];
      text.innerHTML = currentContentSlide[0]["text"];
      button.innerHTML = currentContentSlide[0]["button"];
    });

    const right = document.getElementById("right-arrow");
    right.addEventListener("click", () => {
      currentSlide += 1;
      if (currentSlide === data.length) return;
      let currentContentSlide = data.slice(currentSlide, currentSlide + 1);
      heading.innerHTML = currentContentSlide[0]["heading"];
      text.innerHTML = currentContentSlide[0]["text"];
      button.innerHTML = currentContentSlide[0]["button"];
    });
  })
  .catch(err => alert(err));
