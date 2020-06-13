



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
    this.setup = true;
    this.setupVelocity = 0.005;
    this.twoPi = 6.29;

    this.minRadius = 50;
    this.maxRadius = 150;
    this.radius = randomInt(this.minRadius, this.maxRadius);

    this.maxTravalRadius = canvas.height <= canvas.width ? canvas.height - (2 * this.yOffSet) : canvas.width - (2 * this.xOffSet);
    this.travalRadius = randomInt(10, 1500);
    this.xOffSet = canvas.width / 2;
    this.yOffSet = canvas.height / 2;

    this.angle = Math.random() * (this.twoPi);
    this.x = Math.cos(this.angle) * this.travalRadius + this.xOffSet;
    this.y = Math.sin(this.angle) * this.travalRadius + this.yOffSet;
    this.velocity = randomInt(1, 5) * 0.005 /* (Math.random() > 0.5 ? 1 : -1)*/ / this.travalRadius * 150;

    this.minRed = 100;
    this.maxRed = 255;
    this.red = randomInt(this.minRed, this.maxRed);

    this.minGreen = 1;
    this.maxGreen = 30;
    this.green = randomInt(this.minGreen, this.maxGreen);

    this.minBlue = 150;
    this.maxBlue = 255;
    this.blue = randomInt(this.minBlue, this.maxBlue);

    this.dRed = 10 * this.velocity * (Math.random > 0.5 ? 1 : -1);
    this.dBlue = 10 * this.velocity *  (Math.random > 0.5 ? 1 : -1);
    this.dGreen = 10 * this.velocity *  (Math.random > 0.5 ? 1 : -1);
    this.color = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';

    this.draw = () => 
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, this.twoPi, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
    }

    this.update = () =>
    {

        this.angle += (this.setup ? this.setupVelocity : this.velocity);
        this.x = Math.cos(this.angle) * this.travalRadius + this.xOffSet;
        this.y = Math.sin(this.angle) * this.travalRadius + this.yOffSet;

        this.dRed = this.red <= this.minRed ? -this.dRed : this.dRed;
        this.dRed = this.red >= this.maxRed ? -this.dRed : this.dRed;

        this.dGreen = this.green <= this.minGreen ? -this.dGreen : this.dGreen;
        this.dGreen = this.green >= this.maxGreen ? -this.dGreen : this.dGreen;

        this.dBlue = this.blue <= this.minBlue ? -this.dBlue : this.dBlue;
        this.dBlue = this.blue >= this.maxBlue ? -this.dBlue : this.dBlue;

        this.red += this.dRed;
        this.blue += this.dBlue;
        this.green += this.dGreen;
        this.color = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';

        this.draw();
    }
}

var numberOfCircles = 20;
var circleArray = [];
for(i = 0; i <= numberOfCircles; i++) { circleArray.push(new Circle()); }    

var begin = setInterval( () => 
{
    document.querySelector('body').hidden = true;
    canvas.hidden = true;
    var i = 0;
    while(i < 1000)
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
    //context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    //context.fillRect(0, 0, innerWidth, innerHeight);
    //circleArray.forEach(entry => entry.update());
    for(i = 0; i < circleArray.length; i++)
        circleArray[i].update();
}, 
30);