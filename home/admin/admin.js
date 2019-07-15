document.getElementById("allEmployeesSearch").addEventListener("keyup",function() {
  
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("allEmployeesSearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("allEmployeesSearchList");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      // a = li[i].getElementsByTagName("a")[0];
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}
)
document.getElementById("allTeamsSearch").addEventListener("keyup",function() {
  
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("allTeamsSearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("allTeamsSearchList");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      // a = li[i].getElementsByTagName("a")[0];
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}
)
window.deleteEmployee = function(empId,empName){
  
  document.getElementById("confirmModalTitle").innerHTML="Delete Employee"
  document.getElementById("confirmModalBody").innerHTML="Are you sure you want to delete Employee \""+empName+"\" ?"
  document.getElementById("confirmModalSave").setAttribute("onclick","deleteEmployeeConfirm(\'"+empName+"\',\'"+empId+"\')")
  
  $("#confirmModal").modal("show")
  
  
}
window.deleteEmployeeConfirm=function(empName,empId){
  document.getElementById("loader").style.display="block";
  var list=document.getElementsByClassName("allEmployeesSearchList")
  for(let item of list[0].children){
    if(item.id == empId)
    {
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("loader").style.display="none";
        item.parentElement.removeChild(item)
        $("#confirmModal").modal("hide")
        initiateSuperAdminList();
      }
    };
  
    xhttp.open("DELETE", "http://localhost:8181/api/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    xhttp.send(JSON.stringify({'empId':empId}));  
      
    }
    
    
    
  }
}
window.deleteTeam = function(teamName,teamId){
  console.log("iiiiiiiiiiiiiiiiiii")
  
  document.getElementById("confirmModalTitle").innerHTML="Delete Team"
  document.getElementById("confirmModalBody").innerHTML="Are you sure you want to delete Team \""+teamName+"\" ?"
  document.getElementById("confirmModalSave").setAttribute("onclick","deleteTeamConfirm(\'"+teamName+"\',\'"+teamId+"\')")
  
  $("#confirmModal").modal("show")
  
}
window.deleteTeamConfirm = function(teamName,teamId){
  document.getElementById("loader").style.display="block";
  var list=document.getElementsByClassName("allTeamsSearchList")
  console.log(list)
  for(let item of list[0].children){
    if(item.innerText == teamName)
    {
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        item.parentElement.removeChild(item)
        // document.getElementById("modifyContentTitle").innerHTML="";
        document.getElementById("details-"+teamId).innerHTML="";
        document.getElementById("loader").style.display="none";
        $("#confirmModal").modal("hide")
      }
    };
  
    xhttp.open("DELETE", "http://localhost:8181/api/teams", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    xhttp.send(JSON.stringify({'teamName':teamName}));
     
    }
      
    
    
  }
}
window.addNewTeam = function(){
  var teamName=document.getElementById("teamName").value;
  console.log("jellp")
 
  document.getElementById("loader").style.display="block";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      document.getElementById("loader").style.display="none";
      initiateTeamSearchList();
      initiateSelectedTeamList()

    }
  };

  xhttp.open("POST", "http://localhost:8181/api/teams", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send(JSON.stringify({'teamName':teamName}));  
  return true;
};
  
  

$("#new-team-form").submit(function(e) {
  e.preventDefault();

});
window.addNewEmployee = function(){
  document.getElementById("loader").style.display="block";
  var empId=document.getElementById("empId").value;
  var firstName=document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let username = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
 

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {

      var ul=document.getElementById("allEmployeesSearchList");
      var li=document.createElement("LI");
          var span=document.createElement("SPAN")
          span.setAttribute("style","margin-right:1rem;")
          var btn=document.createElement("BUTTON")
          btn.setAttribute("class","btn btn-danger btn-sm")
          btn.setAttribute("type","button")
          btn.setAttribute("style","border-radius:16px;cursor:pointer")
          btn.setAttribute("onclick","deleteEmployee(\'"+empId+"\')")
          var i=document.createElement("I")
          i.setAttribute("class","fas fa-minus")
          btn.appendChild(i)
          span.appendChild(btn)
          var span2=document.createElement("SPAN")
        
          span2.innerText=firstName+" "+lastName;
          li.setAttribute("id",empId)
          li.setAttribute("class","list-group-item")
          li.appendChild(span)
          li.appendChild(span2)
          ul.appendChild(li)
          document.getElementById("new-employee-form").reset();
          initiateEmployeesList();
          initiateSuperAdminList();
          document.getElementById("loader").style.display="none";
    }
  };

  xhttp.open("POST", "http://localhost:8181/api/users", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send(JSON.stringify({
    'empId':empId,
    'firstName':firstName,    
    'lastName':lastName,
    'username':username,
    'password':password,
    'email':email
  }));  
  return true;
};
  
  

