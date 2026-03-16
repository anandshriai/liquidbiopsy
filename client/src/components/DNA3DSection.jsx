import { useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Scroll store — lerped for silky-smooth motion
   ───────────────────────────────────────────── */
const scrollStore = { target: 0, current: 0 };

/* ── Panel data ── */
const PANELS = [
  {
    tag: "Discovery",
    title: "Genome Mapping",
    body: "Decoding millions of genetic sequences to identify critical biomarkers for early disease detection.",
  },
  {
    tag: "Detection",
    title: "Cancer Screening",
    body: "Screening 47+ cancer types from simple blood tests with 99% clinical sensitivity.",
  },
  {
    tag: "Precision",
    title: "Personalized Care",
    body: "Treatment strategies shaped by each patient's unique genomic profile.",
  },
  {
    tag: "Scale",
    title: "Global Impact",
    body: "Transforming diagnostics for millions of patients across 60+ countries.",
  },
  {
    tag: "Future",
    title: "Next-Gen Oncology",
    body: "Pioneering diagnostic intelligence where no cancer goes undetected.",
  },
];

const PANEL_COUNT = PANELS.length;
const LERP_FACTOR = 0.045;

/* ── 3-D DNA Model (MUCH LARGER) ── */
function DNAModel() {
  const { scene } = useGLTF("/DNA_STRAND_NEW.glb");
  const groupRef = useRef();

  const pivot = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const s = 18 / Math.max(size.x, size.y, size.z);

    clone.position.set(-center.x, -center.y, -center.z);

    const wrapper = new THREE.Group();
    wrapper.add(clone);
    wrapper.scale.setScalar(s);
    wrapper.rotation.set(0, 0, Math.PI / 2);

    clone.traverse((n) => {
      if (n.isMesh && n.material) {
        n.material = n.material.clone();
        n.material.color = new THREE.Color("#60a5fa");
        n.material.envMapIntensity = 0.3;
        n.material.roughness = 0.25;
        n.material.metalness = 0.75;
        n.material.needsUpdate = true;
      }
    });

    return wrapper;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      clock.elapsedTime * 0.25 + scrollStore.current * Math.PI * 4;
  });

  return (
    <group ref={groupRef}>
      <primitive object={pivot} />
    </group>
  );
}

/* ── Loader spinner ── */
function Loader() {
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d;
      ref.current.rotation.y += d * 1.3;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#60a5fa" wireframe />
    </mesh>
  );
}

/* ═════════════════════════════════════════════
   MAIN EXPORT
   ═════════════════════════════════════════════ */
