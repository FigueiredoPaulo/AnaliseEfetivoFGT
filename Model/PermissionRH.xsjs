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

function getUsername(){
   var name =  $.session.samlUserInfo.givenName;
   var surname = $.session.samlUserInfo.sn;
   //var username = name + " " + surname;
   var username = 'Marcelo Garcia'
   return username;
}
var result = getUsername();

function getPermissionRH(){
     
    var selectRH;
    selectRH = 
    'SELECT COUNT(1) FROM \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"'+
    " WHERE LOT = \'PL_RH\'" +
    " AND upper(NOMECONHECIDO) = upper('"+ result +"')"+
    ' and data = ( SELECT MAX(DATA) FROM \"ANALISE_EFETIVO\".\"HIST_EFETIVO\")';
    
    try { 
    var connection = $.db.getConnection(); 
    var statementRH = null;  
    var resultSetRH = null; 
      
    statementRH = connection.prepareStatement(selectRH); 
    resultSetRH = statementRH.executeQuery(); 
    
    var RHp = null;
        while (resultSetRH.next()) {  
                        
                             
                              RHp = resultSetRH.getString(1); 
                               
                    }
    }
    
    finally {  
                    close([resultSetRH, statementRH, connection]);
                    
        }
      
            //var str = JSON.stringify({UserSet: RHp});   
            var str = JSON.stringify(RHp); 
            
           
           
    return str; 
    
}
// Validação aos usário que corresponde a lotação do RH
var RHp = '"1"';
var RHv = getPermissionRH();

function doGet() {  
          try{  
              //
                    if (result === "Leila Almeida" || result === "Flavio Arruda"|| result === "Andre Oliveira" || RHp===RHv) 
                    {
                        $.response.contentType = "application/json; charset=UTF-8";  
                        $.response.setBody(RHv);  
                        
                    } 
                    else
                    {
                        $.response.contentType = "text/plain";  
                        $.response.setBody("Access Denied for "+ result+RHv);  
                    }
          }  
          catch(err){  
                    //var name =  $.session.samlUserInfo.givenName;
                    //var surname = $.session.samlUserInfo.sn;
                    //var username = name + " " + surname;
                    //var oModel =  new sap.ui.model.json.JSONModel();
                    //oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + username + "&desc= grafico FY model " + err.message + "&number=" + err.code, "POST");
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200; 
                    

          }  
}  



doGet();