$("#new-employee-form").submit(function(e) {
  e.preventDefault();

});

window.addToTeamBtn=function(teamId){
  document.getElementById("loader").style.display="block";
  console.log("target")
  // console.log(target.currentTarget)
  var selectedMembers=$(".add-team-member-"+teamId).children("option:selected");
  var sendselectedMembers=[];
  for(var v=0;v<selectedMembers.length;v++){
      sendselectedMembers.push(selectedMembers[v]['id'])
      console.log(sendselectedMembers)
  }
  var xttr = new XMLHttpRequest();
  xttr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
        
        console.log("done")
        initiateSelectedTeamList(teamId)
        getNonMembersToAddInTeam(teamId);
        getMembersToPromoteTeamAdmin(teamId);
        getMemberstoDeleteInTeam(teamId);
        document.getElementById("loader").style.display="none";
    }
  };
 
  xttr.open("POST", 'http://localhost:8181/api/teams/'+teamId+'/addmembers', true);
  xttr.setRequestHeader("Content-type", "application/json");
  xttr.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xttr.send(JSON.stringify({'empIds':sendselectedMembers})); 
}

window.deleteFromTeamBtn=function(teamId){
  document.getElementById("loader").style.display="block";
  console.log("target")
  // console.log(target.currentTarget)
  var selectedMembers=$(".delete-team-member-select-"+teamId).children("option:selected");
  var sendselectedMembers=[];
  for(var v=0;v<selectedMembers.length;v++){
      sendselectedMembers.push(selectedMembers[v]['id'])
      console.log(sendselectedMembers)
  }
  var xttr = new XMLHttpRequest();
  xttr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        console.log("done")
        initiateSelectedTeamList(teamId)
        getNonMembersToAddInTeam(teamId);
        getMembersToPromoteTeamAdmin(teamId);
        getMemberstoDeleteInTeam(teamId);
        document.getElementById("loader").style.display="none";

    }
  };
 
  xttr.open("DELETE", 'http://localhost:8181/api/teams/'+teamId+'/remove', true);
  xttr.setRequestHeader("Content-type", "application/json");
  xttr.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xttr.send(JSON.stringify({'empIds':sendselectedMembers})); 
}

window.addToTeamAdminBtn=function(teamId){
  document.getElementById("loader").style.display="block";
  console.log("target")
  // console.log(target.currentTarget)
  var selectedMembers=$(".promote-team-member-"+teamId).children("option:selected");
  var sendselectedMembers=[];
  for(var v=0;v<selectedMembers.length;v++){
      sendselectedMembers.push(selectedMembers[v]['id'])
      console.log(sendselectedMembers)
  }
  var xttr = new XMLHttpRequest();
  xttr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        console.log("done")
        initiateSelectedTeamList(teamId)
        getNonMembersToAddInTeam(teamId);
        getMembersToPromoteTeamAdmin(teamId);
        getMemberstoDeleteInTeam(teamId);
        document.getElementById("loader").style.display="none";

    }
  };
 
  xttr.open("POST", 'http://localhost:8181/api/admin/promote/teamadmin', true);
  xttr.setRequestHeader("Content-type", "application/json");
  xttr.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xttr.send(JSON.stringify({'empIds':sendselectedMembers,'teamId':teamId})); 
}

