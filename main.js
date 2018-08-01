info = {}
string = ""
data = getAnchorData("http://keart.land/#access_token=BQDG85ltn2ws06JPSuKRCxPk6VIfkPu30MXXd3wXmJ6pgTunBMFEvNxCb193hgxXNySq130A8b87hf9FiFbJwixDacsAxwdkpvbLkPCOYQ4CfrOw3fELOeP8jtSM2B-xR6OeHDUtWmQP9BYckqR4Opbjp4KTYFNCDM4&token_type=Bearer&expires_in=3600")//document.location.href)
if(data.length != 0){
  prompt("Spotify API key", data[0].value);
}
colours = ["#49a078","#499ca0","#4970a0","#4d5da0","#7849a0","#a0499c","#a04970","#a04d49","#a07849","#9ca049","#70a049","#49a04d"]
document.body.style.background = colours[0]
fetch("https://api.github.com/users/keartland/repos?sort=%22updated%22").then(r => r.json()).then(function(data){
    for (var i = 0; i < data.length; i++) {
      cur = data[i]
      lang = cur["language"]
      document.getElementById("repos").innerHTML += "<div onclick=\"run(this.id)\" id=\"" + cur["name"] +"\" class=\"row\"><h1 class=\"titles\">" + cur["name"].replace(/-/g," ") + "</h1></div>"
      info[cur["name"]] = { "desc":cur["description"], "url":cur["name"],"isWeb":lang == "JavaScript" || lang == "CSS" || lang == "HTML", "source":cur["html_url"], "download":cur["html_url"] + "/archive/master.zip" }
      string += "window.open('" + info[cur["name"]]["download"] + "');"
		}
    document.getElementById("repos").innerHTML += "<div onclick=\"window.open('https://projecteuler.net/problem='+(Math.floor(Math.random() * 600) + 1))\" class=\"row\"><h1 style=\"color:#eaf1ff\" class=\"titles\">Random Project Euler Question</h1></div>"
    document.getElementById("repos").innerHTML += "<div onclick=\"if(window.confirm(\'Are you sure you want to download?\')){" + string + "} else{console.log(\'Canceled\');}\" class=\"row\"><h1 style=\"color:#eaf1ff\" class=\"titles\">Download all</h1></div>"
})
counter = 0;
function run(id){
  for(i=0;i < Object.keys(info).length;i++){
    if (Object.keys(info)[i] != id){
      toggle(Object.keys(info)[i], false)
    }
  }
  toggle(id, document.getElementById(id).className != "active")
  nextColour(colours)
}
function toggle(id, on){
  ele = document.getElementById(id)
  add = "<h2>" + info[id]["desc"] + "</h2>" + (info[id]["isWeb"] ? "<a href=\"" + info[id]["url"] + "\">GOTO</a><span>   </span>" : "")+ "<a href=\"" + info[id]["source"] + "\">Source</a><span>   </span><a onclick=\"if(window.confirm(\'Are you sure you want to download?\')){window.open('" + info[id]["download"] + "');} else{console.log(\'Canceled\');}\" href=\"#\">Download</a>"
  ele.className = on ? 'active' : 'row';
  ele.innerHTML = on ? ele.innerHTML + add : "<h1 class=\"titles\">" +  info[id]["url"].replace(/-/g," ") + "</h1>";
}
function nextColour(colours){
  if (colours.length != counter) {
    counter++;
  } else {
    counter = 0;
  }
  document.body.style.background = colours[counter];
}

function getAnchorData(url) {
  regexExp = /^.+#([^?]+\=[^?]+)(\?.*){0,1}$/;
  if (!regexExp.test(url)) return [];
  result = regexExp.exec(url)[1];
  data = [];
  result.split('&').forEach(item => {
      item = item.split('=');
      data.push({ key: item[0], value: item[1] });
  });
  return data;
}
