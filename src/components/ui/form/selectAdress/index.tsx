import { Country } from "data/country";
import { ChangeEventHandler } from "react";
import { CountryData, DistrictData, StateData, WardData } from "types/country";

import SelectInput from "components/ui/form/select";
import styles from "./index.module.scss";

export interface InputSelectAdressProps {
  onChange?: ChangeEventHandler;
  arrow?: boolean;
  required?: boolean;
  classname?: string;
  state?: boolean;
  districts?: boolean;
  col1?: string;
  col2?: string;
  col3?: string;
  col4?: string;
  selectedCountry: CountryData | null;
  selectedState: StateData | null;
  selectedDistrict: DistrictData | null;
  selectedWard: WardData | null;
  onHandleCountry: ChangeEventHandler;
  onHandleState: ChangeEventHandler;
  onHandleDistrict: ChangeEventHandler;
  onHandleWard: ChangeEventHandler;
}

const InputSelectAdress: React.FC<InputSelectAdressProps> = ({
  onChange,
  arrow,
  classname,
  col1,
  col2,
  col3,
  col4,
  selectedCountry,
  selectedState,
  selectedDistrict,
  selectedWard,
  onHandleCountry,
  onHandleState,
  onHandleDistrict,
  onHandleWard,
  ...props
}) => {
  return (
    <>
      <SelectInput
        customClass={col1}
        onChange={onHandleCountry}
        title="Quốc Gia"
        name="Quốc Gia"
        id="Quốc Gia"
        list={Country}
        arrow
      />
      <SelectInput
        customClass={col2}
        onChange={onHandleState}
        title="Tỉnh"
        name="Tỉnh"
        id="Tỉnh"
        list={selectedCountry?.state}
        arrow
      />
      <SelectInput
        customClass={col3}
        onChange={onHandleDistrict}
        title="Quận"
        name="Quận"
        id="Quận"
        list={selectedState?.districts}
        arrow
      />
      <SelectInput
        customClass={col4}
        onChange={onHandleWard}
        title="Phường"
        name="Phường"
        id="Phường"
        list={selectedDistrict?.wards}
        arrow
      />
    </>
  );
};
export default InputSelectAdress;
