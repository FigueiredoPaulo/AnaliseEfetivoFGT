var selectAllP =  'select DISTINCT DATA from \"ANALISE_EFETIVO\".\"HIST_EFETIVO\"' +
                    'ORDER BY DATA DESC'; 

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
          var connection = $.db.getConnection();  
          var statement = null;  
          var resultSet = null;  
          try{  
                    statement = connection.prepareStatement(selectAllP); 
                    resultSet = statement.executeQuery(); 
                    
                    var dataPersonal;  
             
                    while (resultSet.next()) {  
                              dataPersonal = {};  
                              var data = resultSet.getNString(1);
                              var ano = data.substring(0, 4);
                              var mes = data.substring(5, 7);
                              var fy = "";
                              if (parseInt(ano) === 2010 && parseInt(mes) === 2)
                              {
                                fy = 2010;
                                dataPersonal.FY = fy.toString();
                                dataPersonalsList.push(dataPersonal); 
                              }
                              if (parseInt(mes) === 3)
                              {
                                 fy = parseInt(ano) + 1;
                                dataPersonal.FY = fy.toString();
                                dataPersonalsList.push(dataPersonal);  
                              }
                              
                              
                    }  
          } finally {  
                    close([resultSet, statement, connection]);  
          }  
                var str = JSON.stringify({Datas: dataPersonalsList});   
         return str;  
}  

function doGet() {  
          try{  
                    $.response.contentType = "application/json";  
                    $.response.setBody(getDataPersonals());             
          }  
          catch(err){ 
                    var name =  $.session.samlUserInfo.givenName;
                    var surname = $.session.samlUserInfo.sn;
                    var username = name + " " + surname;
                    var oModel =  new sap.ui.model.json.JSONModel();
                    oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + username + "&desc=" + err.message + "&number=" + err.code, "POST");
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200;  
          }  
}  
doGet();