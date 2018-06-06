
var request = new Request('https://api.github.com/zen', {
	headers: new Headers({})
});
links = []
fetch("https://api.github.com/users/keartland/repos")
.then(r => r.json())
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      cur = data[i]
      lang = cur["language"]
      if(lang =="JavaScript" || lang =="CSS"|| lang =="HTML"){
				if (cur["name"]!="keartland.github.io"){
        	document.getElementById("repos").innerHTML += "<div onclick=\"run(event)\" class=\"row\"><h1>" + cur["name"].replace(/-/g," ") + "</h1></div>"
					links.push("https://keartland.github.io/"+cur["name"])
      	}
    	}
		}
	})
function run(event){
	mouseY = event.clientY - 70;
	window.location = links[Math.floor(mouseY/90)];
	console.log(links[Math.floor(mouseY/90)])
}
