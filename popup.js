chrome.storage.local.get(["list"], function(result) {
	var list = result.list;
	console.log("in popup.js: list is "+result.list)
	var i;
	for (i = list.length-1; i >= 0; i--) {

		var tr = document.createElement("tr");
		var td_en = document.createElement("td");
		var td_de = document.createElement("td");
		var t_en = document.createTextNode(list[i][0]);
		var t_de = document.createTextNode(list[i][1]);
		td_en.appendChild(t_en);
		td_de.appendChild(t_de);
		tr.appendChild(td_en);
		tr.appendChild(td_de);
		document.getElementById("vocab").appendChild(tr);
	}
});

chrome.storage.local.get(["last_result"], function(result) {
	var en = result.last_result[0]
	var de = result.last_result[1]
	var a = document.createTextNode("\""+en+"\" translates to \""+de+"\"");
	document.getElementById("header").appendChild(a);
});