type TemperatureUnit = {
  Value: number;
  Unit: string;
  UnitType: number;
};

type TemperatureWithPhrase = TemperatureUnit & {
  Phrase: string;
};

type Direction = {
  Degrees: number;
  Localized: string;
  English: string;
};

type Speed = {
  Metric: TemperatureUnit;
  Imperial: TemperatureUnit;
};

type Wind = {
  Direction: Direction;
  Speed: Speed;
};

type WindGust = {
  Speed: Speed;
};

type Visibility = {
  Metric: TemperatureUnit;
  Imperial: TemperatureUnit;
};

type Pressure = {
  Metric: TemperatureUnit;
  Imperial: TemperatureUnit;
};

type PressureTendency = {
  LocalizedText: string;
  Code: string;
};

type Precipitation = {
  Metric: TemperatureUnit;
  Imperial: TemperatureUnit;
};

type TemperatureRange = {
  Minimum: TemperatureUnit;
  Maximum: TemperatureUnit;
};

type TemperatureSummary = {
  Past6HourRange: TemperatureRange;
  Past12HourRange: TemperatureRange;
  Past24HourRange: TemperatureRange;
};

type PrecipitationSummary = {
  Precipitation: Precipitation;
  PastHour: Precipitation;
  Past3Hours: Precipitation;
  Past6Hours: Precipitation;
  Past9Hours: Precipitation;
  Past12Hours: Precipitation;
  Past18Hours: Precipitation;
  Past24Hours: Precipitation;
};

export type CurrentForecast = {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  RealFeelTemperature: {
    Metric: TemperatureWithPhrase;
    Imperial: TemperatureWithPhrase;
  };
  RealFeelTemperatureShade: {
    Metric: TemperatureWithPhrase;
    Imperial: TemperatureWithPhrase;
  };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  DewPoint: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  Wind: Wind;
  WindGust: WindGust;
  UVIndex: number;
  UVIndexText: string;
  Visibility: Visibility;
  ObstructionsToVisibility: string;
  CloudCover: number;
  Ceiling: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  Pressure: Pressure;
  PressureTendency: PressureTendency;
  Past24HourTemperatureDeparture: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  ApparentTemperature: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  WindChillTemperature: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  WetBulbTemperature: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  WetBulbGlobeTemperature: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  Precip1hr: {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
  };
  PrecipitationSummary: PrecipitationSummary;
  TemperatureSummary: TemperatureSummary;
  MobileLink: string;
  Link: string;
};