window.modifyDetails = function(evt, teamId,teamName){
  console.log("clicked")
  
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("teamLinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active","");
    }
    // document.getElementById(teamId).style.display = "grid";
    document.getElementById("details-"+teamId).setAttribute("style","display:grid;grid-row-gap:20px");
    console.log(evt)
    console.log(evt.currentTarget.id)
    evt.currentTarget.className += " active";
    // var teamtitle=document.getElementById("modifyContentTitle")
    // teamtitle.setAttribute("style","visibility:visible;font-size:2rem;color:white;")
    // teamtitle.innerText=teamName;
    initiateSelectedTeamList(teamId)
    getNonMembersToAddInTeam(teamId);
    
    getMembersToPromoteTeamAdmin(teamId);
    getMemberstoDeleteInTeam(teamId);
            

            
}
$(function() {
  
  $('#v-pills-tab a[href="#v-pills-users"').on('click', function (e) {
    e.preventDefault()
    document.getElementById("v-pills-teams").setAttribute("style","")
    document.getElementById("v-pills-users").setAttribute("style","display:grid;grid-template-columns:60% 40%;")
    document.getElementById("v-pills-promote").setAttribute("style","")
    $(this).tab('show')
  })
  $('#v-pills-tab a[href="#v-pills-teams"').on('click', function (e) {
    e.preventDefault()
    console.log($("#v-pills-users"))
    document.getElementById("v-pills-users").setAttribute("style","")
    document.getElementById("v-pills-teams").setAttribute("style","display:grid;grid-template-columns:35% 35% 30%;")
    document.getElementById("v-pills-promote").setAttribute("style","")
    $(this).tab('show')
  })
  $('#v-pills-tab a[href="#v-pills-promote"').on('click', function (e) {
    e.preventDefault()
    console.log($("#v-pills-users"))
    document.getElementById("v-pills-users").setAttribute("style","")
    document.getElementById("v-pills-teams").setAttribute("style","")
    document.getElementById("v-pills-promote").setAttribute("style","display:grid;grid-template-columns:60% 40%;")
    
    $(this).tab('show')
  })

  //initiate employees search list
  
  initiateEmployeesList();

  // initiate teams search list
  initiateTeamSearchList();
  initiateSuperAdminList();
  

 
  


})
function initiateEmployeesList(){
  document.getElementById("loader").style.display="block";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        var emp=JSON.parse(xhttp.responseText);
        var ul=document.getElementById("allEmployeesSearchList")
        ul.innerHTML=""
        for(var x in emp){
          var li=document.createElement("LI");
          var span=document.createElement("SPAN")
          span.setAttribute("style","margin-right:1rem;")
          var span2=document.createElement("SPAN")
        
          span2.innerText=emp[x].name;
          if(sessionStorage.getItem("userId") !== emp[x].empId){
            var btn=document.createElement("BUTTON")
            btn.setAttribute("class","btn btn-danger btn-sm")
            btn.setAttribute("type","button")
            btn.setAttribute("style","border-radius:16px;cursor:pointer")
            btn.setAttribute("onclick","deleteEmployee(\'"+emp[x].empId+"\',\'"+emp[x].name+"\')")
            var i=document.createElement("I")
            i.setAttribute("class","fas fa-minus")
            btn.appendChild(i)
            span.appendChild(btn)
          }
          else{
            span2.setAttribute("style","margin-left:1.8rem")
          }
          
          
          li.setAttribute("id",emp[x].empId)
          li.setAttribute("class","list-group-item")
          li.appendChild(span)
          li.appendChild(span2)
          ul.appendChild(li)
        }
        document.getElementById("loader").style.display="none";
    }
  };
  xhttp.open("GET", 'http://localhost:8181/api/users', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}
