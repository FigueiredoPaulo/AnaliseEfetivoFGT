sap.ui.define([
		'jquery.sap.global',
	    'sap/tnt/sample/ToolHeaderControls/controller/BaseController',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageBox'
		
	],
	

	function(jQuery, BaseController, JSONModel, MessageBox) {
	"use strict";
 
   var DtIniSelected  = "";
   var DtFimSelected = "";
   var vChart = "";
   var vUser = "";

	return BaseController.extend("sap.tnt.sample.ToolHeaderControls.controller.filtros", {
        
        
		onInit: function () {
		    
			// set explored app's demo model on this sample
			var oModel = new JSONModel("/APLICACOES/AnaliseEfetivo/Model/dataFiltro.xsjs");
			this.getView().setModel(oModel);
			
            
            			
		},
		
		
			onNavToEmployees : function (oEvent) 
			{
			    if (DtIniSelected === "" &&  DtFimSelected === "")
			    {
			       var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                        MessageBox.alert(
				        "Favor selecionar uma data",
				        {
					        styleClass: bCompact? "sapUiSizeCompact" : ""
				        }
				        ); 
			    }
			    else
			    {
			        if(DtIniSelected === "")
			        {
			            bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                        MessageBox.alert(
				        "Favor selecionar uma data inicial",
				        {
					        styleClass: bCompact? "sapUiSizeCompact" : ""
				        }
				        );
			        }
			        
			        else
			        {
			            
			            //var RHp = new JSONModel("/APLICACOES/AnaliseEfetivo/Model/PermissionRH.xsjs");
		                //	this.getView().setModel(RHp);
		                
		                
			            //Verifica se usuário possui acesso ao Grafico
			            vUser = this.getView().byId("txtUser1").getText();
			            //
		          	    if (vUser === "Leila Almeida" || vUser === "Flavio Arruda"|| vUser === "Andre Oliveira" )
                        {
        		            vChart = "SC"; // show chart
        		        } 
			              try{
			                var oModel =  new sap.ui.model.json.JSONModel();
			                var desc = "Usuário realizou a seguinte pesquisa, data inicial : " +DtIniSelected +" data fim: " +DtFimSelected;
                            oModel.loadData("/APLICACOES/AnaliseEfetivo/Model/insertLog.xsjs?user=" + vUser + "&desc=" + desc, "POST");
			              }catch(err){
			                oModel =  new sap.ui.model.json.JSONModel();
                            oModel.loadData("/APLICACOES/AnaliseEfetivo/Model/insertLog.xsjs?user=" + vUser + "&desc=" + err.message, "POST"); 
			              }
    			          var oItem = oEvent.getSource();
    			          this.getRouter().navTo("efetivos", {
    			    	  datesPath: DtIniSelected + DtFimSelected + vChart});  
			        }
			    }
			    
		    },
		
			handleSelectionChangeDtIni: function(oEvent)
			{
			    DtIniSelected = oEvent.getParameter("selectedItem");
                DtIniSelected = DtIniSelected.getText();
			    
                 if (DtIniSelected > DtFimSelected)
                {
                    if (DtFimSelected === "")
                    {
                        this.getView().byId("DtFim").setValue(DtIniSelected);
                        DtFimSelected = DtIniSelected;
                    }
                    else
                    {
                        var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                        MessageBox.alert(
				        "Data inicial não pode ser maior que data final!",
				        {
					        styleClass: bCompact? "sapUiSizeCompact" : ""
				        }
				        );
				        this.getView().byId("DtFim").setValue(DtIniSelected);
				        DtFimSelected = DtIniSelected;
                    }    
                }
                
	     	},
			handleSelectionChangeDtFim: function(oEvent) 
			{
			    DtFimSelected = oEvent.getParameter("selectedItem");
			    DtFimSelected = DtFimSelected.getText();
    
		        if ( DtFimSelected < DtIniSelected )
                {
                    var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                    MessageBox.alert(
				    "Data inicial não pode ser maior que data final!",
				    {
					    styleClass: bCompact? "sapUiSizeCompact" : ""
				    }
			        );
			        this.getView().byId("DtFim").setValue(DtIniSelected);
			        DtFimSelected = DtIniSelected;
                }
		    }
		
	});
     
});