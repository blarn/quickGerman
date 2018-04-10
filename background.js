function onClick(info, tab) {
	if(info.selectionText) {
		console.log(info.selectionText + " was clicked")
		translate(info.selectionText, function(result) {
			console.log(result);
			chrome.contextMenus.update(child1, {
				title: "\""+result+"\": add to list",
				contexts: ["all"],
				onclick: listAdd
			});
			chrome.contextMenus.update(child2, {
				title: "\""+result+"\": open in browser",
				contexts: ["all"],
				onclick: newTab
			});
		});
	}
}

function listAdd(info, tab) {
	chrome.storage.local.get(['last_result'], function(result) {
		console.log(result.last_result)
	});
}

function newTab(info, tab) {
	chrome.storage.local.get(['last_result'], function(result) {
		var text = result.last_result
		var lang = "en-de"
		chrome.tabs.create({ url: "https://translate.yandex.com/?text="+text+"&lang="+lang });
	});
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
				chrome.storage.local.set({last_result: result}, null);
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

var cm_main = chrome.contextMenus.create({
	id: "cm_main", 
	title: "neu Deutsch", 
	contexts:["selection"], 
	onclick: onClick
});
var child1 = chrome.contextMenus.create({
	title: "Nothing translated yet"
});
var child2 = chrome.contextMenus.create({
	title: "Nothing translated yet"
});