define("OSVG/form", 
		
["Olives/OObject", "Olives/Model-plugin"],	

function (OObject, ModelPlugin) {
	
	return function (view, model) {
	
		var form = new OObject(model);
		
		form.plugins.add("form", new ModelPlugin(model));
		
		form.alive(view);
		
		return form;
	};
	
	
});