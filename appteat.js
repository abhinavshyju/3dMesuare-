const arrScene = []; // array of scenes - {scene, canvas, name, idx }

const createScene = function (canvas, name, idx) {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.52, 0.52, 0.52);

  // Initial camera position doesn't matter much as we will reposition it later
  const camera = new BABYLON.ArcRotateCamera(
    "camera1",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });

  arrScene.push({ scene: scene, name: name, idx: idx, canvas: canvas });

  return scene;
};

const positionCamera = function (camera, boundingBox) {
  const dimensions = boundingBox.maximumWorld.subtract(
    boundingBox.minimumWorld
  );

  // Calculate the area of each face
  const areaXY = dimensions.x * dimensions.y;
  const areaYZ = dimensions.y * dimensions.z;
  const areaZX = dimensions.z * dimensions.x;

  // Determine the largest face by area
  const maxArea = Math.max(areaXY, areaYZ, areaZX);

  let direction, upVector;
  if (maxArea === areaXY) {
    // Largest face is XY, so we look along the Z-axis
    direction = new BABYLON.Vector3(0, 0, 1);
    upVector = new BABYLON.Vector3(0, 1, 0); // Assuming Y is up
  } else if (maxArea === areaYZ) {
    // Largest face is YZ, so we look along the X-axis
    direction = new BABYLON.Vector3(1, 0, 0);
    upVector = new BABYLON.Vector3(0, 1, 0); // Assuming Y is up
  } else {
    // Largest face is ZX, so we look along the Y-axis (assuming Y is up)
    direction = new BABYLON.Vector3(0, 1, 0);
    upVector = new BABYLON.Vector3(0, 0, 1); // Z becomes up if we're looking along Y
  }

  // Calculate the center of the bounding box
  const center = boundingBox.centerWorld;

  // Offset camera position by the largest dimension to ensure it's not inside the bounding box
  const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);
  const positionOffset = direction.scale(largestDimension * 1.5); // Adjust scale factor as needed

  // Set camera position and target
  camera.position = center.add(positionOffset);
  camera.setTarget(center);
  camera.upVector = upVector;
};

const loadModel = function (scene, fileName) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "./",
    fileName,
    scene,
    function (newMeshes) {
      if (newMeshes.length > 0) {
        const mesh = newMeshes[0];
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        positionCamera(scene.activeCamera, boundingBox);
      }
    }
  );
};

const draw3DObjects = function () {
  loadModel(arrScene[0].scene, "base.obj");
  loadModel(arrScene[1].scene, "dressed.obj");
};

const init = function () {
  document.querySelectorAll(".canvas-container").forEach((container, idx) => {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    createScene(canvas, container.id, idx);
  });
  draw3DObjects();
  loadGirths();
};

async function getgirthPoints(pointsJson, girthName) {
  try {
    const response = await fetch("./" + pointsJson); // Adjust the path as needed
    const data = await response.json();

    const girth = data.body.result.metrics.girths.find(
      (item) => item.label === girthName
    );
    if (girth && girth.pointcollection) {
      return girth.pointcollection[0];
    } else {
      console.log(`Girth with name '${girthName}' not found.`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function render3DPoints(scene, points, color) {
  const pointsVector3 = points.map((p) => new BABYLON.Vector3(p.x, p.y, p.z));

  // Create lines from the points
  const lines = BABYLON.MeshBuilder.CreateLines(
    "lines",
    {
      points: pointsVector3,
      updatable: false,
    },
    scene
  );

  // Set the color of the lines
  lines.color = new BABYLON.Color3(color.r, color.g, color.b);

  // Calculate the bounding box of the points
  const boundingInfo = lines.getBoundingInfo();
  const boundingBox = boundingInfo.boundingBox;

  // Adjust the camera to fit the points
  fitCameraToBoundingBox(scene.activeCamera, boundingBox);
}

function fitCameraToBoundingBox(camera, boundingBox) {
  const center = boundingBox.centerWorld;
  const extent = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
  const maxDimension = Math.max(extent.x, extent.y, extent.z);
  const direction = camera.position.subtract(camera.getTarget()).normalize();
  const radius = maxDimension * 2; // Scale as needed to ensure the points are within view

  // Set the camera's target to the center of the bounding box
  camera.setTarget(center);

  // Position the camera such that the points are comfortably within view
  camera.position = center.subtract(direction.scale(radius));
  camera.radius = radius; // For ArcRotateCamera to control the zoom level based on the points' spread
}

async function loadGirths() {
  const girths = [
    [
      "girth-bust",
      "Bust Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 1 },
    ],
    [
      "girth-waist",
      "Waist Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 1 },
    ],
    [
      "girth-hip",
      "Hip Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 1 },
    ],
    [
      "girth-butt",
      "Butt Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 1 },
    ],
    // Add other girths as needed...
  ];

  girths.forEach(async (girth) => {
    const sceneContainer = arrScene.find((sc) => sc.name === girth[0]);
    if (sceneContainer) {
      const points1 = await getgirthPoints(girth[2], girth[1]);
      const points2 = await getgirthPoints(girth[3], girth[1]);
      render3DPoints(sceneContainer.scene, points1, girth[4]);
      render3DPoints(sceneContainer.scene, points2, girth[5]);
    }
  });
}

init();
