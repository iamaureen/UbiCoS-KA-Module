
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

setTimeout(function(){
  console.log("inside set time out from content.js")
  $("textarea").on('focusout',function(e) {
      // capture user response entered in a textbox
      console.log($("textarea#"+e.target.id).val()) //TODO: handle duplication - each focusout duplicates the message.
      console.log($(e.target).closest('li').parent().closest('li')[0].innerText) //original post //subject to change with DOM change
      //alert($("textarea#"+e.target.id))
  });

}, 5000);
