define("OSVG/form", 
		
["Olives/OObject", "Olives/Model-plugin", "Olives/Event-plugin"],	

function (OObject, ModelPlugin, EventPlugin) {
	
	return function (view, observable) {
	
		var form = new OObject;
		
		form.plugins.add("event", new EventPlugin(form));
		
		form.alive(view);
		
		form.addPoint = function (event) {
			event.preventDefault();
			observable.notify("newValue", view.querySelector("input").value);
		};
		
		return form;
	};
	
	
});