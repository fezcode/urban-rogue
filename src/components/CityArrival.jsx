import { useEffect, useState, useRef, useMemo } from 'react';

const CITY_CONFIG = {
  'New York': {
    bgColor: '#0d0806',
    gradientMid: 'rgba(20,12,4,0.97)',
    glowColor: 'rgba(255, 140, 40, 0.45)',
    buildingColor: '#1a0e06',
    windowColor: 'rgba(255,200,80,0.35)',
    textColor: '#d4a574',
    subtitleColor: 'rgba(212,165,116,0.65)',
    emoji: '🗽',
    subtitle: 'The City That Never Sleeps',
    heights: [0.28,0.33,0.38,0.42,0.38,0.45,0.5,0.48,0.55,0.6,0.58,0.65,0.7,0.68,0.75,0.8,0.78,0.85,0.92,0.97,1.0,0.97,0.92,0.85,0.78,0.8,0.75,0.82,0.88,0.82,0.75,0.68,0.72,0.78,0.72,0.65,0.6,0.58,0.63,0.7,0.65,0.58,0.5,0.45,0.42,0.38,0.33,0.28],
    spires: [{ xi: 19, h: 0.12 }, { xi: 29, h: 0.08 }],
  },
  'Istanbul': {
    bgColor: '#04081a',
    gradientMid: 'rgba(4,10,26,0.97)',
    glowColor: 'rgba(60, 140, 255, 0.4)',
    buildingColor: '#060e22',
    windowColor: 'rgba(100,180,255,0.25)',
    textColor: '#6ba3d6',
    subtitleColor: 'rgba(107,163,214,0.65)',
    emoji: '🕌',
    subtitle: 'Where East Meets West',
    heights: [0.18,0.22,0.28,0.22,0.18,0.82,0.18,0.82,0.28,0.35,0.48,0.55,0.52,0.48,0.35,0.88,0.25,0.88,0.38,0.45,0.52,0.45,0.38,0.78,0.22,0.78,0.32,0.28,0.22,0.18,0.68,0.18,0.68,0.22,0.18,0.15,0.12,0.15,0.18,0.22,0.18,0.15,0.12,0.1,0.12,0.15,0.12,0.1],
    minarets: [5, 7, 15, 17, 23, 25, 30, 32],
    domes: [{ xi: 10, r: 3 }, { xi: 19, r: 2 }],
  },
  'Ankara': {
    bgColor: '#080c14',
    gradientMid: 'rgba(8,12,22,0.97)',
    glowColor: 'rgba(80, 110, 180, 0.3)',
    buildingColor: '#0c1020',
    windowColor: 'rgba(120,150,220,0.2)',
    textColor: '#8899cc',
    subtitleColor: 'rgba(136,153,204,0.65)',
    emoji: '🏛️',
    subtitle: 'Capital of the Republic',
    heights: [0.28,0.32,0.38,0.42,0.48,0.52,0.58,0.62,0.65,0.68,0.65,0.62,0.58,0.62,0.68,0.72,0.75,0.72,0.68,0.65,0.62,0.58,0.55,0.52,0.55,0.58,0.62,0.58,0.52,0.48,0.42,0.38,0.35,0.32,0.35,0.38,0.42,0.38,0.32,0.28,0.25,0.22,0.25,0.28,0.25,0.22,0.2,0.18],
    spires: [{ xi: 16, h: 0.06 }],
  },
  'Tokyo': {
    bgColor: '#0d0510',
    gradientMid: 'rgba(14,5,18,0.97)',
    glowColor: 'rgba(255, 50, 150, 0.4)',
    buildingColor: '#150820',
    windowColor: 'rgba(255,80,180,0.3)',
    textColor: '#ff88cc',
    subtitleColor: 'rgba(255,136,204,0.65)',
    emoji: '⛩️',
    subtitle: 'The City of Tomorrow',
    heights: [0.38,0.42,0.48,0.45,0.52,0.55,0.62,0.58,0.65,0.7,0.75,0.72,0.78,0.82,0.88,0.92,0.95,0.92,0.88,0.82,0.78,0.75,0.7,0.72,0.68,0.72,0.78,0.72,0.65,0.6,0.58,0.62,0.65,0.62,0.55,0.5,0.48,0.52,0.55,0.5,0.45,0.4,0.38,0.42,0.38,0.35,0.32,0.28],
    tower: { xi: 15, topH: 0.15 },
  },
  'Rome': {
    bgColor: '#160a03',
    gradientMid: 'rgba(22,10,3,0.97)',
    glowColor: 'rgba(220, 100, 40, 0.35)',
    buildingColor: '#1e0c04',
    windowColor: 'rgba(255,160,60,0.25)',
    textColor: '#e08855',
    subtitleColor: 'rgba(224,136,85,0.65)',
    emoji: '🏛️',
    subtitle: 'The Eternal City',
    heights: [0.22,0.28,0.32,0.38,0.42,0.48,0.52,0.55,0.65,0.62,0.7,0.78,0.82,0.78,0.7,0.62,0.58,0.52,0.48,0.45,0.5,0.55,0.5,0.45,0.42,0.48,0.52,0.55,0.5,0.45,0.4,0.35,0.32,0.28,0.32,0.38,0.32,0.28,0.25,0.22,0.2,0.18,0.2,0.22,0.2,0.18,0.15,0.12],
    dome: { xi: 11, r: 4 },
    arch: { xi: 38, w: 4, h: 0.35 },
  },
  'London': {
    bgColor: '#060c14',
    gradientMid: 'rgba(6,12,22,0.97)',
    glowColor: 'rgba(50, 100, 160, 0.35)',
    buildingColor: '#080e1c',
    windowColor: 'rgba(80,140,200,0.22)',
    textColor: '#7799bb',
    subtitleColor: 'rgba(119,153,187,0.65)',
    emoji: '🎡',
    subtitle: 'Capital of the Empire',
    heights: [0.28,0.32,0.38,0.42,0.48,0.52,0.48,0.42,0.38,0.42,0.48,0.52,0.45,0.42,0.38,0.72,0.78,0.85,0.78,0.72,0.45,0.42,0.38,0.42,0.48,0.52,0.48,0.42,0.38,0.35,0.32,0.28,0.32,0.38,0.42,0.38,0.32,0.28,0.25,0.22,0.2,0.18,0.2,0.22,0.2,0.18,0.15,0.12],
    bigben: { xi: 16, h: 0.18 },
  },
  'Paris': {
    bgColor: '#0a0614',
    gradientMid: 'rgba(10,6,22,0.97)',
    glowColor: 'rgba(160, 80, 255, 0.38)',
    buildingColor: '#100820',
    windowColor: 'rgba(180,100,255,0.25)',
    textColor: '#bb88ff',
    subtitleColor: 'rgba(187,136,255,0.65)',
    emoji: '🗼',
    subtitle: 'City of Lights',
    heights: [0.28,0.32,0.38,0.42,0.48,0.52,0.48,0.42,0.38,0.32,0.28,0.32,0.38,0.75,0.88,1.0,0.88,0.75,0.38,0.32,0.28,0.32,0.38,0.42,0.48,0.52,0.48,0.42,0.38,0.35,0.32,0.28,0.25,0.22,0.25,0.28,0.25,0.22,0.2,0.18,0.15,0.12,0.1,0.12,0.15,0.12,0.1,0.08],
    eiffel: { xi: 14, w: 4, topH: 0.08 },
  },
};

