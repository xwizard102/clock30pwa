function drawSecondsFace(ctx, radius) {
    var grad;
    var y = radius/2;
    var r = radius/6;

    ctx.beginPath();
    ctx.arc(0, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, y, r * 0.95, 0, y, r * 1.05);
    grad.addColorStop(0, '#696969');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#696969');

    ctx.strokeStyle = grad;
    ctx.lineWidth = r * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, y, r * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#696969';
    ctx.fill();
}

function drawSecondsNumbers(ctx, radius) {
    var y = radius/2;
    var r = radius/6;

    var ang;
    var num;
    var secNum;
    ctx.font = r * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (num = 5; num < 61; num+=5) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -r * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, y);
        ctx.rotate(ang);
        ctx.translate(0, r * 0.85);
        ctx.rotate(-ang);
    }
}