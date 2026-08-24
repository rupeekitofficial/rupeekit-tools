'use client';

export default function HeroMotionBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="hero-motion-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(74,222,128,0.18),transparent_28%),radial-gradient(circle_at_50%_88%,rgba(14,165,233,0.14),transparent_34%),linear-gradient(135deg,#082b78_0%,#07327d_46%,#03183e_100%)]" />

      <div className="hero-scene absolute inset-0">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-orb hero-orb-three" />

        <div className="hero-ring hero-ring-one" />
        <div className="hero-ring hero-ring-two" />

        <div className="hero-float-card hero-float-card-one">
          <span className="hero-float-label">EMI</span>
          <span className="hero-float-value">₹</span>
        </div>
        <div className="hero-float-card hero-float-card-two">
          <span className="hero-float-label">SIP</span>
          <span className="hero-float-value">↗</span>
        </div>
        <div className="hero-float-card hero-float-card-three">
          <span className="hero-float-label">TAX</span>
          <span className="hero-float-value">%</span>
        </div>

        <div className="hero-grid-wrap">
          <div className="hero-grid" />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_42%,rgba(2,17,48,0.18)_72%,rgba(2,17,48,0.52)_100%)]" />

      <style jsx global>{`
        section:has(.hero-motion-backdrop) > div.relative {
          isolation: isolate;
        }
      `}</style>

      <style jsx>{`
        .hero-scene {
          perspective: 1400px;
          transform-style: preserve-3d;
        }

        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(18px);
          opacity: 0.7;
          transform: translateZ(0);
          will-change: transform;
          animation: hero-orb-float 15s ease-in-out infinite;
        }

        .hero-orb-one {
          left: -5rem;
          top: 22%;
          width: 22rem;
          height: 22rem;
          background: radial-gradient(circle at 35% 35%, rgba(96, 165, 250, 0.48), rgba(37, 99, 235, 0.04) 68%);
        }

        .hero-orb-two {
          right: -4rem;
          top: 6%;
          width: 27rem;
          height: 27rem;
          background: radial-gradient(circle at 45% 45%, rgba(74, 222, 128, 0.3), rgba(22, 163, 74, 0.02) 70%);
          animation-delay: -5s;
          animation-duration: 18s;
        }

        .hero-orb-three {
          left: 44%;
          bottom: -9rem;
          width: 20rem;
          height: 20rem;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.24), rgba(14, 116, 144, 0.02) 70%);
          animation-delay: -9s;
          animation-duration: 17s;
        }

        .hero-ring {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 9999px;
          box-shadow: inset 0 0 35px rgba(255, 255, 255, 0.03), 0 0 45px rgba(96, 165, 250, 0.05);
          transform-style: preserve-3d;
          animation: hero-ring-drift 17s ease-in-out infinite;
        }

        .hero-ring-one {
          right: 7%;
          top: 16%;
          width: 23rem;
          height: 23rem;
          transform: rotateX(62deg) rotateZ(-18deg);
        }

        .hero-ring-two {
          left: 5%;
          top: 30%;
          width: 15rem;
          height: 15rem;
          transform: rotateX(68deg) rotateZ(24deg);
          animation-delay: -8s;
          animation-duration: 20s;
        }

        .hero-float-card {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          min-width: 7.5rem;
          padding: 0.75rem 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 1rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035));
          box-shadow: 0 20px 60px rgba(1, 12, 35, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          color: rgba(255, 255, 255, 0.82);
          transform-style: preserve-3d;
          will-change: transform;
          animation: hero-card-float 13s ease-in-out infinite;
        }

        .hero-float-label {
          font-size: 0.66rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          color: rgba(226, 232, 240, 0.72);
        }

        .hero-float-value {
          font-size: 1.45rem;
          font-weight: 900;
          color: rgba(134, 239, 172, 0.92);
          text-shadow: 0 0 24px rgba(74, 222, 128, 0.32);
        }

        .hero-float-card-one {
          left: 4.5%;
          top: 17%;
          transform: rotateY(18deg) rotateZ(-6deg) translateZ(34px);
        }

        .hero-float-card-two {
          right: 5%;
          top: 37%;
          transform: rotateY(-17deg) rotateZ(5deg) translateZ(44px);
          animation-delay: -4s;
          animation-duration: 15s;
        }

        .hero-float-card-three {
          left: 9%;
          bottom: 10%;
          transform: rotateY(12deg) rotateZ(4deg) translateZ(24px);
          animation-delay: -8s;
          animation-duration: 16s;
        }

        .hero-grid-wrap {
          position: absolute;
          left: -10%;
          right: -10%;
          top: 48%;
          bottom: -30%;
          perspective: 1000px;
          overflow: hidden;
          opacity: 0.36;
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.78) 27%, #000 100%);
        }

        .hero-grid {
          position: absolute;
          inset: -15% -10%;
          transform-origin: center top;
          transform: rotateX(68deg) scale(1.12);
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px);
          background-size: 58px 58px;
          animation: hero-grid-travel 15s linear infinite;
        }

        @keyframes hero-orb-float {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -22px, 0) scale(1.06); }
        }

        @keyframes hero-ring-drift {
          0%, 100% { opacity: 0.34; filter: brightness(1); }
          50% { opacity: 0.56; filter: brightness(1.2); }
        }

        @keyframes hero-card-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -15px; }
        }

        @keyframes hero-grid-travel {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 58px, 58px 0; }
        }

        @media (max-width: 767px) {
          .hero-float-card {
            opacity: 0.42;
            transform: scale(0.78);
          }

          .hero-float-card-one {
            left: -1.25rem;
            top: 15%;
          }

          .hero-float-card-two {
            right: -1.6rem;
            top: 44%;
          }

          .hero-float-card-three {
            display: none;
          }

          .hero-ring-one {
            right: -7rem;
          }

          .hero-ring-two {
            left: -7rem;
          }

          .hero-grid-wrap {
            top: 57%;
            opacity: 0.28;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb,
          .hero-ring,
          .hero-float-card,
          .hero-grid {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
