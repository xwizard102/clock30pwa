function drawSeconds() {

    var secCanvas = document.getElementById("canvas");
    var secCtx = secCanvas.getContext("2d");
    var secRadius = secCanvas.height/4;
    var x = secCanvas.width/2;

    secCtx.translate(x, secRadius*3);

    drawSecFace(secCtx, secRadius);
}


function drawSecFace(secCtx, secRadius) {
    var grad;

    secCtx.beginPath();
    secCtx.arc(0, 0, secRadius, 0, 2*Math.PI);
    secCtx.fillStyle = 'white';
    secCtx.fill();

    grad = secCtx.createRadialGradient(0,0,secRadius*0.95, 0,0,secRadius*1.05);
    grad.addColorStop(0, '#696969');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#696969');
    
    secCtx.strokeStyle = grad;
    secCtx.lineWidth = secRadius*0.1;
    secCtx.stroke();

    secCtx.beginPath();
    secCtx.arc(0, 0, secRadius*0.1, 0, 2*Math.PI);
    secCtx.fillStyle = '#696969';
    secCtx.fill();
}