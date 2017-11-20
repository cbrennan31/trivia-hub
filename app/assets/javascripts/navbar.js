$(document).ready(function() {
  $(".icon").click( function( event )  {
    var navbar = document.getElementById("navbar")
      if (navbar.className === "navbar") {
        navbar.className += " responsive";
      } else {
        navbar.className = "navbar";
      }
  })
});
