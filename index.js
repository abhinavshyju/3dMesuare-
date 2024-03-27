const FetchData = fetch("http://127.0.0.1:5500/UA_women_scaled1.json")
  .then((response) => response.json())
  .then((data) => {
    return data.body.result.metrics;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    throw error;
  });

FetchData.then((result) => {
  console.log({
    result: result,
  });
});
