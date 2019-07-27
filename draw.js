function drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
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

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    var orgFillStyle = ctx.fillStyle;
    var altFillStyle = "#000000";

    for (num = 1; num < 49; num++) {
        ang = num * Math.PI / 24;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        if (num%12 == 0) ctx.fillStyle = altFillStyle;
        var y = (num%24 == 0)? Math.pow(-1, num/24)*25 : 0;
        ctx.fillText(num.toString(), 0, y);
        ctx.fillStyle = orgFillStyle;
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawSecondaryumbers(ctx, radius) {
    var ang;
    var num;
    var secNum;
    ctx.font = radius * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillStyle = "#cccccc";

    for (num = 0; num < 48; num++) {
        ang = num * Math.PI / 24;
        secNum = 48 - num;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        if (num%24 != 0)
        ctx.fillText(secNum.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = (hour * Math.PI / 12) + (minute * Math.PI / (2 * 6 * 60)) + (second * Math.PI / (2 * 360 * 60));
    drawHand(ctx, hour, radius * 0.65, radius * 0.05);
    // // second
    // second = (second * Math.PI / 30);
    // drawHand(ctx, second, radius * 0.9, radius * 0.01);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}