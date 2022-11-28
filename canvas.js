//Initialisation
var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d");
console.log(canvas);
//Declaring variables
var mouse = {
  x: undefined,
  y: undefined,
};
var maxR = 40;
var minR = 2;
var colorArray = ["#292f30", "#a7bcc7", "#ff4e29", "#dbeaf2", "#292f30"];
// console.log(colorArray);

//Event listener
window.addEventListener("mousemove", function (event) {
  console.log(event);
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

//Creating a circle
function Circle(x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;

  this.color = colorArray[Math.ceil(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 2 * Math.PI, false);
    // c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.r > innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.r < maxR) {
        this.r += 1;
      }
    } else if (this.r > minR) {
      this.r -= 1;
    }
    this.draw();
  };
}

// var newCircle = new Circle(200, 200,30,3,3);

var circleArray = [];
console.log(circleArray);

//Animation
function animate() {
  //   console.log("hkjhhhhhhhgghvb")
  //   newCircle.draw();

  //   c.clearRect(0, 0, innerWidth, innerHeight);
  canvas.height = innerHeight;

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  requestAnimationFrame(animate);
}
onload = () => {
  for (var i = 0; i < 3000; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    // var dx = (Math.random() - 0.5) * 3;
    var dx = 4 - Math.random() * 6;
    var dy = 4 - Math.random() * 6;

    // var dy = (Math.random() - 0.5) * 1;
    var r = 10;
    circleArray.push(new Circle(x, y, r, dx, dy));
  }
  animate();
};
