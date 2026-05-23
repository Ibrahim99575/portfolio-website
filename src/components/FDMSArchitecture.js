import React from 'react';

// ─── Flight Disruption Management System (FDMS) — High-Level Design ───────
// ViewBox: 0 0 1080 490
// Same orthogonal pattern as DENS — only horizontal & vertical segments.

const NODES = {
  // External input sources (left column)
  amadeus:      { x: 8,   y: 95,  w: 118, h: 40 },   // (126, 115)
  weather:      { x: 8,   y: 150, w: 118, h: 40 },   // (126, 170)
  opsConsole:   { x: 8,   y: 205, w: 118, h: 40 },   // (126, 225)

  // FDMS Core orchestrator (hub)
  fdmsCore:     { x: 180, y: 130, w: 120, h: 80 },   // center (240, 170)

  // 5-stage state machine
  stateMachine: { x: 345, y: 150, w: 120, h: 40 },   // (465, 170)

  // LangChain agent runtime (hub)
  langchain:    { x: 510, y: 130, w: 130, h: 80 },   // (640, 170)

  // 4 specialised AI agents (vertical stack)
  agent1:       { x: 685, y: 45,  w: 145, h: 40 },   // y center 65
  agent2:       { x: 685, y: 105, w: 145, h: 40 },   // y center 125
  agent3:       { x: 685, y: 165, w: 145, h: 40 },   // y center 185
  agent4:       { x: 685, y: 225, w: 145, h: 40 },   // y center 245

  // Claude API (external LLM)
  claudeApi:    { x: 870, y: 45,  w: 130, h: 220 },  // spans full agent column

  // State persistence (bottom)
  postgres:     { x: 345, y: 290, w: 120, h: 35 },   // top center (405, 290)
  audit:        { x: 510, y: 290, w: 130, h: 35 },   // top center (575, 290)

  // Output channels (bottom right)
  dashboard:    { x: 685, y: 360, w: 145, h: 40 },   // top center (757, 360)
  opsTeam:      { x: 870, y: 360, w: 130, h: 40 },   // center y 380
};

const Node = ({ id, l1, l2, type }) => {
  const { x, y, w, h } = NODES[id];
  const mx = x + w / 2;
  const my = y + h / 2;
  // For tall claudeApi, place text near top instead of vertical center
  const isTall = h > 120;
  const labelY = isTall ? y + 28 : (l2 ? my - 4 : my + 4);
  const subY = isTall ? y + 40 : my + 8;
  return (
    <g className={`dn dn-${type}`}>
      <rect x={x} y={y} width={w} height={h} rx="4" />
      <text x={mx} y={labelY} textAnchor="middle" className="dl1">{l1}</text>
      {l2 && <text x={mx} y={subY} textAnchor="middle" className="dl2">{l2}</text>}
    </g>
  );
};

const F = ({ d, phase }) => (
  <path d={d} className="fp" style={{ animationDelay: `${phase * 0.4}s` }} markerEnd="url(#fcm)" />
);

const P = ({ d, noArrow }) => (
  <path d={d} className="pp" markerEnd={noArrow ? undefined : 'url(#fam)'} />
);

const ZL = ({ x, y, text, amber }) => (
  <text x={x} y={y} className="zl" style={amber ? { fill: 'var(--accent-amber)', opacity: 0.6 } : {}}>{text}</text>
);
const AL = ({ x, y, text }) => (
  <text x={x} y={y} textAnchor="middle" className="al">{text}</text>
);

