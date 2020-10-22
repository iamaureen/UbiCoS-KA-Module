
// content.js
var username;
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
      username = $("._wozql4").text();
      var domInfo = {
        uname: username,
      };
      // Directly respond to the sender (popup) through the specified callback.
      sendResponse(domInfo);
    }
  }
);




//detects textarea out of focus event
setTimeout(function(){
  console.log("timer function set");
  //console.log(location.href);
  var pageTitle = document.title;
  var comment_target_id = '';
  var comment = '';
  $(document).on("blur", "textarea", function(e){
    //console.log (e);
    console.log(e.target.id);
    comment_target_id = e.target.id;
    comment = $('textarea#'+e.target.id).val();
    //make the database call here;

    $.ajax({
        url: 'http://127.0.0.1:8000/saveKApost',
        type: 'POST',
        async: false,
        data: {'username': "ant", //TODO: 1) split, take the first part, lowercase
        'pagetitle' : pageTitle,
        'textareaId' : comment_target_id,
        'content' : comment },
        success: function (data) {

        }
    });

  });
  //the comment button capture did not work
  //inactive comment button class _1a9oxwpk
  //active comment button class _h6mih68

}, 5000);
