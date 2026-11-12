
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Menu,
  X,
  Github,
  Linkedin,
  FileDown,
} from "lucide-react";
import DreamSequence from "@/components/DreamSequence";

const ChromeObject = dynamic(
  () => import("@/components/ChromeObject"),
  { ssr: false }
);

// ==========================================
// PERSONAL INFORMATION
// ==========================================

const GITHUB = "https://github.com/mridul-afk";
const EMAIL = "mridulbajpai25@gmail.com";

// Add your verified LinkedIn URL here.
const LINKEDIN = "";

// Add public/resume.pdf before enabling.
const RESUME = "";

// Add verified repository URLs.
const work = [
  {
    id: "01",
    name: "MINIPYPY",
    type: "THE ENGINE",
    line: "What happens when you stop treating computation as a black box?",
    detail:
      "A tensor and automatic differentiation engine built from scratch with C++ and CUDA. Exploring GPU computation and machine learning infrastructure.",
    state: "BUILT / EVOLVING",
    url: "",
  },
  {
    id: "02",
    name: "MORPHOS",
    type: "THE EXPERIMENT",
    line: "Can simple rules eventually give rise to adaptive behavior?",
    detail:
      "An artificial-life simulation exploring cells, evolution, and population dynamics through computational experiments.",
    state: "ACTIVE EXPERIMENT",
    url: "",
  },
  {
    id: "03",
    name: "MARKOV ATTENTION",
    type: "THE QUESTION",
    line: "Could explicit state transitions change how attention remembers?",
    detail:
      "An exploratory research concept investigating Markov transition priors in neural attention architectures.",
    state: "RESEARCH CONCEPT",
    url: "",
  },
];

