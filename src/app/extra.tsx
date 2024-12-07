"use client";

import styles from "./page.module.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AirQualityGraph from "./airQuality";
const arr = ["Delhi", "Mumbai", "Bangalore", "Kolkata"];
export default function Home() {
  const [city, setCity] = useState("");
  const [foundCity, setFoundCity] = useState<string[]>([]);
  const [today, setToday] = useState();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [cityName, setCityName] = useState("");
  const [wholeData, setWholeData] = useState();
  const handleChange = (value: string) => {
    setCity(value);

    searchCity(value);
  };

  const searchCity = (value: string) => {
    if (value) {
      const found = arr.filter((i) =>
        i.toLowerCase().includes(value.toLowerCase())
      );
      if (found) {
        setFoundCity(found);
        // searchAPI(found);
      } else {
        setFoundCity([]);
      }
    } else {
      setFoundCity([]);
    }
  };

  const searchAPI = async (city: string) => {
    if (city) {
      setLoader(true);
      const res = await fetch(
        `https://api.waqi.info/feed/${city}/?token=b84668c2f903146b47f99923de0277ce251cc2e5`
      );

      const { data } = await res.json();

      setData(data.forecast.daily);
      setCityName(data.city.name);

      getTodaysData(data.forecast.daily);
      // data.forecast.daily.find((i)=>)
      setLoader(false);
    }
  };

  const getTodaysData = (data: any) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const todaysData = {};
    for (const key in data) {
      todaysData[key] = data[key].filter((item) => item.day === currentDate);
    }

    setToday(todaysData);
    analyzePollutants(todaysData);
    return todaysData;
  };

  const analyzePollutants = (data) => {
    const analysis = {};
    for (const pollutant in data) {
      const avgValue = data[pollutant][0].avg; // Assuming there's only one entry per pollutant
      if (avgValue <= 50) {
        analysis[pollutant] = "Safe";
      } else if (avgValue <= 100) {
        analysis[pollutant] = "Moderate";
      } else if (avgValue <= 150) {
        analysis[pollutant] = "Unhealthy for Sensitive Groups";
      } else if (avgValue <= 200) {
        analysis[pollutant] = "Unhealthy";
      } else if (avgValue <= 300) {
        analysis[pollutant] = "Very Unhealthy";
      } else {
        analysis[pollutant] = "Hazardous";
      }
    }
    setAnalysis(analysis);
    return analysis;
  };

  return (
    <main className={styles.main}>
      <div className="w-100 container">
        <div className={styles.inputBox}>
          <input
            name="city"
            value={city}
            onChange={({ target }) => handleChange(target.value)}
            placeholder="Search city"
          />

          <button className={styles.searchIconBtn}>
            {!loader ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
              >
                <path
                  clipRule="evenodd"
                  d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909ZM18 11a7 7 0 11-14 0 7 7 0 0114 0Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            ) : (
              <div className="spinner-border" role="status"></div>
            )}
          </button>
        </div>
        {!foundCity.length && (
          <div>
            <h1>Search a city</h1>
          </div>
        )}
        {foundCity && (
          <div className="card">
            <ul className="list-group">
              {foundCity.map((i) => (
                <li
                  key={i}
                  className={`${styles.citySelect} list-group-item`}
                  onClick={() => {
                    setCity(i);
                    searchAPI(i);
                    setFoundCity([]);
                  }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.dataBox}>
          {today && (
            <div className="card">
              <h1>{cityName}</h1>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <div className="fw-bold">Pollutants</div>

                  <div
                    className="d-flex justify-content-between"
                    style={{ width: 400 }}
                  >
                    <div className="pe-5 fw-bold">Avg</div>
                    <div className="pe-5 fw-bold">Min</div>
                    <div className="pe-5 fw-bold">Max</div>
                    <div className="fw-bold">Analysis</div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div>O3</div>

                  <div
                    className="d-flex justify-content-between"
                    style={{ width: 400 }}
                  >
                    <div className="pe-5">{today?.o3[0].avg}</div>
                    <div className="pe-5">{today?.o3[0].min}</div>
                    <div className="pe-5">{today?.o3[0].max}</div>
                    <div className="">{analysis.o3.slice(0, 5)}</div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div>PM10</div>

                  <div
                    className="d-flex  justify-content-between"
                    style={{ width: 400 }}
                  >
                    <div className="pe-5">{today?.pm10[0].avg}</div>
                    <div className="pe-5">{today?.pm10[0].min}</div>
                    <div className="pe-5">{today?.pm10[0].max}</div>
                    <div className="">{analysis.pm10.slice(0, 6)}</div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div>PM25</div>

                  <div
                    className="d-flex justify-content-between"
                    style={{ width: 400 }}
                  >
                    <div className="pe-5">{today?.pm25[0].avg}</div>
                    <div className="pe-5">{today?.pm25[0].min}</div>
                    <div className="pe-5">{today?.pm25[0].max}</div>
                    <div className=" d-flex justify-content-end">
                      {analysis.pm25.slice(0, 6)}
                    </div>
                  </div>
                </li>
              </ul>

              <div>
                <AirQualityGraph data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
