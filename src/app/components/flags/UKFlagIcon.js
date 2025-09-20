import React from 'react';
import { SvgIcon } from '@mui/material';

const UKFlagIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 600 300">
    <path fill="#00247d" d="M0 0h600v300H0z" />
    <path stroke="#fff" strokeWidth="60" d="m0 0 600 300m0-300L0 300" />
    <path stroke="#cf142b" strokeWidth="40" d="m0 0 600 300m0-300L0 300" />
    <path stroke="#fff" strokeWidth="100" d="M300 0v300M0 150h600" />
    <path stroke="#cf142b" strokeWidth="60" d="M300 0v300M0 150h600" />
  </SvgIcon>
);

export default UKFlagIcon;
