var input, database, canvas, title_word, written, writing, to;
var a,p, button, title = false, keya, otherWritten;

function setup() {
  canvas = createCanvas(800,400);
  canvas.parent('canvascontainer');
  database = firebase.database();

  a = createElement("h7");
  a.html("WANNA SHOW ANY OF YOUR WRITING TALENT???");
  a.parent("talent");

  
  button = select("#SUBMIT");
  
  var opo = database.ref("WRITINGS");
  opo.on('value',(data)=>{ 
    writing = data.val();

    if(data.val() !== null && data.val() !== undefined){
      var keys = Object.keys(writing);

      for(var i = 0; i < keys.length; i++){
        key = keys[i];
        to = key;
        var li = createElement("li", '');
        
        var ahref = createA('#', key);
        ahref.mousePressed(()=>{
          var ref = database.ref('WRITINGS/' + key)
          ref.on("value", (data)=>{
            otherWritten = data.val();
          })
        });
        ahref.parent(li);
        
        li.parent("Writings");
      }
    }
  }, 
  (err)=>{
    console.log(err);
  });
}

function draw() {
  background(0);

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
      TITLE: title_word,
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
