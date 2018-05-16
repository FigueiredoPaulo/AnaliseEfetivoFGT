sap.ui.define([
	"sap/tnt/sample/ToolHeaderControls/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV', 
	"sap/ui/core/format/DateFormat"
], function(BaseController,  JSONModel, MessageBox, Filter, Sorter, Export, ExportTypeCSV, DateFormat) {
	"use strict";
     var dtInicio = "";
     var dtFim = "";
     var vChart = "";
     
	return BaseController.extend("sap.tnt.sample.ToolHeaderControls.controller.Efetivo.efetivos", {

		onInit: function () {
		    
		    var oRouter = this.getRouter();
			oRouter.getRoute("efetivos").attachMatched(this._onRouteMatched, this);
		    this.getView().byId("tableEfetivos").setFixedColumnCount(3);
		    
		},
	

		onPressChart: function (oEvent) {
		     var oItem = oEvent.getSource();
			 this.getRouter().navTo("grafico", {
			 datesPath2: dtInicio + dtFim
			}, true);
		    //this.getRouter().navTo("grafico");
		},
		
		_filter : function () {
			var oFilter = null;

			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new sap.ui.model.Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}

			this.getView().byId("tableEfetivos").getBinding("rows").filter(oFilter, "Application");
		},
		
	
 	/* Sort numbers*/
		
		
			sortRE : function(oEvent) {
			    
			var oCurrentColumn = oEvent.getParameter("column");
			var oREColumn = this.getView().byId("RE");
			var oRECColumn = this.getView().byId("RECHEFE");
			var oNPColumn = this.getView().byId("NP");
			var oADMISSAOColumn = this.getView().byId("ADMISSAO");
			if (oCurrentColumn !== oREColumn && oCurrentColumn !== oRECColumn  && oCurrentColumn !== oNPColumn && oCurrentColumn !== oADMISSAOColumn) {
				oREColumn.setSorted(false); //No multi-column sorting 
				return;   
			}
			var sOrder = oEvent.getParameter("sortOrder");
			var oSorter;
		   if (oCurrentColumn === oADMISSAOColumn ){
    		    oEvent.preventDefault();
    
    			var sOrderDate = oEvent.getParameter("sortOrder");
    			var oDateFormat = DateFormat.getDateInstance({pattern: "dd/MM/yyyy"});
    
    			this._resetSortingState(); //No multi-column sorting
    			oADMISSAOColumn.setSorted(true);
    			oADMISSAOColumn.setSortOrder(sOrder);
    
    			var oSorterDate = new Sorter(oADMISSAOColumn.getSortProperty(), sOrderDate === sap.ui.table.SortOrder.Descending);
    			//The date data in the JSON model is string based. For a proper sorting the compare function needs to be customized.
    			oSorterDate.fnCompare = function(a, b) {
    				if (b === null) {
    					return -1;
    				}
    				if (a === null) {
    					return 1;
    				}
    
    				var aa = oDateFormat.parse(a).getTime();
    				var bb = oDateFormat.parse(b).getTime();
    
    				if (aa < bb) {
    					return -1;
    				}
    				if (aa > bb) {
    					return 1;
    				}
    				return 0;
    			};
    
    			this.getView().byId("tableEfetivos").getBinding("rows").sort(oSorterDate);
		   }
		   else{
               if (oCurrentColumn === oREColumn  ){
    			oEvent.preventDefault();
    			this._resetSortingState(); //No multi-column sorting
    			oREColumn.setSorted(true);
    			oREColumn.setSortOrder(sOrder);
               // var SortOrder = jQuery.sap.require("sap.ui.table.SortOrder");
               
    			oSorter = new Sorter(oREColumn.getSortProperty(), sOrder === sap.ui.table.SortOrder.Descending);
    			//The date data in the JSON model is string based. For a proper sorting the compare function needs to be customized.
    			
    			}
    			if (oCurrentColumn === oRECColumn  ) {
    			    oEvent.preventDefault();
    			    this._resetSortingState(); //No multi-column sorting
    			    oRECColumn.setSorted(true);
    			    oRECColumn.setSortOrder(sOrder);
    				oSorter = new Sorter(oRECColumn.getSortProperty(), sOrder === sap.ui.table.SortOrder.Descending);
    			//The date data in the JSON model is string based. For a proper sorting the compare function needs to be customized.
    			} 
    			
    			if (oCurrentColumn === oNPColumn  ) {
    			    oEvent.preventDefault();
    			    this._resetSortingState(); //No multi-column sorting
    			    oNPColumn.setSorted(true);
    			    oNPColumn.setSortOrder(sOrder);
    				oSorter = new Sorter(oNPColumn.getSortProperty(), sOrder === sap.ui.table.SortOrder.Descending);
    			//The date data in the JSON model is string based. For a proper sorting the compare function needs to be customized.
    			} 
                oSorter.fnCompare = function(a, b) {
    				if (b === null) {
    					return -1;
    				}
    				if (a === null) {
    					return 1;
    				}
     
    				var aa = parseInt(a);
    				var bb = parseInt(b);
     
    				if (aa < bb) {
    					return -1;
    				}
    				if (aa > bb) {
    					return 1;
    				}
    				return 0;
    			};
    			this.getView().byId("tableEfetivos").getBinding("rows").sort(oSorter);
		   }
		   
		},
		_resetSortingState : function() {
			var oTable = this.getView().byId("tableEfetivos");
			var aColumns = oTable.getColumns();
			for (var i=0; i<aColumns.length; i++) {
				aColumns[i].setSorted(false);
			}
		},
		  /**
 * Adds a custom sort menu for a given table
 *
 * @param oColumn Target table column to add custom menu
 * @param comparator Function to compare two values of column oColumn
 */
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var data = oArgs.datesPath;
			dtInicio = data.substring(0, 7); 
			dtFim = data.substring(7, 14);
			vChart = data.substring(14, 16);
			
				// set explored app's demo model on this sample
			var oModel = new JSONModel("/APLICACOES/AnaliseEfetivo/Model/efetivo.xsjs?dataIni=" + dtInicio + "&dataFim=" + dtFim);
			
            sap.ui.core.BusyIndicator.show(0);

			this.getView().setModel(oModel);
			
			this.getView().setModel(new JSONModel({
			globalFilter: "",
			availabilityFilterOn: false,
			cellFilterOn: false
			}), "ui");
			oModel.attachRequestCompleted(function(){
                sap.ui.core.BusyIndicator.hide();
            });
            

            
			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			
			oView.bindElement({
				path : "/efetivos(" + oArgs.datesPath + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
			
	       if (vChart === "SC")
            {
                this.getView().byId("btnChart").setVisible(true);
            }
            else
            {
                this.getView().byId("btnChart").setVisible(false);
            }
        		  
        

		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},

          
/*		onPressGerarExcel: function (oEvent) 
		{
	
        var oExport = new Export({
            // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                  exportType: new ExportTypeCSV({
                     separatorChar: ";"
                  }),
                
            // Pass in the model created above
                  models: this.getView().getModel(),
    
             // binding information for the rows aggregation 
                  rows: {
                    path: "/UserSet" 
                  },
            
            // column definitions with column name and binding info for the content
          
                columns: [
                {
                name: "RE",
                  template: {
                    content: {
                      path: "RE"
                    }
                  }
                },
                {
                name: "Nome conhecido",
                  template: {
                    content: {
                      path: "NOMECONHECIDO"
                    }
                  }
                },
                {
                name: "Função",
                  template: {
                    content: {
                      path: "FUNCAO"
                    }
                  }
                },
                {
                name: "NP",
                  template: {
                    content: {
                      path: "NP"
                    }
                  }
                },
                {
                name: "Disciplina",
                  template: {
                    content: {
                      path: "DISCIPLINA"
                    }
                  }
                },
                {
                name: "Lot",
                  template: {
                    content: {
                      path: "LOT"
                    }
                  }
                },
                 {
                name: "ALOC",
                  template: {
                    content: {
                        path: "ALOC"
                    }
                  }
                },
                {
                name: "RE Chefe",
                  template: {
                    content: {
                        path: "RECHEFE"
                    }
                  }
                },
                {
                name: "Chefe Imediato",
                  template: {
                    content: {
                        path: "NOMECHEFE"
                    }
                  }
                },
                {
                name: "Empresa",
                  template: {
                    content: {
                      path: "EMPRESA"
                    }
                  }
                },
                {
                name: "Local trab",
                  template: {
                    content: {
                      path: "LOCALTRAB"
                    }
                  }
                },
                {
                name: "Admissao",
                  template:{
                    content: {
                        path: "ADMISSAO"
                    }
                  } 
                },
                
            {
                name: "Data",
                template: {
                    content: {
                        path: "DATA"
                    }
                }
            }
        
            ]
        }); 
		    oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},*/
		
		onPressGerarExcel: function (oEvent) 
		{
		    
		jQuery.sap.require("sap.ui.core.util.Export");
        jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");

        this.getView().byId("tableEfetivos").exportData({
        exportType: new sap.ui.core.util.ExportTypeCSV({
                     separatorChar: ";"
                  })
        
        })
		
        .saveFile()
        .always(function() {
            this.destroy();
        });  
		},
		
		onPressFiltro: function (oEvent) 
		{
		   
		   this.getRouter().navTo("filtros");
		}


	});

});