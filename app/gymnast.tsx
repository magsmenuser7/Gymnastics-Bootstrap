// Decorative gymnastics animations: an articulated gymnast rig driven by SVG/SMIL (no JS at
// runtime). Every animation in a routine shares one clock, so joints, hair, flight, strobe
// trail, landing bursts and the score card stay in sync.
//
// Cycle (fractions of `dur`): fly out 0→0.3, land, salute, turn, fly back 0.5→0.8, land, salute.

const OUT = 0.3;
const BACK = 0.8;
const SPLINE = [0.45, 0, 0.55, 1] as const;
const splines = (n: number) => Array(n).fill(SPLINE.join(" ")).join(";");
const flight = { keyTimes: `0;${OUT};0.5;${BACK};1`, calcMode: "spline", keySplines: splines(4), repeatCount: "indefinite" } as const;

// CSS cubic-bezier timing function (same curve SMIL uses), so static strobe frames match the live figure.
function ease(u: number) {
  const b = (s: number, a: number, c: number) => 3 * (1 - s) ** 2 * s * a + 3 * (1 - s) * s * s * c + s ** 3;
  let lo = 0, hi = 1, s = u;
  for (let i = 0; i < 30; i++) {
    s = (lo + hi) / 2;
    if (b(s, SPLINE[0], SPLINE[2]) < u) lo = s;
    else hi = s;
  }
  return b(s, SPLINE[1], SPLINE[3]);
}

/* ---------- Choreography ---------- */

// Joint angles in degrees. Limbs hang along +y; positive rotation swings them forward (−x).
// lean: torso pitch (negative = forward). dy: drops the hips so feet stay planted when crouching.
type Body = { lean: number; sh: number; el: number; hip: number; kn: number; an: number; dy: number };
// Ponytail chain: h1 at the scrunchie, h2 at mid-length. Hangs along +y like a limb.
type Hair = { h1: number; h2: number };
type Pose = Body & Hair;
type Keys<T> = [number, T][];

const B: Record<string, Body> = {
  prep: { lean: -52, sh: -60, el: 10, hip: 60, kn: -100, an: 62, dy: 15 },
  take: { lean: 6, sh: 172, el: 0, hip: -6, kn: 0, an: 5, dy: 0 },
  tuck: { lean: -40, sh: 62, el: 58, hip: 128, kn: -146, an: 8, dy: 0 },
  open: { lean: -4, sh: 150, el: 0, hip: 22, kn: -10, an: 20, dy: 0 },
  land: { lean: -46, sh: 92, el: 0, hip: 62, kn: -95, an: 68, dy: 14 },
  stand: { lean: 0, sh: 8, el: 10, hip: 0, kn: 0, an: 86, dy: 0 },
  salute: { lean: 5, sh: 160, el: 0, hip: 0, kn: 0, an: 86, dy: 0 },
};
const BODY_HALF: Keys<Body> = [
  [0, B.take], [0.035, B.tuck], [0.24, B.tuck], [0.275, B.open], [0.3, B.land],
  [0.345, B.stand], [0.385, B.salute], [0.445, B.salute], [0.472, B.stand], [0.488, B.prep],
];
// Secondary motion: the ponytail lags on takeoff, flies out with the spin, whips on landing
// and wobbles to rest, sways through the salute, then falls forward into the crouch.
const HAIR_HALF: Keys<Hair> = [
  [0, { h1: -4, h2: 6 }], [0.04, { h1: -70, h2: -35 }], [0.1, { h1: -150, h2: -28 }], [0.24, { h1: -162, h2: -14 }],
  [0.275, { h1: -110, h2: -40 }], [0.3, { h1: -40, h2: -42 }], [0.312, { h1: 34, h2: 30 }], [0.327, { h1: -34, h2: -32 }],
  [0.342, { h1: 18, h2: 22 }], [0.36, { h1: -24, h2: -12 }], [0.38, { h1: -8, h2: 8 }], [0.41, { h1: -20, h2: -6 }],
  [0.445, { h1: -10, h2: 6 }], [0.47, { h1: -16, h2: 0 }], [0.488, { h1: 32, h2: 14 }],
];
const cycle = <T,>(half: Keys<T>): Keys<T> => [...half, ...half.map(([t, p]) => [t + 0.5, p] as [number, T]), [1, half[0][1]]];
const BODY = cycle(BODY_HALF);
const HAIR = cycle(HAIR_HALF);

