function onClick(info, tab) {
	console.log(info.selectionText + " was clicked");
	if(info.selectionText) {
		console.log("selection")
		translate(info.selectionText, function(result) {
			console.log(result);
			chrome.contextMenus.update(cm_main, {
				"title": result,
				"contexts": ["all"]
			});
			chrome.contextMenus.update(child1, {
				"title": "\""+result+"\": add to list"
			});
			chrome.contextMenus.update(child2, {
				title: "\""+result+"\": open in browser"
			});
		});
	} else {
		console.log("no selection")
		//create menu options for translation

		chrome.contextMenus.update(cm_main, {
			"title": "DEUTSCH",
			"contexts": ["selection"]
		});
	}
}

function translate(input, callback) {
	key = "trnsl.1.1.20180410T081019Z.70d24c14917e86eb.f53eb30a7d16ef03d98be546634ec09f4c87189d"
	lang = "en-de"
	text = encodeURI(input)

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang="+lang, true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var result = JSON.parse(xhr.responseText).text[0]
				callback(result)
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);
}

var cm_main = chrome.contextMenus.create({"title": "DEUTSCH", "contexts":["selection"], "onclick": onClick});
var child1 = chrome.contextMenus.create({"title": "Ignore for now"});
var child2 = chrome.contextMenus.create({"title": "Ignore for now"});