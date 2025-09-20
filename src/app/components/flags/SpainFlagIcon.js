import React from 'react';
import { SvgIcon } from '@mui/material';

const SpanishFlagIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 1200 800">
    {/* Flag Stripes */}
    <path fill="#C60B1E" d="M0 0h1200v200H0z" /> {/* Top Red Stripe */}
    <path fill="#FFC400" d="M0 200h1200v400H0z" /> {/* Middle Yellow Stripe */}
    <path fill="#C60B1E" d="M0 600h1200v200H0z" /> {/* Bottom Red Stripe */}

    {/* Coat of Arms Group - Positioned and Scaled */}
    <g transform="translate(300 400) scale(0.666667)">
      {/* Main Shield Outline (Often not drawn as a separate path in official versions but helpful for context) */}
      {/* <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="#000" strokeWidth="2.5" /> */}

      {/* Quarter 1: Castile (Castle) */}
      <g id="castile">
        <path fill="#C60B1E" d="M-150-150h150v150h-150z" /> {/* Background for Castile */}
        <path fill="#C9940A" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" d="M-90-130c0-10 10-10 10-20h60c0 10 10 10 10 20v80h-80zM-80-130h60v-10h-60zM-90-130v80h80v-80zM-85-140l5-10 5 10m-30 0l5-10 5 10m-30 0l5-10 5 10M-110-100h120v60h-120zM-100-90v-10h10v10zM-80-90v-10h10v10zM-60-90v-10h10v10z"/> {/* Simplified Castle Outline with details */}
        <path fill="#E8B124" stroke="#000" strokeWidth="1.5" d="M-100-110h40v40h-40zM-60-110h40v40h-40zM-80-70h40v40h-40z"/> {/* Castle Towers */}
        <path fill="#C9940A" stroke="#000" strokeWidth="1.5" d="M-110-110l60-60M-110-50l60-60M-50-110l60-60M-50-50l60-60"/> {/* Grout lines for bricks */}
      </g>

      {/* Quarter 2: León (Lion) */}
      <g id="leon">
        <path fill="#fff" d="M0-150h150v150H0z" /> {/* Background for León */}
        <path fill="#C60B1E" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" d="M75-90c-15-5-25 15-20 25 10 20 20 20 30 0 5-10-5-20-10-25zM65-60c0 5 5 10 10 10 5 0 10-5 10-10s-5-10-10-10-10 5-10 10zM60-80l-5 5-5-5-5 5-5-5-5 5-5-5-5 5M50-100c-5-5-5-10 0-15 5-5 10-5 15 0 5 5 5 10 0 15zM45-120c0-5 5-10 10-10 5 0 10 5 10 10s-5 10-10 10-10-5-10-10zM40-140c0-5 5-10 10-10 5 0 10 5 10 10s-5 10-10 10-10-5-10-10z"/> {/* Highly simplified lion - real detail is incredibly complex */}
      </g>

      {/* Quarter 3: Aragon (Pallets) */}
      <g id="aragon">
        <path fill="#FFC400" d="M-150 0h150v150h-150z" /> {/* Background for Aragon */}
        <path fill="#C60B1E" d="M-130 0h20v150h-20zM-90 0h20v150h-20zM-50 0h20v150h-20zM-10 0h20v150h-20z"/> {/* Red Pallets */}
      </g>

      {/* Quarter 4: Navarre (Chains) */}
      <g id="navarre">
        <path fill="#C60B1E" d="M0 0h150v150H0z" /> {/* Background for Navarre */}
        <path fill="#FFC400" stroke="#000" strokeWidth="1.5" d="M20 20h20v20h-20zM60 20h20v20h-20zM100 20h20v20h-20zM20 60h20v20h-20zM60 60h20v20h-20zM100 60h20v20h-20zM20 100h20v20h-20zM60 100h20v20h-20zM100 100h20v20h-20z"/> {/* Squares representing chains */}
        <path fill="none" stroke="#FFC400" strokeWidth="5" d="M30 30L50 30L50 50L30 50L30 30Z M70 30L90 30L90 50L70 50L70 30Z M110 30L130 30L130 50L110 50L110 30Z M30 70L50 70L50 90L30 90L30 70Z M70 70L90 70L90 90L70 90L70 70Z M110 70L130 70L130 90L110 90L110 70Z M30 110L50 110L50 130L30 130L30 110Z M70 110L90 110L90 130L70 130L70 110Z M110 110L130 110L130 130L110 130Z"/> {/* Connecting lines for chains */}
      </g>

      {/* Base: Granada (Pomegranate) */}
      <g id="granada">
        <path fill="#fff" d="M-150 150h300v150h-300z" /> {/* Base background for Granada */}
        <path fill="#C60B1E" d="M-150 150h150v150h-150z" />
        <path fill="#C60B1E" d="M0 150h150v150H0z" />
        <circle cx="0" cy="225" r="40" fill="#E8B124" stroke="#000" strokeWidth="1.5" /> {/* Pomegranate fruit */}
        <path fill="#006600" d="M0 185c-5 0-10 10-10 20s5 20 10 20c5 0 10-10 10-20s-5-20-10-20zM0 175c-5 0-10 10-10 20s5 20 10 20c5 0 10-10 10-20s-5-20-10-20z"/> {/* Pomegranate stem/leaves */}
      </g>

      {/* Escutcheon: Bourbon-Anjou (Fleurs-de-lis) */}
      <g id="bourbon">
        <rect x="-37.5" y="-37.5" width="75" height="75" fill="#00008B" stroke="#000" strokeWidth="1.5" /> {/* Blue background */}
        <path fill="#FFC400" stroke="#000" strokeWidth="1" d="M0-25c5 0 5 10 0 10-5 0-5-10 0-10zM0-15c5 0 5 10 0 10-5 0-5-10 0-10zM0-5c5 0 5 10 0 10-5 0-5-10 0-10zM-10-20h20M-10 0h20M-10 20h20"/> {/* Simplified Fleur-de-lis */}
      </g>

      {/* Royal Crown */}
      <g id="royal-crown" transform="translate(0 -200)">
        <path fill="#FFC400" stroke="#000" strokeWidth="2" d="M-70-10c0-10 10-20 20-20h100c10 0 20 10 20 20v20h-140z"/>
        <path fill="#930800" d="M-50-30h100v-20h-100z"/>
        <circle cx="0" cy="-60" r="10" fill="#E8B124" stroke="#000" strokeWidth="1.5"/>
        <path fill="#C9940A" d="M-30-50l30-30 30 30"/>
        <path fill="#fff" d="M-40-20c0-10 10-15 20-15h40c10 0 20 5 20 15z"/>
      </g>

      {/* Pillars of Hercules */}
      <g id="pillars">
        {/* Left Pillar */}
        <path fill="#E8B124" stroke="#000" strokeWidth="2" d="M-220 150v-200h20v200zM-210-50c0-10 10-10 10-20h-10c0-10 10-10 10-20h-10c0-10 10-10 10-20h-10c0-10 10-10 10-20h-10"/> {/* Base */}
        <text x="-210" y="50" fontSize="20" fontWeight="bold" fill="#000" transform="rotate(-90 -210 50)">PLUS</text>
        <text x="-210" y="0" fontSize="20" fontWeight="bold" fill="#000" transform="rotate(-90 -210 0)">ULTRA</text>

        {/* Right Pillar */}
        <path fill="#E8B124" stroke="#000" strokeWidth="2" d="M200 150v-200h20v200zM210-50c0-10 10-10 10-20h-10c0-10 10-10 10-20h-10c0-10 10-10 10-20h-10c0-10 10-10 10-20h-10"/>
        <text x="210" y="50" fontSize="20" fontWeight="bold" fill="#000" transform="rotate(90 210 50)">PLUS</text>
        <text x="210" y="0" fontSize="20" fontWeight="bold" fill="#000" transform="rotate(90 210 0)">ULTRA</text>
      </g>

      {/* Imperial Crown on Left Pillar */}
      <g id="imperial-crown-left" transform="translate(-210 -100) scale(0.5)">
        <path fill="#FFC400" stroke="#000" strokeWidth="2" d="M-70-10c0-10 10-20 20-20h100c10 0 20 10 20 20v20h-140z"/>
        <path fill="#930800" d="M-50-30h100v-20h-100z"/>
        <circle cx="0" cy="-60" r="10" fill="#E8B124" stroke="#000" strokeWidth="1.5"/>
        <path fill="#C9940A" d="M-30-50l30-30 30 30"/>
      </g>

      {/* Royal Crown on Right Pillar */}
      <g id="royal-crown-right" transform="translate(210 -100) scale(0.5)">
        <path fill="#FFC400" stroke="#000" strokeWidth="2" d="M-70-10c0-10 10-20 20-20h100c10 0 20 10 20 20v20h-140z"/>
        <path fill="#930800" d="M-50-30h100v-20h-100z"/>
        <circle cx="0" cy="-60" r="10" fill="#E8B124" stroke="#000" strokeWidth="1.5"/>
        <path fill="#C9940A" d="M-30-50l30-30 30 30"/>
      </g>
    </g>
  </SvgIcon>
);

export default SpanishFlagIcon;
