song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getResults);
}
function getResults(results) {
if (results.length>0){
        leftWristScore = results[0].pose.keypoints[9];
        rightWristScore = results[0].pose.keypoints[10];
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}
function modelLoaded() {
    console.log("beep skedep", "Model loaded successfully");
}
function draw() {
    image(video, 0, 0, 500, 500);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    console.log(leftWristScore, rightWristScore);
    if(leftWristScore>0.2){
        console.log("Printing circle...")
        circle(leftWristX, leftWristY, 20);
        volume_value = Number(leftWristY);
        volume_value = floor(volume_value);
        volume_value = volume_value/500;
        document.getElementById("volume").innerHTML="volume:" + volume_value;
        song.setVolume(volume_value);
    }
    if (rightWristScore>0.2){
        console.log("Printing circle...");
        circle(rightWristX, rightWristY, 20);
        if (rightWristY>0&&rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed: 0.5x";
        song.rate(0.5);
        }
        else if (rightWristY>100&&rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed: 1x";
            song.rate(1);  
        }
        else if (rightWristY>200&&rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed: 1.5x";
            song.rate(1.5); 
        }
        else if (rightWristY>300&&rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed: 2x";
            song.rate(2); 
        }
        else if (rightWristY>400&&rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed: 2.5x";
            song.rate(2.5); 
        }
    }
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
