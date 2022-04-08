import React, { useEffect, useState } from "react";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import { useDispatch } from "react-redux";
import helpers from "./helpers";

const DATA_URL =
  "https://gist.githubusercontent.com/ejdoh1/1b58de3ccfcfeed1e84c29c35867dbe9/raw/1c151de13ceecc17b73ca9fb1defffdec7f285a6/sampleTripData.json";

const sampleConfig = {
  visState: {
    filters: [
      {
        id: "me",
        dataId: "test_trip_data",
        name: "tpep_pickup_datetime",
        type: "timeRange",
        enlarged: true,
      },
    ],
  },
};

function App() {
  const [sampleTripData, setSampleTripData] = useState();
  const dispatch = useDispatch();

  const fetchData = async () => {
    setSampleTripData(await helpers.httpGet(DATA_URL));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sampleTripData &&
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "Sample Taxi Trips in New York City",
              id: "test_trip_data",
            },
            data: sampleTripData,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: sampleConfig,
        })
      );
  }, [dispatch, sampleTripData]);

  return (
    <KeplerGl
      id="map"
      width={window.innerWidth}
      mapboxApiAccessToken="pk.eyJ1IjoiZWpkb2gxIiwiYSI6ImNrNmZyNnp6MTJieDczbXFqM3J1cjl3NngifQ.VhFgmTGc0dTSUm3QwMD5jQ"
      height={window.innerHeight}
    />
  );
}

export default App;
