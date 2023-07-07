export interface Data {
  name: string;
  code: number;
  codename: string;
  division_type: string;
}
export interface CountryData {
  name: string;
  state: StateData[];
}

export interface StateData extends Data {
  phone_code: number;
  districts: DistrictData[];
}
export interface DistrictData extends Data {
  short_codename: string;
  wards: WardData[];
}

export interface WardData extends Data {
  short_codename: string;
}
