var user = $.request.parameters.get("user");
var desc = $.request.parameters.get("desc");
var number = $.request.parameters.get("number");
//var conn = $.db.getConnection(); 
var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement( "INSERT INTO \"ANALISE_EFETIVO\".\"LOG_ERRO_ANALISEEFETIVO\" VALUES(ANALISE_EFETIVO.SEQ_LOG_ERRO_ANALISEEFETIVO.nextval,?,?,?,CURRENT_TIMESTAMP)" );
pstmt.setString(1,number);
pstmt.setString(2,desc);  
pstmt.setString(3,user);  
pstmt.execute();  
conn.commit();  
$.response.contentType = 'text/plain';
    $.response.setBody('Data Inserted');
    $.response.status = 200;    
    