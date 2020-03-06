// background.js

// Called when the user clicks on the browser action.
// When you have a popup set, chrome.browserAction.onClicked is not fired.
// chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   var activeTab = tabs[0];
  //   chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  // });
// });

// message.clicked comes from popup.js
chrome.runtime.onMessage.addListener( function (message, sender, sendResponse) {
  if (message.clicked) {
    /* Do the usual onClicked stuff */
    //alert("i am here in background")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  }
});

//This block is new!
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );

//get username value from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //if( request.message === "message" ) {
    if( request.message === "username" ){
      console.log("from background.js", request.uname)
      //alert("username is :: ", request.name);
    }
  }
);
