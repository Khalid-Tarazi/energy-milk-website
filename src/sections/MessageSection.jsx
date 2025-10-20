import { useEffect } from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const MessageSection = ({ isReady }) => {
  useEffect(() => {
    if (!isReady) return; // wait until loading is done

    // SplitText
    const firstMsgSplit = new SplitText(".first-message", { type: "words" });
    const secMsgSplit = new SplitText(".second-message", { type: "words" });
    const paragraphSplit = new SplitText(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    // Animate first message
    gsap.to(firstMsgSplit.words, {
      color: "#faeade",
      stagger: 0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".first-message",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });

    // Animate second message
    gsap.to(secMsgSplit.words, {
      color: "#faeade",
      stagger: 0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".second-message",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });

    // Reveal headline scroll
    gsap.to(".msg-text-scroll", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "circ.inOut",
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 70%",
      },
    });

    // Animate paragraph
    gsap.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      duration: 1,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top 80%",
      },
    });

    // Refresh ScrollTrigger positions after setup
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      firstMsgSplit.revert();
      secMsgSplit.revert();
      paragraphSplit.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isReady]);

  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Stir up your fearless past and</h1>

            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown">Fuel Up</h2>
              </div>
            </div>

            <h1 className="second-message">
              your future with every gulp of Perfect Protein
            </h1>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                Rev up your rebel spirit and feed the adventure of life with
                SPYLT, where you’re one chug away from epic nostalgia and
                fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