function interp<T extends Record<string, number>>(keys: Keys<T>, t: number): T {
  const i = Math.max(0, keys.findIndex(([k]) => k > t) - 1);
  const [t0, a] = keys[i];
  const [t1, b] = keys[i + 1];
  const e = ease((t - t0) / (t1 - t0));
  return Object.fromEntries(Object.keys(a).map((k) => [k, a[k] + (b[k] - a[k]) * e])) as T;
}
const poseAt = (t: number): Pose => ({ ...interp(BODY, t), ...interp(HAIR, t) });

function jointTrack(j: keyof Pose, dur: string) {
  const keys = (j === "h1" || j === "h2" ? HAIR : BODY) as Keys<Record<string, number>>;
  return {
    dur,
    keyTimes: keys.map((k) => k[0]).join(";"),
    values: keys.map((k) => (j === "dy" ? `0 ${k[1][j]}` : k[1][j])).join(";"),
    calcMode: "spline",
    keySplines: splines(keys.length - 1),
    repeatCount: "indefinite",
  };
}

/* ---------- Rig ---------- */

// Organic limb from (0,0) to (0,len): widths at root / belly / tip, `back` bulges the rear (+x) side.
const muscle = (len: number, w0: number, wm: number, w1: number, back = 0) =>
  `M${-w0 / 2} 0 C${-wm / 2} ${len * 0.3} ${-wm / 2} ${len * 0.62} ${-w1 / 2} ${len} ` +
  `A${w1 / 2} ${w1 / 2} 0 0 0 ${w1 / 2} ${len} ` +
  `C${wm / 2 + back} ${len * 0.62} ${wm / 2 + back} ${len * 0.3} ${w0 / 2} 0 ` +
  `A${w0 / 2} ${w0 / 2} 0 0 0 ${-w0 / 2} 0Z`;

type Paint = { skin: string; far: string; suit: string; sheen: string; tie: string };

function Joint({ j, off = 0, at = "0 0", pose, dur, children }: {
  j: keyof Pose;
  off?: number;
  at?: string;
  pose?: Pose;
  dur?: string;
  children: React.ReactNode;
}) {
  // Static angle (+ offset) for strobe frames, or an additive SMIL rotation for the live figure.
  return (
    <g transform={`translate(${at})`}>
      <g transform={`rotate(${(pose ? pose[j] : 0) + off})`}>
        {dur && <animateTransform attributeName="transform" type="rotate" additive="sum" {...jointTrack(j, dur)} />}
        {children}
      </g>
    </g>
  );
}

