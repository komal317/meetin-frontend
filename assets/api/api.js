// -----------------LOGIN--------------------//
function login(apiName,username,password){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  
        loginFunction(this)
      }
      if(this.readyState == 4 && this.status == 401){
        loginIncorrect();
      }
    };
    xhttp.open("POST", 'http://localhost:8181/api/'+apiName, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify({'username': username, 'password': password}));
}
// GET USERNAME
function getUserName(){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  
        getUserNameFunction(this)
      }
    };
    xhttp.open("GET", 'http://localhost:8181/api/users/me', true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    xhttp.send();
}   
// -------------------GET ROOMS--------------------//
function setRoomsCarousel(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      setRoomsCarouselFunction(this)
    
    }
    else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
      $("#error-popup").modal("show")
    }
  };

  xhttp.open("GET", "http://localhost:8181/api/rooms", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}

//-------------GET ALL MEETINGS INITIALLY-----------------//
function setCalendarEvents(room_id_send){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      setCalendarEventsFunction(this);
    }
    else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
      $("#error-popup").modal("show")
    }
  };
  xhttp.open("GET", 'http://localhost:8181/api/events/all/'+room_id_send  , true);
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}

//-----------------BOOK MEETING--------------------//
function postBookMeeting(title,agenda,start_date,end_date,sendselectedMembers,sendselectedTeams,room_id,radioValue){
  var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          
          postBookMeetingFunction();
  
        }
        else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
          $("#error-popup").modal("show")
        }
      };
  
      xhttp.open("POST", "http://localhost:8181/api/events", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send(JSON.stringify({
        'title':title,
        'agenda':agenda,    
        'start':start_date,
        'end':end_date,
        'members':sendselectedMembers,
        'teams':sendselectedTeams,
        'roomName':room_id,
        'repeat':radioValue
      }))
}

// -----------GET TEAMS AND USERS FOR BOOKING FORM POPUP-----------//
function loadBookingPopup(start,end){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = new XMLHttpRequest();
      x.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let meetingmodal=new meetingModal(true,false,false,"","",start,end,"",JSON.parse(xhttp.responseText),JSON.parse(x.responseText),"")
            meetingmodal.move();
        }
        else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
          $("#error-popup").modal("show")
        }
      };
      x.open("GET", 'http://localhost:8181/api/teams', true);
      x.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      x.send();
        
    }
    else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
      $("#error-popup").modal("show")
    }
  };
  xhttp.open("GET", 'http://localhost:8181/api/users', true);
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}


//--------------GET EVENT DETAILS FOR POPUP-------------------------//
function loadEventDetailsModal(myMeetings,start,end,event_id){
  var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var x = new XMLHttpRequest();
          x.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              
              var xh = new XMLHttpRequest();
              xh.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  
                  var xht = new XMLHttpRequest();
                  xht.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      
                        document.getElementById("loader").style.display="none";
                        let meetingmodal=new meetingModal(false,true,false,myMeetings,JSON.parse(xht.responseText),start,end,event_id,JSON.parse(xhttp.responseText),JSON.parse(x.responseText),JSON.parse(xh.responseText),event_id)
                        meetingmodal.move();
                    }
                  };
                  xht.open("GET", 'http://localhost:8181/api/events', true);
                  xht.setRequestHeader("Content-type", "application/json");
                  xht.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
                  xht.send();
                }
              };
              xh.open("GET", 'http://localhost:8181/api/rooms', true);
              xh.setRequestHeader("Content-type", "application/json");
              xh.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
              xh.send();
            }
          };
          x.open("GET", 'http://localhost:8181/api/teams', true);
          x.setRequestHeader("Content-type", "application/json");
          x.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
          x.send();
            
        }
      };
      xhttp.open("GET", 'http://localhost:8181/api/users', true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send();
}

//-------------------------GET USER'S MEETINGS------------------------------//
function getMyMeetings(apiName){
  document.getElementById("loader").style.display="block";
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 404){
    document.getElementById("loader").style.display="none";
    getMyMeetingsFunction(this)
  }
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("loader").style.display="none";
    getMyMeetingsFunction(this)
  }
  
};
xhttp.open("GET", 'http://localhost:8181/api/'+apiName, true);
xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
xhttp.send();
}

//------------------------POST EDIT MEETING-------------------------//
function postEditMeeting(eventId,title,agenda,start_date,end_date,sendselectedMembers,selectedRoom){
  var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         
          document.getElementById("loader").style.display="none";
          getMyMeetings("events/my")

        }
      };
    
      xhttp.open("PUT", "http://localhost:8181/api/events", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send(JSON.stringify({
        'id':eventId,
        'title':title,
        'agenda':agenda,    
        'start':start_date,
        'end':end_date,
        'members':sendselectedMembers,
        'roomName':selectedRoom,
        'repeat':"none"
      }));
}

//-------------------------POST CANCEL MEETING-----------------------------//
function postCancelMeeting(id){
  var xht = new XMLHttpRequest();
      xht.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          postCancelMeetingFunction()
        }
      };
      xht.open("DELETE", 'http://localhost:8181/api/events', true);
      xht.setRequestHeader("Content-type", "application/json");
      xht.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xht.send(JSON.stringify({'eventId':id}));
}

// -------------------GET USERS TEAMS-------------------//
function getMyTeams(apiName){
  console.log("called")
 var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {

   getMyTeamsFunction(this)
 }
};
xhttp.open("GET", 'http://localhost:8181/api/'+apiName, true);
xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
xhttp.send();
}
//  -----------------GEt NON TEAM MEMBERS---------------------//
function getNonMembers(apiName,teamId){
   
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
      getNonMembersFunction(this,teamId)
    }
  };
  xhttp.open("GET", 'http://localhost:8181/api'+apiName, true);
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}

// ------------------ADD MEMBERS TO TEAM---------------//
function postAddMembers(apiName,teamId,idArray,nameArray){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      postAddMembersFunction(this,teamId,idArray,nameArray)
    
    }
  };

  xhttp.open("POST", "http://localhost:8181/api"+apiName, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send(JSON.stringify({'empIds':idArray}));  
}

// ------------------DELETE MEMBERS FROM TEAM-----------------------//
function postDeleteMembers(apiName,teamId,empId){
  var xhttp = new XMLHttpRequest();
  var ids=[];
  ids.push(empId)
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      deleteMemberFunction(this,teamId,empId)
    
    }
  };

  xhttp.open("DELETE", "http://localhost:8181/api"+apiName, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send(JSON.stringify({'empIds':ids}));  
}


// CHANGE PASSWORD
function changePassword(){
  
  
  var xht = new XMLHttpRequest();
                xht.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      console.log("oK DONE")
                      $('#message').html('Password changed successfully !').css('color', 'white');
                      document.getElementById("change-password-form").reset();
                  }
                };
  xht.open("POST", 'http://localhost:8181/api/users/my/changepwd', true);
  xht.setRequestHeader("Content-type", "application/json");
  xht.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xht.send(JSON.stringify({'currentPassword':document.getElementById("oldPassword").value,'newPassword':document.getElementById("newPassword").value}));
}