
var myMeetings=[];

function getMyMeetingsFunction(xhttp){
    myMeetings=JSON.parse(xhttp.responseText)

    var calendarEl = document.getElementById('calendar');
    calendarEl.innerHTML="";

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'timeGrid', 'list','interaction' ],
      eventRender: function(info) {
        info.el.style.cursor = 'pointer';
      },
      eventClick: function(info) {
        document.getElementById("loader").style.display="block";
        loadEventDetailsModal(myMeetings,info.event.start,info.event.end,info.event.id)
      },
      aspectRatio: 2,
      eventBackgroundColor : "var(--background-blue)",
      header:
      {  
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      defaultView: "timeGridWeek",
      nowIndicator:true,
      eventTextColor: '#ffffff',
    });
    calendar.render();

    if(calendar.getEventSources()[0]){
                        
      calendar.getEventSources()[0].remove()  
      calendar.addEventSource(myMeetings)
    }
    else{
      calendar.addEventSource(myMeetings)
    }
    
    window.editMeeting = function(roomname,eventId){
     
      document.getElementById("loader").style.display="block";

      var title=document.getElementById("title-field").value;
      var agenda=document.getElementById("agenda-field").value;
      let start_datetime = document.getElementById("update-start-time").value;
      let start_date=start_datetime.replace(" ","T")
      
      let end_datetime = document.getElementById("update-end-time").value;
      let end_date = end_datetime.replace(" ","T")
      if(document.getElementById("edit-room-span").innerHTML){
        var selectedRoom=$('.edit-room').selectpicker('val');
        if(selectedRoom) {
          
        }
        else{
          document.getElementById("error-msg").innerHTML="*Select a room";
          return false;
        }
      }
      else{
        var selectedRoom=roomname
      }
      
      
      var selectedMembers=$(".edit-members").children("option:selected");
      var sendselectedMembers=[];
      for(var v=0;v<selectedMembers.length;v++){
          sendselectedMembers.push(selectedMembers[v]['id'])
      }
      postEditMeeting(eventId,title,agenda,start_date,end_date,sendselectedMembers,selectedRoom)
        
      $("#meeting-popup").modal("hide")
      return true;
    };
      
     $("#booking-form").submit(function(e) {
      e.preventDefault();
    
    });

    window.cancelMeeting=function(id){
      document.getElementById("loader").style.display="block";
      $("#meeting-popup").modal("hide")
      postCancelMeeting(id)
      
    }
    window.postCancelMeetingFunction=function(){
        calendar.getEventById(id).remove()
        document.getElementById("loader").style.display="none";
    }
}

$(function() {
    getMyMeetings("events/my")
})