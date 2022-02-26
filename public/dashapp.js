/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


async function populateIdea(){
    let container=document.getElementById('idea-container');

    let res=await fetch('http://localhost:5050/api/ideas');
    let data=await res.json();
    console.log(data);

    let content="very good content ";
    let okc=content;
    data.forEach((dt) => {
        // okc+=content;
        container.innerHTML+=`
        <div id="idea-box">
            <div id="idea-name">
                ${dt.name}
            </div>
            <div id="idea-domain">
                ${dt.domain}
            </div>
            <div id="idea-desc">
                ${dt.idea}
            </div>
            <div id="idea-own">
                Posted by: ${dt.owned}
            </div>
            <div id="idea-button-div">
                <button id="idea-button"><a href="mailto:${dt.email}">Let's talk<\a></button>
            </div>
        </div>
        `
    });
    
}

window.onload=populateIdea;
