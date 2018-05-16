function getUsername(){
   var name =  $.session.samlUserInfo.givenName;
   var surname = $.session.samlUserInfo.sn;
   var username = name + " " + surname;
   //var username = 'Marcelo Garcia'
   return username;
}
var result = getUsername();
var dimension = $.request.parameters.get("dimension");


   var selectAllP;
   
if (dimension === "NP")
{
    selectAllP =  'select ' +  dimension + ', count(' + dimension + ') as qtde, DATA from \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"' +
                    ' where np not LIKE \'S%\' AND NP NOT LIKE \'T%\' AND NP NOT LIKE \'A%\' ' +
                    ' group by ' +  dimension + ', DATA' +
                    ' ORDER BY DATA,  CAST (NP AS INTEGER)';
}
else
{
        selectAllP =  'select ' +  dimension + ', count(' + dimension + ') as qtde, DATA from \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"' +
                    ' group by ' +  dimension + ', DATA' +
                    ' ORDER BY DATA, qtde desc';
}



function getPermissionChart(){
     
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
var RHv = getPermissionChart();

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
      
          var dataPersonalsList = [];  
          try { 
          var connection = $.db.getConnection();  
          var statement = null;  
          var resultSet = null;  
         
                    statement = connection.prepareStatement(selectAllP); 
                    resultSet = statement.executeQuery(); 
                    
                    var dataPersonal;  
             
                    while (resultSet.next()) {  
                       
                              dataPersonal = {};  
                              dataPersonal.DIMENSAO = resultSet.getString(1); 
                              dataPersonal.COUNT = resultSet.getNString(2);
                              var data = resultSet.getNString(3);
                              var ano = data.substring(0, 4);
                              var mes = data.substring(5, 7);
                              var fy = "";
                              var today = new Date();
                              var todayYear = today.getFullYear();
                              var todayMonth =today.getMonth() +1;
                              if (parseInt(mes) === 2)
                              {
                                fy = parseInt(ano); 
                                if(fy > (todayYear - 2)){
                                dataPersonal.FY = fy.toString();
                                dataPersonalsList.push(dataPersonal); 
                                }
                              }
                              if (todayYear === parseInt(ano)  &&  parseInt(mes) === 3 /*todayMonth*/)
                              {
                                  if(parseInt(mes) > 2)
                                  {
                                    fy = parseInt(ano) +1;  
                                  }
                                  else
                                  {
                                    fy = parseInt(ano);  
                                  }
                                dataPersonal.FY = fy.toString();
                                dataPersonalsList.push(dataPersonal); 
                              }
                    }
                    
          }   finally {  
                    close([resultSet, statement, connection]);  
          }  
    
               var str = JSON.stringify({UserSet: dataPersonalsList});   
         return str;  
}  

function doGet() {  
          try{  
              //
                    if (result === "Leila Almeida" || result === "Flavio Arruda"|| result === "Andre Oliveira" || RHp===RHv) 
                    {
                        $.response.contentType = "application/json; charset=UTF-8";  
                        // $.response.setBody("Access Liberado "+ result+RHv);  
                        $.response.setBody(getDataPersonals());    
                    } 
                    else
                    {
                        $.response.contentType = "text/plain";  
                        $.response.setBody("Access Denied for "+ result);  
                    }
          }  
          catch(err){  
                    var name =  $.session.samlUserInfo.givenName;
                    var surname = $.session.samlUserInfo.sn;
                    var username = name + " " + surname;
                    var oModel =  new sap.ui.model.json.JSONModel();
                   // oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + username + "&desc= grafico FY model " + err.message + "&number=" + err.code, "POST");
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200; 
                    

          }  
}  
doGet();