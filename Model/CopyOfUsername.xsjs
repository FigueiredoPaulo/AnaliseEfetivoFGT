
 var role = 'select count(1) from SYS.GRANTED_ROLES ' +
    'where grantee = ? ' + 
    'and ROLE_NAME = \'APLICACOES.KPIsTest::KPISAdmin\'';
function getUsername(){
   var name =  $.session.samlUserInfo.givenName;
   var surname = $.session.samlUserInfo.sn;
   var username = name + " " + surname;
  // return username;
} 


function close(closables) {  
          var closable;  
          var i;  
          for (i = 0; i < closables.length; i++) {  
                    closable = closables[i];  
                    if(closable) {  
                              closable.close();  
                    }  
          }  
}

function getDataPersonals(){  
          var name =  $.session.samlUserInfo.givenName;
          var surname = $.session.samlUserInfo.sn;
        //  var re = 'S0017636407';
          var re = $.session.samlUserInfo.RE;
          re = re.toUpperCase();
          var username = name + " " + surname;

          var dataPersonalsList = [];  
          try { 
          var connection = $.db.getConnection();  
          var statement = null;  
          var resultSet = null;  
          
          statement = connection.prepareStatement(role); 
          statement.setString(1, re);
          resultSet = statement.executeQuery(); 
                    
          var dataPersonal;  
             
          while (resultSet.next()) 
          {  
                       
                dataPersonal = {};  
                dataPersonal.Permission =  resultSet.getNString(1);
                dataPersonal.re =  re;
                dataPersonalsList.push(dataPersonal); 

            }
                    
          }   finally {  
                    close([resultSet, statement, connection]);  
          }  
    
               var str = JSON.stringify({user: dataPersonalsList});   
         return str;  
}  

function doGet() {  
          try{  
                    $.response.contentType = "application/json; charset=UTF-8";  
                    $.response.setBody(getDataPersonals());             
          }  
          catch(err){  
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200; 
                    

          }  
}  
doGet();