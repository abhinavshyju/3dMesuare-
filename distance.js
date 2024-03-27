const DataLoop = [
  "label",
  "CF",
  "PSFR",
  "SSR",
  "PSBR",
  "CB",
  "PSBL",
  "SSL",
  "PSFL",
];
const DataToFind = [
  {
    label: "Bust",
    CF: "Centre Chest Point",
    PSFR: "Right Bust Point",
    SSR: "front view right side bust",
    PSBR: "back view right side bust",
    CB: "**",
    PSBL: "back view left side bust",
    SSL: "front view left side bust",
    PSFL: "Left Bust Point",
  },
  {
    label: "Waist",
    CF: "Abdomen Point",
    PSFR: "**",
    SSR: "**",
    PSBR: "**",
    CB: "Small of Back Point",
    PSBL: "**",
    SSL: "**",
    PSFL: "**",
  },
  {
    label: "Hip",
    CF: "Buckle Point",
    PSFR: "Trouser Waistline Front Right Point",
    SSR: "Trouser Waistline Front Rightmost Point",
    PSBR: "Trouser Waistline Right Backmost Point",
    CB: "Waistline Back Center Point",
    PSBL: "Trouser Waistline Left Backmost Point",
    SSL: "Trouser Waistline Front Leftmost Point",
    PSFL: "Trouser Waistline Front Left Point",
  },
];

const DataAdded = [
  {
    label: "Bust",
    girth: 0,
    CF: 0,
    PSFR: 0,
    SSR: 0,
    PSBR: 0,
    CB: 0,
    PSBL: 0,
    SSL: 0,
    PSFL: 0,
  },
  {
    label: "Waist",
    girth: 0,
    CF: 0,
    PSFR: 0,
    SSR: 0,
    PSBR: 0,
    CB: 0,
    PSBL: 0,
    SSL: 0,
    PSFL: 0,
  },
  {
    label: "Hip",
    girth: 0,
    CF: 0,
    PSFR: 0,
    SSR: 0,
    PSBR: 0,
    CB: 0,
    PSBL: 0,
    SSL: 0,
    PSFL: 0,
  },
];

const displayDataInTable = (data) => {
  data.forEach((item) => {
    const row = document.querySelector(`#tr-${item.label.toLowerCase()}`);
    console.log(item.label.toLowerCase());
    Object.values(item).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent =
        typeof value === "number"
          ? (Math.round(value * 100) / 100).toFixed(2)
          : value;
      row.appendChild(cell);
    });
  });
};

const FetchDataOne = fetch("http://127.0.0.1:5500/UA_women_scaled1.json")
  .then((response) => response.json())
  .then((data) => {
    return data.body.result.metrics;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    throw error;
  });

const FetchDataTwo = fetch("http://127.0.0.1:5500/UA_women_with_dress_r.json")
  .then((response) => response.json())
  .then((data) => {
    return data.body.result.metrics;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    throw error;
  });

const calculateDistance = (point1, point2) => {
  const [x1, y1, z1] = point1;
  const [x2, y2, z2] = point2;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};

//Variable for minimum distance
const FindMinimumDistance = (landmarkCoordinate, nearbyCoordinates) => {
  let minDistance = Number.POSITIVE_INFINITY;

  // Loop to calculate the distance from the landmark coordinate
  for (const coordinate of nearbyCoordinates) {
    const dist = calculateDistance(landmarkCoordinate, coordinate);
    if (dist < minDistance) {
      minDistance = dist;
    }
  }
  // console.log({ "Minimum distance ": minDistance });
  return minDistance;
};

// Minimum distance
Promise.all([FetchDataOne, FetchDataTwo])
  .then(([one, two]) => {
    DataToFind.forEach((e) => {
      const nearbyCoordinates = two.girths
        .filter((i) => i.label === e.label)
        .map((i) => i.pointcollection);
      const transformedNearbyCoordinates = nearbyCoordinates[0][0].map(
        (obj) => [obj.x, obj.y, obj.z]
      );
      DataLoop.forEach((i) => {
        const Girth = one.girths
          .filter((j) => j.label === e.label)
          .map((j) => j.girth);

        const landmarkCoordinate = one.landmarkPoints
          .filter((j) => j.label === e[i])
          .map((j) => j.position);
        if (!landmarkCoordinate[0]) {
          console.log("Non");
        } else {
          const transformedLandmarkCoordinate = landmarkCoordinate.map(
            (obj) => [obj.x, obj.y, obj.z]
          );
          DataAdded.forEach((z) => {
            if (z.label === e.label) {
              z.girth = Girth;
              z[i] = FindMinimumDistance(
                transformedLandmarkCoordinate[0],
                transformedNearbyCoordinates
              );
            }
          });
        }
      });
    });

    displayDataInTable(DataAdded);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Maximum at X axis and minimum point at Z axis
const findFarAwayPointOnXAxisAndClosestPointAtZAxis = (startingPoint) => {
  const nearbyCoordinates = [
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
  ];

  let farthestXCoordinate = null;
  let farthestXCoordinateXValue = -Infinity;
  let closestZCoordinate = null;
  let closestZCoordinateZValue = Infinity;

  for (const coordinate of nearbyCoordinates) {
    const xDiff = coordinate[0] - startingPoint[0];
    const zDiff = coordinate[2] - startingPoint[2];

    if (xDiff > farthestXCoordinateXValue) {
      farthestXCoordinateXValue = xDiff;
      farthestXCoordinate = coordinate;
    }

    if (zDiff < closestZCoordinateZValue && zDiff !== 0) {
      // Avoid division by zero error
      closestZCoordinateZValue = zDiff;
      closestZCoordinate = coordinate;
    }
  }

  console.log(
    `The farthest point on the X-axis from the starting point (${startingPoint[0]},${startingPoint[1]},${startingPoint[2]}) is (${farthestXCoordinate[0]},${farthestXCoordinate[1]}). The closest point on the Z-axis is (${closestZCoordinate[0]},${closestZCoordinate[1]},${closestZCoordinate[2]})`
  );
};

findFarAwayPointOnXAxisAndClosestPointAtZAxis([0, 0, 0]);
