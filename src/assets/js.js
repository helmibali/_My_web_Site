 close;
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("openBtn").hidden = true;
    document.getElementById("openBtn2").hidden = true;
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("openBtn").hidden = false;
    document.getElementById("openBtn2").hidden = false;
  }

 