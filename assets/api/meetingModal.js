var imported = document.createElement('script');
imported.src = '../node_modules/bootstrap-select/dist/js/bootstrap-select.js';
document.head.appendChild(imported);

var imported = document.createElement('link');
imported.rel="stylesheet"
imported.href = '../node_modules/bootstrap-select/dist/css/bootstrap-select.css';
document.head.appendChild(imported);

var imported = document.createElement('script');
imported.src = '../node_modules/bootstrap-datetime-picker/js/bootstrap-datetimepicker.js';
document.head.appendChild(imported);

var imported = document.createElement('link');
imported.rel="stylesheet"
imported.href = '../node_modules/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css';
document.head.appendChild(imported);

class meetingModal{

    constructor (book,user,organizer,myMeetings,allMeetings,start,end,clickedId,nonmembers,teams,rooms,eventOfId) {
        
        this.book=book;
        this.user=user;
        this.organizer=organizer;
        this.myMeetings=myMeetings;
        this.allMeetings=allMeetings;
        this.start=start;
        this.end=end;
        this.clickedId=clickedId;
        this.nonmembers=nonmembers;
        this.allTeams=teams
        this.rooms=rooms
        this.eventOfId=eventOfId;
        
        
    }
    
    move () {
      var startTime,endTime;
      const weekday=new Array(7);
      weekday[1]="Mon";
      weekday[2]="Tues";
      weekday[3]="Wed";
      weekday[4]="Thu";
      weekday[5]="Fri";
      weekday[6]="Sat";
      weekday[0]="Sun";
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      var meeting_modal=document.getElementById("meeting-modal");
      meeting_modal.innerHTML=""
      
      var modalFade=document.createElement("DIV");
      modalFade.setAttribute("class","modal fade");
      modalFade.setAttribute("id","meeting-popup")
      modalFade.setAttribute("tabindex","-1")
      modalFade.setAttribute("role","dialog");
      modalFade.setAttribute("aria-labelledby","meeting-popupTitle")
      modalFade.setAttribute("aria-hidden","true");

      var modalDialogCentered=document.createElement("DIV");
      modalDialogCentered.setAttribute("class","modal-dialog modal-dialog-centered modal-lg");
      modalDialogCentered.setAttribute("role","document")
      

      var content=document.createElement("DIV")
      content.setAttribute("class","modal-content")

      var header=document.createElement("DIV");
      header.setAttribute("class","modal-header");
      var fa=document.createElement("I");
      fa.setAttribute("class","fas fa-users")
      fa.setAttribute("style","padding-right:20px;")
      header.appendChild(fa)
      var title=document.createElement("H1")
      title.setAttribute("class","modal-title")
      title.setAttribute("id","meeting-popupTitle")
      if(this.book)
        title.innerHTML="Book your meeting";
      else{
        for(var x in this.myMeetings){
          
          if(this.myMeetings[x]['id'] == this.clickedId){
            title.innerHTML=this.myMeetings[x]['title']
          }
        }
      }
      
      
      header.appendChild(title)
     
      var button=document.createElement("BUTTON");
      button.setAttribute("id","modal-close-icon" );
      button.setAttribute("type","button");
      button.setAttribute("class","close");
      button.setAttribute("data-dismiss","modal")
      button.setAttribute("aria-label","Close");

      var span=document.createElement("SPAN");
      span.setAttribute("aria-hidden","true")
      span.innerHTML="&times;";
      button.appendChild(span)
      header.appendChild(button)

      content.appendChild(header)
     
      
      

      
      


      var body=document.createElement("DIV");
      body.setAttribute("class","modal-body");
      


        var form=document.createElement("FORM")
        form.setAttribute("class","booking-form")
        form.setAttribute("name","booking-form")
        form.setAttribute("id","booking-form")
        
        form.setAttribute("style","display:grid;grid-template-columns:0.5fr 0.5fr;grid-column-gap:30px;padding:30px");

        var div=document.createElement("DIV")
        
        div.setAttribute("id","title-row")
        var row1=document.createElement("DIV");
        row1.setAttribute("class","row1")
        var span=document.createElement("SPAN");
        span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
        span.innerHTML="Title";
        row1.appendChild(span);
        var row2=document.createElement("DIV");
        row2.setAttribute("class","form-group")
        row2.setAttribute("id","title-row-2")
        row2.setAttribute("style","color:gray;font-size:16px")
        var input=document.createElement("INPUT")
        input.setAttribute("class","form-control form-input")
        input.setAttribute("id","title-field")
        input.setAttribute("style","border-radius: 10px;height: 50px;")
        input.setAttribute("type","text")
        input.setAttribute("autocomplete","off");
        input.setAttribute("required","")
        var clickedId=this.clickedId
        if(this.book)
        {div.setAttribute("style","grid-column:1/span 2;padding-bottom:1rem")}
        else{
          div.setAttribute("style","visibility:hidden;height:0px;")
          
          for(var x in this.myMeetings){
            
              if(this.myMeetings[x]['id'] == clickedId){
                input.setAttribute("value",this.myMeetings[x]['title'])
              }
            }
        }
        
        row2.appendChild(input)
        div.appendChild(row1);
        div.appendChild(row2)
        
        form.appendChild(div) 
        
        if(this.user){
                      var div=document.createElement("DIV")
            div.setAttribute("id","organizer")
            div.setAttribute("style","padding-bottom:10px;justify-self:end;")
            var row1=document.createElement("DIV");
            row1.setAttribute("id","organizer-row1")
          
            
            div.appendChild(row1)


            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
            var span=document.createElement("SPAN");
            span.setAttribute("class","badge badge-info")
            span.setAttribute("style","padding:7px;letter-spacing:0.03cm;margin-bottom:5px;")
            span.innerHTML="Organizer";
            row2.appendChild(span);
            
            var span=document.createElement("SPAN");
            for(var x in this.myMeetings){
              if(this.myMeetings[x]['id'] == this.clickedId){
                span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+this.myMeetings[x]['organizer']['name']+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
              }
            }
            
            row2.appendChild(span)
            
            
            for(var x in this.myMeetings){
              startTime=new Date(this.myMeetings[x]['start'])
              endTime=new Date(this.myMeetings[x]['end'])
              
              if(this.myMeetings[x]['id'] == this.clickedId){
                if(this.myMeetings[x]['organizer']['empId']===sessionStorage.getItem("userId")){
                  var roomname=this.myMeetings[x]['roomName']
                  var id=this.myMeetings[x]['id']
                  var i=document.createElement("I")
                  i.setAttribute("class","far fa-edit")
                  i.setAttribute("id","organizer-edit")
                  
                  i.addEventListener("click",function(){
                    
                    this.setAttribute("style","visibility:hidden")
                    this.organizer=true;
                    document.getElementById("title-row").setAttribute("style","visibility:visible;padding-bottom:1rem")
                    document.getElementById("agenda-field").removeAttribute("disabled")
    
                    document.getElementById("update-start-time").removeAttribute("disabled")
                    $('#update-start-time').datetimepicker({
                      autoclose: true,
                    });
                    $('#update-start-time').datetimepicker("update", this.start)
                    document.getElementById("update-end-time").removeAttribute("disabled")
                    $('#update-end-time').datetimepicker({
                      autoclose: true
                    });
                    $('#update-end-time').datetimepicker("update", this.end)
                    document.getElementById("edit-room-span").setAttribute("style","visibility:visible;float:right")
                    $('.edit-room').selectpicker({
                      actionsBox:true,
                      size:"7"
                    });
                    document.getElementById("edit-members").setAttribute("style","visibility:visible;float:right")
                    
                    var footer=document.getElementById("footer")
                    var btn=document.createElement("BUTTON")
                    
                    btn.setAttribute("class","btn btn-outline-info")
                    btn.innerHTML="Submit"
                    btn.setAttribute("style","margin-left:2rem;margin-right:2rem")
                    btn.setAttribute("type","submit")
                    form.setAttribute("onsubmit","return editMeeting(\'"+roomname+"\',\'"+id+"\')")
                    footer.setAttribute("style","padding-top:2rem;grid-column:1/span 2;justify-self:center")
                    footer.appendChild(btn)
                    
                    var btn=document.createElement("BUTTON")
                    
                    btn.setAttribute("class","btn btn-outline-info")
                    btn.setAttribute("style","margin-left:2rem;margin-right:2rem")
                    btn.setAttribute("type","button")
                    btn.innerHTML="Cancel Meeting"
                    btn.setAttribute("onclick","return cancelMeeting(\'"+id+"\')")
                    footer.appendChild(btn)

                  })
                  i.setAttribute("style","cursor:pointer;float:right;font-size:20px;")
                  row2.appendChild(i)
                }
              }
            }
            // EDIT OPTION
            
            div.appendChild(row2);
            form.appendChild(div)
        }

        var div=document.createElement("DIV")
          div.setAttribute("style","grid-column:1/span 2;padding-bottom:1rem")
        
          div.setAttribute("id","agenda-row")
          var row1=document.createElement("DIV");
          row1.setAttribute("class","row1")
          var span=document.createElement("SPAN");
          span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
          span.innerHTML="Agenda";
          row1.appendChild(span);
          var row2=document.createElement("DIV");
          row2.setAttribute("class","row2 form-group")
          row2.setAttribute("id","agenda-row-2")
          row2.setAttribute("style","color:gray;font-size:16px")
          
          var input=document.createElement("INPUT")
          input.setAttribute("id","agenda-field")
          input.setAttribute("class","form-control form-input")
          input.setAttribute("style","border-radius: 10px;height: 50px;")
          
          input.setAttribute("type","text")
          input.setAttribute("autocomplete","off");
          input.setAttribute("required","")
          
          if(this.book)
        {}
        else{
          input.setAttribute("disabled","")
          for(var x in this.myMeetings){
            if(this.myMeetings[x]['id'] == this.clickedId){
              input.setAttribute("value",this.myMeetings[x]['agenda'])
            }
          }
        }
          
          row2.appendChild(input)
          div.appendChild(row1);
          div.appendChild(row2)
          form.appendChild(div)


            var div=document.createElement("DIV")
            div.setAttribute("id","start")
            div.setAttribute("style","padding-bottom:1rem")
            var row1=document.createElement("DIV");
            row1.setAttribute("class","row1")
            var span=document.createElement("SPAN");
            span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
            span.innerHTML="Start Time";
            row1.appendChild(span);
            
              
              var row2=document.createElement("DIV");
              row2.setAttribute("class","row2 form-group")
              row2.setAttribute("id","time-row")
              row2.setAttribute("style","color:gray;font-size:16px")
                var input=document.createElement("INPUT")
                input.setAttribute("id","update-start-time")
                input.setAttribute("class","form-control form-input")
                input.setAttribute("style","border-radius: 10px;height: 50px;")
                input.setAttribute("type","text")
                input.setAttribute("autocomplete","off");
                input.setAttribute("required","")
                input.setAttribute("readonly","")
                input.setAttribute("data-date-format","yyyy-mm-dd hh:ii:ss")

          if(this.book)
          {
            var date=this.start
            var sdate=date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate() + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() 
            input.setAttribute("value",sdate)
            
          }
          else{
            input.setAttribute("disabled","")
                
            for(var x in this.myMeetings){
              startTime=new Date(this.myMeetings[x]['start'])
              endTime=new Date(this.myMeetings[x]['end'])
              if(this.myMeetings[x]['id'] == this.clickedId){
                var sdate=weekday[startTime.getDay()]+" "+monthNames[startTime.getMonth()]+" "+startTime.getDate()+" "+startTime.getFullYear()
                
                var stime=startTime.getHours()+":"+startTime.getMinutes();
               
                input.setAttribute("value",sdate+" "+stime)
              }
            }
          }
                
                row2.appendChild(input)
                div.appendChild(row1);
                div.appendChild(row2)
                form.appendChild(div)
                
                
                var div=document.createElement("DIV")
                div.setAttribute("id","end")
                div.setAttribute("style","padding-bottom:1rem")
                var row1=document.createElement("DIV");
                row1.setAttribute("class","row1")
                var span=document.createElement("SPAN");
                span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
                span.innerHTML="End Time";
                row1.appendChild(span);
                var row2=document.createElement("DIV");
              row2.setAttribute("class","row2 form-group")
              row2.setAttribute("id","time-row")
              row2.setAttribute("style","color:gray;font-size:16px")
                var input=document.createElement("INPUT")
                input.setAttribute("id","update-end-time")
                input.setAttribute("class","form-control form-input")
                input.setAttribute("style","border-radius: 10px;height: 50px;")
                input.setAttribute("type","text")
                input.setAttribute("autocomplete","off");
                input.setAttribute("required","")
                input.setAttribute("readonly","")
                input.setAttribute("data-date-format","yyyy-mm-dd hh:ii:ss")
                if(this.book)
          {
            var date=this.end
            var edate=date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate() + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() 
            input.setAttribute("value",edate)
            $('#update-end-time').datetimepicker({
              autoclose: true,
            });
            $('#update-end-time').datetimepicker("update", this.end)
          }
          else{
            input.setAttribute("disabled","")
                
            for(var x in this.myMeetings){
              startTime=new Date(this.myMeetings[x]['start'])
              endTime=new Date(this.myMeetings[x]['end'])
              if(this.myMeetings[x]['id'] == this.clickedId){
                
                var edate=weekday[endTime.getDay()]+" "+monthNames[endTime.getMonth()]+" "+endTime.getDate()+" "+endTime.getFullYear()
                
                var etime=endTime.getHours()+":"+endTime.getMinutes();
                input.setAttribute("value",edate+" "+etime)
              }
            }
          }
               
              row2.appendChild(input)
              div.appendChild(row1);
              div.appendChild(row2)
              form.appendChild(div)

          if(this.user){
            var div=document.createElement("DIV")
                  div.setAttribute("id","room")
                  div.setAttribute("style","grid-column:1/span 2;padding-bottom:2rem")
                  var row1=document.createElement("DIV");
                  row1.setAttribute("class","row1")
                  var span=document.createElement("SPAN");
                  span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
                  span.innerHTML="Room";
                  row1.appendChild(span);
      
                  var span=document.createElement("SPAN");
                  span.setAttribute("style","visibility:hidden;float:right")
                  span.setAttribute("id","edit-room-span");
                  
                  row1.appendChild(span)
                  div.appendChild(row1);
                  var row2=document.createElement("DIV");
                  row2.setAttribute("class","row2")
                  row2.setAttribute("style","color:gray;font-size:16px")
                  for(var x in this.myMeetings){
                    if(this.myMeetings[x]['id'] == this.clickedId){
                      row2.innerHTML=this.myMeetings[x]['roomName']+"&nbsp;&nbsp;[ "+this.myMeetings[x]['specifications']+" ]";
                    }
                  }
                 
                  div.appendChild(row2)
                  
                  form.appendChild(div)
          }
          else{
            var div=document.createElement("DIV")
            div.setAttribute("id","teams")
            div.setAttribute("style","padding-bottom:2rem;")
            var row1=document.createElement("DIV");
            row1.setAttribute("class","row1")
            row1.setAttribute("style","padding-bottom:1rem")
            var span=document.createElement("SPAN");
            span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
            span.innerHTML="Teams";
            row1.appendChild(span);
            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
            row2.setAttribute("style","font-size:16px")
            row2.setAttribute("id","edit-teams");
            var sel=document.createElement("SELECT");
            sel.setAttribute("class","edit-teams")
            sel.setAttribute("id","edit-teams")
            sel.setAttribute("data-live-search","true");
            sel.setAttribute("multiple","")
            sel.setAttribute("title","Select Teams")
            sel.setAttribute("data-size","7")
            sel.setAttribute("data-width","100%")
            sel.setAttribute("data-selected-text-format","count")
            for(var t in this.allTeams){
                var option=document.createElement("OPTION");
                option.setAttribute("id",this.allTeams[t].teamId)
                
                option.innerHTML=this.allTeams[t].teamName;
                sel.appendChild(option)
            }
            row2.appendChild(sel)
            
            div.appendChild(row1);
            div.appendChild(row2)
            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
           
            
            div.appendChild(row2)
            
            form.appendChild(div)
          }
              

            var div=document.createElement("DIV")
            div.setAttribute("id","members")
            if(this.user){
              div.setAttribute("style","grid-column:1/span 2")
            }
            
            var row1=document.createElement("DIV");
            row1.setAttribute("class","row1")
            if(this.book)
            row1.setAttribute("style","padding-bottom:1rem")
            var span=document.createElement("SPAN");
            span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
            span.innerHTML="Members";
           
            row1.appendChild(span);
            if(this.book){
              var span=document.createElement("DIV");
              
            }
            else{
              var span=document.createElement("SPAN");
            }
            
            
            span.setAttribute("id","edit-members");
            var sel=document.createElement("SELECT");
          
            sel.setAttribute("class","edit-members")
            sel.setAttribute("id","edit-members")
            sel.setAttribute("data-live-search","true");
            sel.setAttribute("multiple","")
            sel.setAttribute("title","Participants")
            sel.setAttribute("data-size","7")
            sel.setAttribute("data-selected-text-format","count")
            if(this.book){
              sel.setAttribute("data-width","100%")
            }
            else{
              span.setAttribute("style","visibility:hidden;float:right")
            }

            for(var t in this.nonmembers){
              if(this.nonmembers[t].empId == sessionStorage.getItem("userId"))
                { 
                  continue;}
                var option=document.createElement("OPTION");
                
                option.setAttribute("id",this.nonmembers[t].empId)
                if(this.user){
                  for(var x in this.myMeetings){
                    if(this.myMeetings[x]['id'] == this.clickedId){
                      if(this.myMeetings[x]['members'].find(el => el.empId === this.nonmembers[t].empId)){
                        option.setAttribute("Selected","")
                        
                      }
                    }
                  }
                  
                }
                
                option.innerHTML=this.nonmembers[t].name;
                sel.appendChild(option)
            }
            span.appendChild(sel)
            
            if(this.user){
              row1.appendChild(span)
            }
            
            div.appendChild(row1);
            if(this.book){
              div.appendChild(span)
            }
            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
            if(this.user){
              for(var x in this.myMeetings){
                if(this.myMeetings[x]['id'] == this.clickedId){
                  row2.setAttribute("style","color:gray;font-size:16px")
                  for(var y in this.myMeetings[x]['members']){
                    if(y!=this.myMeetings[x]['members'].length-1){
                      row2.innerHTML+=this.myMeetings[x]['members'][y]['name']+",&nbsp;&nbsp; ";
                    }
                    else{
                      row2.innerHTML+=this.myMeetings[x]['members'][y]['name']+"&nbsp;&nbsp; ";
                    }
                    
                  }
                }
              }
            }
            
            
            div.appendChild(row2)
            form.appendChild(div)

            if(this.book){
              var div=document.createElement("DIV")
              div.setAttribute("style","grid-column:1/span 2;padding-bottom:1rem")
            
              div.setAttribute("id","repeat")
              var row1=document.createElement("DIV");
              row1.setAttribute("class","row1")
              var span=document.createElement("SPAN");
              span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
              span.innerHTML="Repeat Meeting";
              row1.appendChild(span);
              var row2=document.createElement("DIV");
              row2.setAttribute("class","row2 form-group")
              row2.setAttribute("id","repeat-row-2")
              row2.setAttribute("style","color:gray;font-size:16px;margin:1rem")
               
              var radio=document.createElement("DIV");
              radio.setAttribute("class","custom-control custom-radio custom-control-inline")

              var input=document.createElement("INPUT")
              input.setAttribute("id","daily")
              input.setAttribute("class","custom-control-input")
              input.setAttribute("name","repeat")
              input.setAttribute("type","radio")
              input.setAttribute("value","daily")

              var label=document.createElement("LABEL")
              label.setAttribute("class","custom-control-label")
              label.setAttribute("for","daily")
              label.innerHTML="Daily";

              radio.appendChild(input)
              radio.appendChild(label)
              row2.appendChild(radio)

              var radio=document.createElement("DIV");
              radio.setAttribute("class","custom-control custom-radio custom-control-inline")

              var input=document.createElement("INPUT")
              input.setAttribute("id","weekly")
              input.setAttribute("class","custom-control-input")
              input.setAttribute("name","repeat")
              input.setAttribute("type","radio")
              input.setAttribute("value","weekly")

              var label=document.createElement("LABEL")
              label.setAttribute("class","custom-control-label")
              label.setAttribute("for","weekly")
              label.innerHTML="Weekly";

              radio.appendChild(input)
              radio.appendChild(label)
              row2.appendChild(radio)

              var radio=document.createElement("DIV");
              radio.setAttribute("class","custom-control custom-radio custom-control-inline")

              var input=document.createElement("INPUT")
              input.setAttribute("id","none")
              input.setAttribute("class","custom-control-input")
              input.setAttribute("name","repeat")
              input.setAttribute("type","radio")
              input.setAttribute("value","none")
              input.setAttribute("checked","")

              var label=document.createElement("LABEL")
              label.setAttribute("class","custom-control-label")
              label.setAttribute("for","none")
              label.innerHTML="None";

              radio.appendChild(input)
              radio.appendChild(label)
              row2.appendChild(radio)
              
              
              div.appendChild(row1);
              div.appendChild(row2)
              form.appendChild(div)
            }

            var footer=document.createElement("DIV")
            footer.setAttribute("class","footer");
            footer.setAttribute("id","footer");
            
            if(this.book){
              footer.setAttribute("style","padding-top:2rem;grid-column:1/span 2;justify-self:center")
              var btn=document.createElement("BUTTON")
              btn.setAttribute("class","btn btn-outline-info")
              btn.innerHTML="Submit"
              form.setAttribute("onsubmit","return bookMeeting()")
              footer.appendChild(btn)
              
            }
            else{
              footer.setAttribute("style","padding-top:2rem;grid-column:1/span 2;justify-self:center")
            }
          form.appendChild(footer)   
          var err=document.createElement("SPAN")
          err.setAttribute("id","error-msg")
          err.setAttribute("style","color: red;font:italic")
          form.appendChild(err)
          body.appendChild(form)
          content.appendChild(body)
          
          
          modalDialogCentered.appendChild(content)
          modalFade.appendChild(modalDialogCentered)
          meeting_modal.appendChild(modalFade)
          var allEvents=this.allMeetings
          for(var x in this.myMeetings){
            var eventOfId=this.eventOfId
            startTime=new Date(this.myMeetings[x]['start'])
            endTime=new Date(this.myMeetings[x]['end'])
            if(this.myMeetings[x]['id'] == this.clickedId){
              var roomSpan=document.getElementById("edit-room-span")
              
              $('#update-start-time').datetimepicker({
                autoclose: true,
              }).on('changeDate', function(ev){
                roomSpan.innerHTML=""
              var sel=document.createElement("SELECT");
              sel.setAttribute("class","edit-room")
              sel.setAttribute("id","edit-room")
              sel.setAttribute("title","Available Rooms")
              
              sel.setAttribute("data-size","7")
                for(var s in allEvents){
                  
                  var array = allEvents[s];
                  var flag=0;
                  for(var i in array){
                    if(array[i].id == eventOfId){
                      break;
                    }
                    var start=ev.date
                    var end=new Date(document.getElementById("update-end-time").value);
                    var startDate=new Date(array[i].start);
                    var endDate=new Date(array[i].end);

                    var condition1 = (start.getTime()===(startDate.getTime()) && end.getTime()===(endDate.getTime()));
                    var condition2 = (start.getTime()<(endDate.getTime()) && end.getTime()>(endDate.getTime()));
                    var condition3 = (start.getTime()<(startDate.getTime()) && end.getTime()>(startDate.getTime()));
                    var condition4 = (start.getTime()>(startDate.getTime()) && end.getTime()<(endDate.getTime()));
                    if (condition1 || condition2 || condition3 ||  condition4){
                      flag=1;
                      break;
                    }
                    
                  }
                  if(flag==0){
                   var option=document.createElement("OPTION");
                      option.innerHTML=s;
                      sel.appendChild(option)
                 
                  }
                }
                roomSpan.appendChild(sel)
                $('.edit-room').selectpicker({
                  actionsBox:true,
                  size:"7"
                });
                });
                console.log(document.getElementById("edit-room-span"))
              $('#update-start-time').datetimepicker("update", this.start)

              $('#update-end-time').datetimepicker({
                autoclose: true,
              }).on('changeDate', function(ev){
                roomSpan.innerHTML=""
                var sel=document.createElement("SELECT");
                sel.setAttribute("class","edit-room")
                sel.setAttribute("id","edit-room")
                sel.setAttribute("title","Available Rooms")
                sel.setAttribute("data-size","7")
                for(var s in allEvents){
                  
                  var array = allEvents[s];
                  var flag=0;
                  for(var i in array){
                    if(array[i].id == eventOfId){
                      break;
                      
                    }
                    var end=ev.date
                    var start=new Date(document.getElementById("update-start-time").value);
                    var startDate=new Date(array[i].start);
                    var endDate=new Date(array[i].end);
                   
                    var condition1 = (start==(startDate) && end==(endDate));
                    var condition2 = (start<(endDate) && end>(endDate));
                    var condition3 = (start<(startDate) && end>(startDate));
                    var condition4 = (start>(startDate) && end<(endDate));
                    if (condition1 || condition2 || condition3 ||  condition4){
                      flag=1;
                      break;
                    }
                    
                  }
                  if(flag==0){
                   var option=document.createElement("OPTION");
                      option.innerHTML=s;
                      sel.appendChild(option)
                 
                  }
                }
                roomSpan.appendChild(sel)
                $('.edit-room').selectpicker({
                  actionsBox:true,
                  size:"7"
                });
                });
              $('#update-end-time').datetimepicker("update", this.end)
            }
          }
          $('#update-start-time').datetimepicker({
            autoclose: true,
          });
          $('#update-start-time').datetimepicker("update", this.start)
          $('#update-end-time').datetimepicker({
            autoclose: true,
          });
          $('#update-end-time').datetimepicker("update", this.end)
          $('.edit-members').selectpicker({
            actionsBox:true,
            size:"7",

          });
          $('.edit-teams').selectpicker({
            actionsBox:true,
            size:"7",
            
          });
          $("#booking-form").submit(function(e) {
            e.preventDefault();
         
          });
          $("#meeting-popup").modal("show")


        }
    }