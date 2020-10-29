
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


    if (request.username !== undefined) {
            console.log(request.username);

        }

  }
);


window.addEventListener ("load", myMain, false);

function myMain (evt) {
  //detects textarea out of focus event
  setTimeout(function(){
    var username = $("._wozql4").text();
    console.log("timer function set,", username);
    //alert('Hello, we are excited to be here with you, ', username);

    var pageTitle = document.title;
    console.log(pageTitle);
    var pageURL = location.href;

    var comment_target_id = '';
    var comment = '';

    $(document).on("blur", "textarea", function(e){
      //console.log (e);
      console.log('user selected textarea :: ', e.target.id);
      comment_target_id = e.target.id;
      comment = $('textarea#'+e.target.id).val();

      //we will attach our element with this node; so adjust depending on
      //where we want to place the badge
      parentNode = e.target.parentNode.parentNode;
      if(!comment.trim()) {
        //comment is empty; do nothing
      }else{
        //comment is not empty
        //make the database call and save the students' response;
        console.log('User input is not empty, Currently logged in :: ', username);
        //make an ajax call to get students info loading (if needed);

        //the following ajax call saves user input to the database
        $.ajax({
            url: 'https://hcilabasu.pythonanywhere.com/saveKApost',
            //url: 'http://127.0.0.1:8000/saveKApost',
            type: 'POST',
            async: false,
            data: {'username': username, //TODO: 1) split, take the first part, lowercase
            'pageURL' : pageURL,
            'textareaId' : comment_target_id,
            'content' : comment },
            success: function (data) {
                console.log(data +', '+ username);
            }

          });//end of the first ajax call

          //this ajax call will check for keyword and assign badges as necessary
          $.ajax({
              url: 'https://hcilabasu.pythonanywhere.com/matchKeywords',
              //url: 'http://127.0.0.1:8000/matchKeywords',
              type: 'POST',
              async: false,
              data: {'username': username, 'message': comment, 'platform': 'KA', 'ka_url': pageURL},
              success: function (data) {

                //get all the data from the server
                console.log(data, username);
                console.log(data.isMatch);
                console.log(data.praiseText);
                console.log(data.selected_badge);

                if(data.isMatch){ //if the user message matches keyword

                    //attach the element with the node above (parentNode)
                    //remove any previously added div tags here
                    document.querySelectorAll('.dynamic-divTag').forEach(function(elem){
                      elem.remove();
                    });
                    //attach the new element
                    //1. create the new element div
                    var dynamic_div = document.createElement('div');
                    dynamic_div.className = "dynamic-divTag"; //add the class name for div
                    //2. create an image tag (that will hold the badge)
                    var image = document.createElement("img");
                    //todo: set the image name dynamically based on the badge
                    image.src = chrome.runtime.getURL("images/"+data.selected_badge+".png");
                    image.className = "dynamic-img"; //add the class name for image
                    dynamic_div.appendChild(image);
                    //3. create a p tag for the praise
                    var ptag = document.createElement("p");
                    ptag.innerHTML = data.praiseText; //set this from the server
                    ptag.className = "dynamic-pTag";
                    dynamic_div.appendChild(ptag);
                    //3a. create a p tag with the badge name
                    var pbadge = document.createElement("p");
                    pbadge.innerHTML = 'You earned the ' +data.selected_badge+ ' badge!'; //set this from the server
                    pbadge.className = "dynamic-pbadge";
                    dynamic_div.appendChild(pbadge);
                    //3b. create a p tag for instruction
                    var pins = document.createElement("p");
                    pins.innerHTML = 'You can go to Modelbook and try another badge!'
                    pins.className = "dynamic-pins";
                    dynamic_div.appendChild(pins);
                    //4. add the div into the desired element of the DOM
                    parentNode.appendChild(dynamic_div);

                } // end of the if statement

              }

            });//end of the second jax call

      }//end of if comment is empty or not



    });//end of the text blur on focus call

    //the comment button capture did not work
    //inactive comment button class _1a9oxwpk
    //active comment button class _h6mih68

  }, 10000);//end of the timer method, after 10 sec
}
