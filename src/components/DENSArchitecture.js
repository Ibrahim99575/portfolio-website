import React from 'react';

// ─── Orthogonal (straight-line) pipeline diagram ───────────────────────────
// ViewBox: 0 0 1080 490
// All connections use only horizontal & vertical segments — zero curves.
// Each node aligned so same-level connections are perfectly straight.

const NODES = {
  postgres:       { x: 55,  y: 60,  w: 108, h: 32 },   // right=(163,76)
  externalVendor: { x: 8,   y: 145, w: 118, h: 72 },   // right=(126,181)
  dens:           { x: 178, y: 153, w: 118, h: 60 },   // center=(237,183) right=(296,183)
  httpSvc:        { x: 345, y: 165, w: 106, h: 36 },   // center y=183
  serviceBus:     { x: 498, y: 165, w: 106, h: 36 },   // center y=183
  listener:       { x: 498, y: 265, w: 106, h: 36 },   // center y=283
  mos:            { x: 658, y: 153, w: 118, h: 60 },   // center=(717,183) right=(776,183)
  whatsapp:       { x: 830, y: 120, w: 92,  h: 30 },   // center y=135
  sms:            { x: 830, y: 168, w: 92,  h: 30 },   // center y=183 ← same as MOS!
  emailSvc:       { x: 830, y: 218, w: 92,  h: 30 },   // center y=233
  awsSes:         { x: 960, y: 218, w: 78,  h: 30 },   // center y=233
  pushPath:       { x: 830, y: 268, w: 92,  h: 30 },   // center y=283
  mobilePlat:     { x: 658, y: 335, w: 118, h: 30 },   // center x=717 ← aligns with MOS!
  pnw:            { x: 830, y: 335, w: 92,  h: 30 },   // center y=350
  apn:            { x: 960, y: 314, w: 78,  h: 30 },   // center y=329
  firebase:       { x: 960, y: 362, w: 78,  h: 30 },   // center y=377
  cosmosdb:       { x: 498, y: 440, w: 110, h: 34 },   // left=(498,457)
};

// Simple rect + text node
const Node = ({ id, l1, l2, type }) => {
  const { x, y, w, h } = NODES[id];
  const mx = x + w / 2, my = y + h / 2;
  return (
    <g className={`dn dn-${type}`}>
      <rect x={x} y={y} width={w} height={h} rx="4" />
      <text x={mx} y={l2 ? my - 4 : my + 4} textAnchor="middle" className="dl1">{l1}</text>
      {l2 && <text x={mx} y={my + 8} textAnchor="middle" className="dl2">{l2}</text>}
    </g>
  );
};

// Animated forward-flow path (cyan)
const F = ({ d, phase }) => (
  <path d={d} className="fp" style={{ animationDelay: `${phase * 0.4}s` }} markerEnd="url(#cm)" />
);

// Pingback path (amber dashed, animated)
const P = ({ d, noArrow }) => (
  <path d={d} className="pp" markerEnd={noArrow ? undefined : 'url(#am)'} />
);

// Zone / arrow label
const ZL = ({ x, y, text, amber }) => (
  <text x={x} y={y} className="zl" style={amber ? { fill: 'var(--accent-amber)', opacity: 0.6 } : {}}>{text}</text>
);
const AL = ({ x, y, text }) => (
  <text x={x} y={y} textAnchor="middle" className="al">{text}</text>
);

