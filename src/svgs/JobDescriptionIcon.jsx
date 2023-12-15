import * as React from "react";
import Svg, { Defs, Image, Path, Pattern, Use } from "react-native-svg";

export function JobDescriptionIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#jobDescription)" d="M0 0H18V18H0z" />
      <Defs>
        <Pattern
          id="jobDescription"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_132_2908" transform="scale(.0039)" />
        </Pattern>
        <Image
          id="image0_132_2908"
          width={256}
          height={256}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}