function Rig({ pose, dur, paint }: { pose?: Pose; dur?: string; paint: Paint }) {
  const k = { pose, dur };
  const leg = (color: string, off: number) => (
    <Joint j="hip" off={off} {...k}>
      <path d={muscle(21, 10.5, 10.5, 6, 1.5)} fill={color} />
      <Joint j="kn" at="0 21" {...k}>
        <path d={muscle(21, 6.2, 7, 3.6, 1.8)} fill={color} />
        <Joint j="an" at="0 21" {...k}>
          <path d={muscle(8.5, 3.8, 3.7, 2.1)} fill={color} />
        </Joint>
      </Joint>
    </Joint>
  );
  const arm = (color: string, off: number) => (
    <Joint j="sh" off={off} at="0 -26.5" {...k}>
      <path d={muscle(15, 5.8, 5.6, 4.2, 0.6)} fill={color} />
      <Joint j="el" at="0 15" {...k}>
        <path d={muscle(14, 4.3, 4.5, 3)} fill={color} />
        <ellipse cx="0" cy="16" rx="2.2" ry="3" fill={color} />
      </Joint>
    </Joint>
  );
  return (
    <g transform={pose ? `translate(0 ${pose.dy})` : undefined}>
      {dur && <animateTransform attributeName="transform" type="translate" {...jointTrack("dy", dur)} />}
      {leg(paint.far, -9)}
      <Joint j="lean" {...k}>
        {arm(paint.far, 14)}
        {/* Ponytail: two-link chain from a high scrunchie */}
        <Joint j="h1" at="4 -47" {...k}>
          <path d={muscle(10, 4.6, 5.6, 3.6)} fill={paint.skin} />
          <Joint j="h2" at="0 9" {...k}>
            <path d="M-1.9 0 C-3.2 4 -2.6 8 0 13 C2.4 8 3 4 1.9 0Z" fill={paint.skin} />
          </Joint>
          <circle r="2" fill={paint.tie} />
        </Joint>
        <path d={muscle(7, 5, 4.6, 4.6)} transform="translate(-0.5 -29) rotate(172)" fill={paint.skin} />
        <ellipse cx="-1.2" cy="-41" rx="6.6" ry="7.6" fill={paint.skin} />
        <circle cx="-7.4" cy="-40.6" r="1.3" fill={paint.skin} />
        <path
          d="M-7 3 C-6 -6 -4.8 -12 -5.6 -17 C-7.6 -22 -8.6 -27 -6 -30 Q0 -32.5 6.6 -29.5 C8.6 -26 7.2 -20 6 -15 C5 -9 6.5 -3 7.5 2 Q2 6 -7 3Z"
          fill={paint.suit}
        />
        <path d="M-3 -28 C-5 -18 -3.4 -8 -2 1" stroke={paint.sheen} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {arm(paint.skin, 0)}
      </Joint>
      {leg(paint.skin, 0)}
    </g>
  );
}

/* ---------- Effects ---------- */

type V = string | number;
// Keyframes for a short effect fired at each event time; idle at `rest` otherwise.
function track(events: number[], frames: [number, V][], rest: V, dur: string) {
  const pts: [number, V][] = [[0, rest]];
  for (const e of events) {
    pts.push([e, rest], ...frames.map(([dt, v]) => [e + dt, v] as [number, V]));
    pts.push([e + frames[frames.length - 1][0] + 0.002, rest]);
  }
  pts.push([1, rest]);
  return { dur, keyTimes: pts.map((p) => +p[0].toFixed(4)).join(";"), values: pts.map((p) => p[1]).join(";"), repeatCount: "indefinite" };
}

const CONFETTI = ["#2f5bff", "#f5b72c", "#14275e", "#8ea8ff", "#f5b72c", "#2f5bff", "#ffffff", "#14275e", "#8ea8ff", "#f5b72c", "#2f5bff", "#ffffff"];

