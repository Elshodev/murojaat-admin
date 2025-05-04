import { noConnectAnim } from "@/assets/lottieAnimation/index.js";
import Lottie from "lottie-react";

function NoConnection() {
  return (
    <div className="h-screen grid place-content-center">
      <Lottie
        loop={true}
        animationData={noConnectAnim}
        className="w-[40vw] h-auto"
      />
    </div>
  );
}

export default NoConnection;
