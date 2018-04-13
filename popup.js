chrome.storage.local.get(["list", "last_result"], function(result) {
	var list = result.list;
	
	addElem("th", "English", "German")
	addElem("td", result.last_result[0], result.last_result[1])

	var i;
	for (i = list.length-1; i >= 0; i--) {
		addElem("td", list[i][0], list[i][1])
	}
});

function addElem(type, en, de)
{
	var tr = document.createElement("tr");
	var th_en = document.createElement(type);
	var t_en = document.createTextNode(en);
	th_en.appendChild(t_en);
	tr.appendChild(th_en);

	if(de) {
		var th_de = document.createElement(type);
		var t_de = document.createTextNode(de);
		th_de.appendChild(t_de);
		tr.appendChild(th_de);
	}
	
	document.getElementById("vocab").appendChild(tr);
}