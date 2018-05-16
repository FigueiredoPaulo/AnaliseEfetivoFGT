sap.ui.define([
	"sap/tnt/sample/ToolHeaderControls/controller/BaseController",
	"sap/m/Popover",
	'sap/m/MessageBox',
	"sap/ui/model/json/JSONModel",
    "sap/m/Button"
],function (BaseController, Popover, MessageBox, JSONModel ,Button ) {
	"use strict";

	return BaseController.extend("sap.tnt.sample.ToolHeaderControls.controller.app", {
      
		onInit: function () {
            var oModel = new JSONModel("/APLICACOES/AnaliseEfetivo/Model/Username.xsjs", null, false);
            this.getView().setModel(oModel, "userM");
		}, 

		handleUserNamePress: function (event) {
		    
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent,
						press: function() 
						{
						    window.location = "https://logicalisconnected.jiveon.com/";
						}
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		}
	});

});