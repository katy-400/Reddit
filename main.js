
function getData(){
  document.getElementById("name").innerHTML = localStorage.getItem("username");
  var userHTML = "<h1>List of all the users</h1>";
  var ajax = ajaxObj("POST", "Reddit.php");
  ajax.onreadystatechange = function() {
  
    if(ajaxReturn(ajax) == true){

    
    
    

  
  }
    //alert(data.success );
    
    var  data = JSON.parse(ajax.responseText);
        
        var userList = data.userList;
        
        
        for(var i = 0; i < userList.length; i++){
          userHTML += "<h3>"+userList[i].id+" "+userList[i].id+"  "+userList[i].name+" "+userList[i].email+" </h3><hr>";
        }
        
           document.getElementById("userList").innerHTML = userHTML;     
    }


    
  //sending the variables to php
    ajax.send("request=getUsersData");
    
  }





//allow me to connect with my php file automticall
function ajaxObj( meth, url ){
  
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


//function to create the account
//I get all the values of the create profile form
function createNewAccount(){
  var username = document.getElementById("user_reg").value;
  var password1 = document.getElementById("psd_reg").value;
  var password2 = document.getElementById("verify_reg").value;
  var email = document.getElementById("email_reg").value;
  
  //starting ajax to connect with php
  var ajax = ajaxObj("POST", "Reddit.php");
  ajax.onreadystatechange = function() {
  //alert("Ajax should be running dawg");
    if(ajaxReturn(ajax) == true){
        //var data = ajax.responseText;
        document.getElementById("status").innerHTML = ajax.responseText;
        //alert(ajax.responseText);
        
       // alert("Feedback: " + data);
        
    }
    document.getElementById("status").innerHTML = ajax.responseText;
    
    var  data = JSON.parse(ajax.responseText);
    //alert(data.success );
    if(data.success == true){
       localStorage.setItem("username", username);
     window.location.assign("Profile.html");
    }
  //alert(ajax.responseText);
  
  }
  //sending the variables to php
    ajax.send("request=signup"+"&username="+username+"&password1="+password1+"&password2="+password2+"&email="+email);


}

function logIn(){
  //getting the values from the login form
  var username = document.getElementById("username_reg").value;
  var password1 = document.getElementById("psd2_reg").value;
 
 
  //starting ajax to connect with the php
  var ajax = ajaxObj("POST", "Reddit.php");
  ajax.onreadystatechange = function() {
  //alert("Ajax should be running dawg");
    if(ajaxReturn(ajax) == true){
        //var data = ajax.responseText;
        //document.getElementById("status").innerHTML = ajax.responseText;
        //alert(ajax.responseText);
        
       // alert("Feedback: " + data);
        
    }
    //alert("I'm working!");
    
    document.getElementById("status").innerHTML = ajax.responseText;
    //alert(ajax.responseText);
    
    //getting the php feedback and chaning it into a form of notation that javascript can interact with
    //check of it was a successful login and then go to the profile page
    var  data = JSON.parse(ajax.responseText);
    if(data.success == true){
      localStorage.setItem("username", username);
     window.location.assign("Profile.html");
    }   

  }
  
    ajax.send("request=login"+"&username="+username+"&password="+password1);
  
}





// change the profile picutre locally
 function readURL(input){
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