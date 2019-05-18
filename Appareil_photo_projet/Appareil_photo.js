var MyCam;
var canvas ;
var btnCapture;
var imcanvas;
var captureFlag = false;
var btnConvert;
var btnDownload;
var range;
var img;
function watch_video(){
    
    document.getElementById("divs").style.display = "block";
    MyCam = document.getElementById("MyCam");
    canvas = document.getElementById('canvas');
    btnCapture = document.getElementById("btnCapture");
    imcanvas = canvas.getContext("2d");
    btnCapture.addEventListener("click",Capture);
    
    

    range=document.querySelectorAll('input[type=range]');
    
    
    navigator.getUserMedia = (

        navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia );

    if(navigator.getUserMedia){

        navigator.getUserMedia({
            video : true,
        }, SuccessCapture, ErrorCapture);

    }else{
        var source = document.createElement('source');
    source.setAttribute('src', 'video.mp4');
    MyCam.appendChild(source);
    MyCam.play();
    }
    
}



function SuccessCapture(stream){
    MyCam.srcObject = stream;
}

function ErrorCapture(error){
    console.log("error " + error);
    var source = document.createElement('source');
    source.setAttribute('src', 'video.mp4');
    MyCam.appendChild(source);
    MyCam.play();
}

function Capture(){
    console.log(document.querySelector('.resizable').style.display);
    
    var seconds = 4;
    var countdown = setInterval(function() {
         seconds--;
        document.getElementById("btnCapture").textContent = seconds;
       
        if (seconds <= 0){
            clearInterval(countdown);
            captureFlag = true;
            document.querySelector('#resizable').style.opacity = '1';
    
    imcanvas.drawImage(MyCam, 0, 0, canvas.width, canvas.height);
    img = document.createElement("img")
    img.src=canvas.toDataURL('img/jpeg',2.0);
    canvas.prepend(img);
    document.getElementById("btnCapture").textContent="capturer";
    
        } 
    }, 1000);
    
    
}
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image.src;
}

function convert(){
    document.getElementById("conv").style.display ="block";
    var base64 = canvas.toDataURL("image/jpeg");	
    document.getElementById('conv').value = '';
    document.getElementById('conv').value = base64;
}


function download() {

    document.getElementById("download").href=canvas.toDataURL("image/jpeg");
}

function filter(){
    
    var computedFilters = '';
    var r = document.querySelectorAll('input[type=range]');
    r.forEach(function(item, index){
        computedFilters += item.getAttribute('data-filter') + '(' + item.value + item.getAttribute('data-scale') + ') ';

    });
    imcanvas.filter = computedFilters;
    imcanvas.drawImage(img,0,0,canvas.width,canvas.height);

}

function getOffset( el ) {
    var _x = 0; 
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function recadrerImg(){
	var sourceCX = getOffset(document.getElementById('canvas')).left;
	var sourceCY = getOffset(document.getElementById('canvas')).top;
	console.log('sourceCX='+sourceCX, 'sourceCY='+sourceCY);
	var sourceX = getOffset(document.getElementById('resizable')).left;
	var sourceY = getOffset(document.getElementById('resizable')).top;
	console.log('sourceX='+sourceX, 'sourceY='+sourceY);
	var sourceW = document.getElementById('resizable').offsetWidth;
	var sourceH = document.getElementById('resizable').offsetHeight;
	console.log('sourceW='+sourceW, 'sourceH='+sourceH);
	var destW = 400;
	var destH = 300;
	var destX = 0;
	var destY = 0;
	imcanvas.clearRect(0, 0, canvas.width, canvas.height);
	imcanvas.drawImage(img, sourceX-sourceCX, sourceY-sourceCY, sourceW, sourceH, destX, destY, destW, destH);
	img = document.createElement("img");
	img.src = canvas.toDataURL('image/jpeg', 1.0);
	canvas.prepend(img);
}





