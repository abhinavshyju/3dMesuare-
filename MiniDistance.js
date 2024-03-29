const jsonWithDress = "./UA_women_with_dress_r (1).json";
const jsonWithoutDress = "./UA_women_scaled1.json";

const DataLoop = [
  // "label",
  "CF",
  "PSFR",
  "SSR",
  "PSBR",
  "CB",
  "PSBL",
  "SSL",
  "PSFL",
];

//Data to find from the json file (Label the name of nearby coordinates from the json)

// __________________________________________________________________________________________________________________________//
// If you want to find more points just add obejects in this array And also add the same thing in the " DataToDisplay".
// __________________________________________________________________________________________________________________________//

const DataToFind = [
  {
    label: "Bust", //girth
    CF: "Centre Chest Point", //landmark
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

// Data that return from the FindMinimumDistance Function
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

async function getgirthPoints(girthName) {
  try {
    const response = await fetch(jsonWithDress); // Adjust the path as needed
    const data = await response.json();

    const girth = data.body.result.metrics.girths.find(
      (item) => item.label === girthName
    );
    if (girth && girth.pointcollection) {
      return girth.pointcollection[0];
    } else {
      console.log(`Girth points with name '${girthName}' not found.`);
      return -1;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getLandmarkPoints(landmarkName) {
  try {
    const response = await fetch(jsonWithoutDress); // Adjust the path as needed
    const data = await response.json();

    const landmark = data.body.result.metrics.landmarkPoints.find(
      (item) => item.label === landmarkName
    );
    if (landmark && landmark.position) {
      //   console.log(landmark.position);
      return landmark.position;
    } else {
      console.log(`Landmark with name '${landmarkName}' not found.`);
      return -1;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

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

// getgirthPoints( "Bust Contoured");
// getLandmarkPoints( "Centre Chest Point");
// getgirth("Centre Chest Point")

const calculateMinimumDistance = async (landmarkLabel, girthLabel) => {
  try {
    const landmark = await getLandmarkPoints(landmarkLabel);
    const pointsset = await getgirthPoints(girthLabel);
    let minDistance = Infinity; // Start with a very large number

    if (pointsset != -1 && landmark != -1) {
      pointsset.forEach((point2) => {
        // distance = sqrt( x^2 + x^2 + y^2 )
        const distance = Math.sqrt(
          Math.pow(landmark.x - point2.x, 2) +
            Math.pow(landmark.y - point2.y, 2) +
            Math.pow(landmark.z - point2.z, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
        }
      });
      return minDistance;
    } else {
      return -1;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const resultJosn = async () => {
  try {
    for (const z of DataToDisplay) {
      for (const i of DataToFind) {
        const girth = await getgirth(i.label);
        if (z.label === i.label) {
          for (const j of DataLoop) {
            z.girth = girth;
            z[j] =
              (await calculateMinimumDistance(i[j], i.label)) == -1
                ? "Undefined"
                : await calculateMinimumDistance(i[j], i.label);
          }
        }
      }
    }
    await displayDataInTable(DataToDisplay);
  } catch (error) {
    console.error("Error:", error);
  }
};
resultJosn();

const CheckIndividual = async (landmarkLabel, girthLabel) => {
  console.log(
    "-----------------------------------------------\n   Minimum distance : " +
      (await calculateMinimumDistance(landmarkLabel, girthLabel)) +
      "\n-----------------------------------------------"
  );
};

CheckIndividual("Centre Chest Point", "Bust");
