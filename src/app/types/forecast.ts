type WindDirection = {
  Degrees: number;
  Localized: string;
  English: string;
};

type WindSpeed = {
  Value: number;
  Unit: string;
  UnitType: number;
};

type Temperature = {
  Value: number;
  Unit: string;
  UnitType: number;
};

type RealFeelTemperature = {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase: string;
};

type RelativeHumidity = {
  Minimum: number;
  Maximum: number;
  Average: number;
};

type WetBulbTemperature = {
  Minimum: Temperature;
  Maximum: Temperature;
  Average: Temperature;
};

type WetBulbGlobeTemperature = {
  Minimum: Temperature;
  Maximum: Temperature;
  Average: Temperature;
};

type SunMoon = {
  Rise: string;
  EpochRise: number;
  Set: string;
  EpochSet: number;
};

type MoonPhase = {
  Phase: string;
  Age: number;
};

type DegreeDaySummary = {
  Heating: Temperature;
  Cooling: Temperature;
};

type AirAndPollen = {
  Name: string;
  Value: number;
  Category: string;
  CategoryValue: number;
  Type?: string;
};

type Precipitation = {
  Value: number;
  Unit: string;
  UnitType: number;
};

type DayNight = {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  ShortPhrase: string;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  Wind: {
    Speed: WindSpeed;
    Direction: WindDirection;
  };
  WindGust: {
    Speed: WindSpeed;
    Direction: WindDirection;
  };
  TotalLiquid: Precipitation;
  Rain: Precipitation;
  Snow: Precipitation;
  Ice: Precipitation;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  HoursOfIce: number;
  CloudCover: number;
  Evapotranspiration: Precipitation;
  SolarIrradiance: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  RelativeHumidity: RelativeHumidity;
  WetBulbTemperature: WetBulbTemperature;
  WetBulbGlobeTemperature: WetBulbGlobeTemperature;
};

export type Forecast = {
  Date: string;
  EpochDate: number;
  Sun: SunMoon;
  Moon: SunMoon & MoonPhase;
  Temperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  RealFeelTemperature: {
    Minimum: RealFeelTemperature;
    Maximum: RealFeelTemperature;
  };
  RealFeelTemperatureShade: {
    Minimum: RealFeelTemperature;
    Maximum: RealFeelTemperature;
  };
  HoursOfSun: number;
  DegreeDaySummary: DegreeDaySummary;
  AirAndPollen: AirAndPollen[];
  Day: DayNight;
  Night: DayNight;
  Sources: string[];
  MobileLink: string;
  Link: string;
};
