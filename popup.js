'use strict';

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {

  // ...query for the active tab...
  chrome.tabs.query({active: true,currentWindow: true}, tabs => {
    // ...and send a request for the username to content.js
    chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOMInfo'},function(response){
      //Update the relevant fields with the new data.
      document.getElementById('username').textContent = "Hello " + response.uname;
    });
  });


  document.getElementById("submitBtn").addEventListener("click", function() {
    //get the user name from the input field
    var user_name_popup = document.getElementById('user_name').value;
    console.log('open in the inspect', user_name_popup);

      chrome.tabs.query({
          active: true,
          currentWindow: true
      }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              username: user_name_popup
          });
      });
  });




});
