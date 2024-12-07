"use client";
import axios from "axios";
import Style from "./page.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Forecast } from "./types/forecast";
import { CurrentForecast } from "./types/currentForecaste";
import Image from "next/image";
import moment from "moment";
import Maps from "./components/googleMap";
import { WeatherData } from "./types/hourlyData";
import HourlyWeatherChart from "./components/hourlyGraph";
import TrafficDashboard from "./components/trafficDashbar";
import TrafficChart from "./components/TrafficChart";

const myData = require("./static/data.json");
const hourlyData = require("./static/hourlyData.json");
const myCurrentCondition = require("./static/currentCondition.json");
const apikey = process.env.NEXT_PUBLIC_API_KEY;
const Home = () => {
  const [error, setError] = useState("");
  const [location, setLocation] = useState({
    lat: 24.6083586,
    lng: 73.6636725,
  });
  const [liveTrafficData, setTrafficLiveData] = useState({
    live_data: {
      JamsCount: "44",
      JamsLength: "12.6",
      TrafficIndexLive: "32",
      UpdateDate: "2024-06-14",
      UpdateTime: "06:46:30",
      UpdateWeekDay: "Friday",
    },
    week_data: [
      {
        JamsCount: "42",
        JamsLength: "18.325",
        TrafficIndexLive: "25",
        UpdateWeekDay: "Friday",
      },
      {
        JamsCount: "46",
        JamsLength: "19.912499999999998",
        TrafficIndexLive: "25",
        UpdateWeekDay: "Monday",
      },
      {
        JamsCount: "74",
        JamsLength: "38.30833333333333",
        TrafficIndexLive: "36",
        UpdateWeekDay: "Saturday",
      },
      {
        JamsCount: "27",
        JamsLength: "9.841666666666667",
        TrafficIndexLive: "15",
        UpdateWeekDay: "Sunday",
      },
      {
        JamsCount: "42",
        JamsLength: "16.291666666666668",
        TrafficIndexLive: "23",
        UpdateWeekDay: "Thursday",
      },
      {
        JamsCount: "45",
        JamsLength: "18.191666666666666",
        TrafficIndexLive: "25",
        UpdateWeekDay: "Tuesday",
      },
      {
        JamsCount: "46",
        JamsLength: "20.075",
        TrafficIndexLive: "25",
        UpdateWeekDay: "Wednesday",
      },
    ],
  });
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<WeatherData[]>(hourlyData);
  const [currentConditionData, setCurrentConditionData] =
    useState<CurrentForecast[]>(myCurrentCondition);
  const [locationData, setLocationData] = useState<Forecast[]>(myData);

  const getTrafficData = async (city: string) => {
    try {
      const { data } = await axios.post(
        "https://asia-south1-fenixwork-projects.cloudfunctions.net/function-3/traffic_data",
        { city_name: city }
      );
      if (data.live_data.JamsCount) {
        setTrafficLiveData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getHourlyData = async (key: number) => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}`,
      {
        params: {
          apikey,
          metric: true,
        },
      }
    );
    setHourlyWeatherData(data);
  };
  const getCurrentCondition = async (key: number) => {
    try {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${key}`,
        {
          params: {
            apikey,
            details: true,
          },
        }
      );

      setCurrentConditionData(data);
    } catch (e) {}
  };
  const getLocationKey = async (lat: number, long: number) => {
    try {
      const { data } = await axios.get(
        "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
        {
          params: {
            apikey,
            q: `${lat}, ${long}`,
          },
        }
      );

      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const getWeatherData = async (key: number) => {
    const { data } = await axios(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}`,
      { params: { apikey, details: true } }
    );
    const { DailyForecasts } = data;
    setLocationData(DailyForecasts);
  };

  const getLocationCoordinates = useCallback(
    (coords: { lat: number; lng: number }) => {
      console.log(coords);
      setLocation(coords);
    },
    []
  );

  useEffect(() => {
    async function getCurrentLocationData() {
      if (location.lat) {
        const res = await getLocationKey(location.lat, location.lng);
        await getCurrentCondition(res.Key);
        await getHourlyData(res.Key);
        await getWeatherData(res.Key);

        console.log();
        await getTrafficData(String(res.EnglishName).toLocaleLowerCase());
      }
    }

    getCurrentLocationData();
  }, [location.lat, location.lng]);

  const getCelcius = (value: number) => {
    return (5 / 9) * (value - 32);
  };
  console.log(liveTrafficData);
  return (
    <div className={Style.parentBox}>
      <div className="container">
        <div className={Style.childBox}>
          <div className={Style.bar}>
            <div className="d-flex  align-items-center">
              <div>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M570.8 742c0.5-2.9 0.9-5.8 0.9-8.8V418.5H458.4v314.6c0 3 0.4 5.9 0.9 8.8-34.3 19.5-57.5 56.3-57.5 98.5 0 62.6 50.7 113.3 113.3 113.3 62.6 0 113.3-50.7 113.3-113.3-0.1-42.2-23.3-79-57.6-98.4z"
                    fill="#F59558"
                  />
                  <path
                    d="M594.3 730.3V194.8c0-43.7-35.6-79.3-79.3-79.3s-79.3 35.6-79.3 79.3v535.4c-35.2 25.4-56.6 66.5-56.6 110.2 0 75 61 135.9 135.9 135.9s136-60.8 136-135.8c0-43.7-21.4-84.8-56.7-110.2zM515 931.1c-50 0-90.6-40.6-90.6-90.6 0-32.1 17.4-62.1 45.3-78.4 7-4 11.3-11.5 11.3-19.6v-40.8h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481V498h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481V226h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-8.5c0-18.7 15.2-34 34-34 18.7 0 34 15.2 34 34v547.7c0 8.1 4.3 15.6 11.3 19.6 28 16.2 45.3 46.2 45.3 78.4 0.1 49.9-40.6 90.5-90.6 90.5z"
                    fill="#211F1E"
                  />
                </svg>
              </div>

              <div className="d-flex flex-column">
                <div>
                  <span>Temperature</span>
                </div>

                <div>
                  <p>
                    {currentConditionData[0].Temperature.Metric.Value}
                    &deg;C
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex  align-items-center">
              <div>
                <svg
                  fill="#000000"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23,11a5.021,5.021,0,0,1-2.5,4.331,1,1,0,0,1-1-1.732A3,3,0,0,0,18,8a2.979,2.979,0,0,0-1,.188A1,1,0,0,1,15.73,7.6a3.977,3.977,0,0,0-7.46,0A1,1,0,0,1,7,8.188,2.961,2.961,0,0,0,3,11a3.011,3.011,0,0,0,1.5,2.6,1,1,0,0,1-1,1.732A5,5,0,0,1,6,6a4.608,4.608,0,0,1,.783.067,5.971,5.971,0,0,1,10.434,0A4.608,4.608,0,0,1,18,6,5.006,5.006,0,0,1,23,11ZM12,21c-2.579,0-4-1.35-4-3.8,0-3.243,3.237-5.87,3.375-5.981a1,1,0,0,1,1.25,0C12.763,11.33,16,13.957,16,17.2,16,19.65,14.579,21,12,21Zm0-2c1.665,0,2-.688,2-1.8a6.15,6.15,0,0,0-2-3.839A6.15,6.15,0,0,0,10,17.2C10,18.312,10.335,19,12,19Z" />
                </svg>
              </div>

              <div className="d-flex flex-column">
                <div>
                  <span>Humidity</span>
                </div>

                <div>
                  <p>{currentConditionData[0].RelativeHumidity}%</p>
                </div>
              </div>
            </div>

            <div className="d-flex  align-items-center">
              <div>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m 4 1 c -0.554688 0 -1 0.445312 -1 1 s 0.445312 1 1 1 h 1 c 0.074219 0.003906 0.144531 0.027344 0.214844 0.066406 c 0.199218 0.113282 0.289062 0.339844 0.230468 0.566406 c -0.058593 0.222657 -0.25 0.367188 -0.476562 0.367188 h -4.96875 v 2 h 4.96875 c 1.125 0 2.121094 -0.765625 2.410156 -1.855469 c 0.289063 -1.085937 -0.1875 -2.246093 -1.160156 -2.808593 c -0.320312 -0.183594 -0.671875 -0.285157 -1.023438 -0.316407 c -0.003906 0 -0.007812 0 -0.011718 -0.003906 c -0.0625 -0.007813 -0.121094 -0.015625 -0.183594 -0.015625 z m 8.480469 1 c -1.617188 0.011719 -3.058594 1.152344 -3.40625 2.769531 c -0.113281 0.542969 0.230469 1.074219 0.773437 1.1875 c 0.539063 0.117188 1.070313 -0.230469 1.183594 -0.769531 c 0.167969 -0.78125 0.886719 -1.285156 1.675781 -1.171875 c 0.792969 0.109375 1.34375 0.792969 1.289063 1.589844 c -0.054688 0.796875 -0.699219 1.394531 -1.496094 1.394531 h -12.5 v 2 h 12.5 c 1.828125 0 3.363281 -1.429688 3.492188 -3.253906 c 0.128906 -1.828125 -1.195313 -3.457032 -3.003907 -3.714844 c -0.171875 -0.023438 -0.339843 -0.03125 -0.507812 -0.03125 z m -12.480469 8 v 2 h 10 c 0.289062 0 0.5 0.210938 0.5 0.5 s -0.210938 0.5 -0.5 0.5 h -1 c -0.554688 0 -1 0.445312 -1 1 s 0.445312 1 1 1 h 1 c 1.367188 0 2.5 -1.132812 2.5 -2.5 s -1.132812 -2.5 -2.5 -2.5 z m 0 0"
                    fill="#2e3436"
                  />
                </svg>
              </div>

              <div className="d-flex flex-column">
                <div>
                  <span>Wind</span>
                </div>

                <div>
                  <p>{currentConditionData[0].Wind.Speed.Metric.Value}km/h</p>
                </div>
              </div>
            </div>

            <div className="d-flex  align-items-center">
              <div>
                <svg
                  fill="#000000"
                  width="50px"
                  height="50px"
                  viewBox="0 0 32 32"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13,30H9a2.0027,2.0027,0,0,1-2-2V20H9v8h4V20h2v8A2.0027,2.0027,0,0,1,13,30Z"
                    transform="translate(0 0)"
                  />
                  <polygon points="25 20 23.25 20 21 29.031 18.792 20 17 20 19.5 30 22.5 30 25 20" />
                  <rect x="15" y="2" width="2" height="5" />
                  <rect
                    x="21.6675"
                    y="6.8536"
                    width="4.958"
                    height="1.9998"
                    transform="translate(1.5191 19.3744) rotate(-45)"
                  />
                  <rect x="25" y="15" width="5" height="2" />
                  <rect x="2" y="15" width="5" height="2" />
                  <rect
                    x="6.8536"
                    y="5.3745"
                    width="1.9998"
                    height="4.958"
                    transform="translate(-3.253 7.8535) rotate(-45)"
                  />
                  <path
                    d="M22,17H20V16a4,4,0,0,0-8,0v1H10V16a6,6,0,0,1,12,0Z"
                    transform="translate(0 0)"
                  />
                  <rect
                    id="_Transparent_Rectangle_"
                    data-name="&lt;Transparent Rectangle&gt;"
                    fill="none"
                    width="32"
                    height="32"
                  />
                </svg>
              </div>

              <div className="d-flex flex-column">
                <div>
                  <span>UV Index</span>
                </div>

                <div>
                  <p>
                    {currentConditionData[0].UVIndex}

                    <span
                      style={{
                        color:
                          currentConditionData[0].UVIndex > 2
                            ? "#FFFF00"
                            : currentConditionData[0].UVIndex > 6
                            ? "#FFA500"
                            : currentConditionData[0].UVIndex > 8
                            ? "#FF0000"
                            : currentConditionData[0].UVIndex >= 11
                            ? "#8B00FF"
                            : "#00FF00",
                      }}
                    >
                      {" "}
                      {currentConditionData[0].UVIndexText}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex  align-items-center">
              <div>
                <svg
                  fill="#000000"
                  height="50px"
                  width="50px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 459.841 459.841"
                >
                  <g>
                    <g>
                      <path
                        d="M459.826,270.571L459.826,270.571c-4-62.4-29.6-120.3-72.2-163c-40.5-40.6-92.7-63.8-147.7-66v-21.7c0-5.5-4.5-10-10-10
			s-10,4.5-10,10v21.8c-54.8,2.5-106.8,25.8-147.1,66.2c-42.6,42.6-68.4,100.3-72.8,162.5c0,0.1,0,0.1,0,0.2
			c-0.4,5.5,3.8,10.3,9.3,10.7c0.2,0,0.5,0,0.7,0c5.1,0,9.5-3.9,9.9-9.1c2.7-30.3,30.2-53.1,63.9-53.1c33.4,0,61.1,23.2,63.1,52.9
			c0.3,4.9,4.2,9,9.3,9.3c5.5,0.4,10.3-3.8,10.6-9.3c1.8-26.7,24.3-48.1,53.1-52.2v189.4c0,0.2,0,0.3,0,0.5
			c1,22.6,19.6,40.3,42.2,40.3c22.4,0,40.6-18.6,40.6-41.5c0-5.5-4.5-10-10-10s-10,4.5-10,10c0,12.1-9.1,21.5-20.6,21.5
			c-11.9,0-21.6-9.2-22.2-21v-189.2c29,4,51.5,25.2,53.9,52.4c0.5,5.2,4.8,9.1,9.9,9.1c0.3,0,0.6,0,0.9,0c5-0.4,8.8-4.5,9.1-9.3
			c2-29.7,29.7-52.9,63.1-52.9c33.4,0,61,23.2,63,52.8c0.4,5.5,5.1,9.7,10.6,9.3C455.926,280.871,460.126,276.071,459.826,270.571z
			 M376.726,198.971c-21.1,0-41.2,7.2-56.5,20.2c-6.8,5.8-12.5,12.5-16.8,19.8c-4.4-7.4-10.1-14.1-17-19.9
			c-15.5-13-35.6-20.2-56.6-20.2c-21.1,0-41.1,7.2-56.5,20.2c-6.7,5.7-12.3,12.2-16.5,19.4c-4.3-7.2-9.8-13.8-16.5-19.4
			c-15.4-13-35.5-20.2-56.5-20.2c-19.6,0-38.4,6.2-53.5,17.7c28.3-90.4,107.9-155.3,199.7-155.3c0.4,0,0.9,0,1.3,0
			c91.7,0,170.8,64.6,198.5,155C414.826,205.171,396.226,198.971,376.726,198.971z"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="d-flex flex-column">
                <div>
                  <span>Precipitation</span>
                </div>

                <div>
                  <p>
                    {
                      currentConditionData[0].PrecipitationSummary.Precipitation
                        .Metric.Value
                    }
                    &nbsp;
                    {
                      currentConditionData[0].PrecipitationSummary.Precipitation
                        .Metric.Unit
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------Dashboard---------------------------------- */}
          <div className={Style.forecastBox}>
            <div className="d-flex" style={{ columnGap: 20 }}>
              <div className={`${Style.day} d-flex flex-column`}>
                <svg
                  width="400"
                  height="190"
                  viewBox="0 0 400 200"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ borderRadius: 20 }}
                >
                  <rect width="400" height="200" fill="lightblue">
                    <animate
                      attributeName="fill"
                      values="darkblue;lightblue;orange;darkblue"
                      dur="10s"
                      repeatCount="indefinite"
                    />
                  </rect>

                  <path
                    id="path"
                    d="M50,150 Q200,50 350,150"
                    fill="transparent"
                  />

                  <circle r="10" fill="yellow">
                    <animateMotion dur="10s" repeatCount="indefinite">
                      <mpath href="#path" />
                    </animateMotion>
                  </circle>

                  <rect y="150" width="400" height="50" fill="green" />
                </svg>

                <div className="d-flex align-items-center justify-content-between p-1">
                  <div className="d-flex">
                    <svg
                      className="Icon--icon--2aW0V TwcSunChart--sunIcon--FDjHW"
                      // set="current-conditions"
                      name="sunrise-line"
                      // theme=""
                      data-testid="Icon"
                      viewBox="0 0 24 24"
                    >
                      <title>Sun Rise</title>
                      <path
                        d="M10.862 6.052v5.329a.75.75 0 0 0 1.5 0V6.036l1.772 1.534a.75.75 0 0 0 .982-1.134l-3.003-2.601a.75.75 0 0 0-.982 0L8.128 6.436A.75.75 0 0 0 9.11 7.57l1.752-1.518zM21 19.128a.75.75 0 0 0 0-1.5H3.167a.75.75 0 1 0 0 1.5H21z"
                        fill="#F7C044"
                      ></path>
                    </svg>

                    <span>
                      {" "}
                      {moment(locationData[0].Sun.Rise).format("h:mm")}
                    </span>
                  </div>
                  <div className="d-flex">
                    <svg
                      className="Icon--icon--2aW0V TwcSunChart--sunIcon--FDjHW"
                      // set="current-conditions"
                      name="sunset-line"
                      // theme=""
                      data-testid="Icon"
                      viewBox="0 0 24 24"
                    >
                      <title>Sunset</title>
                      <path
                        d="M10.862 9.853L9.044 8.278a.75.75 0 1 0-.982 1.134l3.003 2.602a.75.75 0 0 0 .982 0l3.004-2.602a.75.75 0 0 0-.983-1.134l-1.706 1.478V4a.75.75 0 0 0-1.5 0v5.853zM21 19.075a.75.75 0 1 0 0-1.5H3.167a.75.75 0 1 0 0 1.5H21z"
                        fill="#005986"
                      ></path>
                    </svg>
                    <span>
                      {" "}
                      {moment(locationData[0].Sun.Set).format("h:mm")}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="d-flex w-100"
                style={{
                  background: "#005986",
                  borderRadius: 20,
                }}
              >
                <HourlyWeatherChart hourlyData={hourlyWeatherData} />
              </div>
            </div>
            <div style={{ borderRadius: 20 }}>
              <Maps getLocation={getLocationCoordinates} location={location} />
            </div>
            <div className={Style.forecast}>
              {/* <div className="w-100 h-100 ">
                <img alt="" src={"/weather1.jpg"} />
</div> */}
              <div className="d-flex align-items-center  w-100 h-100 justify-content-evenly">
                {locationData.map((forecast, index) => (
                  <div key={forecast.Date}>
                    <div className={Style.days}>
                      <span>{moment(forecast.Date).format("dddd")}</span>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                      <div>
                        <svg
                          width="50px"
                          height="50px"
                          viewBox="0 0 288 288"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>
                            ICONS / Forecast / Color / 01 - Sunny LK
                          </title>
                          <desc>Created with Sketch.</desc>
                          <g
                            id="ICONS-/-Forecast-/-Color-/-01---Sunny-LK"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g id="Sunny" stroke="#FF8700" stroke-width="9.6">
                              <path d="M144,0 L144,48" id="Path"></path>
                              <path d="M144,240 L144,288" id="Path"></path>
                              <path d="M0,144 L48,144" id="Path"></path>
                              <path
                                d="M211.872,76.128 L245.808,42.192"
                                id="Path"
                              ></path>
                              <path
                                d="M245.808,245.808 L211.872,211.872"
                                id="Path"
                              ></path>
                              <path
                                d="M76.128,76.128 L42.192,42.192"
                                id="Path"
                              ></path>
                              <circle
                                id="Oval"
                                cx="144"
                                cy="144"
                                r="76.8"
                              ></circle>
                              <path
                                d="M76.128,211.872 L42.192,245.808"
                                id="Path"
                              ></path>
                              <path d="M240,144 L288,144" id="Path"></path>
                            </g>
                          </g>
                        </svg>
                      </div>

                      <div>
                        <div className={Style.max}>
                          <span>
                            {Math.round(
                              getCelcius(
                                forecast.RealFeelTemperature.Maximum.Value
                              )
                            )}
                            &deg;C
                          </span>
                        </div>
                        <div className={Style.min}>
                          <span>
                            {Math.round(
                              getCelcius(
                                forecast.RealFeelTemperature.Minimum.Value
                              )
                            )}
                            &deg;C
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* --------------------------------------Traffic-------------------------- */}

          <div className={Style.traffic}>
            <TrafficDashboard liveData={liveTrafficData.live_data} />
            <div className="d-flex w-100 ">
              <TrafficChart weekDayData={liveTrafficData.week_data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
