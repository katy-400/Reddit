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

function createNewAccount(){
  var username = document.getElementById("user_reg").value;
  var password1 = document.getElementById("psd_reg").value;
  var password2 = document.getElementById("verify_reg").value;
  var email = document.getElementById("email_reg").value;
  
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
    alert(data.success );
    if(data.success == true){
     window.location.assign("Profile.html");
    }
  //alert(ajax.responseText);
  
  }
    ajax.send("request=signup"+"&username="+username+"&password1="+password1+"&password2="+password2+"&email="+email);


}

function logIn(){
  var username = document.getElementById("username_reg").value;
  var password1 = document.getElementById("psd2_reg").value;
 
  
  var ajax = ajaxObj("POST", "Reddit.php");
  ajax.onreadystatechange = function() {
  //alert("Ajax should be running dawg");
    if(ajaxReturn(ajax) == true){
        //var data = ajax.responseText;
        //document.getElementById("status").innerHTML = ajax.responseText;
        //alert(ajax.responseText);
        
       // alert("Feedback: " + data);
        
    }
    
    document.getElementById("status").innerHTML = ajax.responseText;
    //alert(ajax.responseText);
    
    var  data = JSON.parse(ajax.responseText);
    if(data.success == true){
     window.location.assign("Profile.html");
    }   

  
  
    ajax.send("request=login"+"&username="+username+"&password="+password1);

  }
}