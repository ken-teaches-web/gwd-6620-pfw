var points = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(10, 20, 30);
    angleMode(DEGREES);
    noiseDetail(2, 1);

    var density = 50;
    //var density = random(50, 150);
    var gap = width / density;

    //create starting points
    for (var x = 0; x < width; x += gap) {
        for (var y = 0; y < innerHeight; y += gap) {
            // use random variation to make the grid less obvious
            var p = createVector(x + random(-10, 10), y + random(-10, 10));
            points.push(p);
        }
    }

    // to randomize which lines are drawn on the grid (that are drawn one-by-one), shuffle the point array
    shuffle(points, true);
    // use with noise method to control rate of lines
    rate = 0.1;
    //rate = random(0.005, 0.01); 
}

function draw() {
    noStroke();
    //fill(255);

    // to draw the lines one at a time, set a "max" (or *n at a time)
    if(frameCount * 5 <= points.length) {
        var max = frameCount * 5;
    } else {
        var max = points.length;
    }

    for(var i = 0; i < max; i++) {
        var r = map(points[i].x, 0, width, 50, 255);
        var g = map(points[i].y, 0, height, 50, 255);
        var b = map(points[i].x, 0, width, 255, 50);
        fill(r, g, b);

        // angle that each point will move
        var angle = map(noise(points[i].x * rate, points[i].y * rate), 0, 1, 0, 560);
        // add vector to each point based on angle
        points[i].add(createVector(cos(angle), sin(angle)));

        // draw a point at each part of the grid
        ellipse(points[i].x, points[i].y, 2);
    }
}