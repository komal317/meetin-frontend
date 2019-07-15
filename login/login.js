document.getElementById("login-button").addEventListener("click", function(e){
    e.preventDefault()
    var userElement = document.getElementById('email').value;
    var passwordElement = document.getElementById('password').value;
    login("login",userElement,passwordElement)   
})

function loginFunction(xhttp){
    var responseObject = JSON.parse(xhttp.responseText);
    if (responseObject.accessToken) {
      sessionStorage.setItem("token",responseObject.accessToken)
      window.location.href = "../home/home.html";
    console.log(sessionStorage.getItem("token"))
      
    } else {
      alert("Enter correct login credentials")
    }
}

function loginIncorrect(){
  alert("Enter correct login credentials")
}