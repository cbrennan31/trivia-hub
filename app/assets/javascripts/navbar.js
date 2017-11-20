$(document).ready(function() {
  $(".icon").click( ( event ) => {
    let navbar = document.getElementById("navbar")
      if (navbar.className === "navbar") {
        navbar.className += " responsive";
      } else {
        navbar.className = "navbar";
      }
  })
});