function buildSkylinePoints(heights, svgW, svgH, groundY, maxBuildingH) {
  const segW = svgW / heights.length;
  const pts = [[0, groundY]];
  heights.forEach((h, i) => {
    const bx = i * segW;
    const by = groundY - h * maxBuildingH;
    pts.push([bx, by]);
    pts.push([bx + segW, by]);
  });
  pts.push([svgW, groundY]);
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

// Seeded pseudo-random so windows don't flicker on re-render
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function CityScene({ city }) {
  const cfg = CITY_CONFIG[city];
  if (!cfg) return null;

  const W = 1200, H = 300, ground = 300, maxH = 260;
  const pts = buildSkylinePoints(cfg.heights, W, H, ground, maxH);
  const segW = W / cfg.heights.length;

  // window grid — seeded so stable across renders
  const windows = useMemo(() => {
  const wins = [];
  cfg.heights.forEach((h, i) => {
    const bx = i * segW;
    const by = ground - h * maxH;
    const bh = h * maxH;
    const rows = Math.floor(bh / 18);
    const cols = Math.floor(segW / 12);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = i * 1000 + r * 100 + c;
        if (seededRandom(seed) > 0.45) {
          wins.push(
            <rect
              key={`w-${i}-${r}-${c}`}
              x={bx + c * 12 + 4}
              y={by + r * 18 + 6}
              width={5}
              height={7}
              fill={cfg.windowColor}
              rx={1}
            />
          );
        }
      }
    }
  });
  return wins;
  }, [city]); // eslint-disable-line react-hooks/exhaustive-deps

  const extras = [];

  // Minaret pointed tips (Istanbul)
  if (cfg.minarets) {
    cfg.minarets.forEach((xi) => {
      const mx = xi * segW + segW / 2;
      const my = ground - cfg.heights[xi] * maxH;
      extras.push(
        <polygon
          key={`min-${xi}`}
          points={`${mx - 5},${my} ${mx},${my - 28} ${mx + 5},${my}`}
          fill={cfg.buildingColor}
          stroke={cfg.textColor}
          strokeWidth="1"
          opacity="0.8"
        />
      );
    });
  }

  // Domes (Istanbul / Rome)
  if (cfg.domes) {
    cfg.domes.forEach(({ xi, r }) => {
      const cx = (xi + r / 2) * segW;
      const cy = ground - cfg.heights[xi] * maxH;
      const rx = r * segW * 0.5;
      extras.push(
        <ellipse
          key={`dome-${xi}`}
          cx={cx}
          cy={cy}
          rx={rx}
          ry={rx * 0.45}
          fill={cfg.buildingColor}
          stroke={cfg.textColor}
          strokeWidth="1"
          opacity="0.75"
        />
      );
    });
  }

  // Rome: St Peter's main dome
  if (cfg.dome) {
    const { xi, r } = cfg.dome;
    const cx = (xi + r / 2) * segW;
    const cy = ground - cfg.heights[xi] * maxH;
    const rx = r * segW * 0.52;
    extras.push(
      <ellipse key="rome-dome" cx={cx} cy={cy} rx={rx} ry={rx * 0.5}
        fill={cfg.buildingColor} stroke={cfg.textColor} strokeWidth="1.5" opacity="0.8" />
    );
    // Lantern on top
    extras.push(
      <rect key="rome-lantern" x={cx - 6} y={cy - rx * 0.5 - 18}
        width={12} height={18} fill={cfg.buildingColor}
        stroke={cfg.textColor} strokeWidth="1" opacity="0.8" />
    );
  }

  // Rome: Colosseum arch silhouette
  if (cfg.arch) {
    const { xi, w, h } = cfg.arch;
    const ax = xi * segW;
    const ay = ground - h * maxH;
    const aw = w * segW;
    extras.push(
      <rect key="arch-base" x={ax} y={ay} width={aw} height={h * maxH}
        fill={cfg.buildingColor} />
    );
    // three arches cut-outs
    for (let i = 0; i < 3; i++) {
      const archX = ax + (i + 0.5) * (aw / 3) - 8;
      const archY = ay + 10;
      extras.push(
        <rect key={`arch-${i}`} x={archX} y={archY} width={16} height={28}
          fill={cfg.gradientMid} rx={8} />
      );
    }
  }

  // Spires (NY, Ankara)
  if (cfg.spires) {
    cfg.spires.forEach(({ xi, h }, si) => {
      const sx = xi * segW + segW / 2;
      const sy = ground - cfg.heights[xi] * maxH;
      const tipY = sy - h * maxH;
      extras.push(
        <polygon
          key={`spire-${si}`}
          points={`${sx - 6},${sy} ${sx},${tipY} ${sx + 6},${sy}`}
          fill={cfg.textColor}
          opacity="0.6"
        />
      );
      // antenna
      extras.push(
        <line key={`ant-${si}`} x1={sx} y1={tipY} x2={sx} y2={tipY - 20}
          stroke={cfg.textColor} strokeWidth="2" opacity="0.5" />
      );
    });
  }

  // Big Ben (London)
  if (cfg.bigben) {
    const { xi, h } = cfg.bigben;
    const bx = xi * segW;
    const by = ground - cfg.heights[xi] * maxH - h * maxH;
    const bw = segW * 1.5;
    extras.push(
      <rect key="bigben-clock" x={bx - bw * 0.1} y={by}
        width={bw * 1.2} height={h * maxH}
        fill={cfg.buildingColor} stroke={cfg.textColor} strokeWidth="1" opacity="0.85" />
    );
    // clock face
    extras.push(
      <circle key="bigben-face" cx={bx + bw / 2} cy={by + h * maxH * 0.3}
        r={10} fill="none" stroke={cfg.textColor} strokeWidth="1.5" opacity="0.7" />
    );
    // pointed spire top
    extras.push(
      <polygon key="bigben-tip"
        points={`${bx - bw * 0.1},${by} ${bx + bw / 2},${by - 22} ${bx + bw * 1.1},${by}`}
        fill={cfg.buildingColor} stroke={cfg.textColor} strokeWidth="1" opacity="0.85" />
    );
  }

  // Tokyo Tower
  if (cfg.tower) {
    const { xi, topH } = cfg.tower;
    const tx = xi * segW + segW / 2;
    const ty = ground - cfg.heights[xi] * maxH;
    const tipY = ty - topH * maxH;
    // main body (trapezoid)
    extras.push(
      <polygon key="tokyo-tower"
        points={`${tx - 22},${ty} ${tx - 4},${tipY} ${tx + 4},${tipY} ${tx + 22},${ty}`}
        fill={cfg.buildingColor} stroke={cfg.textColor} strokeWidth="1.5" opacity="0.85" />
    );
    // crossbar
    extras.push(
      <line key="tokyo-cross" x1={tx - 14} y1={ty - topH * maxH * 0.45}
        x2={tx + 14} y2={ty - topH * maxH * 0.45}
        stroke={cfg.textColor} strokeWidth="2" opacity="0.6" />
    );
    // antenna
    extras.push(
      <line key="tokyo-ant" x1={tx} y1={tipY} x2={tx} y2={tipY - 16}
        stroke={cfg.textColor} strokeWidth="1.5" opacity="0.5" />
    );
  }

  // Eiffel Tower (Paris)
  if (cfg.eiffel) {
    const { xi, w, topH } = cfg.eiffel;
    const ex = xi * segW + (w * segW) / 2;
    const ey = ground - cfg.heights[xi] * maxH;
    const ew = w * segW;
    const tipY = ey - topH * maxH;
    extras.push(
      <polygon key="eiffel"
        points={`${ex - ew / 2},${ey} ${ex - ew * 0.15},${ey - (ey - tipY) * 0.55} ${ex},${tipY} ${ex + ew * 0.15},${ey - (ey - tipY) * 0.55} ${ex + ew / 2},${ey}`}
        fill={cfg.buildingColor} stroke={cfg.textColor} strokeWidth="1.5" opacity="0.9" />
    );
    // horizontal girder
    extras.push(
      <line key="eiffel-g1" x1={ex - ew * 0.35} y1={ey - (ey - tipY) * 0.3}
        x2={ex + ew * 0.35} y2={ey - (ey - tipY) * 0.3}
        stroke={cfg.textColor} strokeWidth="2.5" opacity="0.55" />
    );
    extras.push(
      <line key="eiffel-g2" x1={ex - ew * 0.22} y1={ey - (ey - tipY) * 0.6}
        x2={ex + ew * 0.22} y2={ey - (ey - tipY) * 0.6}
        stroke={cfg.textColor} strokeWidth="1.8" opacity="0.45" />
    );
    // antenna
    extras.push(
      <line key="eiffel-ant" x1={ex} y1={tipY} x2={ex} y2={tipY - 14}
        stroke={cfg.textColor} strokeWidth="1.5" opacity="0.5" />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax meet"
      style={{ width: '100%', height: '200px', display: 'block' }}
    >
      <defs>
        <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cfg.bgColor} stopOpacity="0" />
          <stop offset="60%" stopColor={cfg.bgColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={cfg.bgColor} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="glow-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cfg.glowColor} stopOpacity="0" />
          <stop offset="100%" stopColor={cfg.glowColor} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Ambient glow above buildings */}
      <rect x="0" y="0" width={W} height={H} fill="url(#glow-grad)" />

      {/* Building silhouette */}
      <polygon points={pts} fill={cfg.buildingColor} />

      {/* Windows */}
      {windows}

      {/* Special architectural elements */}
      {extras}

      {/* Ground line */}
      <rect x="0" y={ground - 2} width={W} height={4}
        fill={cfg.textColor} opacity="0.2" />

      {/* Sky fade overlay */}
      <rect x="0" y="0" width={W} height={H} fill="url(#sky-fade)" />
    </svg>
  );
}

