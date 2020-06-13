



var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');


var randomInt = (min, max) => 
{
    var randomPositiv = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if(min > max || Math.floor(min) != min || Math.floor(max) != max || Number.isNaN(parseInt(min)) || Number.isNaN(parseInt(max)))
    return NaN;
    else if(min >= 0 && max > 0) return randomPositiv(min, max);
    else if(min <= 0 && max < 0) return randomPositiv(max * -1, min * -1) * -1;
    else if(min < 0 && max > 0) return randomPositiv(0, max + min) - min;   
}

function resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
addEventListener("resize", resize);

function Circle()
{
    this.x = randomInt(0, innerWidth);
    this.y = randomInt(0, innerHeight);
    this.minVelocity = 5;
    this.maxVelocity = 10;
    this.dx = randomInt(this.minVelocity, this.maxVelocity) * (Math.random() > 0.5 ? 1 : -1) * 0.2;
    this.dy = randomInt(this.minVelocity, this.maxVelocity) * (Math.random() > 0.5 ? 1 : -1) * 0.2;

    this.minRadius = 60;
    this.maxRadius = 120;
    this.radius = randomInt(this.minRadius, this.maxRadius);
    this.dRadius = Math.random() * 0.5 + 0.01;

    this.minRed = 100;
    this.maxRed = 200; // standart 255
    this.red = randomInt(this.minRed, this.maxRed);

    this.minGreen = 1;
    this.maxGreen = 30;
    this.green = randomInt(this.minGreen, this.maxGreen);

    this.minBlue = 150;
    this.maxBlue = 255;
    this.blue = randomInt(this.minBlue, this.maxBlue);

    this.dRed = Math.random() * (Math.random > 0.5 ? 1 : -1);
    this.dBlue = Math.random() * (Math.random > 0.5 ? 1 : -1);
    this.dGreen = Math.random() * (Math.random > 0.5 ? 1 : -1);
    this.color = `rgba( ${this.red} , ${this.green} , ${this.blue} , 1)`;


    this.draw = () =>
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
    }


    this.update = () =>
    {
        
        // checking position values

        if(this.x + this.radius >= innerWidth + this.maxRadius || this.x < 0)
        { this.dx = -this.dx; }

        if(this.y + this.radius >= innerHeight + this.maxRadius || this.y < 0)
        { this.dy = -this.dy; }
        
        if(this.radius <= this.minRadius || this.radius >= this.maxRadius)
        { this.dRadius = -this.dRadius; }

        // checking color values

        this.dRed = this.red <= this.minRed ? -this.dRed : this.dRed;
        this.dRed = this.red >= this.maxRed ? -this.dRed : this.dRed;

        this.dGreen = this.green <= this.minGreen ? -this.dGreen : this.dGreen;
        this.dGreen = this.green >= this.maxGreen ? -this.dGreen : this.dGreen;

        this.dBlue = this.blue <= this.minBlue ? -this.dBlue : this.dBlue;
        this.dBlue = this.blue >= this.maxBlue ? -this.dBlue : this.dBlue;

        // updating values

        this.x += this.dx;
        this.y += this.dy;
        //this.radius += (this.x <= innerWidth - this.radius || this.y <= innerHeight - this.radius) ? 0 : this.dRadius;

        this.red += this.dRed;
        this.blue += this.dBlue;
        this.green += this.dGreen;
        this.color = `rgba( ${this.red} , ${this.green} , ${this.blue} , 1)`;

        this.draw();
    }
}




var numberOfCircles = 60;
var circleArray = [];
for(i = 1; i <= numberOfCircles; i++) { circleArray.push(new Circle()); }   

var begin = setInterval( () => 
{
    document.querySelector('body').hidden = true;
    canvas.hidden = true;
    var i = 0;
    while(i < 500)
    {
    //circleArray.forEach(entry => entry.update());
    for(j = 0; j < circleArray.length; j++)
        {circleArray[j].update();}
    i++;
    }
    //circleArray.forEach(entry => entry.setup = false);
    for(k = 0; k < circleArray.length; k++)
        {circleArray[k].setup = false;}
    canvas.hidden = false;
    document.querySelector('body').hidden = false;
    clearInterval(begin);
}, 
30);


setInterval( () => 
{
    context.fillStyle = 'rgba(68, 69, 82, 0.03)';
    context.fillRect(0, 0, innerWidth, innerHeight);
    for(i = 0; i < circleArray.length; i++)
        circleArray[i].update();
}, 
30);


















