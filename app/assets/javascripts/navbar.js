$(document).ready(function() {
  $(".icon").click( ( event ) => {
    let navbar = document.getElementById("navbar")
      if (navbar.className === "navbar") {
        navbar.className += " responsive";
      } else {
        navbar.className = "navbar";
      }

    let rightNav = document.getElementById("right-nav")
      if (rightNav.className==="right-nav") {
        rightNav.className -= "right-nav"
      } else {
        rightNav.className = "right-nav"
      }
  });
});