export default function CityArrival({ city, onComplete }) {
  const [phase, setPhase] = useState('entering');
  const cfg = CITY_CONFIG[city] || CITY_CONFIG['New York'];
  const calledRef = useRef(false);

  useEffect(() => {
    calledRef.current = false;
    let raf1, raf2;
    // Double rAF to ensure initial render with opacity:0 before transitioning
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPhase('holding');
      });
    });

    const t2 = setTimeout(() => setPhase('leaving'), 2800);
    const t3 = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        onComplete();
      }
    }, 3700);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [city, onComplete]);

  const isVisible = phase === 'holding';
  const isLeaving = phase === 'leaving';

  return (
    <div
      className="city-arrival-overlay"
      style={{
        '--city-text': cfg.textColor,
        '--city-subtitle': cfg.subtitleColor,
        '--city-bg': cfg.bgColor,
        '--city-mid': cfg.gradientMid,
        '--city-glow': cfg.glowColor,
        opacity: isVisible ? 1 : 0,
        transition: isLeaving
          ? 'opacity 0.9s cubic-bezier(0.4, 0, 1, 1)'
          : 'opacity 0.5s cubic-bezier(0, 0, 0.2, 1)',
        pointerEvents: 'none',
      }}
    >
      {/* Gradient bands: transparent top → solid center → transparent bottom */}
      <div className="city-arrival-bg" style={{
        background: `linear-gradient(
          to bottom,
          transparent 0%,
          ${cfg.gradientMid} 18%,
          ${cfg.gradientMid} 82%,
          transparent 100%
        )`
      }} />

      {/* Glow halo */}
      <div className="city-arrival-glow" style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 65%, ${cfg.glowColor} 0%, transparent 100%)`
      }} />

      {/* City info center */}
      <div
        className="city-arrival-content"
        style={{
          transform: isVisible ? 'translateY(0)' : isLeaving ? 'translateY(-12px)' : 'translateY(20px)',
          transition: isLeaving
            ? 'transform 0.9s cubic-bezier(0.4, 0, 1, 1)'
            : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="city-arrival-emoji">{cfg.emoji}</div>
        <div className="city-arrival-name" style={{ color: cfg.textColor }}>{city}</div>
        <div className="city-arrival-subtitle" style={{ color: cfg.subtitleColor }}>{cfg.subtitle}</div>
      </div>

      {/* Skyline at bottom */}
      <div
        className="city-arrival-skyline"
        style={{
          transform: isVisible ? 'translateY(0)' : isLeaving ? 'translateY(16px)' : 'translateY(32px)',
          transition: isLeaving
            ? 'transform 0.9s cubic-bezier(0.4, 0, 1, 1)'
            : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
        }}
      >
        <CityScene city={city} />
      </div>

      {/* Top and bottom feather gradients for transparency effect */}
      <div className="city-arrival-top-fade" style={{
        background: `linear-gradient(to bottom, transparent 0%, ${cfg.bgColor}22 100%)`
      }} />
      <div className="city-arrival-bottom-fade" style={{
        background: `linear-gradient(to top, transparent 0%, ${cfg.bgColor}22 100%)`
      }} />
    </div>
  );
}
