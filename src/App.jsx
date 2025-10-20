import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize GSAP scroll smoother
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  }, []);

  // Real loading detection for images & videos
  useEffect(() => {
    const images = Array.from(document.images);
    const videos = Array.from(document.querySelectorAll("video"));
    const totalAssets = images.length + videos.length;

    if (totalAssets === 0) {
      setProgress(100);
      setTimeout(() => setIsReady(true), 500);
      return;
    }

    let loaded = 0;

    const updateProgress = () => {
      loaded++;
      const percent = Math.min((loaded / totalAssets) * 100, 100);
      setProgress(percent);
      if (percent >= 100) {
        setTimeout(() => setIsReady(true), 500);
      }
    };

    images.forEach((img) => {
      if (img.complete) updateProgress();
      else img.addEventListener("load", updateProgress);
      img.addEventListener("error", updateProgress);
    });

    videos.forEach((vid) => {
      if (vid.readyState >= 3) updateProgress();
      else vid.addEventListener("loadeddata", updateProgress);
      vid.addEventListener("error", updateProgress);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", updateProgress);
        img.removeEventListener("error", updateProgress);
      });
      videos.forEach((vid) => {
        vid.removeEventListener("loadeddata", updateProgress);
        vid.removeEventListener("error", updateProgress);
      });
    };
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* ===== Real Loading Screen ===== */}
      {!isReady && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBE8D3] text-[#5A2E0C] font-extrabold transition-opacity duration-700">
          <h1 className="text-5xl sm:text-6xl tracking-wide animate-bounce mb-6">SPYLT</h1>
          <p className="mb-4 text-lg tracking-widest font-semibold">CHUGGING {Math.floor(progress)}%</p>
          <div className="relative h-2 overflow-hidden rounded-full w-64 bg-[#5A2E0C]/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-[#5A2E0C]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* ===== Main Content (hidden until fully loaded) ===== */}
      <div className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
        <NavBar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <HeroSection isReady={isReady} />
            <MessageSection isReady={isReady} />
            <FlavorSection isReady={isReady} />
            <NutritionSection isReady={isReady} />
            <BenefitSection isReady={isReady} />
            <TestimonialSection isReady={isReady} />
            <FooterSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
