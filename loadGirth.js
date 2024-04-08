const loadGirth = async () => {
  const girths = [
    // [
    //   "girth-chest",
    //   "Chest Contoured",
    //   "UA_women_scaled1.json",
    //   "UA_women_with_dress_r.json",
    //   "base",
    //   "withdress",
    // ],
    [
      "girth-bust",
      "Bust Contoured",
      "UA_women_scaled1.json",
      "UA_women_with_dress_r.json",
      "base",
      "withdress",
    ],
    // [
    //   "girth-waist",
    //   "Waist Contoured",
    //   "UA_women_scaled1.json",
    //   "UA_women_with_dress_r.json",
    //   "base",
    //   "withdress",
    // ],
    // [
    //   "girth-hip",
    //   "Hip Contoured",
    //   "UA_women_scaled1.json",
    //   "UA_women_with_dress_r.json",
    //   "base",
    //   "withdress",
    // ],
    // [
    //   "girth-butt",
    //   "Butt Contoured",
    //   "UA_women_scaled1.json",
    //   "UA_women_with_dress_r.json",
    //   "base",
    //   "withdress",
    // ],
    // Add other girths as needed...
  ];
  girths.forEach(async (girth) => {
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

    console.log(baseResult, dressResult);
    baseResult.forEach((point) => {
      console.log(calculateMinimumDistance(point, dressResult));
    });
  });
};
