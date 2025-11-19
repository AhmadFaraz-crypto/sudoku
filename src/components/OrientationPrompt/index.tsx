import React, { useEffect, useState } from "react";
import "./OrientationPrompt.css";

const OrientationPrompt: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      const isMobileDevice = window.innerWidth <= 780;
      setIsPortrait(isPortraitMode);
      setIsMobile(isMobileDevice);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isPortrait || !isMobile) {
    return null;
  }

  return (
    <div className="orientation-prompt-overlay">
      <div className="orientation-prompt-content">
        <div className="orientation-icon">📱</div>
        <h2 className="orientation-title">Please Rotate Your Device</h2>
        <p className="orientation-message">
          For the best gaming experience, please rotate your device to landscape mode.
        </p>
        <div className="orientation-arrow">↻</div>
      </div>
    </div>
  );
};

export default OrientationPrompt;

