var processingInstance;
var seedHistory = new Array();
var seedHistoryPtr = 0;

function newSeed() {
    var seed = parseInt(Math.random() * 99999);
    document.getElementById('seed').value = seed;

    seedHistoryPtr = seedHistory.length;
    seedHistory[seedHistoryPtr] = seed;

    updateSeedHistButtons();
    update();
}

function prevSeed() {
    seedHistoryPtr--;
    document.getElementById('seed').value = seedHistory[seedHistoryPtr];

    updateSeedHistButtons();
    update();
}

function nextSeed() {
    seedHistoryPtr++;
    document.getElementById('seed').value = seedHistory[seedHistoryPtr];

    updateSeedHistButtons();
    update();
}

function updateSeedHistButtons() {
    document.getElementById('prevSeed').disabled = (seedHistoryPtr == 0);
    document.getElementById('nextSeed').disabled = (seedHistoryPtr + 1 == seedHistory.length);
}

var clusterMaskSeedHistory = new Array();
var clusterMaskSeedHistoryPtr = 0;
function newClusterMaskSeed() {
    var clusterMaskSeed = parseInt(Math.random() * 99999);
    document.getElementById('clusterMaskSeed').value = clusterMaskSeed;

    clusterMaskSeedHistoryPtr = clusterMaskSeedHistory.length;
    clusterMaskSeedHistory[clusterMaskSeedHistoryPtr] = clusterMaskSeed;

    updateClusterMaskSeedHistButtons();
    update();
}
function prevClusterMaskSeed() {
    clusterMaskSeedHistoryPtr--;
    document.getElementById('clusterMaskSeed').value = clusterMaskSeedHistory[clusterMaskSeedHistoryPtr];

    updateClusterMaskSeedHistButtons();
    update();
}
function nextClusterMaskSeed() {
    clusterMaskSeedHistoryPtr++;
    document.getElementById('clusterMaskSeed').value = clusterMaskSeedHistory[clusterMaskSeedHistoryPtr];

    updateClusterMaskSeedHistButtons();
    update();
}
function updateClusterMaskSeedHistButtons() {
    document.getElementById('prevClusterMaskSeed').disabled = (clusterMaskSeedHistoryPtr == 0);
    document.getElementById('nextClusterMaskSeed').disabled = (clusterMaskSeedHistoryPtr + 1 == clusterMaskSeedHistory.length);
}

function update() {
    var width = parseInt(document.getElementById('fieldWidth').value);
    var height = parseInt(document.getElementById('fieldHeight').value);
    processingInstance.resizeCanvas(width, height);
    processingInstance.redraw();
}
function generatePNG() {
    if (!processingInstance) {
        processingInstance = Processing.getInstanceById('starfield');
    }
    processingInstance.save("starfield.png");
}

const a4Frame = document.createElement('canvas');
a4Frame.width = 210 * scaleFactor;
a4Frame.height = 297 * scaleFactor;
const downloadLink = document.createElement('a');
async function generateFrames() {
    const context = a4Frame.getContext('2d');
    const source = document.querySelector('#starfield canvas');
    const w = a4Frame.width;
    const h = a4Frame.height;

    let pageCount = 1;
    for (let y = 0; y < source.height; y += h) {
        for (let x = 0; x < source.width; x += w) {
            context.clearRect(0, 0, w, h);
            context.drawImage(source, x, y, w, h, 0, 0, w, h);
            downloadLink.href = a4Frame.toDataURL();
            downloadLink.download = `starfield-frame-${pageCount}.png`;
            downloadLink.click();
            pageCount++;
            await defer(300)
        }
    }
}

function defer (timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout))
}

function updateQueryParams (params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });
    window.history.replaceState({}, '', url);
}
function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

window.saveParamsFlag = false;
function saveParams() {
    if (!processingInstance) {
        processingInstance = Processing.getInstanceById('starfield');
    }
    window.saveParamsFlag = true;
    processingInstance.redraw();
    window.saveParamsFlag = false;
}

if (bgImage != '') {
    window.imgloader = window.setInterval(update, 100);
}

