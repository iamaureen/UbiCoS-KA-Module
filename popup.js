// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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

  // let templateBtn = document.getElementById('templateBtn');
  let badgeBtn = document.getElementById('badgeBtn');

  // templateBtn.onclick = function(element) {
  //   alert( "Handler for .click() called, templateBtn" );
  //   //step 1: send to background.js
  //   chrome.runtime.sendMessage({clicked : true});
  // };

  badgeBtn.onclick = function(element) {
      //alert( "Handler for .click() called, badgeBtn" );
      //display the div with badge options
      $(".div-badge-options").css("display", "");
      $(".div-badge-prompt").css("display", "none");

      //Make an ajax call here and get the value the student just posted
      // $.ajax({
      //       type: "GET",
      //       url: "https://www.khanacademy.org/api/internal/discussions/kaencrypted_b4ba0c8e540911b420592ad0e8c83d4f_44abda91a89ee38abaf33dfbd294ad7a0f9f7c9b8b67bb6872288fd3e84b89a01f538174acdf203ca5abde8fd7e8f50f7ee501d236736ab85cc96e31c9dfc4f5f9172fa696703669728bf4357ab892aa44f71efa15818a04e23997dd20f9bb34e72740e4afe5c256e9a7a2316a29dd09a397ed1ff4a28cbe76ea6f425c7d3d34/replies?casing=camel&lang=en&_=200316-1111-697e67c8399e_1584404407215", //TODO: make this link dynamic.
      //       success: function(msg){
      //           var data = JSON.stringify(msg);
      //           alert(data);
      //         }
      //    });

         $.ajax({
               type: "GET",
               url: "http://127.0.0.1:8000/getUserList", //TODO: make this link dynamic.
               success: function(msg){
                   //var data = JSON.stringify(msg);
                   //alert(data);

                 }
            });
  };

  $('.div-badge-options a').off().on('click', function(e){

        console.log($(e.target).parents('a').attr('id'));
        $(".div-badge-options").css("display", "none");
        $(".div-badge-prompt").css("display", "");

        //alert("clicked");

    });


});
