var type = "";

function aClick(string) {

    type = string;
    let baseHTML = String(responseHTML());
    document.getElementById("target").innerHTML = baseHTML;


    var str = "";
    if (string === "dad") {
        const url = "https://icanhazdadjoke.com/";
        fetch(url, {
            headers: { 'Accept': 'application/json'}
        }).then(function(response) { return response.json();})
        .then(function(json) {
            str += `<p class='joke'>${json.joke}</p>`;
            document.getElementById("body").innerHTML = str;
            document.getElementById("author").innerHTML = `<p>~Some Dad</p>`;
        })
    }
    else if (string === "misc") {
        const url = "https://official-joke-api.appspot.com/jokes/general/random";
        fetch(url).then(function(response) { return response.json();})
        .then(function(json) {
            json = json[0];
            str += `<p class='joke setup'>Q: ${json.setup}</p>`;
            str += `<p class='joke punch'>A: ${json.punchline}</p>`;
            document.getElementById("body").innerHTML = str;
        })
    }
    else if (string === "programming") {
        const url = "https://official-joke-api.appspot.com/jokes/programming/random";
        fetch(url).then(function(response) { return response.json();})
        .then(function(json) {
            json = json[0];
            str += `<p class='joke setup'>Q: ${json.setup}</p>`;
            str += `<p class='joke punch'>A: ${json.punchline}</p>`;
            document.getElementById("body").innerHTML = str;
            document.getElementById("author").innerHTML = ``;
        })
    }
    else if (string === "trivia") {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            myObj = myObj.results[0]
            let category = correctCategory(myObj.category);
            str += `<p class='info'><strong>Category:</strong> ${category} </p>`;
            str += `<p class='info'><strong>Difficulty:</strong> ${myObj.difficulty} </p>`;
            str += `<p class='question'><strong>Question:</strong> ${myObj.question} </p>`;
            str += generateAnswerBank(myObj.correct_answer, myObj.incorrect_answers)
            str += `<p class='answer noSelect' style='color: #00008B; cursor: pointer;' id='answer' onclick='addAnswer(myObj.correct_answer)'><strong><u>Answer</u>:</strong> </p>`;
            document.getElementById("body").innerHTML = str;
          }
        };
        xmlhttp.open("GET", "https://opentdb.com/api.php?amount=1", true);
        xmlhttp.send();
    }
    else if (string === "kanye") {
        const url = "https://api.kanye.rest/";
        fetch(url).then(function(response) { return response.json();})
        .then(function(json) {
            str += `<p class='quote'>${json.quote}</p>`;
            document.getElementById("body").innerHTML = str;
            document.getElementById("author").innerHTML = `<p>~Kanye West</p>`;
        })
    }
    else if (string === "inspirational") {
        const url = "https://api.quotable.io/random";
        fetch(url).then(function(response) { return response.json();})
        .then(function(json) {
            str += `<p class='quote'>${json.content}</p>`;
            document.getElementById("body").innerHTML = str;
            document.getElementById("author").innerHTML = `<p>~${json.author}</p>`;
        })
    }
    else if (string === "swift") {
        const url = "https://api.taylor.rest/";
        fetch(url).then(function(response) { return response.json();})
        .then(function(json) {
            str += `<p class='quote'>${json.quote}</p>`;
            document.getElementById("body").innerHTML = str;
            document.getElementById("author").innerHTML = `<p>~Taylor Swift</p>`;
        })
    }
    else if (string === "trump") {
        const url = "https://api.tronalddump.io/random/quote";
        fetch(url).then(function(response) { return response.json();})
        .then(function(json) {
            str += `<p class='quote'>${json.value}</p>`;
            str += `<p class='info' style='margin-left: 8px;'><strong>Date: </strong>${correctDate(json.appeared_at)}</p>`;
            str += `<p class='info' style='margin-left: 8px;'><strong>Tag: </strong>${correctDate(json.tags[0])}</p>`;
            document.getElementById("body").innerHTML = str;
            document.getElementById("author").innerHTML = `<p>~Donald Trump</p>`;
        })
    }

    
}

function reload(input) {
    aClick(input);
}

function generateAnswerBank(correctAnswer, incorrectAnswers) {
    let str = "<p><strong>Options:</strong></p>";
    str += "<ul class='wordBank'>";
    let options = [];
    options.push(correctAnswer);
    for (let i = 0; i < incorrectAnswers.length; i++) {
        options.push(incorrectAnswers[i]);
    }
    options = shuffle(options);
    for (let i = 0; i < options.length; i++) {
        str += `<li>${options[i]}</li>`;
    }
    str += "</ul>";
    return str;
}

function addAnswer(object) {
    document.getElementById("answer").style.color = "black";
    document.getElementById("answer").style.cursor = "default";
    document.getElementById("answer").innerHTML = "<strong>Answer:</strong> " + object;
}

function addAnswerJ(object) {
    document.getElementById("answerJ").style.color = "black";
    document.getElementById("answerJ").style.cursor = "default";
    document.getElementById("answerJ").innerHTML = "<strong>Answer:</strong> " + object;
}

function correctDate(str) {
    return str.substr(0,10);
}

function responseHTML() {
    return `
    <div class='response-box'>
        <div class="response">
            <div class='body' id='body'>
            </div>
            <div class='info'>
            </div>
            <div class='author' id='author'>
            </div>
        </div>
        <div><h2 class="another noSelect" onclick='reload(type)'>Another?</h2></div>
    </div>
    `;
}

function correctCategory(object) {
    var str = String(object);
    str = str.replace(": ", " - ");
    return str;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }