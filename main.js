objectDetected = "";
Objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
     image(video, 0, 0, 480, 380);
    if (objectDetected)
    {
        objectDetector.detect (video, gotResults);

        for(i = 0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML = "Objetos detectados";
            document.getElementById("objDetectado").innerHTML = "quantidade de objetos detectados : " + Objects.length;

            fill("#FF0000");
            percent = floor(Objects[i].confidence *100);
            text(Objects[i].label + "" + percent + "%" , Objects[i].x , Objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(Objects[i].x , Objects[i].y , Objects[i].width , Objects[i].heigth);
        }
    }
}

function gotResults(error,results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
    }
    Objects = results;
}

function iniciar(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded );
    document.getElementById("Status").innerHTML = "Status : detectando objetos"
}

function modelLoaded(){
    console.log("modelo carregado");
    objectDetected = true;
    video.loop();
    video.speed(2.5);
    video.volume(0);
}