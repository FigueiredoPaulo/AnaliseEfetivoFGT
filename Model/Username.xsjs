function getUsername(){
   var name =  $.session.samlUserInfo.givenName;
   var surname = $.session.samlUserInfo.sn;
   var username = name + " " + surname;
   return username;
}
 var result = getUsername();
 var str = JSON.stringify({user: result});   
    $.response.setBody(str);
    $.response.contentType = "text/plain";
    $.response.status = $.net.http.OK;



