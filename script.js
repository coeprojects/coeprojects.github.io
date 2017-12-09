'use strict';

//Returns query parameters from authenticated URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const accessToken = getUrlParameter('access_token')
const scope = getUrlParameter('scope');
// let command;

function input() {
	const commandInput = document.querySelector('.controls__apiCommand input');
	const command = commandInput.value;
	commandInput.value = '';
	getData(command);
}

function buttons(b) {
	const command = b.getAttribute('data-command');
	getData(command);
}


function getData(command) {
	const statusContainer = document.querySelector('#statusContainer');
	const dataContainer = document.querySelector('#dataContainer');
	
	const xhr = new XMLHttpRequest();



	xhr.open('GET', command + '?access_token=' + accessToken + '&account_id=' + scope.slice(8,14), true);
	xhr.onreadystatechange = function() {

		// clears #dataContainer and #statusContainer
		dataContainer.innerHTML = '';
	    statusContainer.innerHTML = 'Status: ';

	    // returns the API data once the server is ready
	    if(xhr.readyState == 4 && xhr.status == 200) {
	    	// converts xhr.responseText to JSON object which we can return in key/value pairs
	    	let jsonData = JSON.parse(xhr.responseText);
	    	// loops over each key in the JSON object and returns the key/value pair as a new p element in #dataContainer
	        for(let i in jsonData) {
	        	const dataEntry = document.createElement('p');
	        	dataEntry.textContent = i + ': ' + jsonData[i];
	        	dataEntry.id = i;
	        	dataContainer.appendChild(dataEntry);
	        } 
	    }

	    // sets #statusContainer to xhr.status
    	statusContainer.textContent = 'Status: ' + xhr.status;
	   
	}

	xhr.send();
	
}