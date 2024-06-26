const jsonWithDress = "./UA_women_with_dress_r (1).json";
const jsonWithoutDress = "./UA_women_scaled1.json";

// const DataLoop = [
//   // "label",
//   "CF",
//   "PSFR",
//   "SSR",
//   "PSBR",
//   "CB",
//   "PSBL",
//   "SSL",
//   "PSFL",
// ];

// //Data to find from the json file (Label the name of nearby coordinates from the json)

// // __________________________________________________________________________________________________________________________//
// // If you want to find more points just add obejects in this array And also add the same thing in the " DataToDisplay".
// // __________________________________________________________________________________________________________________________//

// const DataToFind = [
//   {
//     label: "Bust", //girth
//     CF: "Centre Chest Point", //landmark
//     PSFR: "Right Bust Point",
//     SSR: "front view right side bust",
//     PSBR: "back view right side bust",
//     CB: "**",
//     PSBL: "back view left side bust",
//     SSL: "front view left side bust",
//     PSFL: "Left Bust Point",
//   },
//   {
//     label: "Waist",
//     CF: "Abdomen Point",
//     PSFR: "**",
//     SSR: "**",
//     PSBR: "**",
//     CB: "Small of Back Point",
//     PSBL: "**",
//     SSL: "**",
//     PSFL: "**",
//   },
//   {
//     label: "Hip",
//     CF: "Buckle Point",
//     PSFR: "Trouser Waistline Front Right Point",
//     SSR: "Trouser Waistline Front Rightmost Point",
//     PSBR: "Trouser Waistline Right Backmost Point",
//     CB: "Waistline Back Center Point",
//     PSBL: "Trouser Waistline Left Backmost Point",
//     SSL: "Trouser Waistline Front Leftmost Point",
//     PSFL: "Trouser Waistline Front Left Point",
//   },
// ];

// // Data that return from the FindMinimumDistance Function
// const DataToDisplay = [
//   {
//     label: "Bust",
//     girth: 0,
//     CF: 0,
//     PSFR: 0,
//     SSR: 0,
//     PSBR: 0,
//     CB: 0,
//     PSBL: 0,
//     SSL: 0,
//     PSFL: 0,
//   },
//   {
//     label: "Waist",
//     girth: 0,
//     CF: 0,
//     PSFR: 0,
//     SSR: 0,
//     PSBR: 0,
//     CB: 0,
//     PSBL: 0,
//     SSL: 0,
//     PSFL: 0,
//   },
//   {
//     label: "Hip",
//     girth: 0,
//     CF: 0,
//     PSFR: 0,
//     SSR: 0,
//     PSBR: 0,
//     CB: 0,
//     PSBL: 0,
//     SSL: 0,
//     PSFL: 0,
//   },
// ];
// const displayDataInTable = (data) => {
//   data.forEach((item) => {
//     const row = document.querySelector(`#tr-${item.label.toLowerCase()}`);
//     // console.log(item.label.toLowerCase());
//     Object.values(item).forEach((value) => {
//       const cell = document.createElement("td");
//       cell.textContent =
//         typeof value === "number"
//           ? (Math.round(value * 100) / 100).toFixed(2)
//           : value;
//       row.appendChild(cell);
//     });
//   });
// };

// async function getgirthPoints(girthName) {
//   try {
//     const response = await fetch(jsonWithDress); // Adjust the path as needed
//     const data = await response.json();

//     const girth = data.body.result.metrics.girths.find(
//       (item) => item.label === girthName
//     );
//     if (girth && girth.pointcollection) {
//       return girth.pointcollection[0];
//     } else {
//       console.log(`Girth points with name '${girthName}' not found.`);
//       return -1;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// async function getLandmarkPoints(landmarkName) {
//   try {
//     const response = await fetch(jsonWithoutDress); // Adjust the path as needed
//     const data = await response.json();

//     const landmark = data.body.result.metrics.landmarkPoints.find(
//       (item) => item.label === landmarkName
//     );
//     if (landmark && landmark.position) {
//       //   console.log(landmark.position);
//       return landmark.position;
//     } else {
//       console.log(`Landmark with name '${landmarkName}' not found.`);
//       return -1;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// async function getgirth(girthName) {
//   try {
//     const response = await fetch(jsonWithoutDress); // Adjust the path as needed
//     const data = await response.json();

