import * as React from "react";
import Svg, { Defs, Image, Path, Pattern, Use } from "react-native-svg";

export function FeatureIcon(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0)" d="M0.0795288 0H20.0795288V20H0.0795288z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_285_309" transform="scale(.0039)" />
        </Pattern>
        <Image
          id="image0_285_309"
          width={256}
          height={256}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}