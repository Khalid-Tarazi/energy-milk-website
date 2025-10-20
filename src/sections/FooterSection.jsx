import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";

const FooterSection = () => {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const footerRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        // Only observe and control video for non-mobile
        if (!isMobile) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    if (entry.isIntersecting) {
                        // Delay 2 seconds before playing
                        setTimeout(() => {
                            if (videoRef.current) {
                                videoRef.current.play();
                            }
                        }, 2000);
                    }
                },
                { threshold: 0.5 } // 50% of footer visible
            );

            if (footerRef.current) observer.observe(footerRef.current);

            return () => observer.disconnect();
        }
    }, [isMobile]);

    return (
        <section ref={footerRef} className="footer-section">
            <img
                src="/images/footer-dip.png"
                alt=""
                className="w-full object-cover -translate-y-1"
            />

            <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
                <div className="overflow-hidden z-10">
                    <h1 className="general-title text-center text-milk py-5">
                        #CHUGRESPONSIBLY
                    </h1>
                </div>

                {isMobile ? (
                    <img
                        src="/images/footer-drink.png"
                        className="absolute top-0 object-contain"
                        alt="footer drink"
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src="/videos/splash.mp4"
                        playsInline
                        muted
                        className="absolute top-0 object-contain mix-blend-lighten"
                    />
                )}

                <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
                    <div className="social-btn">
                        <img src="./images/yt.svg" alt="YouTube" />
                    </div>
                    <div className="social-btn">
                        <img src="./images/insta.svg" alt="Instagram" />
                    </div>
                    <div className="social-btn">
                        <img src="./images/tiktok.svg" alt="TikTok" />
                    </div>
                </div>

                <div className="mt-30 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
                    <div className="flex items-center md:gap-16 gap-5">
                        <div>
                            <p>SPYLT Flavors</p>
                        </div>
                        <div>
                            <p>Chug Club</p>
                            <p>Student Marketing</p>
                            <p>Dairy Dealers</p>
                        </div>
                        <div>
                            <p>Company</p>
                            <p>Contacts</p>
                            <p>Tasty Talk</p>
                        </div>
                    </div>

                    <div className="md:max-w-lg">
                        <p>
                            Get Exclusive Early Access and Stay Informed About Product
                            Updates, Events, and More!
                        </p>
                        <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full placeholder:font-sans placeholder:text-[#999999]"
                            />
                            <img src="/images/arrow.svg" alt="arrow" />
                        </div>
                    </div>
                </div>

                <div className="copyright-box">
                    <p>Copyright © 2025 Spylt - All Rights Reserved</p>
                    <div className="flex items-center gap-7">
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
