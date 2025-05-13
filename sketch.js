let capture;
let posenet = null;
let noseX, noseY;
let singlePose, skeleton;
let reyeX, reyeY;
let leyeX, leyeY;

let actor_img;
let specs, smoke;

function setup() {
  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.size(800, 600);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on("pose", receivePoses);

  actor_img = loadImage("images/shahrukh.png");
  specs = loadImage("images/specs.png");
  smoke = loadImage("images/cigar.png");
}

function receivePoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
  console.log(noseX + " " + noseY);
}

function modelLoaded() {
  console.log("model has loaded");
}

function draw() {
  image(capture, 0, 0, 800, 600);
  fill(255, 0, 0);

  if (singlePose) {
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      ellipse(
        singlePose.keypoints[i].position.x,
        singlePose.keypoints[i].position.y,
        10
      );
    }
    stroke(255, 255, 255);
    strokeWeight(5);

    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x,
        skeleton[j][0].position.y,
        skeleton[j][1].position.x,
        skeleton[j][1].position.y
      );
    }

    image(actor_img, singlePose.nose.x - 45, singlePose.nose.y - 60, 100, 100);
    // image(specs, singlePose.nose.x - 45, singlePose.nose.y - 60, 100, 100);
    // image(smoke, singlePose.nose.x - 45, singlePose.nose.y + 40, 40, 40);
  }
}
