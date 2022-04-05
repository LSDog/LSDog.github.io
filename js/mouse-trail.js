const app = new PIXI.Application({
    backgroundColor: 0x000000,
    width: document.body.clientWidth,
    height: innerHeight - 20
});
document.body.appendChild(app.view);


const trailTexture = PIXI.Texture.from('../img/trail.png'); // texture
const historyX = [];
const historyY = [];
const historySize = 20; // long
const ropeSize = 250; // smooth
const points = [];

var x = 0;
var y = 0;

// history array.
for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
}
// rope points.
for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
}

// Create rope
const rope = new PIXI.SimpleRope(trailTexture, points);

// blendmode
rope.blendmode = PIXI.BLEND_MODES.ADD;

app.stage.addChild(rope);


var drawLock = false;

document.addEventListener("mousemove", ((event) => {
    x = event.clientX;
    y = event.clientY;
}));

document.addEventListener("touchmove", ((event) => {
    touch = event.touches[0];
    x = touch.clientX;
    y = touch.clientY;
}))

// touch/mouse start -> set history point to now
document.addEventListener("mouseenter", ((event) => {
    drawLock = true;
    var tx = event.clientX;
    var ty = event.clientY;
    for (let i = 0; i < historySize; i++) {
        historyX.pop();
        historyY.pop();
        historyX.unshift(tx);
        historyY.unshift(ty);
    }
    for (let i = 0; i < ropeSize; i++) {
        points.shift();
        points.push(new PIXI.Point(tx, ty));
    }
    x = tx;
    y = ty;
    drawLock = false;
}));

document.addEventListener("touchstart", ((event) => {
    drawLock = true;
    touch = event.touches[0];
    var tx = touch.clientX;
    var ty = touch.clientY;
    for (let i = 0; i < historySize; i++) {
        historyX.pop();
        historyY.pop();
        historyX.unshift(tx);
        historyY.unshift(ty);
    }
    for (let i = 0; i < ropeSize; i++) {
        points.shift();
        points.push(new PIXI.Point(tx, ty));
    }
    x = tx;
    y = ty;
    drawLock = false;
}));

document.addEventListener("touchend", ((event) => {
    document.getElementById("test").innerText = (parseInt(rope._geometry.points[0].x) + "," + parseInt(rope._geometry.points[0].y));
}));


// animate update
app.ticker.add(() => {
    // Update the pos values to history
    historyX.pop();
    historyY.pop();
    if (!drawLock) {
        historyX.unshift(x);
        historyY.unshift(y);
    }
    // Update the points to correspond with history.
    for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        // Smooth the curve with cubic interpolation to prevent sharp edges.
        const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
        const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

        p.x = ix;
        p.y = iy;

    }
});

/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 */
function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
}

function getTangent(k, factor, array) {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}
