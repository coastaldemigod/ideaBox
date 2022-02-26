/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function showRegister(){
    var f1=document.getElementById("login-form");
    var f2=document.getElementById("register-form");
    var f3=document.getElementById("go-register");
    var f4=document.getElementById("go-login");
    f1.className='hide';
    f2.className='';
    f3.className='hide';
    f4.className='';
  }

  function showLogin(){
    var f1=document.getElementById("login-form");
    var f2=document.getElementById("register-form");
    var f3=document.getElementById("go-register");
    var f4=document.getElementById("go-login");
    f1.className='';
    f2.className='hide';
    f3.className='';
    f4.className='hide';
  }