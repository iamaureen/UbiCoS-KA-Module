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
      //Make an ajax call here and get the value the student just posted 
      $.ajax({
            type: "GET",
            url: "https://www.khanacademy.org/api/internal/discussions/kaencrypted_9e927e4966cb78d066c25aac91f4f17d_6d6d33ad8e7b0e6ce003b843cabc234612f12d28b821d423446e7f25c7e5534db7af16cef8e05c92deea3c4ade2460aec755349e83cb8e415cb8522060f731f214d7dfff9b327b35437726f485a7148f965e0337c0f0a93d742af689686562e4ca20e26bf8aeacd6b9c82a957b29607e4a10985c7c79fabe51b10ed9ab63affb45a8f155808c0ac0e0d77fec42f113845a4ba8cfb3d44977082c787204987b9972a1bbd3c2fe1155afc7587e5178ff93ff11814919d4d6a5e794b0131dd4cec1/replies?casing=camel&lang=en&_=200313-1726-558d158b953b_1584165702655", //TODO: make this link dynamic.
            success: function(msg){
                var data = JSON.stringify(msg);
                alert(data);
              }
         });
  };




});
