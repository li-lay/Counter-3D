import { Text3D } from "@react-three/drei";
import MonoFont from "./assets/fonts/Monomaniac One_Regular.json";

function TextModel({ count, textScale }) {
  return (
    <Text3D font={MonoFont} {...""} castShadow scale={textScale}>
      {count}
      <meshStandardMaterial color="#98971a" />
    </Text3D>
  );
}

export default TextModel;
