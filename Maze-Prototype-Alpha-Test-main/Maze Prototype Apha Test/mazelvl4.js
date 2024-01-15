const body = document.querySelector('body');
const section = document.createElement('section');
body.appendChild(section);
body.classList.add('body');
let level = 0;
let x;
let y;
let line = [];



let lvl4 = `******************************************
*****S.............*.....................*
***************.**...*********************
*.*************.****.*********************
*....***...****.*.*.....................**
*.**.....*.*....*.**.**************.******
*.**********.****.***.******......*.******
*.**********.**.......******.***.*.......*
*.*******.....*******.******.***.*******.*
*.........***********........**..........*
*********.********************************
*********.********************************
*****..............*.....................*
***************.**...*********************
*.*************.****.*********************
*....***...****.*.T*.....................*
*.**.....*.*....*.**.**************.******
*.**********.****.***.******......*.******
*.**********.**.......******.***.*.......*
*.*******.....*******.******.***.*******.*
*.........***********........**..........*
******************************************`;

const multiline = [
  lvl4
];

function leveling() {
  if (multiline[level] != undefined) {
    const lineArr = multiline[level].split("\n");
    const mazeArray = [];

    for (let i = 0; i <= lineArr.length - 1; i++) {
      const symbol = lineArr[i].split("");
      mazeArray.push(symbol);
    }
    console.log('mazeArray:', mazeArray)

    for (let j = 0; j < mazeArray.length; j++) {
      const lineDiv = document.createElement("div");
      lineDiv.classList.add("lineDiv");
      line[j] = [];
      for (let i = 0; i < mazeArray[j].length; i++) {
        const characterDiv = document.createElement("div");
        characterDiv.innerHTML = mazeArray[j][i];
        console.log('mazeArray:', mazeArray)
        line[j][i] = characterDiv;

        characterDiv.classList.add("tile");
        lineDiv.appendChild(characterDiv);
        if (characterDiv.innerHTML == "*") {
          characterDiv.classList.add("wall");
          characterDiv.innerHTML = "";
        } else if (characterDiv.innerHTML == ".") {
          characterDiv.classList.add("path");
          characterDiv.innerHTML = "";
        } else if (characterDiv.innerHTML == "S") {
          characterDiv.classList.add("start");
          characterDiv.innerHTML = "";
          x = i;
          y = j;
          let user = document.createElement("div");
          user.classList.add("user");
          characterDiv.appendChild(user);
        } else if (characterDiv.innerHTML == "T") {
          characterDiv.classList.add("end");
          characterDiv.innerHTML = "";
        }
      }
      section.appendChild(lineDiv);
    }
  } else {
    body.innerHTML="";
    body.classList.add('welldone');
    const youWonDiv = document.createElement("div");
    youWonDiv.classList.add('youWonDiv')
    const youWon = document.createElement("h1");
   youWon.classList.add('youWon');
   youWon.textContent="You Won !!!"
    const img=document.createElement("div");
    img.classList.add("gif");
    body.appendChild(youWonDiv);
    youWonDiv.appendChild(youWon);
    youWonDiv.appendChild(img);
    }
}

function move(e) {
  const perso = document.querySelector(".user");
  let dest;
  console.log("line", line);
  if (e.code == "ArrowRight") {
    x++;
    dest = line[y][x];
    if (dest.classList.contains("wall")) {
      alert("that's a wall!");
      x--;
      dest = line[y][x];
    }

  } else if (e.code == "ArrowLeft") {
    x--;
    dest = line[y][x];
    if (dest.classList.contains("wall")) {
      alert("that's a wall!");
      x++;
      dest = line[y][x];
    }
  } else if (e.code == "ArrowUp") {
    y--;
    dest = line[y][x];
    if (dest.classList.contains("wall")) {
      alert("that's a wall!");
      y++;
      dest = line[y][x];
    }
  } else if (e.code == "ArrowDown") {
    y++;
    dest = line[y][x];
    console.log("dest", dest);
    if (
      dest.classList.contains("wall")) {
      alert("that's a wall!");
      y--;
      dest = line[y][x];
    }

  }
  dest.appendChild(perso);
  if (dest.classList.contains("end")) {
    alert("Next Level on its way! ");
    x = 0;
    y = 0;
    dest = line[y][x];
    section.innerHTML = "";
    level++;
    sec=0;
    leveling();
  }
}


let timer = document.createElement("div");
timer.classList.add('timer')
let seconds = document.createElement("div");
seconds.classList.add('time');
let minutes = document.createElement("div");
seconds.classList.add('time')
document.body.appendChild(timer);
timer.appendChild(seconds);
timer.appendChild(minutes);

let sec = 0;
const inter = setInterval(function () {
  seconds.innerHTML = "Time spent to finish the level: " + sec++ + " seconds";
}, 1000);

body.addEventListener("keydown", move);

leveling();