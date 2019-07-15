var imported;
$(function(){

    if(!sessionStorage.getItem("token")){

        window.location.href="../login/login.html"; 
    }
    if(sessionStorage.getItem("isAdmin")){
        var navi=document.getElementById("profile-dropdown")
        var a=document.createElement("A")
        a.setAttribute("href","javascript:loadAdmin()")
        a.setAttribute("class","dropdown-item")
        a.setAttribute("id","admin")
        a.innerHTML="Admin"
        navi.insertAdjacentElement('afterbegin',a)
    }
    getUserName()
})
function getUserNameFunction(xhttp){
    var user=JSON.parse(xhttp.responseText)
    document.getElementById("user-name").innerHTML='<i class="fas fa-user"></i>'+"&nbsp;&nbsp"+user.name
}
function logout(){
    sessionStorage.removeItem("token")
    window.location.href="../login/login.html"; 
}
document.addEventListener('DOMContentLoaded', function() {
    var ca = sessionStorage.getItem("token");
    var base64Url = ca.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));
    sessionStorage.setItem("userId",decodedValue['userId'])
    sessionStorage.setItem("isAdmin",decodedValue['isAdmin'])
    loadBookings()
    
})
function removeSelected(){
    $("#book").removeClass('selected');
    $("#meetings").removeClass('selected');
    $("#teams").removeClass('selected');
    $("#profile").removeClass('selected');
    $("#admin").removeClass('selected');
    $("#settings").removeClass('selected');
}
function loadBookings(){
    removeSelected();
    $("#book").addClass('selected');
    $(".container-fluid").innerHTML="";
    if(imported != undefined || imported != null){
        imported.parentNode.removeChild( imported );
    }
    imported = document.createElement('script');
    imported.src = './bookings/bookings.js';
    document.head.appendChild(imported);
    $(".container-fluid").load("../home/bookings/bookings.html");
}

function loadMeetings(){
    removeSelected();
    $("#meetings").addClass('selected');
    $(".container-fluid").innerHTML="";
    if(imported != undefined || imported != null){
        imported.parentNode.removeChild( imported );
    }
    imported = document.createElement('script');
    imported.src = './meetings/meetings.js';
    document.head.appendChild(imported);
    $(".container-fluid").load("../home/meetings/meetings.html");
}

function loadTeams(){
    removeSelected();
    $("#teams").addClass('selected');
    $(".container-fluid").innerHTML="";
    if(imported != undefined || imported != null){
        imported.parentNode.removeChild( imported );
    }
    imported = document.createElement('script');
    imported.src = './teams/teams.js';
    document.head.appendChild(imported);
    $(".container-fluid").load("../home/teams/teams.html");
}
function loadAdmin(){
    removeSelected();
    $("#profile").addClass('selected');
    $("#admin").addClass('selected');
    $(".container-fluid").innerHTML="";
    if(imported != undefined || imported != null){
        imported.parentNode.removeChild( imported );
    }
    imported = document.createElement('script');
    imported.src = './admin/admin.js';
    document.head.appendChild(imported);
    $(".container-fluid").load("../home/admin/admin.html");
}
function loadSettings(){
    removeSelected();
    $("#profile").addClass('selected');
    $("#settings").addClass('selected');
    $(".container-fluid").innerHTML="";
    if(imported != undefined || imported != null){
        imported.parentNode.removeChild( imported );
    }
    imported = document.createElement('script');
    imported.src = './settings/settings.js';
    document.head.appendChild(imported);
    $(".container-fluid").load("../home/settings/settings.html");
}