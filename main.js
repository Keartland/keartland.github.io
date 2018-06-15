info = {}
string = ""
fetch("https://api.github.com/users/keartland/repos?sort=%22updated%22").then(r => r.json()).then(function(data){
    for (var i = 0; i < data.length; i++) {
      cur = data[i]
      lang = cur["language"]
      if(lang =="JavaScript" || lang =="CSS"|| lang =="HTML"){
        document.getElementById("repos").innerHTML += "<div onclick=\"run(this.id)\" id=\"" + cur["name"] +"\" class=\"row\"><h1 class=\"titles\">" + cur["name"].replace(/-/g," ") + "</h1></div>"
        info[cur["name"]] = {"desc":cur["description"], "url":cur["name"], "source":cur["html_url"], "download":cur["html_url"] + "/archive/master.zip" }
        console.log(cur)
        string += "window.open('" + info[cur["name"]]["download"] + "');"
    	}
		}
    document.getElementById("repos").innerHTML += "<div onclick=\"" + string + "\" class=\"row\"><h1 style=\"color:#eaf1ff\" class=\"titles\">Download all</h1></div>"
	})

function run(id){
	var ele = document.getElementById(id)
	add = "<h2>" + info[id]["desc"] + "</h2><a href=\"" + info[id]["url"] +"\">GOTO</a><span>   </span><a href=\"" + info[id]["source"] +"\">Source</a><span>   </span><a href=\"" + info[id]["download"] +"\">Download</a>"
	if(ele.className == "row"){
		temp = ele.innerHTML
		ele.setAttribute('class', 'active');
		ele.innerHTML = temp + add
	}else if(ele.className == "active"){
		ele.setAttribute('class', 'row');
		ele.innerHTML = ele.innerHTML.replace(add,"")
	}
}
