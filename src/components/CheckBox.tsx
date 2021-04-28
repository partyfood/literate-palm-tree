import { Checkbox } from "@material-ui/core";
import React from "react";
import { isAndroid } from "react-device-detect";
import styled from "styled-components";

import checkbox from "../assets/checkbox.svg";
import checkboxChecked from "../assets/checkboxChecked.svg";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  readOnly?: boolean;
};

export const CheckBox = ({ onChange, checked, readOnly = false }: Props) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return isAndroid ? (
    <StyledCheckbox
      checked={checked}
      onClick={handleClick}
      color="primary"
      readOnly={readOnly}
    />
  ) : (
    <IOSCheckBox
      src={checked ? checkboxChecked : checkbox}
      onClick={readOnly ? undefined : handleClick}
    />
  );
};

const IOSCheckBox = styled.img`
  height: 32px;
  display: inline-block;
  vertical-align: top;
  margin: 0 8px;
`;

const StyledCheckbox = styled(Checkbox)`
  display: inline-block;
  vertical-align: top;
  margin: 0 8px !important;
  padding: 0 !important;

  &.MuiCheckbox-colorPrimary {
    color: #fff !important;
  }
`;
