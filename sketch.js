/*
I know, there's a problem with key variable in the line 72, it doesn't change
I don't know how to solve it
*/

var input, database, canvas, title_word, written, writing, to, keys;
var a,p, button, title = false, keya, otherWritten, ahref;

function setup() {
  canvas = createCanvas(800,400);
  canvas.parent('canvascontainer');
  database = firebase.database();

  a = createElement("h7");
  a.html("WANNA SHOW ANY OF YOUR WRITING TALENT???");
  a.parent("talent");
  button = select("#SUBMIT");
  
  var opo = database.ref("WRITINGS");
  opo.on('value',showWriting, 
  (err)=>{
    console.log(err);
  });
}

function draw() {
  background(0);
  
  console.log(key);
  p = document.getElementById("somethin'");
  button.mousePressed(()=>{
    title = true;
  });
  if(title === true){
    //prompting the user to make them carefully write the most important part of a writing...
    title_word = window.prompt("the title is the most difficult part!! WRITE IT HERE..", "MAKE IT AS CATCHY AS POSSIBLE");
    if(title_word === null){
      title_word = " ";
    }
    if(title !== undefined){
      title = false;
    }   
  }

  written = document.getElementById("description");

  if(title_word !== null && title_word !== undefined && title_word !== " "){
    database.ref("WRITINGS/" + title_word).set ({
      WRITTEN: written.value
      });
  }
  if(otherWritten !== undefined && otherWritten !== null && otherWritten !== " "){
    push();
      textSize(50);
      text(to, 50, 75);
    pop();  
    text(otherWritten.WRITTEN,5,100);
    
    
  }
}
function showWriting(data){ 
    writing = data.val();
      keys = Object.keys(writing);

      for(var i = 0; i < keys.length; i++){
        key = keys[i];
        to = key
        var li = createElement("li", "");
        
        ahref = createA("#" + key, key);
        
        ahref.mousePressed(()=>{
          var ref = database.ref('WRITINGS/' + key);
          ref.on("value", (data)=>{
            otherWritten = data.val();
          });
        });

        ahref.parent(li);
        
        li.parent("Writings");
      }
    }
  
