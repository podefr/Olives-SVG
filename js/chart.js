define("OSVG/Chart", 

["Olives/OObject", "Olives/Model-plugin"], 

function (OObject, ModelPlugin) {
	
	return function (view, model) {
		
		var chart = new OObject;
		
		chart.plugins.add("line", new ModelPlugin(model, {
			drawLine: function (points) {
				
				var newPoints = [];
				
				// We create a new array that adds x coordinates
				points.forEach(function (val, idx) {
					newPoints.push([idx*20, val]);
				});
				
				// It also have "terminating points"
				newPoints.unshift([0, 200]);
				newPoints.push([newPoints[newPoints.length-1][0], 200]);
				
				this.setAttribute("points", newPoints.join(" "));
			}
		}));
		
		chart.alive(view);
		
		return chart;
		
	};
	
});