window.promoteSuper=function(){
  document.getElementById("loader").style.display="block";
  console.log("hello")
  var selectedMember=$(".promote-super-admin").children("option:selected")[0];
  console.log(selectedMember.id)
  var xtt = new XMLHttpRequest();
  xtt.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        initiateSuperAdminList()
        console.log("done")
        document.getElementById("loader").style.display="none";
    }
  };
 
  xtt.open("POST", 'http://localhost:8181/api/admin/promote', true);
  xtt.setRequestHeader("Content-type", "application/json");
  xtt.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xtt.send(JSON.stringify({empId:selectedMember.id}));
}
function initiateSelectedTeamList(teamId){
  document.getElementById("loader").style.display="block";
  console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  var request=new XMLHttpRequest();
  request.onreadystatechange = function(){
    
    if(this.readyState == 4 && this.status == 200){
      var res=JSON.parse(request.responseText)
      console.log(res)
      var ul=document.getElementById("selectedTeamList")
      ul.innerHTML=""
      for(var t in res){
        if(res[t].teamId == teamId){
          for(var m in res[t]['teamAdmins']){
            var li=document.createElement("LI");
            li.innerText=res[t]['teamAdmins'][m].name;
            li.setAttribute("id",res[t]['teamAdmins'][m].empId)
            li.setAttribute("class","list-group-item")
            var badge=document.createElement("SPAN")
            badge.setAttribute("class","badge badge-info badge-pill")
            badge.setAttribute("style","float:right;")
            badge.innerHTML="Team Admin"
            li.appendChild(badge)
            
            ul.appendChild(li)
          }
          for(var m in res[t]['teamMembers']){
            var li=document.createElement("LI");
            li.innerText=res[t]['teamMembers'][m].name;
            li.setAttribute("id",res[t]['teamMembers'][m].empId)
            li.setAttribute("class","list-group-item")
            
            
            ul.appendChild(li)
          }
        }
        
      }
      console.log("reached here")
      console.log(ul.children.length)
      if(ul.children.length == 0){
          
        var li=document.createElement("LI");
      
        li.innerText="No members present";
        
        li.setAttribute("class","list-group-item")
        
        ul.appendChild(li)
      
    }
    document.getElementById("loader").style.display="none";
      
    }
     

  }
  request.open("GET", 'http://localhost:8181/api/teams', true);
  
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    request.send();
}
function getNonMembersToAddInTeam(teamId){
  document.getElementById("loader").style.display="block";
  var req=new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var members=JSON.parse(req.responseText)
      var div=document.getElementById("details-"+teamId)
      div.innerHTML="";
      var row2=document.createElement("DIV");
      row2.setAttribute("class","row2")
      row2.setAttribute("style","font-size:16px")
      // row2.setAttribute("style","margin-left:70px")
      row2.setAttribute("id","add-team-member-"+teamId);
      var sel=document.createElement("SELECT");
      // sel.setAttribute("styleBase","color:black")
      sel.setAttribute("class","add-team-member-"+teamId)
      sel.setAttribute("id","add-team-member-"+teamId)
      sel.setAttribute("data-live-search","true");
      // sel.setAttribute("data-style","btn- light")
      sel.setAttribute("multiple","")
      sel.setAttribute("title","Add Members")
      sel.setAttribute("data-size","7")
      sel.setAttribute("data-width","100%")
      sel.setAttribute("data-selected-text-format","count")
      for(var t in members){
        var option=document.createElement("OPTION");
        option.setAttribute("id",members[t].empId)
        
        option.innerHTML=members[t].name;
        sel.appendChild(option)
      }
      row2.appendChild(sel)
      
        var addbtn=document.createElement("DIV")
        addbtn.setAttribute("class","form-group")
        addbtn.setAttribute("style","text-align: center;margin-bottom: 2rem;margin-top:1rem")
        var btn=document.createElement("BUTTON")
        btn.setAttribute("class","btn btn-outline-light")
        btn.setAttribute("id","addToTeamBtn-"+teamId)
        btn.setAttribute("onclick","addToTeamBtn(\'"+teamId+"\')")
        btn.setAttribute("style","width: 100px;")
        btn.innerHTML="ADD"
        addbtn.appendChild(btn)
        row2.appendChild(addbtn)
      div.appendChild(row2)
      $(".add-team-member-"+teamId).selectpicker({
        actionsBox:true,
        size:"7",
    
      });
      document.getElementById("loader").style.display="none";
    }
  }
  req.open("GET", 'http://localhost:8181/api/teams/'+teamId+'/add', false);
  // req.open("GET", 'http://localhost:8181/api/teams/3/add', true);
  req.setRequestHeader("Content-type", "application/json");
  req.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  req.send(); 
}

function getMemberstoDeleteInTeam(teamId){
  document.getElementById("loader").style.display="block";
  var xml=new XMLHttpRequest();
  xml.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var members=JSON.parse(xml.responseText)
      var div=document.getElementById("details-"+teamId)
      var row2=document.createElement("DIV");
      row2.setAttribute("class","row2")
      row2.setAttribute("style","font-size:16px")
      // row2.setAttribute("style","margin-left:70px")
      row2.setAttribute("id","delete-team-member-select-"+teamId);
      var sel=document.createElement("SELECT");
      // sel.setAttribute("styleBase","color:black")
      sel.setAttribute("class","delete-team-member-select-"+teamId)
      sel.setAttribute("id","delete-team-member-select-"+teamId)
      sel.setAttribute("data-live-search","true");
      // sel.setAttribute("data-style","btn- light")
      sel.setAttribute("multiple","")
      sel.setAttribute("title","Delete Members")
      sel.setAttribute("data-size","7")
      sel.setAttribute("data-width","100%")
      sel.setAttribute("data-selected-text-format","count")
      for(var t in members){
        var option=document.createElement("OPTION");
        option.setAttribute("id",members[t].empId)
        
        option.innerHTML=members[t].name;
        sel.appendChild(option)
      }
      row2.appendChild(sel)
      var addbtn=document.createElement("DIV")
        addbtn.setAttribute("class","form-group")
        addbtn.setAttribute("style","text-align: center;margin-bottom: 2rem;margin-top:1rem;")
        var btn=document.createElement("BUTTON")
        btn.setAttribute("class","btn btn-outline-light")
        btn.setAttribute("onclick","deleteFromTeamBtn(\'"+teamId+"\')")
        btn.setAttribute("id","deleteFromTeamBtn-"+teamId)
        btn.setAttribute("style","width: 100px;")
        btn.innerHTML="DELETE"
        addbtn.appendChild(btn)
        row2.appendChild(addbtn)
      div.appendChild(row2)
      $(".delete-team-member-select-"+teamId).selectpicker({
        actionsBox:true,
        size:"7",
    
      });

      document.getElementById("loader").style.display="none";
      
    }
  }
  xml.open("GET", 'http://localhost:8181/api/teams/'+teamId+'/info', false);
  // xml.open("GET", 'http://localhost:8181/api/teams/3/info', true);
  xml.setRequestHeader("Content-type", "application/json");
  xml.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xml.send(); 

}