export default function FDMSArchitecture() {
  return (
    <svg viewBox="0 0 1080 490" className="fdms-svg" aria-label="FDMS system architecture diagram">
      <defs>
        <marker id="fcm" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-cyan)" opacity="0.95" />
        </marker>
        <marker id="fam" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-amber)" opacity="0.85" />
        </marker>

        <style>{`
          .fdms-svg { width: 100%; height: auto; display: block; }

          .dn rect { fill: var(--bg-surface); stroke-width: 1.5; }
          .dn-ext  rect { stroke: var(--accent-amber); }
          .dn-int  rect { stroke: var(--accent-cyan); stroke-opacity: 0.65; }
          .dn-hub  rect { fill: rgba(34,211,238,0.08); stroke: var(--accent-cyan); stroke-width: 2; }
          .dn-data rect { stroke: var(--border); }

          .dl1 { font-family:'JetBrains Mono',monospace; font-size:7.5px; fill:var(--text-primary); font-weight:600; }
          .dl2 { font-family:'DM Sans',sans-serif; font-size:6px; fill:var(--text-secondary); }
          .dn-ext  .dl1 { fill:var(--accent-amber); }
          .dn-hub  .dl1 { fill:var(--accent-cyan); font-size:8.5px; }
          .dn-hub  .dl2 { fill:var(--accent-cyan); opacity:0.75; }

          .zl { font-family:'JetBrains Mono',monospace; font-size:6px; fill:var(--text-secondary); letter-spacing:0.1em; opacity:0.4; text-transform:uppercase; }
          .al { font-family:'DM Sans',sans-serif; font-size:5.5px; fill:var(--accent-amber); opacity:0.8; }

          .fp {
            fill: none;
            stroke: var(--accent-cyan);
            stroke-width: 1.4;
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: fdms-flow-draw 0.5s ease-out forwards;
            opacity: 0.85;
          }

          .pp {
            fill: none;
            stroke: var(--accent-amber);
            stroke-width: 1.2;
            stroke-dasharray: 6 4;
            stroke-dashoffset: 0;
            animation: fdms-dash-flow 2s linear infinite;
            opacity: 0.55;
          }

          .pb { fill:none; stroke:var(--accent-amber); stroke-width:1; stroke-dasharray:4 4; opacity:0.25; }

          @keyframes fdms-flow-draw { to { stroke-dashoffset: 0; } }
          @keyframes fdms-dash-flow { to { stroke-dashoffset: -26; } }
        `}</style>
      </defs>

      {/* ── Zone labels ── */}
      <ZL x="8"   y="80"  text="Disruption Signals" />
      <ZL x="345" y="140" text="State Machine" />
      <ZL x="685" y="35"  text="Multi-Agent Pipeline" />
      <ZL x="870" y="35"  text="LLM Backend" />
      <ZL x="345" y="278" text="Persistence" />
      <ZL x="685" y="348" text="Operations" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 0 — External signals → FDMS Core
          weather is straight (y=170 matches FDMS center).
          amadeus & opsConsole use L-shape via clearance x=152.
      ══════════════════════════════════════════════════════════ */}
      {/* Amadeus: (126, 115) → (152, 115) → (152, 145) → (180, 145) */}
      <F phase={0} d="M 126 115 L 152 115 L 152 145 L 180 145" />
      {/* Weather: (126, 170) → (180, 170) STRAIGHT */}
      <F phase={0} d="M 126 170 L 180 170" />
      {/* Ops Console: (126, 225) → (152, 225) → (152, 195) → (180, 195) */}
      <F phase={0} d="M 126 225 L 152 225 L 152 195 L 180 195" />

      {/* Arrow labels between sources and FDMS Core */}
      <AL x="153" y="138" text="Flight Events" />
      <AL x="153" y="166" text="Weather Alerts" />
      <AL x="153" y="218" text="Manual Trigger" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 1 — FDMS Core → State Machine (straight horizontal)
      ══════════════════════════════════════════════════════════ */}
      <F phase={1} d="M 300 170 L 345 170" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 2 — State Machine → LangChain (straight horizontal)
      ══════════════════════════════════════════════════════════ */}
      <F phase={2} d="M 465 170 L 510 170" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 3 — LangChain fanout to 4 agents (L-shape via bus x=665)
      ══════════════════════════════════════════════════════════ */}
      {/* Agent 1 — Impact Analyzer (up) */}
      <F phase={3} d="M 640 170 L 665 170 L 665 65 L 685 65" />
      {/* Agent 2 — Severity Scorer (up) */}
      <F phase={3} d="M 640 170 L 665 170 L 665 125 L 685 125" />
      {/* Agent 3 — Option Generator (down) */}
      <F phase={3} d="M 640 170 L 665 170 L 665 185 L 685 185" />
      {/* Agent 4 — Decisioning (down) */}
      <F phase={3} d="M 640 170 L 665 170 L 665 245 L 685 245" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 4 — Each agent → Claude API (4 straight horizontal lines)
          Agent right edges at x=830, Claude API left at x=870.
      ══════════════════════════════════════════════════════════ */}
      <F phase={4} d="M 830 65  L 870 65"  />
      <F phase={4} d="M 830 125 L 870 125" />
      <F phase={4} d="M 830 185 L 870 185" />
      <F phase={4} d="M 830 245 L 870 245" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 5 — State Machine → PostgreSQL (straight vertical)
          State Machine bottom-center (405, 190) → PostgreSQL top-center (405, 290)
      ══════════════════════════════════════════════════════════ */}
      <F phase={5} d="M 405 190 L 405 290" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 5 — LangChain → Audit Trail (straight vertical)
          LangChain bottom-center (575, 210) → Audit top-center (575, 290)
      ══════════════════════════════════════════════════════════ */}
      <F phase={5} d="M 575 210 L 575 290" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 6 — Agent 4 (final decision) → Dashboard
          Agent 4 bottom-center (757, 265) → Dashboard top-center (757, 360)
      ══════════════════════════════════════════════════════════ */}
      <F phase={6} d="M 757 265 L 757 360" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 7 — Dashboard → Ops Team (straight horizontal)
      ══════════════════════════════════════════════════════════ */}
      <F phase={7} d="M 830 380 L 870 380" />

      {/* ══════════════════════════════════════════════════════════
          PINGBACK — LLM responses + audit callbacks
          Amber dashed animated lines.
      ══════════════════════════════════════════════════════════ */}

      {/* Vertical pingback bus at x=850 (between agents & Claude) — purely visual context */}
      <line x1="850" y1="65" x2="850" y2="245" className="pb" />

      {/* Decision approval pingback: Ops Team → Dashboard → back to State Machine */}
      <P d="M 870 395 L 757 395 L 757 410 L 405 410 L 405 325" />

      {/* Pingback label */}
      <ZL x="430" y="405" text="approval / re-evaluation" amber />

      {/* ══════════════════════════════════════════════════════════
          NODES — rendered last (on top of all paths)
      ══════════════════════════════════════════════════════════ */}
      <Node id="amadeus"      l1="Amadeus PSS"   l2="Flight & PNR"        type="ext"  />
      <Node id="weather"      l1="Weather API"   l2="METAR / TAF"         type="ext"  />
      <Node id="opsConsole"   l1="Ops Console"   l2="Manual Trigger"      type="ext"  />
      <Node id="fdmsCore"     l1="FDMS"          l2="Disruption Core"     type="hub"  />
      <Node id="stateMachine" l1="State Machine" l2="5-Stage Pipeline"    type="int"  />
      <Node id="langchain"    l1="LangChain"     l2="Agent Runtime"       type="hub"  />
      <Node id="agent1"       l1="Agent 1"       l2="Impact Analysis"     type="int"  />
      <Node id="agent2"       l1="Agent 2"       l2="Severity Scoring"    type="int"  />
      <Node id="agent3"       l1="Agent 3"       l2="Option Generation"   type="int"  />
      <Node id="agent4"       l1="Agent 4"       l2="Decisioning"         type="int"  />
      <Node id="claudeApi"    l1="Claude Sonnet" l2="Anthropic LLM"       type="ext"  />
      <Node id="postgres"     l1="PostgreSQL"    l2="State Store"         type="data" />
      <Node id="audit"        l1="Audit Log"     l2="Decision Trail"      type="data" />
      <Node id="dashboard"    l1="React UI"      l2="Ops Dashboard"       type="int"  />
      <Node id="opsTeam"      l1="Ops Team"      l2="Decision Approver"   type="ext"  />
    </svg>
  );
}
