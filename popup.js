// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {

  // ...query for the active tab...
  chrome.tabs.query({active: true,currentWindow: true}, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOMInfo'},function(response){
      //Update the relevant fields with the new data.
      document.getElementById('username').textContent = "Hello " + response.uname;
    });
  });

  let templateBtn = document.getElementById('templateBtn');
  let badgeBtn = document.getElementById('badgeBtn');

  templateBtn.onclick = function(element) {
    alert( "Handler for .click() called, templateBtn" );
    //send to background.js
    chrome.runtime.sendMessage({clicked : true});
  };

  badgeBtn.onclick = function(element) {
      alert( "Handler for .click() called, badgeBtn" );
  };




});