//     const girth = data.body.result.metrics.girths.find(
//       (item) => item.label === girthName
//     );
//     if (girth && girth.girth) {
//       return girth.girth[0];
//     } else {
//       console.log(`Girth with name '${girthName}' not found.`);
//       return -1;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// // getgirthPoints( "Bust Contoured");
// // getLandmarkPoints( "Centre Chest Point");
// // getgirth("Centre Chest Point")

// const calculateMinimumDistance = async (landmarkLabel, girthLabel) => {
//   try {
//     const landmark = await getLandmarkPoints(landmarkLabel);
//     const pointsset = await getgirthPoints(girthLabel);
//     let minDistance = Infinity; // Start with a very large number

//     if (pointsset != -1 && landmark != -1) {
//       pointsset.forEach((point2) => {
//         // distance = sqrt( x^2 + x^2 + y^2 )
//         const distance = Math.sqrt(
//           Math.pow(landmark.x - point2.x, 2) +
//             Math.pow(landmark.y - point2.y, 2) +
//             Math.pow(landmark.z - point2.z, 2)
//         );
//         if (distance < minDistance) {
//           minDistance = distance;
//         }
//       });
//       return minDistance;
//     } else {
//       return -1;
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

// const resultJosn = async () => {
//   try {
//     for (const z of DataToDisplay) {
//       for (const i of DataToFind) {
//         const girth = await getgirth(i.label);
//         if (z.label === i.label) {
//           for (const j of DataLoop) {
//             z.girth = girth;
//             z[j] =
//               (await calculateMinimumDistance(i[j], i.label)) == -1
//                 ? "Undefined"
//                 : await calculateMinimumDistance(i[j], i.label);
//           }
//         }
//       }
//     }
//     await displayDataInTable(DataToDisplay);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
// resultJosn();

// const CheckIndividual = async (landmarkLabel, girthLabel) => {
//   console.log(
//     "-----------------------------------------------\n   Minimum distance : " +
//       (await calculateMinimumDistance(landmarkLabel, girthLabel)) +
//       "\n-----------------------------------------------"
//   );
// };

// CheckIndividual("Centre Chest Point", "Bust");

// ============================================================

