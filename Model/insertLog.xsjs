var user = $.request.parameters.get("user");
var desc = $.request.parameters.get("desc");

//var conn = $.db.getConnection(); 
try{
var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement( "INSERT INTO \"ANALISE_EFETIVO\".\"LOG_ANALISEEFETIVO\" VALUES(ANALISE_EFETIVO.SEQ_ANALISE_EFETIVO.nextval,?,?,CURRENT_TIMESTAMP)" );
pstmt.setString(1,desc);  
pstmt.setString(2,user);  
pstmt.execute();  
conn.commit();  
$.response.contentType = 'text/plain';
    $.response.setBody('Data Inserted');
    $.response.status = 200;    
} catch(err){
    var oModel =  new sap.ui.model.json.JSONModel();
    oModel.loadData("https://fgsd5ba15bf3.us2.hana.ondemand.com/APLICACOES/AnaliseEfetivo/Model/insertLogErro.xsjs?user=" + user + "&desc=" + err.message + "&number=" + err.code, "POST");
}