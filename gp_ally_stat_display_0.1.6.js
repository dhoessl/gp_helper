/* This Script is providing some functions to print out inactive players of your alliance */
function buildCustomWindow(custom_data){
  // Create Base Div
  var content = document.createElement("div");
  // Add correct style and class
  content.classList.add("gpwindow_content");
  content.style['overflow-y'] = "hidden";
  // Game inner Box and style
  var inner_box = document.createElement("div");
  inner_box.classList.add("game_inner_box");

  // Add inactive Players to output divs
  for(state in custom_data){
    // Base Element and Header
    var state_element = document.createElement("div");
    var state_image = document.createElement("img");
    state_image.classList.add(state);
    state_image.setAttribute(
      "src",
      "/images/game/ally/indicators/" + state.split("_")[2] + ".png"
    );
    var state_name = document.createElement("strong");
    state_name.textContent = state.split("_")[2];
    // Add Header to Base Element
    state_element.append(state_image);
    state_element.append(state_name);
    var player_par = document.createElement("p");
    // Add Users to the specific state
    for(var user=0; user < custom_data[state].length; user++){
      var user_element = document.createElement("a");
      user_element.setAttribute("href", custom_data[state][user]["link"]);
      user_element.classList.add("bbcodes", "bbcodes_player");
      user_element.textContent = custom_data[state][user]['name'];
      state_element.append(user_element);
      var break_element = document.createElement("br");
      state_element.append(break_element);
    }
    // Add state base element to box element
    inner_box.append(state_element);
  }
  content.append(inner_box);
  /* Build Panel with use of Grepo tools */
  UnitStatPanel = Layout.wnd.Create(
    GPWindowMgr.TYPE_DIALOG, 'Ally Stats',
    {
        width: 660,
        height: 490,
        minimizable: false
    }
  );
  /* set the previously build content into the window */
  UnitStatPanel.setContent(content.outerHTML);
}

function checkAllyMember(){
  // Open Alliance Window and safe window in pub
  // Since there is no factory for this window this is the way to do it
  wnd = null
  if(!isAllyWindowOpen()){
    wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_ALLIANCE);
    $.Observer(GameEvents.menu.click).publish({option_id : "alliance"});
  }

  // Check if Window fully open and click Member Tab
  var cinterval = setInterval(() => {
    if(document.getElementById("alliance-members_show")){
      document.getElementById("alliance-members_show").click();
      clearInterval(cinterval);
    }
  }, 100);

  // Check if Sub Window is fully Open
  var nameinterval = setInterval(() => {
    if(document.getElementsByClassName("ally_name").length >= 1){
      // cl(nameinterval);
      var elements = document.getElementsByClassName("ally_name");
      var inactives = {};
      for(var user=1; user < elements.length; user++){
        // Collecte State and every user
        var name = elements[user].children[0].textContent.replaceAll(" ", "").replace('\n',"");
        var state = elements[user].children[0].children[0].getAttribute("class");
        var link = elements[user].childNodes[1].getAttribute("href");
        // Check if a user is marked as inactive
        if(state != "idle_status_green" && state != "idle_status_online"){
          // Create list if not exist
          if(!(state in inactives)){ inactives[state] = []; }
          // add user to state list
          var player = {"name": name, "link": link}
          inactives[state].push(player);
        }
      }
      // close ally window if it was opened by the script
      if(wnd){ wnd.close(); wnd = null; }
      // If there are any inactive marked players open a new window and display the informations
      if(!(jQuery.isEmptyObject(inactives))){
        buildCustomWindow(inactives);
      }
  }}, 100);
}

function isAllyWindowOpen(){
  GPWindowMgr.getAllOpen().forEach(
    function(wndobj){
      if('Alliance' == wndobj.getTitle().split(" ")[0]){
        return True;
      }
    }
  );
  return false;
}

function perodicallyCheckAllyMember(){
  // Check if window is still open
  var check_interval = setInterval(() => {
    GPWindowMgr.getAllOpen().forEach(
      function(wndobj){
        if('Ally Stats' == wndobj.getTitle()){
          wndobj.close();
        }
      }
    );
  }, 3600);
  checkAllyMember();
}
