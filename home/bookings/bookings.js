$('#rooms-slide').carousel({interval: false});
$('#start-time').datetimepicker({autoclose: true});
$('#end-time').datetimepicker({autoclose: true});
  
  $( function() {
    setRoomsCarousel();
    
    var room_id;
    var room_id_send;
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'timeGrid', 'list','interaction' ],
      aspectRatio: 2,
      eventBackgroundColor : "var(--background-blue)",
      unselectAuto:false,
      header:
      {  
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      defaultView: "timeGridWeek",
      selectable: true,
      eventOverlap:false,
      selectOverlap:false,
      nowIndicator:true,
      eventTextColor: '#ffffff',
      select: function (info) {
        
        loadBookingPopup(info.start,info.end);
      }
    });
    calendar.render();
    
 
  
    $('.carousel-inner').on("click",'.room-box-badge',function(){
      document.getElementById("loader").style.display="block";
      room_id=this.innerHTML;
      room_id_send=this.id.split("-")[1]
      $(".booking-row").css("visibility","visible");
      $(".booking-row").css("overflow","unset");
      $(".booking-row").css("height","fit-content");
      $(".booking-row").css("pointer-events","auto");
      $('.badge').css("background-color","var(--white)");
      $('.badge').css("color","var(--background-blue)");
      $('#'+this.id).css("background-color","var(--dark-blue")
      $('#'+this.id).css("color","var(--white");
      setCalendarEvents(room_id_send);
      
      
      
    });

    window.setCalendarEventsFunction=function(xhttp){
      if(calendar.getEventSources()[0]){
        calendar.getEventSources()[0].remove()  
        calendar.addEventSource(JSON.parse(xhttp.responseText))
        window.scrollBy({
          top: 10000,
          behavior: 'smooth'
        });
      }
      else{
        calendar.addEventSource(JSON.parse(xhttp.responseText))
        window.scrollBy({
          top: 10000,
          behavior: 'smooth'
        });
      }
      document.getElementById("loader").style.display="none";
    }
  
    

    
    
    window.bookMeeting = function(){
      document.getElementById("loader").style.display="block";
    
      var title=document.getElementById("title-field").value;
      var agenda=document.getElementById("agenda-field").value;
      let start_datetime = document.getElementById("update-start-time").value;
      let start_date=start_datetime.replace(" ","T")
      
      let end_datetime = document.getElementById("update-end-time").value;
      let end_date = end_datetime.replace(" ","T")
      
      var radioValue = $("input[name='repeat']:checked").val();
      
        var array = calendar.getEvents();
      
        for(var i in array){
          var start=new Date(start_datetime);
          var end=new Date(end_datetime);
          var startDate=array[i].start;
          var endDate=array[i].end;
        
          var condition1 = (start.getTime()==(startDate.getTime()) && end.getTime()==(endDate.getTime()));
          var condition2 = (start<(endDate) && end>(endDate));
          var condition3 = (start<(startDate) && end>(startDate));
          var condition4 = (start>(startDate) && end<(endDate));
          
          if (condition1 || condition2 || condition3 ||  condition4){
            document.getElementById("error-msg").innerHTML="*This slot is booked, try another one";
            document.getElementById("loader").style.display="none";
            return false;
          } 
        }
        var selectedTeams=$(".edit-teams").children("option:selected");
        var sendselectedTeams=[];
        for(var v=0;v<selectedTeams.length;v++){
            sendselectedTeams.push(selectedTeams[v].value)
        }
        var selectedMembers=$(".edit-members").children("option:selected");
        var sendselectedMembers=[];
        for(var v=0;v<selectedMembers.length;v++){
            sendselectedMembers.push(selectedMembers[v]['id'])
        }
        if(sendselectedMembers.length==0 && sendselectedTeams.length==0){
          document.getElementById("error-msg").innerHTML="*Select atleast one team or participant";
          document.getElementById("loader").style.display="none";
          return false;
        }
     
      postBookMeeting(title,agenda,start_date,end_date,sendselectedMembers,sendselectedTeams,room_id,radioValue)
      $("#meeting-popup").modal("hide")
      return true;
    };
    window.postBookMeetingFunction=function(){
      document.getElementById("room-"+room_id_send).click();
      document.getElementById("loader").style.display="none";
    }
    $("#booking-form").submit(function(e) {
      e.preventDefault();
    });
    
  
})
  
 

function setRoomsCarouselFunction(xhttp){
  var rooms_data=JSON.parse(xhttp.responseText);
        
  
  for(var rm in rooms_data){
    var parent=document.getElementById("room-carousel-inner");
    if(rm % 5 == 0 ){
      var newDiv=document.createElement("DIV");
      if(rm == 0){
        newDiv.setAttribute("class","carousel-item active")
      } 
      else{
        newDiv.setAttribute("class","carousel-item")
      }    
      
      var newChildDiv=document.createElement("DIV");
      newChildDiv.setAttribute("class","room-box");
      
      var newRoomSpan=document.createElement("SPAN");
      newRoomSpan.setAttribute("class","room-box-badge badge")
      newRoomSpan.setAttribute("id","room-"+rooms_data[rm].roomId)
      newRoomSpan.setAttribute("data-toggle","tooltip")
      newRoomSpan.setAttribute("title"," Capacity : "+rooms_data[rm].capacity+ " People");
      newRoomSpan.innerHTML=rooms_data[rm].name
      newChildDiv.appendChild(newRoomSpan);
      
      newDiv.appendChild(newChildDiv);
      parent.appendChild(newDiv);
      

    }
    else{
      var newRoomSpan=document.createElement("SPAN");
      newRoomSpan.setAttribute("class","room-box-badge badge")
      newRoomSpan.setAttribute("id","room-"+rooms_data[rm].roomId)
      newRoomSpan.setAttribute("data-toggle","tooltip")
      newRoomSpan.setAttribute("title"," Capacity : "+rooms_data[rm].capacity+ " People");
      newRoomSpan.innerHTML=rooms_data[rm].name
      newChildDiv.appendChild(newRoomSpan);

    }
    

  }
}
  
  
  