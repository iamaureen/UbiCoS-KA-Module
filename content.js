// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      alert(firstHref);
      console.log(firstHref);





      // This line is new!
     //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    //get the username
    var name = $("._wozql4").text();
    console.log("content.js username :: ", name);
    //send to background.js
    chrome.runtime.sendMessage({"message": "username", "uname": name});
    }
  }
);
