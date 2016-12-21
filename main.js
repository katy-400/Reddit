//javascript functions

function getData(){

    document.getElementById("name").innerHTML = localStorage.getItem("username");
    var userHTML = "<h1>User List</h1>";
    var ajax = ajaxObj("POST", "Reddit.php");
    ajax.onreadystatechange = function() {
    
      var  data = JSON.parse(ajax.responseText);
      var userList = data.userList;
  
      for(var i = 0; i < userList.length; i++){
        userHTML += "<h6>"+userList[i].name+"  "+userList[i].email+" </h6>";
          }
        document.getElementById("userList").innerHTML = userHTML;     
      }
    ajax.send("request=getUsersData"); //sending the variables to php
  }


function ajaxObj( meth, url ){//allow me to connect 
  
  var x = new XMLHttpRequest();
  x.open(meth, url, true );
  x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  return x;
}


function ajaxReturn(x){

  if(x.readyState == 4 && x.status == 200){
      return false;
  }  
}



function createNewAccount(){//function to create the account and get all values from profile

  var username = document.getElementById("user_reg").value;
  var password1 = document.getElementById("psd_reg").value;
  var password2 = document.getElementById("verify_reg").value;
  var email = document.getElementById("email_reg").value;
  var ajax = ajaxObj("POST", "Reddit.php");
  
  ajax.onreadystatechange = function() {
    if(ajaxReturn(ajax) == true){ //starting ajax to connect
        document.getElementById("status").innerHTML = ajax.responseText; 
    }
    document.getElementById("status").innerHTML = ajax.responseText;
    var  data = JSON.parse(ajax.responseText);
    //alert(data.success );
    
    if(data.success == true){
       localStorage.setItem("username", username);
     window.location.assign("Profile.html");
    }
  }
    ajax.send("request=signup"+"&username="+username+"&password1="+password1+"&password2="+password2+"&email="+email); //sending the user list to profile
}


function logIn(){//getting the values from the login form
    
    var username = document.getElementById("username_reg").value;
    var password1 = document.getElementById("psd2_reg").value; //starting ajax to connect
    var ajax = ajaxObj("POST", "Reddit.php");
    ajax.onreadystatechange = function() {
    //alert("Ajax should be running dawg");
    //alert("I'm working!");
    document.getElementById("status").innerHTML = ajax.responseText;

    
    
    //check successful login go to the profile page
    var  data = JSON.parse(ajax.responseText);
    if(data.success == true){
      localStorage.setItem("username", username);
     window.location.assign("Profile.html");
    }   
    }
    ajax.send("request=login"+"&username="+username+"&password="+password1);
}

 function readURL(input){// change the profile picutre 
 
   var ext = input.files[0]['name'].substring(input.files[0]['name'].lastIndexOf('.') + 1).toLowerCase();
  if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#img').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
      }else{
         $('#img').attr('src', '/assets/no_preview.png');
  }
  }