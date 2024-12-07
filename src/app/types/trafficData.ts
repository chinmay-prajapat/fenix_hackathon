export type LiveData = {
  JamsCount: string;
  JamsLength: string;
  TrafficIndexLive: string;
  UpdateDate: string;
  UpdateTime: string;
  UpdateWeekDay: string;
};

export type TrafficData = {
  JamsCount: string; // Assuming it's a string for now, could be number
  JamsLength: string; // Assuming it's a string for now, could be number
  TrafficIndexLive: string; // Assuming it's a string for now, could be number
  UpdateWeekDay: string;
};
export interface Traffic {
  LiveData: LiveData;
  WeekData: TrafficData;
}
