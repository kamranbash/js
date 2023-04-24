import { IconStyleProp } from "./types";
import Svg, { Path } from "react-native-svg";

const KeyIcon = ({ size, color }: IconStyleProp) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 12" fill="none">
      <Path
        d="M6 9C6.83333 9 7.54167 8.70833 8.125 8.125C8.70833 7.54167 9 6.83333 9 6C9 5.16667 8.70833 4.45833 8.125 3.875C7.54167 3.29167 6.83333 3 6 3C5.16667 3 4.45833 3.29167 3.875 3.875C3.29167 4.45833 3 5.16667 3 6C3 6.83333 3.29167 7.54167 3.875 8.125C4.45833 8.70833 5.16667 9 6 9ZM6 12C4.33333 12 2.91667 11.4167 1.75 10.25C0.583333 9.08333 0 7.66667 0 6C0 4.33333 0.583333 2.91667 1.75 1.75C2.91667 0.583333 4.33333 0 6 0C7.35 0 8.52933 0.383333 9.538 1.15C10.546 1.91667 11.25 2.86667 11.65 4H20.025L22 5.975L18.5 9.975L16 8L14 10L12 8H11.65C11.2333 9.2 10.5083 10.1667 9.475 10.9C8.44167 11.6333 7.28333 12 6 12Z"
        fill={color}
      />
    </Svg>
  );
};

export default KeyIcon;