function getMembersToPromoteTeamAdmin(teamId){
  document.getElementById("loader").style.display="block";
  var xm=new XMLHttpRequest();
  xm.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var members=JSON.parse(xm.responseText)
      var div=document.getElementById("details-"+teamId)
      var row2=document.createElement("DIV");
      row2.setAttribute("class","row2")
      row2.setAttribute("style","font-size:16px")
      // row2.setAttribute("style","margin-left:70px")
      row2.setAttribute("id","promote-team-member-"+teamId);
      var sel=document.createElement("SELECT");
      // sel.setAttribute("styleBase","color:black")
      sel.setAttribute("class","promote-team-member-"+teamId)
      sel.setAttribute("id","promote-team-member-"+teamId)
      sel.setAttribute("data-live-search","true");
      // sel.setAttribute("data-style","btn- light")
      sel.setAttribute("multiple","")
      sel.setAttribute("title","Promote as Team Admin")
      sel.setAttribute("data-size","7")
      sel.setAttribute("data-width","100%")
      sel.setAttribute("data-selected-text-format","count")
      for(var t in members){
        var option=document.createElement("OPTION");
        option.setAttribute("id",members[t].empId)
        
        option.innerHTML=members[t].name;
        sel.appendChild(option)
      }
      row2.appendChild(sel)
      var addbtn=document.createElement("DIV")
        addbtn.setAttribute("class","form-group")
        addbtn.setAttribute("style","text-align: center;margin-bottom: 2rem;margin-top:1rem;")
        var btn=document.createElement("BUTTON")
        btn.setAttribute("class","btn btn-outline-light")
        btn.setAttribute("onclick","addToTeamAdminBtn(\'"+teamId+"\')")
        btn.setAttribute("id","promoteFromTeamBtn-"+teamId)
        btn.setAttribute("style","width: 100px;")
        btn.innerHTML="PROMOTE"
        addbtn.appendChild(btn)
        row2.appendChild(addbtn)
      div.appendChild(row2)
      $(".promote-team-member-"+teamId).selectpicker({
        actionsBox:true,
        size:"7",
    
      });
      document.getElementById("loader").style.display="none";
    }
  }
  xm.open("GET", 'http://localhost:8181/api/teams/'+teamId+'/members', false);
  // xm.open("GET", 'http://localhost:8181/api/teams/3/info', true);
  xm.setRequestHeader("Content-type", "application/json");
  xm.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xm.send(); 

}
function initiateTeamSearchList(){
  document.getElementById("loader").style.display="block";
var xt = new XMLHttpRequest();
xt.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      
      var team=JSON.parse(xt.responseText);
      var ul=document.getElementById("allTeamsSearchList")
      ul.innerHTML="";
      var content=document.getElementById("modifyContent")
      
      for(var x in team){
        // console.log(x);
        // console.log(team[x])
        var li=document.createElement("LI");
        var span=document.createElement("SPAN")
        span.setAttribute("style","margin-right:1rem;")
        var btn=document.createElement("BUTTON")
        btn.setAttribute("class","btn btn-danger btn-sm")
        btn.setAttribute("type","button")
        btn.setAttribute("style","border-radius:16px;cursor:pointer")
        btn.setAttribute("onclick","deleteTeam(\'"+team[x]['teamName']+"\',\'"+team[x]['teamId']+"\')")
        var i=document.createElement("I")
        i.setAttribute("class","fas fa-minus")
        btn.appendChild(i)
        span.appendChild(btn)
        var span2=document.createElement("SPAN")
        span2.innerText=team[x]['teamName'];
        li.setAttribute("id",team[x]['teamId'])
        li.setAttribute("class","list-group-item teamLinks")
        li.setAttribute("style","cursor:pointer")
        li.setAttribute("onclick","modifyDetails(event,"+team[x]['teamId']+",\'"+team[x]['teamName']+"\')")
        li.appendChild(span)
        li.appendChild(span2)
        ul.appendChild(li)

        
        var div=document.createElement("DIV")
        div.setAttribute("id","details-"+team[x]['teamId'])
        div.setAttribute("class","tabcontent")
        div.setAttribute("style","display:grid;grid-template-column:1fr 1fr;")

        
              
          
        content.appendChild(div)
      }
      document.getElementById("loader").style.display="none";
  }
};
xt.open("GET", 'http://localhost:8181/api/teams', true);
xt.setRequestHeader("Content-type", "application/json");
xt.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
xt.send();
}

