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

    let res=await fetch('/api/profile');
    let data=await res.json();
    console.log(data);

    let pcon=document.getElementById("profile-container");
    let idcon=document.getElementById("idea-container");
    pcon.innerHTML=`
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
                ${data.ideas.length} ideas posted
            </div>
    `
    
    let counter=0;

    data.ideas.forEach((dt) => {
        
        idcon.innerHTML+=`
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
                <div id="idea-button-div">
                <button id="idea-button" value="${counter}" onclick="ideafun(value)">Trash Idea</button>
            </div>
            </div>
        `
        counter++;
    });
    
}

async function ideafun(value){
    
    let data={
        index:value
    }

    let res=await fetch("/api/burstIdea",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(data)
    })

    if(res.status==200)
    {
        location.reload();
    }

}

window.onload=populateProfile;