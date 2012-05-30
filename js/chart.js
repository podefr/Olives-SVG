define("OSVG/Chart", 

["Olives/OObject", "Olives/Model-plugin"], 

function (OObject, ModelPlugin) {
	
	return function (view, model) {
		
		var chart = new OObject;
		
		chart.plugins.add("line", new ModelPlugin(model, {
			drawLine: function (points) {
				this.setAttribute("points", points.join(" "));
			}
		}));
		
		chart.alive(view);
		
		return chart;
		
	};
	
});