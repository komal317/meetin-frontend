

var teams=[];
var nonMembers=[];

function postAddMembersFunction(xhttp,teamId,sendSelected,sendSelectedValue){
    var memberList=document.getElementById("memberList "+teamId);
    for(var x in sendSelected){
        var list=document.createElement("LI")
        list.setAttribute("class","list-group-item memberList team-"+teamId)
        list.setAttribute('id',sendSelected[x]);
        list.appendChild(document.createTextNode(sendSelectedValue[x]));
        memberList.appendChild(list);
    }

}

function deleteMember(empId,teamId){
    
    postDeleteMembers("/teams/"+teamId+"/remove",teamId,empId)


}
function deleteMemberFunction(xhttp,teamId,empId){
    var list=document.getElementsByClassName("team-"+teamId)
    for(var x=0;x<list.length;x++){
        if(list[x]['id']===empId){
            list[x].parentElement.removeChild(list[x])
            return          
        }
    }
}
function getNonMembersFunction(xhttp,teamId) {
    nonMembers=JSON.parse(xhttp.responseText);
    var y=document.getElementsByClassName("team-"+teamId)
    for(var j=0;j<y.length;j++){
        if(y[j].getAttributeNode("id").value != sessionStorage.getItem("userId")){
            y[j].insertAdjacentHTML("afterbegin",'<span><button type="button" class="btn btn-danger btn-sm" style="border-radius:16px;cursor:pointer" onclick="deleteMember(\''+y[j].getAttributeNode("id").value+'\',\''+teamId+'\')"><i class="fas fa-minus"></i></button>&nbsp;&nbsp;</span>')

        }
    }
    var p=y[0].parentElement;
    

        var div=document.createElement("DIV")
        
        div.setAttribute("id","addMember")
        div.setAttribute("style","font-size: 20px;padding:12px 20px;")
        
    var sel=document.createElement("SELECT");
   
    sel.setAttribute("class","addMember-team-"+teamId)
    sel.setAttribute("id","addMember-team-"+teamId)
    sel.setAttribute("data-live-search","true");
    sel.setAttribute("multiple","")
    sel.setAttribute("data-width","75%")
    sel.setAttribute("title"," + Add Member")
    sel.setAttribute("data-size","7")
    for(var t in nonMembers){
        var option=document.createElement("OPTION");
        option.setAttribute("id",nonMembers[t]['empId'])
        option.innerHTML=nonMembers[t]['name'];
        sel.appendChild(option)
    }
    div.appendChild(sel)
    p.insertBefore(div,p.firstChild)
    $('.addMember-team-'+teamId).selectpicker({
        actionsBox:true,
        size:"7"
    });
    var d=document.getElementById("main-team-"+teamId)
    for(var x in d.firstChild.childNodes){
        if(d.firstChild.childNodes[x].nodeName == 'SPAN'){
            if(d.firstChild.childNodes[x].getAttributeNode("id").value == 'edit'){
                d.firstChild.childNodes[x].innerHTML='<i class="fas fa-check" style="cursor: pointer;" onclick="doneClicked('+teamId+')">&nbsp;Save</i>'

            }
        }
    }
}

function editClicked(teamId){
    getNonMembers("/teams/"+teamId+"/add",teamId);
    
}

