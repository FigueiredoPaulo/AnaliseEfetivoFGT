function getUsername(){
    var name =  $.session.samlUserInfo.givenName;
    var surname = $.session.samlUserInfo.sn;
    var username = name + " " + surname;
    //var username = 'Marcelo Garcia';
    return username;
}
var result = getUsername();
var dimension = $.request.parameters.get("dimension");
var dataI = $.request.parameters.get("dataIni");
var dataF = $.request.parameters.get("dataFim");

  var selectAllP;
if (dimension === "NP")
{
    selectAllP =  'select ' +  dimension + ', count(' + dimension + ') as qtde, DATA from \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"' +
                    " where DATA between '" +  dataI + "' and '" + dataF  + "' "+
                    'and EMPRESA != \'Nubeliu\'' +
                    ' AND np not LIKE \'S%\' AND NP NOT LIKE \'T%\' AND NP NOT LIKE \'A%\' ' +
                    ' group by ' +  dimension + ', DATA' +
                    ' ORDER BY DATA,  CAST (NP AS INTEGER)';
}
else
{
        selectAllP =  'select ' +  dimension + ', count(' + dimension + ') as qtde, DATA from \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"' +
                    " where DATA between '" +  dataI + "' and '" + dataF  + "' "+
                    'and EMPRESA != \'Nubeliu\'' +
                    ' group by ' +  dimension + ', DATA' +
                    ' ORDER BY DATA, qtde desc'; // +  dimension;
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
    var RHp;
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
                              dataPersonal.DATA = resultSet.getNString(3);
                              dataPersonal.ANO = ano;
                              dataPersonal.MES = mes;
                              if (parseInt(mes) < 2)
                              {
                                fy = parseInt(ano);  
                              }
                              else
                              {
                                 fy = parseInt(ano) + 1;
                              }
                              
                              dataPersonal.FY = fy.toString();
                              dataPersonalsList.push(dataPersonal); 

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
                if (result === "Leila Almeida" || result === "Flavio Arruda" || result === "Andre Oliveira"  || RHp === RHv) 
                    {
                    $.response.contentType = "application/json; charset=UTF-8"; 
                    $.response.contentType = "text/plain";
                    $.response.setBody(getDataPersonals());  
                   // $.response.setBody("Acesso Liberado para "+result+ getPermissionChart()); 
                   
                    }
                    
                    else
                    {
                        $.response.contentType = "text/plain";  
                        $.response.setBody("Access denied for "+ result + getPermissionChart());  
                        
                        
                    }
                    

          }  
          catch(err){  
                    var name =  $.session.samlUserInfo.givenName;
                    var surname = $.session.samlUserInfo.sn;
                    var username = name + " " + surname;
                    var oModel =  new sap.ui.model.json.JSONModel();
                   oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + username + "&desc=grafico Model " + err.message + "&number=" + err.code, "POST");
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200; 
                    

          }  
}  
doGet();

// Código Padrão  Função do Get
/*
function doGet() {  
          try{  
             
                    if (result === "Leila Almeida" || result === "Flavio Arruda" || result === "Andre Oliveira") 
                    {
                    $.response.contentType = "application/json; charset=UTF-8";  
                    $.response.setBody(getDataPersonals());      
                    } 
                    else
                    {
                        $.response.contentType = "text/plain";  
                        $.response.setBody("Access danied "+ result);  
                       //$.response(getUsername());  
                       // $.print(result)
                        
                    }
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


*/