const interests = [
  {
    n: "01",
    name: "INTELLIGENCE",
    copy:
      "Not just using models. Asking what makes learning possible.",
  },
  {
    n: "02",
    name: "COMPUTATION",
    copy:
      "Going beneath abstractions, into kernels, memory, and mathematics.",
  },
  {
    n: "03",
    name: "EMERGENCE",
    copy:
      "Exploring how simple components can produce surprising behavior.",
  },
  {
    n: "04",
    name: "GRAPHICS",
    copy:
      "Learning OpenGL and Vulkan, exploring real-time rendering, shaders, and game development.",
  },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);

  const [menu, setMenu] = useState(false);
  const [motion, setMotion] = useState(false);
  const [active, setActive] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  // ==========================================
  // SCROLL ANIMATIONS
  // ==========================================

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const reduced = media.matches;

    setMotion(!reduced);

    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    let raf = 0;

    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 70,
        opacity: 0,
        duration: 1.25,
        stagger: 0.12,
        ease: "power3.out",
      });

      const hero = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      hero
        .to(
          ".matrix-room",
          {
            scale: 1.5,
            yPercent: 12,
            filter: "brightness(.45) blur(5px)",
          },
          0
        )
        .to(
          ".hero-art",
          {
            yPercent: -25,
            scale: 0.72,
            rotate: 12,
          },
          0
        )
        .to(
          ".hero-title",
          {
            yPercent: -35,
            letterSpacing: "-.13em",
            opacity: 0.12,
          },
          0
        )
        .to(
          ".hero-bottom",
          {
            yPercent: -90,
            opacity: 0,
          },
          0
        )
        .to(
          ".room-hud",
          {
            yPercent: -90,
            opacity: 0,
          },
          0
        );

      gsap.utils
        .toArray<HTMLElement>(".reveal")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 65, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

      gsap.fromTo(
        ".story-head",
        {
          clipPath: "inset(0 100% 0 0)",
          x: -45,
        },
        {
          clipPath: "inset(0 0% 0 0)",
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-head",
            start: "top 85%",
            end: "bottom 42%",
            scrub: 1,
          },
        }
      );

      gsap.to(".mini-star", {
        rotate: 270,
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-intro",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".orbit-one", {
        rotate: 210,
        ease: "none",
        scrollTrigger: {
          trigger: ".curiosity",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".orbit-two", {
        rotate: -180,
        ease: "none",
        scrollTrigger: {
          trigger: ".curiosity",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".manifesto-text",
        { xPercent: -10, scale: 0.88 },
        {
          xPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top bottom",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );

      gsap.utils
        .toArray<HTMLElement>(".archive-row")
        .forEach((row, i) => {
          gsap.fromTo(
            row,
            {
              x: i % 2 ? 75 : -75,
              opacity: 0.15,
            },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 95%",
                end: "top 48%",
                scrub: 1,
              },
            }
          );

          const title = row.querySelector("h3");

          if (title) {
            gsap.fromTo(
              title,
              { letterSpacing: "-.12em" },
              {
                letterSpacing: "-.075em",
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top 95%",
                  end: "top 45%",
                  scrub: 1,
                },
              }
            );
          }
        });

      gsap.fromTo(
        ".future h2",
        {
          scale: 0.83,
          transformOrigin: "left center",
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".future",
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".footer-title",
        {
          y: 130,
          scale: 0.86,
          opacity: 0.2,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer",
            start: "top bottom",
            end: "center 60%",
            scrub: 1,
          },
        }
      );

      ScrollTrigger.refresh();
    }, root);

    return () => {
      cancelAnimationFrame(raf);
      lenis.off("scroll", update);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      setProgress(
        (d.scrollTop /
          Math.max(1, d.scrollHeight - window.innerHeight)) *
          100
      );
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main
      ref={root}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") {
          setPointer({
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
          });
        }
      }}
      style={
        {
          "--px": pointer.x,
          "--py": pointer.y,
        } as React.CSSProperties
      }
    >
      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div
        className="scroll-meter"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* NAVIGATION */}
      <header className="header">
        <a className="brand" href="#top">
          MRIDUL<span className="acid">.BAJPAI</span>
        </a>

        <span className="header-center">
          AI / GRAPHICS / SYSTEMS
        </span>

        <button
          className="menu-button"
          onClick={() => setMenu(!menu)}
          aria-label={
            menu ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menu}
        >
          {menu ? <X size={18} /> : <Menu size={18} />}
          <span>{menu ? "CLOSE" : "MENU"}</span>
        </button>
      </header>

      {menu && (
        <nav className="overlay" aria-label="Main navigation">
          {[
            ["HOME", "#top"],
            ["WHO I AM", "#about"],
            ["CURIOSITIES", "#curiosity"],
            ["WORK", "#work"],
            ["CONTACT", "#contact"],
          ].map(([label, href], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenu(false)}
            >
              <sup>0{i + 1}</sup>
              {label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
      )}

      {/* HERO */}
      <section id="top" className="hero">
        <div className="matrix-room" aria-hidden="true">
          <div className="room-ceiling" />
          <div className="room-left" />
          <div className="room-floor" />
          <div className="room-end" />
        </div>

        <div className="room-hud" aria-hidden="true">
          SYS.001 / HUMAN SIGNAL DETECTED
          <span>● LIVE</span>
        </div>

        <div className="hero-meta hero-reveal">
          <span>AI RESEARCH / GRAPHICS / CREATIVE CODE</span>
          <span>SCROLL TO MEET ME ↓</span>
        </div>

        <div
          className="hero-art"
          aria-label="Interactive metallic abstract sculpture"
        >
          {motion ? (
            <ChromeObject />
          ) : (
            <div className="fallback-orb" />
          )}
        </div>

        <div className="hero-content">
          <p className="eyebrow hero-reveal">
            <span className="signal" />
            HELLO, INTERNET. I'M MRIDUL.
          </p>

          <h1 className="hero-title hero-reveal">
            CURIOUS BY
            <br />
            <em>DEFAULT</em>
            <span className="acid">.</span>
          </h1>

          <div className="hero-bottom hero-reveal">
            <p>
              I like taking things apart—ideas, algorithms,
              systems—
              <br />
              to understand how they really work.
            </p>

            <a
              href="#about"
              className="circle-link"
              aria-label="Get to know me"
            >
              ↓
            </a>
          </div>
        </div>

        <div className="edge-label">
          MRIDUL BAJPAI — 001
        </div>
      </section>

      {/* CINEMATIC WORLD TRANSITION */}
      <DreamSequence />

      <div className="ticker" aria-hidden="true">
        <div>
          CURIOUS BY DEFAULT ✳ HUMAN AFTER ALL ✳ BUILD /
          BREAK / REPEAT ✳ THE FUTURE WAS YESTERDAY ✳
          CURIOUS BY DEFAULT ✳ HUMAN AFTER ALL ✳ BUILD /
          BREAK / REPEAT ✳ THE FUTURE WAS YESTERDAY ✳
        </div>
      </div>

      {/* ABOUT */}
      <section className="story-intro section" id="about">
        <div className="section-index reveal">
          [ 01 / A LITTLE ABOUT ME ]
        </div>

        <div className="story-layout">
          <div className="story-aside reveal">
            <span className="mini-star">✳</span>
            <span>
              NOT A RESUME.
              <br />
              MORE LIKE A WINDOW
              <br />
              INTO MY HEAD.
            </span>
          </div>

          <div>
            <h2 className="story-head reveal">
              I'M MORE INTERESTED IN <em>WHY</em> THINGS
              WORK THAN JUST MAKING THEM WORK.
            </h2>

            <p className="story-paragraph reveal">
              I'm Mridul, an undergraduate exploring
              artificial intelligence, mathematics and the
              machinery underneath modern computing. I enjoy
              building things from first principles, even
              when there's already a library that could do
              the job.
            </p>

            <p className="story-paragraph reveal">
              Some days that means writing CUDA kernels.
              Other days it means learning OpenGL and Vulkan,
              exploring game development and graphics, or
              thinking about whether simulated organisms can
              evolve. The common thread is curiosity.
            </p>

            <div className="story-signature reveal">
              MRIDUL / ALWAYS EXPERIMENTING ↗
            </div>
          </div>
        </div>
      </section>

      {/* CURIOSITY */}
      <section id="curiosity" className="curiosity section">
        <span className="section-index reveal">
          [ 02 / THE THINGS I CAN'T STOP THINKING ABOUT ]
        </span>

        <h2 className="curiosity-title reveal">
          A MIND FULL OF <em>WHAT IFS.</em>
        </h2>

        <p className="curiosity-lead reveal">
          Select a frequency. Here's what keeps pulling me
          back.
        </p>

        <div className="frequency">
          <div
            className="frequency-options"
            role="tablist"
            aria-label="Areas of curiosity"
          >
            {interests.map((item, i) => (
              <button
                key={item.n}
                role="tab"
                aria-selected={active === i}
                className={
                  active === i
                    ? "frequency-tab selected"
                    : "frequency-tab"
                }
                onClick={() => setActive(i)}
              >
                <sup>{item.n}</sup>
                {item.name}
                <span>↗</span>
              </button>
            ))}
          </div>

          <div
            className="frequency-display"
            role="tabpanel"
            key={active}
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="orbit-core">
              {["∞", "⌘", "✳", "◇"][active]}
            </div>

            <span className="frequency-meta">
              SIGNAL / {interests[active].n} — ACTIVE
            </span>

            <p>{interests[active].copy}</p>
          </div>
        </div>
      </section>

      <div
        className="ticker ticker-reverse"
        aria-hidden="true"
      >
        <div>
          NO BLUEPRINT FOR CURIOSITY ✳ EXPERIMENTAL HUMAN
          ✳ QUESTION EVERYTHING ✳ NO BLUEPRINT FOR
          CURIOSITY ✳ EXPERIMENTAL HUMAN ✳ QUESTION
          EVERYTHING ✳
        </div>
      </div>

      {/* PHILOSOPHY */}
      <section className="manifesto section">
        <span className="section-index reveal">
          [ 03 / MY APPROACH ]
        </span>

        <div className="manifesto-text reveal">
          LEARN THE THEORY.
          <br />
          <span>BREAK THE ABSTRACTION.</span>
          <br />
          BUILD THE THING.
          <br />
          <em>ASK BETTER QUESTIONS.</em>
        </div>

        <div className="manifesto-foot reveal">
          <span>THE PROCESS IS THE POINT.</span>
          <span>↓ KEEP GOING</span>
        </div>
      </section>

      {/* PROJECT ARCHIVE */}
      <section id="work" className="archive section">
        <div className="archive-heading reveal">
          <div>
            <span className="section-index">
              [ 04 / THINGS I'VE BEEN MAKING ]
            </span>

            <h2>
              PROOF OF <em>CURIOSITY.</em>
            </h2>
          </div>

          <p>
            Not a wall of project cards. Just a few things
            that show how my interests become experiments.
          </p>
        </div>

        <div className="archive-list">
          {work.map((p) => (
            <article
              className="archive-row reveal"
              key={p.id}
            >
              <span className="archive-number">
                /{p.id}
              </span>

              <div>
                <span className="archive-type">
                  {p.type}
                </span>

                <h3>{p.name}</h3>

                <p className="archive-question">
                  {p.line}
                </p>

                <p className="archive-detail">
                  {p.detail}
                </p>
              </div>

              <div className="archive-actions">
                <span className="archive-state">
                  {p.state}
                </span>

                {p.url && (
                  <a
                    className="archive-visit"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Explore ${p.name} on GitHub`}
                  >
                    VIEW CODE
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="archive-note reveal">
          These are selected snapshots, not finished
          answers. More experiments are always in progress.
        </p>
      </section>

      {/* FUTURE */}
      <section className="future section">
        <span className="section-index reveal">
          [ 05 / WHAT'S NEXT? ]
        </span>

        <div className="future-grid">
          <h2 className="reveal">
            I DON'T KNOW <em>EXACTLY</em> WHERE THIS GOES.
          </h2>

          <div className="reveal">
            <p>And that's what makes it exciting.</p>

            <p>
              I'm drawn to systems that can learn, adapt
              and surprise us—and to the low-level
              engineering that makes those systems possible.
            </p>

            <p>
              For now, I'm learning in public, building
              experiments and following interesting
              questions wherever they lead.
            </p>

            <span className="future-note">
              CURRENT STATUS: STILL CURIOUS ◉
            </span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer
        id="contact"
        className="footer section"
      >
        <span className="section-index reveal">
          [ 06 / YOUR TURN ]
        </span>

        <p className="reveal">
          HAVE A QUESTION, AN IDEA, OR JUST WANT TO SAY
          HELLO?
        </p>

        <a
          className="footer-title reveal"
          href={`mailto:${EMAIL}`}
        >
          LET'S <em>TALK.</em>
          <ArrowUpRight />
        </a>

        <div
          className="social-links"
          aria-label="Professional links"
        >
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
            GITHUB
            <ArrowUpRight size={15} />
          </a>

          {LINKEDIN && (
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
              LINKEDIN
              <ArrowUpRight size={15} />
            </a>
          )}

          <a href={`mailto:${EMAIL}`}>
            EMAIL
            <ArrowUpRight size={15} />
          </a>

          {RESUME && (
            <a href={RESUME} download>
              <FileDown size={18} />
              RESUME
            </a>
          )}
        </div>

        <div className="footer-bottom">
          <span>MRIDUL BAJPAI © 2026</span>
          <span>BUILT WITH CURIOSITY</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
