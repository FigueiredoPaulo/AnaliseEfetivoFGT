sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.tnt.sample.ToolHeaderControls.controller.BaseController", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

	});

});