function initiateSuperAdminList(){
  document.getElementById("loader").style.display="block";
  var xt = new XMLHttpRequest();
  xt.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        var team=JSON.parse(xt.responseText);
        var ul=document.getElementById("superAdminList")
        ul.innerHTML="";
       
        
        for(var x in team){
          var li=document.createElement("LI");
          
          li.setAttribute("class","list-group-item teamLinks")
          li.innerText=team[x].name
          ul.appendChild(li)
  
        }
        initiateSelectForSuperAdmin(this)
        document.getElementById("loader").style.display="none";
    }
  };
  xt.open("GET", 'http://localhost:8181/api/admin', true);
  xt.setRequestHeader("Content-type", "application/json");
  xt.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xt.send();
}
function initiateSelectForSuperAdmin(xhttp){
  document.getElementById("loader").style.display="block";
  var superAdmins=JSON.parse(xhttp.responseText);
  var xtt = new XMLHttpRequest();
  xtt.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        var users=JSON.parse(xtt.responseText);
        
        var div=document.getElementById("selectForAdmin")
        div.innerHTML=""
                var row2=document.createElement("DIV");
                row2.setAttribute("class","row2")
                row2.setAttribute("style","font-size:16px;width:60%;justify-self:center")
                // row2.setAttribute("style","margin-left:70px")
                row2.setAttribute("id","promote-super-admin");
                var sel=document.createElement("SELECT");
                // sel.setAttribute("styleBase","color:black")
                sel.setAttribute("class","promote-super-admin")
                sel.setAttribute("id","promote-super-admin")
                sel.setAttribute("data-live-search","true");
                // sel.setAttribute("data-style","btn- light")
                // sel.setAttribute("multiple","")
                sel.setAttribute("title","Promote Super Admin")
                sel.setAttribute("data-size","7")
                sel.setAttribute("data-width","100%")
                sel.setAttribute("data-selected-text-format","count")
                for(var t in users){
                  var option=document.createElement("OPTION");
                  option.setAttribute("id",users[t].empId)
                  for(var s in superAdmins){
                    if(superAdmins[s].empId === users[t].empId){
                      option.setAttribute("disabled","")
                
                    }
                  }
                  
                  option.innerHTML=users[t].name;
                  sel.appendChild(option)
                }
                row2.appendChild(sel)
                var addbtn=document.createElement("DIV")
                  addbtn.setAttribute("class","form-group")
                  addbtn.setAttribute("style","text-align: center;margin-bottom: 2rem;margin-top:1rem;")
                  var btn=document.createElement("BUTTON")
                  btn.setAttribute("class","btn btn-outline-light")
                  btn.setAttribute("id","promoteSuperAdminBtn")
                  btn.setAttribute("onclick","promoteSuper()")
                  btn.setAttribute("style","width: 100px;")
                  btn.innerHTML="PROMOTE"
                  addbtn.appendChild(btn)
                  row2.appendChild(addbtn)
                div.appendChild(row2)
                $(".promote-super-admin").selectpicker({
                  actionsBox:true,
                  size:"7",
              
                });
                document.getElementById("loader").style.display="none";
    }
  };
  xtt.open("GET", 'http://localhost:8181/api/users', true);
  xtt.setRequestHeader("Content-type", "application/json");
  xtt.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xtt.send();
}