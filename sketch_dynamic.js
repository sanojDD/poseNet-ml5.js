let capture;
let posenet = null;
let singlePose, skeleton;
let actor_img, specs, smoke;

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
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("model has loaded");
}

function draw() {
  image(capture, 0, 0, 800, 600);

  if (singlePose) {
    // Draw keypoints
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      fill(255, 0, 0);
      noStroke();
      ellipse(
        singlePose.keypoints[i].position.x,
        singlePose.keypoints[i].position.y,
        10
      );
    }

    // Draw skeleton
    stroke(255);
    strokeWeight(2);
    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x,
        skeleton[j][0].position.y,
        skeleton[j][1].position.x,
        skeleton[j][1].position.y
      );
    }

    // === Eye positions ===
    let leye = singlePose.leftEye;
    let reye = singlePose.rightEye;
    let nose = singlePose.nose;

    // === Distance between eyes ===
    let eyeDist = dist(leye.x, leye.y, reye.x, reye.y);

    // === Image sizes based on face width ===
    let faceWidth = eyeDist * 2.5;
    let faceHeight = eyeDist * 3;

    // === Actor face image ===
    // image(
    //   actor_img,
    //   nose.x - faceWidth / 2,
    //   nose.y - faceHeight / 1.6,
    //   faceWidth,
    //   faceHeight
    // );

    // === Specs ===
    image(
      specs,
      nose.x - faceWidth / 2,
      nose.y - faceHeight / 2,
      faceWidth,
      faceHeight / 2
    );

    // === Smoke ===
    image(
      smoke,
      nose.x + faceWidth * -0.2,
      nose.y + faceHeight * 0.15,
      faceWidth * 0.3,
      faceHeight * 0.3
    );
  }
}
