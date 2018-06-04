
var request = new Request('https://api.github.com/zen', {
	headers: new Headers({})
});

fetch("https://api.github.com/users/keartland/repos").then(r => r.json())
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      cur = data[i]
      lang = cur["language"]
      if(lang =="JavaScript" && cur["name"]!="keartland.github.io"){
        console.log("added: https://keartland.github.io/"+cur["name"])
        document.getElementById("repos").innerHTML += "<li><a href=\""+"https://keartland.github.io/"+cur["name"]+"\">" + cur["name"].replace(/-/g," ") + "</a></li>"
      }
    }
  })