function Landing({ x, y, at, dur, lift, score }: { x: number; y: number; at: number; dur: string; lift: number; score: string }) {
  const dust = [-160, -135, -110, -70, -45, -20].map((deg, i) => {
    const r = 30 + (i % 3) * 12;
    const a = (deg * Math.PI) / 180;
    return { dx: +(Math.cos(a) * r).toFixed(1), dy: +(Math.sin(a) * r * 0.55).toFixed(1), r: 1.8 + (i % 2) };
  });
  const confetti = CONFETTI.map((c, i) => {
    const spread = ((i / (CONFETTI.length - 1)) * 2 - 1) * 70; // −70 … 70
    const up = lift * (0.55 + ((i * 7) % 5) * 0.09);
    return { c, dx: spread, up, fall: 18 + ((i * 5) % 4) * 8, spin: (i % 2 ? 1 : -1) * (300 + i * 40), w: 3 + (i % 3), h: 6 + (i % 2) * 2 };
  });
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="0" ry="0" fill="none" stroke="var(--blue)" strokeWidth="2.5">
        <animate attributeName="rx" {...track([at], [[0.004, 6], [0.1, 58]], 0, dur)} />
        <animate attributeName="ry" {...track([at], [[0.004, 2], [0.1, 14]], 0, dur)} />
        <animate attributeName="opacity" {...track([at], [[0.004, 0.9], [0.1, 0]], 0, dur)} />
      </ellipse>
      {dust.map((p, i) => (
        <circle key={i} r={p.r} fill={i % 2 ? "#fff" : "#8ea8ff"} opacity="0">
          <animateTransform attributeName="transform" type="translate" {...track([at], [[0.004, "0 0"], [0.11, `${p.dx} ${p.dy}`]], "0 0", dur)} />
          <animate attributeName="opacity" {...track([at], [[0.004, 1], [0.11, 0]], 0, dur)} />
        </circle>
      ))}
      {confetti.map((p, i) => (
        <g key={i} opacity="0">
          <animateTransform
            attributeName="transform"
            type="translate"
            {...track([at], [[0.006, "0 -6"], [0.05, `${p.dx * 0.7} ${-p.up}`], [0.17, `${p.dx} ${p.fall - p.up * 0.35}`]], "0 -6", dur)}
          />
          <animate attributeName="opacity" {...track([at], [[0.006, 1], [0.14, 1], [0.17, 0]], 0, dur)} />
          <rect x={-p.w / 2} y={-p.h / 2} width={p.w} height={p.h} rx="1" fill={p.c}>
            <animateTransform attributeName="transform" type="rotate" {...track([at], [[0.006, 0], [0.17, p.spin]], 0, dur)} />
          </rect>
        </g>
      ))}
      <g opacity="0">
        <animate attributeName="opacity" {...track([at], [[0.03, 1], [0.15, 1], [0.18, 0]], 0, dur)} />
        <animateTransform
          attributeName="transform"
          type="translate"
          {...track([at], [[0.03, `0 ${-lift + 14}`], [0.05, `0 ${-lift - 4}`], [0.07, `0 ${-lift}`], [0.18, `0 ${-lift - 8}`]], `0 ${-lift + 14}`, dur)}
        />
        <rect x="-34" y="-17" width="68" height="34" rx="17" fill="var(--ink)" />
        <text x="0" y="6" textAnchor="middle" fill="#fff" style={{ font: "600 17px var(--sans)", letterSpacing: "-0.02em" }}>
          {score}
        </text>
        <path d="M-45 -21 l3 -7 l3 7 l-7 -4 h8 Z M42 -25 l2.4 -5.6 l2.4 5.6 l-5.6 -3.2 h6.4 Z" fill="var(--gold)" />
      </g>
    </g>
  );
}

const STAND_HIP = 44; // hip height above the floor when standing, in rig units

