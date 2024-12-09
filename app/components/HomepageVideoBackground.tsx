"use client";
import { useThemeContext } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

//For optimisation purpose we introduct lazy loading to our vide

const HomepageVideoBackground = () => {
  const { appearance } = useThemeContext();
  const [loadedVideo, setLoadedVideo] = useState(true);
  const [videoSource, setVideoSource] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setLoadedVideo(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    //Clean up
    {
      /* Its helpful to get the webm form of videos for better performance */
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    //459px
    <div
      style={{ width: "100%", height: "100vh", zIndex: -1 }}
      className="absolute object-fill blur-full"
    >
      {loadedVideo && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => console.log("Video loaded successfully")}
          onError={(e) => console.log("Video error", e)}
        >
          {/* For the path remeber the public folder is available at the root
        of our application */}
          <source src={`/videos/black1.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default HomepageVideoBackground;
