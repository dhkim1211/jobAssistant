
/*
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(request) {
    var storageService = new markticleStorageService();
    if(request.action === 'add') {
      storageService.add(request.data);
    }
  }
});*/

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {

	chrome.tabs.executeScript({
		file: 'scripts/inject.js'
	});
});

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
	alert(response);
    var info = response;
})

// var jobInfo = {};
// jobInfo.jobtitle = document.getElementById('jobtitle').value;
// jobInfo.company = document.getElementById('company').value;
// jobInfo.location = document.getElementById('location').value;
// jobInfo.description = document.getElementById('description').value;

// $.ajax({
//     url: 'https://localhost:3000/v1/jobs/',
//     type: 'POST',
//     data: JSON.stringify(response),
//     contentType: 'application/json'
// });

// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://localhost:3000/v1/jobs/", true);
// xhr.onreadystatechange = function() {
//   if (xhr.readyState == 4) {
//     // innerText does not let the attacker inject HTML elements.
//     info = xhr.responseText;
//   }
// }
// xhr.send();

$.ajax({
          url: 'https://localhost:3000/v1/jobs/',  
          type: "POST",  
          dataType: "json",  
          contentType: "json",  
          data: {"jobtitle": info}
    });





/*
/* Create a context-menu 
chrome.contextMenus.create({
    id: "myContextMenu",   // <-- mandatory with event-pages
    title: "Click me",
    contexts: ["all"]
});

/* Register a listener for the `onClicked` event 
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
        /* Create the code to be injected 
        var code = [
            'var d = document.createElement("div");',
            'd.setAttribute("style", "'
                + 'background-color: red; '
                + 'width: 100px; '
                + 'height: 100px; '
                + 'position: fixed; '
                + 'top: 70px; '
                + 'left: 30px; '
                + 'z-index: 9999; '
                + '");',
            'document.body.appendChild(d);'
        ].join("\n");

        /* Inject the code into the current tab 
        chrome.tabs.executeScript(tab.id, { code: code });
    }
});
*/

