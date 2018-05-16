function getUsername(){
   var name =  $.session.samlUserInfo.givenName;
   var surname = $.session.samlUserInfo.sn;
  // var username = name + " " + surname;
  var username = 'Marcelo Garcia';
   return username;
}
var result = getUsername();

var selectRH;
selectRH = 
'SELECT COUNT(1) FROM \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"'+
" WHERE LOT = \'PL_RH\'" +
" AND upper(NOMECONHECIDO) = upper('"+ result +"')"+
' and data = ( SELECT MAX(DATA) FROM \"ANALISE_EFETIVO\".\"HIST_EFETIVO\")';


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

function getPermissionChart(){
     
    try { 
    var connection = $.db.getConnection(); 
    var statementRH = null;  
    var resultSetRH = null; 
      
    statementRH = connection.prepareStatement(selectRH); 
    resultSetRH = statementRH.executeQuery(); 
    
        var RHp;
        while (resultSetRH.next()) {  
                             // RHp = {};  
                              RHp = resultSetRH.getString(1); 
                    }
    }
    
    finally {  
                    close([resultSetRH, statementRH, connection]);
                    
        }
      
            var str = JSON.stringify({UserSet: RHp});   
    return str; 
    
}


function doGet() {  
          try{  
             
                //    if (result === "Leila Almeida" || result === "Flavio Arruda" || result === "Andre Oliveira" || RHp === "1") 
                  //  {
                    $.response.contentType = "application/json; charset=UTF-8";  
                    $.response.setBody(getPermissionChart());      
                    //} 
                    //else
                    //{
                        //$.response.contentType = "text/plain";  
                       // $.response.setBody("Access danied "+ result);  
                       //$.response(getUsername());  
                       // $.print(result)
                        
                    //}
          }  
          catch(err){  
                   var name =  $.session.samlUserInfo.givenName;
                    var surname = $.session.samlUserInfo.sn;
                    var username = name + " " + surname;
                  //  var oModel =  new sap.ui.model.json.JSONModel();
                //    oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + username + "&desc=grafico Model " + err.message + "&number=" + err.code, "POST");
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200; 
                    

          }  
}  
doGet();