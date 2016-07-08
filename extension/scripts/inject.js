//'use strict';

/*
$(document).ready(function() {
	var createMarkticleButton = function() {
		var styles = 'position: fixed; z-index: 9999; top: 30px; right: 30px; background-color: red; color: white; height: 2em; font-size: 1.5em';
		$('body').append('<div id="appendDiv"><button id="markticle_button" style="' + styles + '">Mark me!</button></div>');
	};

	$(document).on('click', '#markticle_button', function() {
		var title = document.title;
		var url = window.location.href;
		chrome.extension.sendMessage({
		   	action : 'add',
		   	data: {
				title: title,
				url: url
			}
		});

		alert('Marked!');
		console.log('marked!');
	});

	createMarkticleButton();
});*/

$(function() {
	$('body').append('<div id="appendDiv" style="position: fixed; z-index: 9999; width: 100%; background-color: #4db6ac; color: white; top: 0; left: 0; padding: 20px"><p>Highlight the Info Then Click On Get Text</p></div>');
	$('#appendDiv').append('<form id="form" style="margin: 10px"><textarea readonly="readonly" id="result" style="display:inline-block; margin: 20px">Text Here</textarea><input type="button" id="sel-text" value="Get Text" style="display: inline-block"></input></form>');
	// $('#form').append('<textarea readonly="readonly" id="result" style="display:inline-block; margin: 20px">Text Here</textarea>');
	$('#form').append('<button id="submitData" value="submit">Submit</button>')
	$('#appendDiv').append('<a style="right: 5px; display: relative;" id="closeIt">X</a>');
	$('#closeIt').click(function() {
		$('#appendDiv').remove();
	});
	$('#sel-text').click(function(){
	  $('#result').text($.selection());
	});
	$('#submitData').click(function() {
		chrome.runtime.sendMessage(document.getElementById('result').textContent);
	})
});

console.log('hello');


/*
(function() {

	// just place a div at top right
	var div = document.createElement('div');
	div.id = 'banner';
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.style.color = 'white';
	div.style.backgroundColor = '#4db6ac';
	div.style.width = '100%';
	div.style.height = '100px';
	div.textContent = 'Highlight the Info or Type it in';
	document.body.appendChild(div);

	var inputForm = document.createElement('form');
	inputForm.style.margin = '10px';
	var inputField = document.createElement('input');
	inputField.style.margin = '10px';
	var btn = document.createElement('button');
	btn.textContent = 'Submit';
	var closeIt = document.createElement('button');
	closeIt.textContent = 'X';
	closeIt.margin = '500px';
	closeIt.style.fontSize = '1em';
	closeIt.style.color = 'white';
	closeIt.id = 'closeIt';
	div.appendChild(inputForm);
	div.appendChild(closeIt);
	inputForm.appendChild(inputField);
	inputForm.appendChild(btn);

	var bigDiv = document.getElementById('banner');

	closeIt.click(function() {

		bigDiv.parent.style.display = 'none';
	})

	alert('inserted self... giggity');

})();*/


chrome.runtime.sendMessage(document.getElementById('result').textContent);