function Routine({ uid, x0, x1, ground, peak, s, turns, dur, score, trail = 7, guide }: {
  uid: string;
  x0: number;
  x1: number;
  ground: number;
  peak: number; // hip y at the top of the arc
  s: number; // rig scale
  turns: number;
  dur: string;
  score: string;
  trail?: number;
  guide?: boolean;
}) {
  const hipY = ground - STAND_HIP * s;
  const cx = (x0 + x1) / 2;
  const cy = 2 * peak - hipY;
  const path = `M${x0} ${hipY} Q${cx} ${cy} ${x1} ${hipY}`;
  const at = (t: number) => [(1 - t) ** 2 * x0 + 2 * t * (1 - t) * cx + t * t * x1, (1 - t) ** 2 * hipY + 2 * t * (1 - t) * cy + t * t * hipY];
  const R = turns * 360;
  const live: Paint = { skin: "#16245a", far: "#0b1538", suit: `url(#${uid}-suit)`, sheen: "rgba(255,255,255,0.45)", tie: "var(--gold)" };
  const ghost: Paint = { skin: "#9db1ff", far: "#b8c7ff", suit: "#cdd9ff", sheen: "transparent", tie: "#cdd9ff" };

  const ghosts = Array.from({ length: trail }, (_, i) => (i + 1) / (trail + 1)).flatMap((u) => {
    const p = ease(u);
    const pose = poseAt(OUT * u);
    return [
      { pos: at(p), mirror: 1, rot: R * p, show: OUT * u, pose },
      { pos: at(1 - p), mirror: -1, rot: R * p, show: 0.5 + OUT * u, pose },
    ];
  });

  return (
    <g className="act">
      <defs>
        <linearGradient id={`${uid}-suit`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a88ff" />
          <stop offset="1" stopColor="#1f45e6" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-1" y="-1" width="3" height="3">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2f5bff" floodOpacity="0.5" />
        </filter>
      </defs>
      {guide && <path d={path} fill="none" stroke="var(--blue)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" opacity="0.35" />}
      {ghosts.map((g, i) => (
        <g
          key={i}
          opacity="0"
          transform={`translate(${g.pos[0].toFixed(1)} ${g.pos[1].toFixed(1)}) scale(${g.mirror} 1) rotate(${g.rot.toFixed(1)}) scale(${s})`}
        >
          <animate attributeName="opacity" {...track([g.show], [[0.003, 0.55], [0.13, 0]], 0, dur)} />
          <Rig pose={g.pose} paint={ghost} />
        </g>
      ))}
      <Landing x={x1} y={ground} at={OUT} dur={dur} lift={100 * s + 20} score={score} />
      <Landing x={x0} y={ground} at={BACK} dur={dur} lift={100 * s + 20} score={score} />
      <g filter={`url(#${uid}-glow)`}>
        <animateMotion dur={dur} path={path} keyPoints="0;1;1;0;0" {...flight} />
        <g>
          <animateTransform attributeName="transform" type="scale" dur={dur} values="1 1;-1 1;1 1" keyTimes="0;0.4;0.9" calcMode="discrete" repeatCount="indefinite" />
          <g>
            <animateTransform attributeName="transform" type="rotate" dur={dur} values={`0;${R};${R};${2 * R};${2 * R}`} {...flight} />
            <g transform={`scale(${s})`}>
              <Rig dur={dur} paint={live} />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/** Double back tuck arcing over the top edge of the hero photo frame. */
export function Tumble() {
  return (
    <svg className="tumble" viewBox="0 0 1000 220" aria-hidden>
      <Routine uid="tumble" x0={90} x1={910} ground={220} peak={108} s={0.9} turns={2} dur="7s" score="10.0" guide />
    </svg>
  );
}

/** Back tuck on the balance beam. */
export function Beam() {
  return (
    <svg className="beam" viewBox="0 0 1000 160" aria-hidden>
      <rect x="40" y="120" width="920" height="11" rx="5.5" fill="var(--navy)" />
      <path d="M140 131 L118 160 M860 131 L882 160" stroke="var(--navy)" strokeWidth="6" strokeLinecap="round" />
      <Routine uid="beam" x0={330} x1={670} ground={120} peak={8} s={0.74} turns={1} dur="7.5s" score="9.95" trail={6} />
    </svg>
  );
}

/** Rhythmic-gymnastics ribbon flowing behind the hero copy. */
export function Ribbon() {
  const d = "M-80 420 C 220 160, 420 560, 700 330 S 1120 90, 1520 300";
  return (
    <svg className="ribbon" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="ribbon-g" x1="0" x2="1">
          <stop offset="0" stopColor="#2f5bff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#2f5bff" />
          <stop offset="1" stopColor="#14275e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path className="ribbon-flow" d={d} pathLength="1000" fill="none" stroke="url(#ribbon-g)" strokeWidth="14" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path className="ribbon-flow ribbon-flow-2" d={d} pathLength="1000" fill="none" stroke="#14275e" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
