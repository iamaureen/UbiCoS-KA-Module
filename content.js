
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

    //we will attach our element with this node; so adjust depending on
    //where we want to place the badge
    parentNode = e.target.parentNode.parentNode;
    if(!comment.trim()) {
      //comment is empty; do nothing
    }else{
      //comment is not empty
      //make the database call here;
      $.ajax({
          //url: 'https://hcilabasu.pythonanywhere.com/saveKApost',
          url: 'http://127.0.0.1:8000/saveKApost',
          type: 'POST',
          //async: false,
          data: {'username': "ant", //TODO: 1) split, take the first part, lowercase
          'pagetitle' : pageTitle,
          'textareaId' : comment_target_id,
          'content' : comment },
          success: function (data) {

            //TODO: run the algorithm for badges
            //attach the element with the node above (parentNode)
            //remove any previously added div tags here
            document.querySelectorAll('.dynamic-divTag').forEach(function(elem){
              elem.remove;
            });
            //attach the new element
            //1. create the new element div
            var dynamic_div = document.createElement('div');
            dynamic_div.className = "dynamic-divTag"; //add the class name for div
            //2. create an image tag (that will hold the badge)
            var image = document.createElement("img");
            //todo: set the image name dynamically based on the badge
            image.src = chrome.runtime.getURL("images/blank.png");
            image.className = "dynamic-img"; //add the class name for image
            dynamic_div.appendChild(image);
            //3. create a p tag
            var ptag = document.createElement("p");
            //todo: set the success message dynamically
            ptag.innerHTML = 'successfully insterted into the database';
            ptag.className = "dynamic-pTag";
            dynamic_div.appendChild(ptag);
            //4. add the div into the desired element of the DOM
            parentNode.appendChild(dynamic_div);

          }

        });//end of the ajax call

    }//end of if comment is empty or not



  });//end of the text blur on focus call

  //the comment button capture did not work
  //inactive comment button class _1a9oxwpk
  //active comment button class _h6mih68

}, 5000);//end of the timer method
