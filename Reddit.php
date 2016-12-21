<?php 

header("Acces-Control-Allow-Origin");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Credentials
  $hostname = "sql1.njit.edu";
  $username = "kn96";
  $project  = "kn96";
  $password = "m6m5PRHab";
  
  //connect to the database
  $con = mysqli_connect($hostname, $username, $password, $project);
  
  //check for connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }  
  ?>
  
<?php 





// Connect to Database
  /*
  ($dbh = mysql_connect($hostname, $username, $password))
  			or die("Unable to connect to MySQL database");
  print "Successfully connected to MySQL.<br><br>";
  mysql_select_db($project);
  */



  //Check if login, signup, or other with switch case statement

if(isset($_POST['request'])){
 
 $request = $_POST['request'];
 
  switch($request){
  
    case "signup" :
      
        //first sanatize all the user inputted data
        $username = mysqli_real_escape_string($con, $_POST['username']);
        $password1 = mysqli_real_escape_string($con, $_POST['password1']);
        $password2 = mysqli_real_escape_string($con, $_POST['password2']);
        $email = mysqli_real_escape_string($con, $_POST['email']);
        
        //call signUp function and see if the success is equal to true
        $response = signUp($username, $password1, $password2, $email, $con);  
        
        //if signUp was successful echo true json back to the client
        if($response['success']=== true){
            $response = "<p>Sign up Succesful<p>";
            //echo $response ;
            $json['success'] = true;
            echo json_encode($json);
            $_SESSSION['username'] = $username;
        }else{
            $response = "<p>Sign up Failed: " .$response['message'] . "<p>";
            echo $response ;
        }
        break;
        
    case "login" :
      //first sanatize all the user inputted data
        $username = mysqli_real_escape_string($con, $_POST['username']);
        $password = mysqli_real_escape_string($con, $_POST['password']); 
        
        //login function
        $response = logIn($username, $password, $con); 
        
        //if login was successful echo success is true back to the client 
        if($response['success']=== true){
            $response = "Login Succesful";
            //echo $response ;
            $json['success'] = true;
            echo json_encode($json);
            $_SESSSION['username'] = $username;
        }else{
            $response = "<p>Login Failed: " .$response['message'] . "<p>";
            echo $response ;
        }
        break;    
        
     case "logout" :
       session_destroy;
       break;
       
     
     case "getUsersData" :
       $response = getUsersData($con); 
 
       $json['userList'] = $response ;
       echo json_encode($json);
       break;
       
                     
  }
}


// Signup


function signUp($username, $password1, $password2, $email, $con){
  
  // if one of the elements is missing return false and error message
  
  // make sure all the user data needed is there
  if( $username == "" || $password1 == "" || $password2 == "" || $email == ""){
    return array("success"=> false, "message"=> "enter all the elements please");
  }  
  
  //if the passwords are not the same return false ane error message
  if($password1 != $password2){
    return array("success"=> false, "message"=> "passwords are not the same");
  }
  
  //database query to put the new user in the database
  $query = "INSERT INTO RedditUsers (Username, Password, Email) VALUES ('$username', '$password1', '$email')";
                          
                        
 //run the query
  $result = mysqli_query($con, $query);
  
  //check if the query was successful
  if($result){
    return array("success"=> true, "message"=> "Sign Up Completed");
  }else{
    return array("success"=> false, "message"=> "Sign Up failed");
  }
}

//login
function logIn($username, $password, $con){
  
  // if one of the elements is missing return false and error message
  
  if( $username == "" || $password == ""){
    return array("success"=> false, "message"=> "enter all the elements please");
  }  
  

  //database query to put the new user in the database
  $query = "SELECT ID FROM RedditUsers  where Username = '$username' AND Password=
  '$password';";
                          
                        
  //run the query
  $result = mysqli_query($con, $query);
 
  
  $num_rows = mysqli_num_rows($result);
  
  //check if the query was successful
  if($num_rows > 0){
    return array("success"=> true, "message"=> "Logged In");
  }else{
    return array("success"=> false, "message"=> "Log in Failed");
  }
}


function getUsersData($con){
  //database query to put the new user in the database
  $query = "SELECT * FROM RedditUsers";
                          
                        
  //run the query
  $result = mysqli_query($con, $query);
 
  while($row = mysqli_fetch_array($result, MYSQL_ASSOC)){
    $id = $row["ID"];
    $name = $row["Username"];
    $email = $row["Email"];
    
    $userList[] = array("id" => $id, "name" => $name, "email" => $email);
  }
  
  return $userList;
  

}

//getUsersData($con);

?>





