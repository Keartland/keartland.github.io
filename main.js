info = {}
fetch("https://api.github.com/users/keartland/repos")
.then(r => r.json())
  .then(function(data){
		console.log("loaded")
		console.log(data.length)
    for (var i = 0; i < data.length; i++) {
      cur = data[i]
      lang = cur["language"]
			console.log(cur["name"])
      if(lang =="JavaScript" || lang =="CSS"|| lang =="HTML"){
				if (cur["name"]!="keartland.github.io"){
        	document.getElementById("repos").innerHTML += "<div onclick=\"run(this.id)\" id=\"" + cur["name"] +"\" class=\"row\"><h1 class=\"titles\">" + cur["name"].replace(/-/g," ") + "</h1></div>"
					info[cur["name"]] = {"desc":cur["description"], "url":"https://keartland.github.io/"+cur["name"] }
      	}
    	}
		}
	})

function run(id){
	var ele = document.getElementById(id)
	add = "<h2>" + info[id]["desc"] + "</h2><a href=\"" + info[id]["url"] +"\">GOTO</a>"
	if(ele.className == "row"){
		temp = ele.innerHTML
		ele.setAttribute('class', 'active');
		ele.innerHTML = temp + add
	}else if(ele.className == "active"){
		ele.setAttribute('class', 'row');
		ele.innerHTML = ele.innerHTML.replace(add,"")
	}
}