function doneClicked(teamId){
    var d=document.getElementById("main-team-"+teamId)
    for(var x in d.firstChild.childNodes){
        if(d.firstChild.childNodes[x].nodeName == 'SPAN'){
            if(d.firstChild.childNodes[x].getAttributeNode("id").value == 'edit'){
                d.firstChild.childNodes[x].innerHTML='<i class="far fa-edit" style="cursor: pointer;" onclick="editClicked('+teamId+')"></i>'

            }
        }
    }
    var selected=[]
    var sendSelected=[]
    var sendSelectedValue=[]
    selected=$(".addMember-team-"+teamId).children("option:selected");
    for(var v=0;v<selected.length;v++){
        sendSelected.push(selected[v]['id'])
        sendSelectedValue.push(selected[v].innerHTML)
    }
    postAddMembers("/teams/"+teamId+"/addmembers",teamId,sendSelected,sendSelectedValue)
    var e=document.getElementById("adminList "+teamId).firstChild
    if(e.nodeName=='DIV'){
        if(e.getAttributeNode("id").value == 'addMember'){
            e.remove()
        }
    }
    var x = document.getElementsByClassName("team-"+teamId)
    var i;
    
    for (i = 0; i < x.length; i++) {
        if(x[i].getAttributeNode("id").value != sessionStorage.getItem("userId")){
            x[i].removeChild(x[i].firstChild)
        }
    }

}
function getMyTeamsFunction(xhttp) {
    
    teams=JSON.parse(xhttp.responseText);
    
    var disp=document.getElementById("teamsDisplay");
        if(teams.length===1){
            disp.setAttribute("style","display: grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap: 100px;grid-row-gap: 80px;")
        }
        else if(teams.length===2){
            disp.setAttribute("style","display: grid;grid-template-columns:513px 513px;grid-column-gap: 150px;grid-row-gap: 80px;justify-content:center")
        }
        else{
            disp.setAttribute("style","display: grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap: 100px;grid-row-gap: 80px;")
        }
    for(var x in teams){
        var card=document.createElement("DIV");
        card.setAttribute("class","card border-info mb-3")
        if(teams.length===1){
            card.setAttribute("style","grid-column-start:2")
        }
        card.setAttribute("id","main-team-"+teams[x]['teamId'])
        var cardHeader=document.createElement("DIV");
        cardHeader.setAttribute("class","card-header")
        cardHeader.setAttribute("id",teams[x]['teamId'])
        cardHeader.innerHTML=teams[x]['teamName']

        var editSpan=document.createElement("SPAN");
        editSpan.setAttribute("id","edit")
        editSpan.setAttribute("style","float:right;")

        if(teams[x]['isAdmin']){
            var i=document.createElement("I")
            i.setAttribute("class","far fa-edit")
            i.setAttribute("onclick","editClicked("+teams[x]['teamId']+")")
            i.setAttribute("style","cursor:pointer")
            editSpan.appendChild(i)
        }
        

        cardHeader.appendChild(editSpan)
        card.appendChild(cardHeader)

        var cardBody=document.createElement("DIV");
        cardBody.setAttribute("class","card-body text-info")

        var cardTitle=document.createElement("H5");
        cardTitle.setAttribute("class","card-title")
        cardTitle.setAttribute("style","font-size: 25px;")
        cardTitle.innerHTML="Team Members";
        cardBody.appendChild(cardTitle)

        var p=document.createElement("P")
        p.setAttribute("class","card-text")
        p.setAttribute("id","card-text")
        

        var adminList=document.createElement("UL");
        adminList.setAttribute("class","list-group list-group-flush "+teams[x]['teamId'])
        adminList.setAttribute("id","adminList "+teams[x]['teamId'])
    
            for(var i in teams[x]['teamAdmins']){
                var list=document.createElement("LI")
                list.setAttribute("class","list-group-item adminList team-"+teams[x]['teamId'])
                list.setAttribute('id',teams[x]['teamAdmins'][i]['empId']);
                list.appendChild(document.createTextNode(teams[x]['teamAdmins'][i]['name']));
                var badge=document.createElement("SPAN")
                badge.setAttribute("class","badge badge-info badge-pill")
                badge.setAttribute("style","float:right;")
                badge.innerHTML="Team Admin"
                list.appendChild(badge)
                adminList.appendChild(list);
            }
            p.appendChild(adminList)
    
        var memberList=document.createElement("UL");
            memberList.setAttribute("class","list-group list-group-flush "+teams[x]['teamId'])
            memberList.setAttribute("id","memberList "+teams[x]['teamId'])
            for(var i in teams[x]['teamMembers']){
                var list=document.createElement("LI")
                list.setAttribute("class","list-group-item memberList team-"+teams[x]['teamId'])
                list.setAttribute('id',teams[x]['teamMembers'][i]['empId']);
                list.appendChild(document.createTextNode(teams[x]['teamMembers'][i]['name']));
                memberList.appendChild(list);
            }
            p.appendChild(memberList)
            cardBody.appendChild(p)
            card.appendChild(cardBody)

            disp.appendChild(card)
    }
}
$(function() {
    getMyTeams("teams/my");
    
})