const DataLoop = [
  // "label",
  "SSR",
  "SSL",
  "CB",
  "CF",
  "PSFR",
  "PSBL",
  "PSBR",
  "PSFL",
];
const DataToDisplay = [
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

async function getgirth(girthName) {
  try {
    const response = await fetch(jsonWithoutDress); // Adjust the path as needed
    const data = await response.json();

    const girth = data.body.result.metrics.girths.find(
      (item) => item.label === girthName
    );
    if (girth && girth.girth) {
      return girth.girth[0];
    } else {
      console.log(`Girth with name '${girthName}' not found.`);
      return -1;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const getGrithPoints = async (pointsJson, girthName) => {
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
};

function findIntersections(points, axis, planeValue, type) {
  let intersections = [];

  if (type == "base") {
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];

      // Check for intersection with the specified plane.
      if (axis === "X") {
        // Check if the line crosses the X=planeValue plane.
        if (
          (start.x <= planeValue && end.x >= planeValue) ||
          (start.x >= planeValue && end.x <= planeValue)
        ) {
          const t = (planeValue - start.x) / (end.x - start.x);
          const y = start.y + t * (end.y - start.y);
          const z = start.z + t * (end.z - start.z);
          intersections.push({ x: planeValue, y, z });
        }
      } else if (axis === "Z") {
        // Check if the line crosses the Z=planeValue plane.
        if (
          (start.z <= planeValue && end.z >= planeValue) ||
          (start.z >= planeValue && end.z <= planeValue)
        ) {
          const t = (planeValue - start.z) / (end.z - start.z);
          const x = start.x + t * (end.x - start.x);
          const y = start.y + t * (end.y - start.y);
          intersections.push({ x, y, z: planeValue });
        }
      }
    }
  } else {
    for (let i = 0; i < points.length - 1; i += 2) {
      const start = points[i];
      const end = points[i + 1];

      // Check for intersection with the specified plane.
      if (axis === "X") {
        // Check if the line crosses the X=planeValue plane.
        if (
          (start.x <= planeValue && end.x >= planeValue) ||
          (start.x >= planeValue && end.x <= planeValue)
        ) {
          const t = (planeValue - start.x) / (end.x - start.x);
          const y = start.y + t * (end.y - start.y);
          const z = start.z + t * (end.z - start.z);
          intersections.push({ x: planeValue, y, z });
        }
      } else if (axis === "Z") {
        // Check if the line crosses the Z=planeValue plane.
        if (
          (start.z <= planeValue && end.z >= planeValue) ||
          (start.z >= planeValue && end.z <= planeValue)
        ) {
          const t = (planeValue - start.z) / (end.z - start.z);
          const x = start.x + t * (end.x - start.x);
          const y = start.y + t * (end.y - start.y);
          intersections.push({ x, y, z: planeValue });
        }
      }
    }
  }

  return intersections;
}

function calculateMinimumDistance(point1, pointsSet2) {
  let minDistance = Infinity; // Start with a very large number

  pointsSet2.forEach((point2) => {
    // distance = sqrt( x^2 + x^2 + y^2 )
    const distance = Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.z - point2.z, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
    }
  });

  return minDistance;
}
const displayDataInTable = (data) => {
  data.forEach((item) => {
    const row = document.querySelector(`#tr-${item.label.toLowerCase()}`);
    // console.log(item.label.toLowerCase());
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

const loadGirth = async () => {
  const girths = [
    [
      "girth-bust",
      "Bust Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      "Bust",
    ],
    [
      "girth-waist",
      "Waist Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      "Waist",
    ],
    [
      "girth-hip",
      "Hip Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      "Hip",
    ],
    // Add other girths as needed...
  ];

  const resultArray = [];
  for (const girth of girths) {
    const points1 = await getGrithPoints(girth[2], girth[1]);
    const points2 = await getGrithPoints(girth[3], girth[1]);
    const baseResult = renderIntersectionPoints(
      points1,
      { r: 1, g: 1, b: 0 },
      "base"
    );
    const dressResult = renderIntersectionPoints(
      points2,
      { r: 0, g: 1, b: 1 },
      "dress"
    );

    // console.log(baseResult, dressResult);

    const miniDistance = [];
    for (let i = 0; i < baseResult.length; i++) {
      miniDistance.push(calculateMinimumDistance(baseResult[i], dressResult));
    }
    resultArray.push(miniDistance);
  }
  // console.log(resultArray);
  for (let i = 0; i < girths.length; i++) {
    const grith = await getgirth(girths[i][1]);
    DataToDisplay[i].girth = grith;
  }
  for (let i = 0; i < resultArray.length; i++) {
    for (let j = 0; j < resultArray[i].length; j++) {
      DataToDisplay[i][DataLoop[j]] = resultArray[i][j];
    }
  }
  displayDataInTable(DataToDisplay);
};

function renderIntersectionPoints(points, color, type) {
  // Step 1: Calculate Intersection Points
  const z0Intersections = findIntersections(points, "Z", 0, type);
  const x0Intersections = findIntersections(points, "X", 0, type);
  // find max x
  const pointx = z0Intersections[0];
  // intersection points on plane represented by max x/2 <= Princess plane
  const xmidIntersections = findIntersections(points, "X", pointx.x / 2, type);
  const x_midIntersections = findIntersections(
    points,
    "X",
    (pointx.x / 2) * -1,
    type
  );

  // Step 2: Render Intersection Points
  // z0Intersections.forEach((point) => console.log(point));
  // x0Intersections.forEach((point) => console.log(point));
  // xmidIntersections.forEach((point) => console.log(point));
  // x_midIntersections.forEach((point) => console.log(point));
  const returnPoints = [
    z0Intersections[0],
    z0Intersections[1],
    x0Intersections[0],
    x0Intersections[1],
    xmidIntersections[0],
    xmidIntersections[1],
    x_midIntersections[0],
    x_midIntersections[1],
  ];
  return returnPoints;
}

loadGirth();
