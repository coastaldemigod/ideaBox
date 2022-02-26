/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  async function populateProfile(){
    let container=document.getElementById('container');

    let res=await fetch('http://localhost:5050/api/profile');
    let data=await res.json();
    console.log(data);

    container.innerHTML=`
    <div class="profile">
            <div class="profile-name">
            Profile
            </div>
            <div class="name">
                ${data.name}
            </div>
            <div class="email">
                ${data.email}                
            </div>
            <div class="ideact">
                ${data.ideas.length}
            </div>
        </div>
    `
    
    data.ideas.forEach((dt) => {
        // okc+=content;
        container.innerHTML+=`
        <div id="idea-container" class="flex-container-idea">
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
            </div>
        </div>
        `
    });
    
}

window.onload=populateProfile;