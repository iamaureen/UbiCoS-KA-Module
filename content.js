
// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //step 4: coming from background.js
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      alert(firstHref);
      console.log(firstHref);

      // This line is new!
     //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    //get the username
    // var name = $("._wozql4").text();
    // //send to background.js
    // chrome.runtime.sendMessage({"message": "username", "uname": name});
    }

    // First, validate the message's structure.
    if ((request.from === 'popup') && (request.subject === 'DOMInfo')) {
      var name = $("._wozql4").text();
      var domInfo = {
        uname: name,
      };
      // Directly respond to the sender (popup) through the specified callback.
      sendResponse(domInfo);
    }
  }
);




//detects textarea out of focus event
setTimeout(function(){
  console.log("timer function set");
  $(document).on("blur", "textarea", function(e){
    console.log (e);
    console.log(e.target.id);
    console.log($('textarea#'+e.target.id).val());
  });
  //TODO send this to database
  //trim first, check if it is not empty, then send to the database

  //inactive comment button class _1a9oxwpk
  //active comment button class _h6mih68



}, 5000);
