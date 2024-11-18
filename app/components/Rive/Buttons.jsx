import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
const RiveButton = ({ onClick }) => {
  const { RiveComponent, rive } = useRive({
    src: "app/assets/rive/button-product-test.riv",
    stateMachines: "State",
    useDevicePixelRatio: true,
    autoplay: true,
  });

  const onPress = useStateMachineInput(rive, "State", "Selected"); // Set initial value to 1

  return (
    <div
      onMouseUp={() => {
        onPress && onPress.value;
        onClick(onPress.value);
      }}
      style={{
        width: "360px",
        height: "240px",
        zIndex: 10,
      }}
    >
      <RiveComponent />
    </div>
  );
};

export default RiveButton;
