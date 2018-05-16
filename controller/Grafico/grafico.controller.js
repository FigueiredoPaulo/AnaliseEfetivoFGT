sap.ui.define([
	"sap/tnt/sample/ToolHeaderControls/controller/BaseController",
	'sap/m/MessageBox',
	"sap/ui/model/json/JSONModel"
], function(BaseController, MessageBox, JSONModel) {
	"use strict";
    var dimension = "";
    var measure = "";
    var dtInicio = "";
    var dtFim = "";
    var v_path = "";
    var vPrevYear; 
     var d = new Date();
     var vMonth = d.getMonth();
    var vYear = d.getFullYear();
    if (vMonth > 1){
       vPrevYear = vYear;
       vYear = vYear + 1; 
    }
    else{
        vPrevYear = vYear - 1;
    }
    
	return BaseController.extend("sap.tnt.sample.ToolHeaderControls.controller.Grafico.grafico", {
    


	_constants : {
		chartContainerId : "chartContainer",
		table : {
			id : "tableId",
			icon : "sap-icon://table-view",
			title : "Table",
			itemBindingPath : "/UserSet",
		    columnLabelTexts : ["FY", "ANO", "MES", dimension, "QUANTIDADE"],
			templateCellLabelTexts : ["{FY}", "{ANO}", "{MES}", "{DIMENSAO}", "{COUNT}"]
		    
		},
		vizFrames : {
			config : {
				height : "600px",
				width : "90%",
				colorPalette:"#5cbae6, #b6d957, #fac364, #8cd3ff",
				uiConfig : {
					applicationSet: "fiori"
				}
			},
			scales :{
			    'feed': 'color',
			    colorPalette:"#5cbae6, #b6d957, #fac364, #8cd3ff"
                //'palette': ['#00FF00','#FFC200','#FF0000']
			},
			properties :{
			   	title : {
					text: dimension
				} ,
				dataLabel:{
				    visible: true
				}, 
                    plotArea: {
                         colorPalette: ['#e17b24', '#d1d6e0', '#61a656','#848f94' ], 
                         gap: { visible: false }, 
					    isFixedDataPointSize: false, 
					    window: { start: null, end: null },
					    timeAxis: { interval: { unit: 'auto' }  }
                     }

			},
			
			
			NP : {
				icon : "sap-icon://vertical-bar-chart",
				dataPath : "/APLICACOES/AnaliseEfetivo/Model/grafico.xsjs?dimension=NP",
			    title: {
                   visible: true
                },
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'DATA',
					    value : "{DATA}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, 
				{
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["DATA"]
    			}],
				vizType : "column"
			},
			LOT : {
				icon : "sap-icon://vertical-bar-chart",
				title : "LOT",
				dataPath :  "/APLICACOES/AnaliseEfetivo/Model/grafico.xsjs?dimension=LOT",
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'DATA',
					    value : "{DATA}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["DATA"]
    			}],
				vizType : "column"
			},
			DISCIPLINA : {
				icon : "sap-icon://horizontal-bar-chart",
				title : "Bar Chart",
				dataPath : "/APLICACOES/AnaliseEfetivo/Model/grafico.xsjs?dimension=DISCIPLINA",
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'DATA',
					    value : "{DATA}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["DATA"]
    			}],
				vizType : "bar"
			},
			EMPRESA : {
				icon : "sap-icon://vertical-bar-chart",
				title : "LOT",
				dataPath :  "/APLICACOES/AnaliseEfetivo/Model/grafico.xsjs?dimension=EMPRESA",
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'DATA',
					    value : "{DATA}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["DATA"]
    			}],
				vizType : "column"
			},
			NPFY : {
				icon : "sap-icon://vertical-bar-chart",
				//title : "Bar Chart",
				dataPath : "/APLICACOES/AnaliseEfetivo/Model/graficoFY.xsjs?dimension=NP",
			    title: {
                   visible: false
                },
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'FY',
					    value : "{FY}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["FY"]
    			}],
    			
				vizType : "column"
			},
			LOTFY : {
				icon : "sap-icon://vertical-bar-chart",
				title : "LOT",
				dataPath :  "/APLICACOES/AnaliseEfetivo/Model/graficoFY.xsjs?dimension=LOT",
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'FY',
					    value : "{FY}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["FY"]
    			}],
				vizType : "column"
			},
			DISCIPLINAFY : {
				icon : "sap-icon://horizontal-bar-chart",
				title : "Bar Chart",
				dataPath : "/APLICACOES/AnaliseEfetivo/Model/graficoFY.xsjs?dimension=DISCIPLINA",
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'FY',
					    value : "{FY}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["FY"]
    			}],
				vizType : "bar"
			},
			EMPRESAFY : {
				icon : "sap-icon://vertical-bar-chart",
				title : "LOT",
				dataPath :  "/APLICACOES/AnaliseEfetivo/Model/graficoFY.xsjs?dimension=EMPRESA",
				dataset : {
					dimensions : [{
						name : "DIMENSAO",
					    value : "{DIMENSAO}"
					},
				    {
					    name : 'FY',
					    value : "{FY}"
				    }],
					measures : [{
						name : "COUNT",
						value : "{COUNT}"
					}],
					data : {
						path : "/UserSet"
					}
				},
				feedItems : [{
					uid : "primaryValues",
					type : "Measure",
					values : ["COUNT"]
				}, {
					uid : "axisLabels",
					type : "Dimension",
					values : ["DIMENSAO"]
				},
    			{
    				"uid" : "color",
    				"type" : "Dimension",
    				"values" : ["FY"]
    			}],
				vizType : "column"
			}
		}
	},
	/**
	 * Changeable properties depending on the app's state.
	 *
	 * @private
	 * @property {sap.viz.ui5.controls.VizFrame} vizFrameProduct Product Viz Frame
	 * @property {sap.viz.ui5.controls.VizFrame} vizFrameCountry1 Country 1 Viz Frame
	 * @property {sap.viz.ui5.controls.VizFrame} vizFrameCountry2 Country 2 Viz Frame
	 * @property {sap.m.Table} table App data table
	 */
	_state : {
		vizFrames : {
			NP : null,
			LOT : null,
			DISCIPLINA: null,
			EMPRESA: null,
			NPFY : null,
			LOTFY : null,
			DISCIPLINAFY: null,
			EMPRESAFY: null
		},
		table : null
	},
	/* ============================================================ */
	/* Life-cycle Handling                                          */
	/* ============================================================ */
	/**
	 * Method called when the application is initalized.
	 *
	 * @public
	 */
	onInit : function() 
	{
	    var oRouter = this.getRouter();
		oRouter.getRoute("grafico").attachMatched(this._onRouteMatched, this);
	},
	
	onPressEfetivo: function(oEvent) 
	{
	    var oItem = oEvent.getSource();
			          this.getRouter().navTo("efetivos", {
			    	  datesPath: dtInicio + dtFim + "SC"
			}); 
	},
	
	_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var data = oArgs.datesPath2;
			dtInicio = data.substring(0, 7); 
			dtFim = data.substring(7, 14);
			v_path = "&dataIni=" + dtInicio + "&dataFim=" + dtFim;
			if (dimension === "")
            {
                 dimension = "NP";
            }
            if (measure === "")
            {
                 measure = "data";
            }
        
		    this._initializeNP();
		    this._initializeLOT();
		    this._initializeDISCIPLINA();
		    this._initializeEMPRESA();
		    this._initializeNPFY();
		    this._initializeLOTFY();
		    this._initializeDISCIPLINAFY();
		    this._initializeEMPRESAFY();
		
	    	// Initially show the content for NP
		    this._showNP();
				
			oView.bindElement({
				path : "/grafico(" + oArgs.datesPath2 + ")",
				events : 
				{
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
		},
		
	/* ============================================================ */
	/* Event Handling                                               */
	/* ============================================================ */
	/**
	 * Switches the views "sales by product" and "sales by country".
	 *
	 * The ChartContainerContent is replaced here.
	 *
	 * @param {sap.ui.base.Event} oEvent The fired event
	 */
	handleSelectionChange : function(oEvent) {
		var oItem = oEvent.getParameter("selectedItem");
		if (oItem.getKey() === "0") {
		     dimension = "NP";
		    if (measure === "data") {this._showNP();}
		    else {this._showNPFY();}
		    
		} else if (oItem.getKey() === "1") {
		   dimension = "LOT";
		    if (measure === "data") {this._showLOT();}
		    else {this._showLOTFY();}
		}else if (oItem.getKey() === "2") {
		    dimension = "DISCIPLINA";
		    if (measure === "data") {this._showDISCIPLINA();}
		    else {this._showDISCIPLINAFY();}
		}else if (oItem.getKey() === "3") {
		    dimension = "EMPRESA";
		    if (measure === "data") { this._showEMPRESA(); }
		    else {this._showEMPRESAFY();}
		}
	
	},
	handleSelectionChange2 : function(oEvent) {
		var oItem = oEvent.getParameter("selectedItem");
		if (oItem.getKey() === "0") {
		    measure = "data";
		    if (dimension === "NP") {this._showNP();}
		    else if (dimension === "LOT") {this._showLOT();}
		    else if (dimension === "DISCIPLINA") {this._showDISCIPLINA();}
		    else if (dimension === "EMPRESA") {this._showEMPRESA();}
		} else if (oItem.getKey() === "1") {		   //this._showLOT();
		   measure = "fy";
		   if (dimension === "NP") {this._showNPFY();}
		    else if (dimension === "LOT") {this._showLOTFY();}
		    else if (dimension === "DISCIPLINA") {this._showDISCIPLINAFY();}
		    else if (dimension === "EMPRESA") {this._showEMPRESAFY();}
		}
	
	},
	/* ============================================================ */
	/* Helper Methods                                               */
	/* ============================================================ */
	/**
	 * Initializes sales by product Viz Frame.
	 *
	 * @private
	 */
	_initializeNP : function() {
		this._state.vizFrames.NP = this._createVizFrame(this._constants.vizFrames.NP, true);
	},
	_initializeLOT : function() {
		this._state.vizFrames.LOT = this._createVizFrame(this._constants.vizFrames.LOT, false);
	},
	_initializeDISCIPLINA : function() {
		this._state.vizFrames.DISCIPLINA = this._createVizFrame(this._constants.vizFrames.DISCIPLINA, false);
	},
	_initializeEMPRESA : function() {
		this._state.vizFrames.EMPRESA = this._createVizFrame(this._constants.vizFrames.EMPRESA, false);
	},
	_initializeNPFY : function() {
		this._state.vizFrames.NPFY = this._createVizFrame(this._constants.vizFrames.NPFY, false);
	},
	_initializeLOTFY : function() {
		this._state.vizFrames.LOTFY = this._createVizFrame(this._constants.vizFrames.LOTFY, false);
	},
	_initializeDISCIPLINAFY : function() {
		this._state.vizFrames.DISCIPLINAFY = this._createVizFrame(this._constants.vizFrames.DISCIPLINAFY, false);
	},
	_initializeEMPRESAFY : function() {
		this._state.vizFrames.EMPRESAFY = this._createVizFrame(this._constants.vizFrames.EMPRESAFY, false);
	},
	/**
	 * Creates a Viz Frame based on the passed config and flag for whether a table should be created too.
	 *
	 * @param {Object} vizFrameConfig Viz Frame config
	 * @param {Boolean} createTable Flag for whether a table should be created
	 * @returns {sap.viz.ui5.controls.VizFrame} Created Viz Frame
	 */
	_createVizFrame : function(vizFrameConfig, createTable) {
		var oVizFrame = new sap.viz.ui5.controls.VizFrame(this._constants.vizFrames.config);
		var v_dataPath = vizFrameConfig.dataPath.concat(v_path);
				      
		var oModel = new sap.ui.model.json.JSONModel(v_dataPath);
		var oDataSet = new sap.viz.ui5.data.FlattenedDataset(vizFrameConfig.dataset);
        oModel.attachRequestCompleted(function(){
                sap.ui.core.BusyIndicator.hide();
            });
		oVizFrame.setDataset(oDataSet);
		oVizFrame.setModel(oModel);
		this._addFeedItems(oVizFrame, vizFrameConfig.feedItems);
		oVizFrame.setVizType(vizFrameConfig.vizType);
	//	oVizFrame.setVizScales(this._constants.vizFrames.scales);
	    oVizFrame.setVizProperties(this._constants.vizFrames.properties);
	    var mesIni = dtInicio.substring(5, 7);
	    var anoIni = dtInicio.substring(0, 4);
	    var count = 1;
	    
	 /*   while (dtInicio <= dtFim)
	    {
	       
	       var vProperties = "{plotArea: {dataPointStyle: {'rules':[{'dataContext': {'DATA': {in: [ " + dtInicio +  "]}},'properties': {'color':['sapUiChartPaletteQualitativeHue1']},'displayName': '2017_01' } ]}}}";
           
           // oVizFrame.setVizProperties(vProperties);
            alert(vProperties);
            oVizFrame.setVizProperties(
                 {plotArea: {
                        dataPointStyle: {
                            'rules':
                                [
                                    {
                                        'dataContext': {'DATA': {in : [ dtInicio]}}, 
                                        'properties': {
                                            'color':['sapUiChartPaletteQualitativeHue' + count ]
                                        },
                                        'displayName': dtInicio
                                    }  
                                
                                ]}}
                 });
                
            count ++;
            mesIni = parseInt(mesIni) + 1;
            dtInicio = anoIni + "_0" + mesIni ;
	    }*/
	    
	   
		if (createTable) {
			this._createTable(oModel);
		}

		return oVizFrame;
	},
	/**
	 * Creates the table used by "sales by product view".
	 *
	 * @private
	 * @param {sap.ui.model.json.JSONModel} vizFrameModel Model used by the Viz Frame
	 */
	_createTable : function(vizFrameModel) {
		var oTableConfig = this._constants.table;
		var oTable = new sap.m.Table({
			id: oTableConfig.id,
			columns : this._createTableColumns(oTableConfig.columnLabelTexts)
		});
		var oTableTemplate = new sap.m.ColumnListItem({
			type: sap.m.ListType.Active,
			cells: this._createLabels(oTableConfig.templateCellLabelTexts)
		});

		oTable.bindItems(oTableConfig.itemBindingPath, oTableTemplate, null, null);
		oTable.setModel(vizFrameModel);

		this._state.table = oTable;
	},
	/**
	 * Adds the charts or table belonging to the "sales by product" view to the ChartContainer.
	 *
	 * @private
	 */
	_showNP : function() {
		var oProductVizFrame = this._constants.vizFrames.NP;
		var oTable = this._constants.table;

		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.NP);
		var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);

		this._updateChartContainerContent(oContent1, oContent2);
	},
	
	_showLOT : function() {
		var oProductVizFrame = this._constants.vizFrames.LOT;
	//	var oTable = this._constants.table;
		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.LOT);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);
		this._updateChartContainerContent(oContent1/*, oContent2*/);
	},
	_showDISCIPLINA : function() {
		var oProductVizFrame = this._constants.vizFrames.DISCIPLINA;
	//	var oTable = this._constants.table;
		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.DISCIPLINA);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);
		this._updateChartContainerContent(oContent1/*, oContent2*/);
	},
	_showEMPRESA : function() {
		var oProductVizFrame = this._constants.vizFrames.EMPRESA;
	//	var oTable = this._constants.table;
		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.EMPRESA);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);
		this._updateChartContainerContent(oContent1/*, oContent2*/);
	},
	_showNPFY : function() {
		var oProductVizFrame = this._constants.vizFrames.NPFY;
	//	var oTable = this._constants.table;

		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.NPFY);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);

		this._updateChartContainerContent(oContent1);
	},
	
	_showLOTFY : function() {
		var oProductVizFrame = this._constants.vizFrames.LOTFY;
	//	var oTable = this._constants.table;
		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.LOTFY);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);
		this._updateChartContainerContent(oContent1/*, oContent2*/);
	},
	_showDISCIPLINAFY : function() {
		var oProductVizFrame = this._constants.vizFrames.DISCIPLINAFY;
	//	var oTable = this._constants.table;
		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.DISCIPLINAFY);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);
		this._updateChartContainerContent(oContent1/*, oContent2*/);
	},
	_showEMPRESAFY : function() {
		var oProductVizFrame = this._constants.vizFrames.EMPRESAFY;
	//	var oTable = this._constants.table;
		var oContent1 = this._createChartContainerContent(oProductVizFrame.icon, oProductVizFrame.title, this._state.vizFrames.EMPRESAFY);
	//	var oContent2 = this._createChartContainerContent(oTable.icon, oTable.title, this._state.table);
		this._updateChartContainerContent(oContent1/*, oContent2*/);
	},
	
	/**
	 * Creates chart container content with the given icon, title, and Viz Frame.
	 *
	 * @private
	 * @param {String} icon Icon path
	 * @param {String} title Icon title
	 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame
	 * @returns {sap.suite.ui.commons.ChartContainerContent} Chart container content
	 */
	_createChartContainerContent : function(icon, title, vizFrame) {
		var oContent = new sap.suite.ui.commons.ChartContainerContent({
			icon: icon,
			title: title
		});

		oContent.setContent(vizFrame);

		return oContent;
	},
	/**
	 * Calls the methods to clear and re-set chart container's content.
	 *
	 * @private
	 * @param {sap.viz.ui5.controls.VizFrame} content1 First Viz Frame
	 * @param {sap.viz.ui5.controls.VizFrame} content2 Second Viz Frame
	 */
	_updateChartContainerContent : function(content1, content2) {
		var oChartContainer = this.getView().byId(this._constants.chartContainerId);
		oChartContainer.removeAllContent();
		oChartContainer.addContent(content1);
		oChartContainer.addContent(content2);
		oChartContainer.updateChartContainer();
	},
	/**
	 * Adds the passed feed items to the passed Viz Frame.
	 *
	 * @private
	 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame to add feed items to
	 * @param {Object[]} feedItems Feed items to add
	 */
	_addFeedItems : function(vizFrame, feedItems) {
		for (var i =0; i < feedItems.length; i++) {
			vizFrame.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem(feedItems[i]));
		}
	},
	/**
	 * Creates table columns with labels as headers.
	 *
	 * @private
	 * @param {String[]} labels Column labels
	 * @returns {sap.m.Column[]} Array of columns
	 */
	_createTableColumns : function(labels) {
		var aLabels = this._createLabels(labels);

		return this._createControls(sap.m.Column, "header", aLabels);
	},
	/**
	 * Creates label control array with the specified texts.
	 *
	 * @private
	 * @param {String[]} labelTexts text array
	 * @returns {sap.m.Column[]} Array of columns
	 */
	_createLabels : function(labelTexts) {
		return this._createControls(sap.m.Label, "text", labelTexts);
	},
	/**
	 * Creates an array of controls with the specified control type, property name and value.
	 *
	 * @private
	 * @param {sap.ui.core.control} control Control type to create
	 * @param {String} prop Property name
	 * @param {Array} propValues Value of the control's property
	 * @returns {sap.ui.core.control[]} array of the new controls
	 */
	_createControls : function(control, prop, propValues) {
		var aControls = [];
		var oProps = {};

		for (var i = 0; i < propValues.length; i++) {
			oProps[prop] = propValues[i];
			aControls.push(new control(oProps));
		}
		return aControls;
	},
	/**
	 * Creates message for a press event on custom button.
	 *
	 * @private
	 */
	onPressHome : function(oEvent) {
		this.getRouter().navTo("filtros");
	}
});

});