export default function DNA3DSection() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const scrollHintRef = useRef();
  const panelRefs = useRef([]);

  useEffect(() => {
    const getRadius = () => {
      const w = window.innerWidth;
      if (w >= 1536) return 620;
      if (w >= 1280) return 540;
      if (w >= 1024) return 440;
      if (w >= 768) return 360;
      return 200;
    };

    const onScroll = () => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -r.top);
      scrollStore.target = Math.max(0, Math.min(1, scrolled / scrollable));
    };

    let raf;
    const animate = () => {
      const diff = scrollStore.target - scrollStore.current;

      if (Math.abs(diff) > 0.00005) {
        scrollStore.current += diff * LERP_FACTOR;
      } else {
        scrollStore.current = scrollStore.target;
      }

      const progress = scrollStore.current;

      if (headingRef.current) {
        headingRef.current.style.opacity = String(
          Math.max(0, 1 - progress * 6.5)
        );
      }

      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(
          Math.max(0, 1 - progress * 10)
        );
      }

      const radius = getRadius();
      const isMobile = window.innerWidth < 768;

      panelRefs.current.forEach((el, i) => {
        if (!el) return;

        if (isMobile) {
          el.style.opacity = "0";
          return;
        }

        const baseAngle = (i / PANEL_COUNT) * Math.PI * 2;
        const currentAngle = baseAngle + progress * Math.PI * 2;

        const x = Math.sin(currentAngle) * radius;
        const depth = Math.cos(currentAngle);

        const scale = 0.6 + (depth + 1) * 0.2;

        const absSin = Math.abs(Math.sin(currentAngle));
        const rawOpacity = absSin * Math.max(0, depth + 0.5);
        const opacity = Math.max(0, Math.min(1, rawOpacity));

        const blur = depth < -0.2 ? Math.abs(depth + 0.2) * 6 : 0;

        const y = Math.cos(currentAngle * 0.5) * 18;

        const zIdx = Math.round((depth + 1) * 10);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = blur > 0.3 ? `blur(${blur}px)` : "none";
        el.style.zIndex = String(zIdx);
      });

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "600vh" }}>
      {/* ─── sticky viewport ─── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* ── ambient glow ── */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px]
                       -translate-x-1/2 -translate-y-1/2
                       rounded-full bg-blue-50/60 blur-[140px]"
          />
        </div>

        {/* ── heading (fades on scroll) — white backdrop keeps it separate from 3-D ── */}
        <div
          ref={headingRef}
          className="absolute inset-x-0 top-0 z-30 px-6 pb-20 pt-8 text-center
                     bg-gradient-to-b from-white via-white/95 to-transparent
                     lg:pt-12"
        >
          <p
            className="text-[11px] font-semibold uppercase
                       tracking-[0.35em] text-blue-400/80"
          >
            Genomic Intelligence
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight
                       text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Realtime{" "}
            <span
              className="bg-gradient-to-r from-blue-600 to-cyan-500
                         bg-clip-text text-transparent"
            >
              Precision
            </span>{" "}
            Monitoring
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
            Scroll to explore how our AI decodes health data in real time
          </p>
        </div>

        {/* ── scroll hint ── */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8
                     z-30 flex select-none flex-col items-center gap-2"
        >
          <span
            className="text-[10px] font-medium uppercase
                       tracking-[0.3em] text-slate-300"
          >
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-slate-300"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="8"
              cy="7"
              r="1.5"
              fill="currentColor"
              className="animate-bounce"
            />
          </svg>
        </div>

        {/* ══════════════════════════════════════
            ORBIT PANELS — z-[5] (behind canvas)
            ══════════════════════════════════════ */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center">
          {PANELS.map((panel, i) => (
            <div
              key={i}
              ref={(el) => (panelRefs.current[i] = el)}
              className="absolute w-52 sm:w-60 lg:w-64"
              style={{
                opacity: 0,
                willChange: "transform, opacity, filter",
                transition: "filter 0.15s ease-out",
              }}
            >
              <div
                className="rounded-2xl border border-blue-50
                           bg-white/95 p-5
                           shadow-[0_2px_20px_rgba(59,130,246,.06)]
                           backdrop-blur-sm"
              >
                <span
                  className="text-[9px] font-bold uppercase
                             tracking-[0.25em] text-blue-400/70"
                >
                  {panel.tag}
                </span>
                <h3
                  className="mt-2 text-[13px] font-bold leading-snug
                             text-slate-800 sm:text-sm"
                >
                  {panel.title}
                </h3>
                <p
                  className="mt-1.5 text-[11px] leading-relaxed
                             text-slate-400"
                >
                  {panel.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── white glow fog layer ── z-[8] ── */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[8]
                     h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2
                     rounded-full bg-white/70 blur-[60px]"
          aria-hidden="true"
        />

        {/* ══════════════════════════════════════
            3-D CANVAS — z-[10] (above orbit)
            Camera pulled back so full model is visible
            ══════════════════════════════════════ */}
        <div
          className="pointer-events-none absolute inset-0 z-[10]
                     flex items-center justify-center"
        >
          <div className="relative h-full w-full max-h-[100vh]">
            <Canvas
              camera={{ position: [0, 0, 20], fov: 50 }}
              dpr={[1, 2]}
              style={{ background: "transparent" }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: THREE.NoToneMapping,
              }}
            >
              <Suspense fallback={<Loader />}>
                <ambientLight intensity={1.1} />

                <directionalLight
                  position={[5, 8, 5]}
                  intensity={2.4}
                  color="#ffffff"
                />
                <directionalLight
                  position={[-4, -3, 6]}
                  intensity={1.0}
                  color="#93c5fd"
                />

                <pointLight
                  position={[-6, 4, 4]}
                  intensity={0.8}
                  color="#60a5fa"
                />
                <pointLight
                  position={[6, -4, -3]}
                  intensity={0.5}
                  color="#818cf8"
                />
                <pointLight
                  position={[0, -8, 2]}
                  intensity={0.4}
                  color="#22d3ee"
                />
                <pointLight
                  position={[0, 8, -2]}
                  intensity={0.5}
                  color="#dbeafe"
                />

                <DNAModel />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/DNA_STRAND_NEW.glb");