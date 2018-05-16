//var dataI = $.request.parameters.get("dataIni");
//var dataF = $.request.parameters.get("dataFim");
   
   var selectAllP;
   // if (dataI === "" || dataF === "") {
        selectAllP = 'select ADMISSAO,CHAVE,DATA,NP  from \"_SYS_BIC\".\"teste/TEST2\"' +
                    'where DATA = ( SELECT MAX(DATA) FROM \"_SYS_BIC\".\"teste/TEST2\")' +
                    'and EMPRESA != \'Nubeliu\'' +
                    'ORDER BY RE ASC';
 /*   }
    else{
         selectAllP =  'select * from \"_SYS_BIC\".\"teste/TEST2\"' +
                        'where DATA BETWEEN ? and ?' +
                        'and EMPRESA != \'Nubeliu\'' +
                        'ORDER BY DATA DESC, RE ASC';   
    }*/

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
                  //  if (dataI !== "" || dataF !== "") {
                  //  statement.setString(1, dataI);
                    //statement.setString(2, dataF);
                   // }
                    resultSet = statement.executeQuery(); 
                    
                    var dataPersonal;  
             
                    while (resultSet.next()) {  
                       
                              dataPersonal = {};  
                              //dataPersonal.ID = resultSet.getString(1); 
                            /*  var admis = resultSet.getNString(2);
                              var ano = admis.substring(6, 10);
                              var mes = admis.substring(3, 5);
                              var dia = admis.substring(0, 2);
                              var adm = ano + "/" + mes + "/" + dia;*/
                              dataPersonal.ADMISSAO =  resultSet.getNString(1);
                              //dataPersonal.ALOC = resultSet.getNString(3);
                              dataPersonal.CHAVE = resultSet.getNString(2);
                              dataPersonal.DATA = resultSet.getNString(3); 
                             // dataPersonal.DISCIPLINA = resultSet.getNString(6);  
                             // dataPersonal.EMPRESA = resultSet.getNString(7);  
                             // dataPersonal.FUNCAO = resultSet.getNString(8);
                              //dataPersonal.LOCALTRAB = resultSet.getNString(9);                              
                            //  dataPersonal.LOT = resultSet.getNString(10); 
                              dataPersonal.NP = resultSet.getNString(4);  
                              //dataPersonal.NOMECONHECIDO = resultSet.getNString(12);  
                             // dataPersonal.RE = resultSet.getNString(13);
                             // dataPersonal.NOMECHEFE = resultSet.getNString(14);
                             // dataPersonal.RECHEFE = resultSet.getNString(15);
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
             
                    $.response.contentType = "application/json; charset=UTF-8";  
                    $.response.setBody(getDataPersonals());             
          }  
          catch(err){  
                 /* var name =  $.session.samlUserInfo.givenName;
                    var surname = $.session.samlUserInfo.sn;
                    var username = name + " " + surname;
                    var oModel =  new sap.ui.model.json.JSONModel();
                    oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + username + "&desc=" + err.message + "&number=" + err.code, "POST");*/
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200; 
                    

          }  
}  
doGet();