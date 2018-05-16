sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/Device"
    ],
	function(UIComponent, JSONModel, Device) {
	'use strict';

	return UIComponent.extend("sap.tnt.sample.ToolHeaderControls.Component", {
	metadata: {
			manifest: "json"
		},

		init: function () {
		    
		    var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
			
		    // RH
		    var RHp = new JSONModel("/APLICACOES/AnaliseEfetivo/Model/PermissionRH.xsjs");
		    this.setModel(RHp,"PermissionRH");
		    
		    
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
		}
      
	});
	
});