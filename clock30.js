var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);

setInterval(drawClock30, 1000, ctx);

function drawClock30(ctx) {
    drawClockFace(ctx);
    drawClockNumbers(ctx);
    drawClockHand(ctx);

    drawClockSecondaryNumbers(ctx);

    drawSecondsFace(ctx);
    drawSecondsNumbers(ctx);
    drawSecondsHand(ctx);
}

function switchStyle() {
    isFullDay = !isFullDay;
    drawClock30();
}

function drawClockFace(ctx) {
    var radius = ctx.canvas.height / 2 * 0.9;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    var grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#696969');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#696969');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#696969';
    ctx.fill();
}

function drawClockNumbers(ctx, isFullDay = true) {
    var radius = canvas.height / 2 * 0.9;
    var hoursPerDay = 48;
    var start = 1;
    var end = hoursPerDay;
    var half = hoursPerDay / 2;
    var quarter = hoursPerDay / 4;

    if (!isFullDay) {
        half = hoursPerDay / 4;
        quarter = hoursPerDay / 8;
        var isAM = new Date().getHours() < half;

        if (isAM) {
            end = (hoursPerDay / 2);
        } else {
            start = (hoursPerDay / 2) + 1;
            end = hoursPerDay;
        }
    }

    ctx.font = radius * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    var orgFillStyle = ctx.fillStyle;
    var altFillStyle = "#000000";

    var orgFont = ctx.font;
    var altFont = ctx.font += " bold";

    for (var num = start, ang = 0; num < end+1; num++) {
        ang = num * Math.PI / half;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        if (num%quarter == 0) {
            ctx.fillStyle = altFillStyle;
            ctx.font = altFont;
        }
        ctx.fillText(num.toString(), 0, 0);
        ctx.fillStyle = orgFillStyle;
        ctx.font = orgFont;
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawClockHand(ctx, isFullDay = true) {
    var radius = canvas.height / 2 * 0.9;
    var hoursPerDay = 48;
    var quarter = isFullDay? hoursPerDay / 4 : hoursPerDay / 8;

    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = (hour * Math.PI / quarter) + (minute * Math.PI / (quarter * 60)) + (second * Math.PI / (quarter * 60 * 60));
    drawHand(ctx, hour, radius * 0.65, radius * 0.05);
}

function drawClockSecondaryNumbers(ctx, isFullDay = true) {
    var radius = canvas.height / 2 * 0.9 * 0.85;
    var hoursPerDay = 48;
    var start = 0;
    var end = hoursPerDay;
    var half = hoursPerDay / 2;

    if (!isFullDay) {
        half = hoursPerDay / 4;
        var isAM = new Date().getHours() < half;
        
        if (isAM) {
            end = hoursPerDay / 2;
        } else {
            start = hoursPerDay / 2;
            end = hoursPerDay;
        }
    }

    ctx.font = radius * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillStyle = "#cccccc";

    for (var num = start; num < end; num++) {
        var ang = num * Math.PI / half;
        var secNum = hoursPerDay - num;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(secNum.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawSecondsFace(ctx) {
    var radius = canvas.height / 2 * 0.9;
    var grad;
    var y = radius / 2;
    var r = radius / 6;

    ctx.beginPath();
    ctx.arc(0, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, y, r * 0.95, 0, y, r * 1.05);
    grad.addColorStop(0, '#696969');
    grad.addColorStop(0.5, '#fff');
    grad.addColorStop(1, '#696969');

    ctx.strokeStyle = grad;
    ctx.lineWidth = r * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, y, r * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#696969';
    ctx.fill();
}

function drawSecondsNumbers(ctx) {
    var radius = canvas.height / 2 * 0.9;
    var y = radius / 2;
    var r = radius / 6;

    ctx.font = r * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (var num = 5; num < 61; num += 5) {
        var ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -r * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, y);
        ctx.rotate(ang);
        ctx.translate(0, r * 0.85);
        ctx.rotate(-ang);
    }
}

function drawSecondsHand(ctx) {
    var radius = canvas.height / 2 * 0.9;
    var now = new Date();
    var second = now.getSeconds();
    var r = radius / 6;
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, r * 0.9, radius * 0.01, radius/2);
}

function drawHand(ctx, pos, length, width, shift = 0) {
    ctx.translate(0, shift);
    
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);

    ctx.translate(0, -shift);
}