let p5Instance = function (p) {
    var width = window.starfieldWidth;
    var height = window.starfieldHeight;

    p.setup = function () {
        if (bgImage != '') {
            imported_image = p.loadImage(bgImage);
        }

        var canvas = p.createCanvas(width * scaleFactor, height * scaleFactor);
        canvas.parent('starfield');
        p.noLoop();
        document.getElementById('defaultCanvas0').style.transform = `rotate(${rotateCanvas}deg)`;
    };

    p.draw = function () {
        const el = document.getElementById('defaultCanvas0')
        el.style.width = width + 'px';
        el.style.height = height + 'px';
        el.width = width * scaleFactor;
        el.height = height * scaleFactor;

        p.scale(scaleFactor);
        var fadeout = parseInt(document.getElementById('fadeout').value);

        var border = parseInt(document.getElementById('border').value);
        document.getElementById('starfield').style.borderWidth = border + 'px';

        var seed = parseInt(document.getElementById('seed').value);
        if (isNaN(seed) || seed == 0) {
            newSeed();
            seed = parseInt(document.getElementById('seed').value);
        }
        p.randomSeed(seed);

        var blackBackground = document.getElementById('blackbackground').checked
        var cc = document.getElementById('cc').checked;
        var doShapecode = document.getElementById('shapecode').checked;
        var doObstacles = document.getElementById('obstacles').checked;
        var doBayCounts = document.getElementById('showbaycounts').checked;
        var size1count = parseInt(document.getElementById('size1').value);
        var size2count = parseInt(document.getElementById('size2').value);
        var size3count = parseInt(document.getElementById('size3').value);
        var size4count = parseInt(document.getElementById('size4').value);
        const noCcColor = blackBackground ? [255, 255, 255] : [0, 0, 0]

        if (bgImage != '' && imported_image != null && imported_image.loaded) {
            window.clearTimeout(window.imgloader);
            p.image(imported_image, 0, 0, width, height);
        } else {
            if (blackBackground) {
                p.fill(0, 0, 0);
            } else {
                p.fill(255, 255, 255);
            }
            p.rect(0, 0, width, height);
        }

        var stars = [
            {
                size: 2,
                count: size1count,
                color: cc ? [191, 64, 191] : noCcColor
            },
            {
                size: 3,
                count: size2count,
                color: cc ? [0, 255, 0] : noCcColor
            },
            {
                size: 3,
                count: size3count,
                color: cc ? [0, 0, 255] : noCcColor
            },
            {
                size: 3,
                count: size4count,
                color: cc ? [255, 255, 0] : noCcColor
            }
        ];
        var showsize = [
            document.getElementById('showsize1').checked,
            document.getElementById('showsize2').checked,
            document.getElementById('showsize3').checked,
            document.getElementById('showsize4').checked
        ];
        var obstacleBuffer = parseInt(document.getElementById('obstaclebuffer').value);

        var obstacles = {
            rectangles: [
                { x: 0, y: 0, w: width, h: 45 },
                { x: 0, y: 370, w: width, h: 45 },
                { x: 0, y: 735, w: width, h: 45 },
                { x: 0, y: 1095, w: width, h: 45 },
                { x: 0, y: 1430, w: width, h: 45 },
                { x: 0, y: 1790, w: width, h: 45 },
                { x: 0, y: 2150, w: width, h: 45 },
                { x: 0, y: 2500, w: width, h: 45 }
            ],
            circles: [{
                x: width / 2,
                y: 1295,
                d: 425
            }],
            lines: []
        }

        // for (let x = 210; x < width; x += 210) {
        //     obstacles.lines.push({ x1: x, x2: x, y1: 0, y2: height })
        // }
        // for (let y = 297; y < height; y += 297) {
        //     obstacles.lines.push({ x1: 0, x2: width, y1: y, y2: y })
        // }

        var clusterMaskSeed = parseInt(document.getElementById('clusterMaskSeed').value);
        if (isNaN(clusterMaskSeed) || clusterMaskSeed == 0) {
            newClusterMaskSeed();
            clusterMaskSeed = parseInt(document.getElementById('clusterMaskSeed').value);
        }

        updateQueryParams({ clusterMaskSeed, seed })

        // spaceAmount 0->100 clusterMaskThreshold 1.0->0.3
        var spaceAmount = parseInt(document.getElementById('spaceAmount').value);
        if (spaceAmount < 0) { spaceAmount = 0; }
        if (spaceAmount > 100) { spaceAmount = 100; }
        var clusterMaskThreshold = (100 - spaceAmount) * 0.006 + 0.4;

        var clusterAmount = parseInt(document.getElementById('clusterAmount').value);
        if (clusterAmount < 0) { clusterAmount = 0; }
        if (clusterAmount > 100) { clusterAmount = 100; }

        var clusterMaskScale = parseInt(document.getElementById('clusterMaskScale').value);
        if (isNaN(clusterMaskScale) || clusterMaskScale < 1) { clusterMaskScale = 1; }
        clusterMaskScale /= 100;

        const generatedStars = new Set()

        for (var i = 0; i < stars.length; i++) {
            for (var c = 0; c < stars[i].count; c++) {
                do {
                    do {
                        x = Math.floor(p.random(0, width));
                        y = Math.floor(p.random(0, height));
                        var xn = x / width;
                        var yn = y / height;
                        n = PerlinNoise.noise(xn / clusterMaskScale, yn / clusterMaskScale, clusterMaskSeed);
                    } while (n > clusterMaskThreshold);

                    var bTryAgain = false;

                    // Fade out cluster edges?
                    if (clusterAmount > 0 && p.random(0, clusterAmount) > Math.abs(n - clusterMaskThreshold) * 100) {
                        bTryAgain = true;
                    }

                    // Fade out borders?
                    if (fadeout > 0) {
                        var xEdgeDistance = x < width / 2 ? x : width - x;
                        var yEdgeDistance = y < height / 2 ? y : height - y;
                        var edgeDistance = xEdgeDistance < yEdgeDistance ? xEdgeDistance : yEdgeDistance;
                        if (edgeDistance < fadeout) {
                            var fadeChance = edgeDistance / fadeout;
                            if (p.random(0, fadeout) > edgeDistance) {
                                bTryAgain = true;
                            }
                        }
                    }

                    // Obstacle collisions?
                    for (const rect of obstacles.rectangles) {
                        const isInX = x >= (rect.x - obstacleBuffer) && x <= (rect.x + rect.w + obstacleBuffer)
                        const isInY = y >= (rect.y - obstacleBuffer) && y <= (rect.y + rect.h + obstacleBuffer)
                        if (isInX && isInY) {
                            bTryAgain = true;
                        }
                    }
                    for (const circle of obstacles.circles) {
                        // Calculate the distance between the point and the center of the circle
                        const distanceSquared = (x - circle.x) ** 2 + (y - circle.y) ** 2;
                        
                        // Check if the distance is less than or equal to the square of the radius
                        if (distanceSquared <= (circle.d / 2 + obstacleBuffer) ** 2) {
                            bTryAgain = true;
                        }
                    }
                } while (bTryAgain) {
                    drawStar(i, x, y);
                }
            }
        }

        for (const constellation of constellations) {
            plotConstellation(constellation)
        }

        function drawStar (starIndex, x, y) {
            if (!showsize[starIndex]) {
                return;
            }

            const star = stars[starIndex];
            p.strokeWeight(star.size * 2);
            p.stroke(star.color[0], star.color[1], star.color[2]);
            if (doShapecode) {
                switch (starIndex) {
                    case 0:
                        p.point(x, y);
                        break;
                    case 1:
                        p.quad(x, y - 1, x + 1, y, x, y + 1, x - 1, y);
                        break;
                    case 2:
                        p.triangle(x, y, x - 1, y + 2, x + 1, y + 2);
                        break;
                    case 3:
                        p.fill(star.color[0], star.color[1], star.color[2]);
                        p.square(x, y, starIndex - 2);
                }
            } else {
                p.point(x, y);
            }

            generatedStars.add({ x, y, size: star.size })
        }

        function plotConstellation({ stars, x, y, rotation, scale }) {
            if (stars.length === 0) return;

            const radians = (Math.PI / 180) * rotation; // Convert degrees to radians

            // Find min/max x and y values to determine the constellation’s midpoint
            let minX = Math.min(...stars.map(star => star.x));
            let maxX = Math.max(...stars.map(star => star.x));
            let minY = Math.min(...stars.map(star => star.y));
            let maxY = Math.max(...stars.map(star => star.y));

            let centerX = (minX + maxX) / 2;
            let centerY = (minY + maxY) / 2;

            stars.forEach(star => {
                let { x: starX, y: starY, size } = star;

                // Translate to origin (centering around calculated midpoint)
                let relativeX = (starX - centerX) * scale;
                let relativeY = (starY - centerY) * scale;

                // Apply rotation around the constellation's center
                let rotatedX = relativeX * Math.cos(radians) - relativeY * Math.sin(radians);
                let rotatedY = relativeX * Math.sin(radians) + relativeY * Math.cos(radians);

                // Translate to the new (x, y) position
                drawStar(size - 1, x + rotatedX, y + rotatedY);
            });
        }

        if (window.saveParamsFlag) {
            var currentParams = '';
            currentParams += 'Random seed: ' + seed + "<br>";
            currentParams += '0.50mm fibres: ' + size1count + "<br>";
            currentParams += '0.75mm fibres: ' + size2count + "<br>";
            currentParams += '1.00mm fibres: ' + size3count + "<br>";
            currentParams += '1.50mm fibres: ' + size4count + "<br>";
            currentParams += 'Colour-code fibre sizes: ' + (cc ? 'yes' : 'no') + "<br><br>";
            currentParams += 'Shape-code fibre sizes: ' + (shapecode ? 'yes' : 'no') + "<br><br>";
            currentParams += 'Sparser towards edges: ' + fadeout + "<br>";
            currentParams += 'Black border: ' + border + "<br><br>";
            currentParams += 'Space/cluster seed: ' + clusterMaskSeed + "<br>";
            currentParams += 'Space/cluster scale: ' + clusterMaskScale * 100 + "<br>";
            currentParams += 'Space amount: ' + spaceAmount + "<br>";
            currentParams += 'Cluster amount: ' + clusterAmount + "<br>";
            document.getElementById('currentParams').innerHTML = currentParams;
            document.getElementById('currentParams').style.display = 'block';
        } else {
            document.getElementById('currentParams').style.display = 'none';
        }

        if (doObstacles) {
            // circles
            p.noFill();
            p.ellipseMode(p.CENTER);
            p.strokeWeight(3);
            p.stroke(0, 0, 255, 128);
            for (const circle of obstacles.circles) {
                p.circle(circle.x, circle.y, circle.d);
            }

            // rectangles
            p.strokeWeight(2);
            for (const rect of obstacles.rectangles) {
                if (rect.c) {
                    p.stroke(...rect.c)
                } else {
                    p.stroke(0, 255, 0, 128)
                }
                p.rect(rect.x, rect.y, rect.w, rect.h);
            }

            // Draw Extra grids
            for (const line of obstacles.lines) {
                p.stroke(150, 150, 150, 30);
                p.line(line.x1, line.y1, line.x2, line.y2);
            }

            let pageCount = 1;
            p.stroke(150, 150, 150, 30);
            p.fill(150, 150, 150, 30);
            p.strokeWeight(1);
            p.textSize(40);
            p.textAlign(p.CENTER, p.CENTER);

            for (let y = 50; y < height; y += 297) {
                for (let x = 105; x < width; x += 210) {
                    p.text(pageCount, x, y);
                    pageCount++;
                }
            }
        }

        // Calculate stars per bay
        const bays = []
        for (let i = 0; i < obstacles.rectangles.length + 1; i++) {
            const bay = {
                y: obstacles.rectangles[i]?.y,
                counts: showsize.reduce((p, c, i) => {
                    p[i + 1] = 0;
                    return p
                }, {})
            };
            if (!bay.y) continue
            bays.push(bay);
            generatedStars.forEach(star => {
                if (star.y < bay.y) {
                    bay.counts[star.size]++;
                    generatedStars.delete(star)
                }
            });
        }

        // Draw bay counts
        p.stroke(0, 255, 0, 128);
        p.fill(0, 255, 0, 128);
        p.strokeWeight(1);
        p.textSize(20);
        p.textAlign(p.LEFT, p.CENTER);
        let summary = ''
        bays.reduce((prev, bay, i) => {
            const prevY = prev?.y ?? 0;
            const y = bay.y - ((bay.y - prevY) / 2);
            const counts = []
            for (let i = 0; i < showsize.length; i++) {
                counts.push(`Size ${i + 1}: ${bay.counts[i + 1]}`);
            }
            if (doBayCounts) {
                p.text(counts.join('\n'), 20, y);
            }
            summary += `<div><b>Bay ${i}:</b><div>${counts.join('</div><div>')}</div></div>`;
            return bay;
        }, null);
        document.getElementById('baycounts').innerHTML = summary;

        p.textSize(50);
        p.text('N', 20, height / 2 + 80);
        p.text('W', width / 2, 40);
        p.text('S', width - 40, height / 2 + 80);
        p.text('E', width / 2, height - 20);
    };
};

processingInstance = new p5(p5Instance);