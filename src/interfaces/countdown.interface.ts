export interface CountdownLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface CountdownProperties {
  labels?: CountdownLabels;
  timeZone?: string;
  date?: string;
  time?: string;
  labelDate?: string;
  location?: string;
  locationLink?: string;
  color?: string;
}