export default function DENSArchitecture() {
  return (
    <svg viewBox="0 0 1080 490" className="dens-svg" aria-label="DENS system architecture diagram">
      <defs>
        <marker id="cm" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-cyan)" opacity="0.95" />
        </marker>
        <marker id="am" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-amber)" opacity="0.85" />
        </marker>

        <style>{`
          .dens-svg { width: 100%; height: auto; display: block; }

          /* Nodes */
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

          /* Zone labels */
          .zl { font-family:'JetBrains Mono',monospace; font-size:6px; fill:var(--text-secondary); letter-spacing:0.1em; opacity:0.4; text-transform:uppercase; }

          /* Arrow labels */
          .al { font-family:'DM Sans',sans-serif; font-size:5.5px; fill:var(--accent-amber); opacity:0.8; }

          /* Forward-flow paths */
          .fp {
            fill: none;
            stroke: var(--accent-cyan);
            stroke-width: 1.4;
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: flow-draw 0.5s ease-out forwards;
            opacity: 0.85;
          }

          /* Pingback paths */
          .pp {
            fill: none;
            stroke: var(--accent-amber);
            stroke-width: 1.2;
            stroke-dasharray: 6 4;
            stroke-dashoffset: 0;
            animation: dash-flow 2s linear infinite;
            opacity: 0.55;
          }

          /* Pingback vertical bus */
          .pb { fill:none; stroke:var(--accent-amber); stroke-width:1; stroke-dasharray:4 4; opacity:0.25; }

          @keyframes flow-draw { to { stroke-dashoffset: 0; } }
          @keyframes dash-flow { to { stroke-dashoffset: -26; } }
        `}</style>
      </defs>

      {/* ── Zone labels ── */}
      <ZL x="55"  y="50"  text="Data Sources" />
      <ZL x="345" y="153" text="Message Pipeline" />
      <ZL x="830" y="108" text="Delivery Channels" />
      <ZL x="658" y="323" text="Push Sub-Chain" />
      <ZL x="498" y="428" text="Status Store" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 0 — PostgreSQL → DENS (vertical path)
          163,76 → 237,76 → 237,153  (right then down)
      ══════════════════════════════════════════════════════════ */}
      <F phase={0} d="M 163 76 L 237 76 L 237 153" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 0 — External Vendor → DENS (3 straight horizontal lines)
          Each exits External Vendor right edge (x=126) at a specific y,
          enters DENS left edge (x=178) at the same y — perfectly straight.
      ══════════════════════════════════════════════════════════ */}
      {/* Flight Events */}
      <F phase={0} d="M 126 163 L 178 163" />
      {/* Passenger Data */}
      <F phase={0} d="M 126 183 L 178 183" />
      {/* Live Updates */}
      <F phase={0} d="M 126 203 L 178 203" />

      {/* Arrow labels between External Vendor and DENS */}
      <AL x="152" y="159" text="Flight Events" />
      <AL x="152" y="179" text="Passenger Data" />
      <AL x="152" y="199" text="Live Updates" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 1 — DENS → HTTP Service (straight horizontal)
      ══════════════════════════════════════════════════════════ */}
      <F phase={1} d="M 296 183 L 345 183" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 2 — HTTP Service → Service Bus (straight horizontal)
      ══════════════════════════════════════════════════════════ */}
      <F phase={2} d="M 451 183 L 498 183" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 3 — Service Bus → Listener (straight vertical)
          Center x=551, from SB bottom (y=201) to Listener top (y=265)
      ══════════════════════════════════════════════════════════ */}
      <F phase={3} d="M 551 201 L 551 265" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 4 — Listener → MOS (L-shaped: right → up → right)
          From Listener right center (604,283), clearance at x=635,
          up to y=183, then right to MOS left (658,183)
      ══════════════════════════════════════════════════════════ */}
      <F phase={4} d="M 604 283 L 635 283 L 635 183 L 658 183" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 5 — MOS fanout to 4 delivery channels
          SMS is a straight horizontal (same y=183 as MOS center).
          Others are L-shaped with non-overlapping clearance x values.
      ══════════════════════════════════════════════════════════ */}
      {/* WhatsApp — up: MOS exits at y=163, turns at x=803, reaches WA y=135 */}
      <F phase={5} d="M 776 163 L 803 163 L 803 135 L 830 135" />
      {/* SMS — straight horizontal (y=183 matches MOS center) */}
      <F phase={5} d="M 776 183 L 830 183" />
      {/* Email — down: MOS exits at y=200, turns at x=810, reaches Email y=233 */}
      <F phase={5} d="M 776 200 L 810 200 L 810 233 L 830 233" />
      {/* Push — down: MOS exits at y=213, turns at x=817, reaches Push y=283 */}
      <F phase={5} d="M 776 213 L 817 213 L 817 283 L 830 283" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 6 — Email → AWS SES (straight horizontal)
      ══════════════════════════════════════════════════════════ */}
      <F phase={6} d="M 922 233 L 960 233" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 6 — MOS → Mobile Platform (straight vertical)
          MOS bottom center (717,213) → Mobile Platform top center (717,335)
      ══════════════════════════════════════════════════════════ */}
      <F phase={6} d="M 717 213 L 717 335" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 7 — Mobile Platform → PNW (straight horizontal)
          Right center (776,350) → PNW left center (830,350)
      ══════════════════════════════════════════════════════════ */}
      <F phase={7} d="M 776 350 L 830 350" />

      {/* ══════════════════════════════════════════════════════════
          PHASE 8 — PNW → APN + Firebase (L-shaped, clearance x=941)
      ══════════════════════════════════════════════════════════ */}
      {/* PNW → APN (up) */}
      <F phase={8} d="M 922 342 L 941 342 L 941 329 L 960 329" />
      {/* PNW → Firebase (down) */}
      <F phase={8} d="M 922 358 L 941 358 L 941 377 L 960 377" />

      {/* ══════════════════════════════════════════════════════════
          PINGBACK — Delivery channels → pingback bus → MOS → CosmosDB
          Amber dashed animated lines showing status callback flow.
      ══════════════════════════════════════════════════════════ */}

      {/* Vertical pingback bus at x=1050 */}
      <line x1="1050" y1="135" x2="1050" y2="420" className="pb" />

      {/* Stubs: each channel right edge → bus (x=1050) */}
      <P noArrow d="M 922 135 L 1050 135" />
      <P noArrow d="M 922 183 L 1050 183" />
      <P noArrow d="M 922 233 L 1050 233" />
      <P noArrow d="M 922 350 L 1050 350" />

      {/* Bus return → MOS right (via x=785 clearance):
          from bus bottom (1050,420) left to x=785,
          up to MOS center y=183, into MOS right (776,183) */}
      <P d="M 1050 420 L 785 420 L 785 183 L 776 183" />

      {/* MOS → CosmosDB status update:
          exit MOS bottom-left corner (658,213),
          down to y=230, left to x=475,
          down to y=457, right into CosmosDB left (498,457) */}
      <P d="M 658 213 L 658 230 L 475 230 L 475 457 L 498 457" />

      {/* Pingback label */}
      <ZL x="1053" y="280" text="pingback" amber />

      {/* CosmosDB update label */}
      <AL x="416" y="350" text="status update" />

      {/* ══════════════════════════════════════════════════════════
          NODES — rendered last (on top of all paths)
      ══════════════════════════════════════════════════════════ */}
      <Node id="postgres"       l1="Data Platform"   l2="Internal DB"      type="data" />
      <Node id="externalVendor" l1="External Vendor" l2="Event Source"      type="ext"  />
      <Node id="dens"           l1="DENS"            l2="Core Processor"   type="hub"  />
      <Node id="httpSvc"        l1="Service 1"       l2="Event Endpoint"   type="int"  />
      <Node id="serviceBus"     l1="Message Queue"   l2="Topic"            type="data" />
      <Node id="listener"       l1="Service 2"       l2="Queue Consumer"   type="int"  />
      <Node id="mos"            l1="MOS"             l2="Msg Optimizer"    type="hub"  />
      <Node id="whatsapp"       l1="Channel 1"       l2="WhatsApp"         type="ext"  />
      <Node id="sms"            l1="Channel 2"       l2="SMS"              type="ext"  />
      <Node id="emailSvc"       l1="Service 3"       l2="Email Notif"      type="int"  />
      <Node id="awsSes"         l1="Ext. Provider"   l2="Email"            type="data" />
      <Node id="pushPath"       l1="Channel 3"       l2="Push Notif"       type="int"  />
      <Node id="mobilePlat"     l1="Service 4"       l2="Device Registry"  type="int"  />
      <Node id="pnw"            l1="Service 5"       l2="Push Dispatcher"  type="int"  />
      <Node id="apn"            l1="Provider 1"      l2="iOS Push"         type="ext"  />
      <Node id="firebase"       l1="Provider 2"      l2="Android Push"     type="ext"  />
      <Node id="cosmosdb"       l1="Status DB"       l2="Status Store"     type="data" />
    </svg>
  );
}
