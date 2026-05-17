import React from 'react';

// Node coordinate map — all positions for the 1040x470 viewBox
const N = {
  // External input
  flightEvents:  { x: 8,   y: 210, w: 100, h: 36 },
  // DENS core (main processor)
  dens:          { x: 148, y: 183, w: 124, h: 66 },
  // Data sources DENS fetches from
  postgres:      { x: 18,  y: 88,  w: 110, h: 32 },
  amadeusPax:    { x: 164, y: 62,  w: 112, h: 30 },
  amadeusLive:   { x: 164, y: 102, w: 112, h: 30 },
  // Message pipeline
  httpSvc:       { x: 320, y: 202, w: 106, h: 36 },
  serviceBus:    { x: 472, y: 202, w: 106, h: 36 },
  listener:      { x: 472, y: 286, w: 106, h: 36 },
  mos:           { x: 625, y: 183, w: 122, h: 66 },
  // Delivery channels
  whatsapp:      { x: 800, y: 96,  w: 92,  h: 30 },
  sms:           { x: 800, y: 142, w: 92,  h: 30 },
  emailSvc:      { x: 800, y: 190, w: 92,  h: 30 },
  awsSes:        { x: 926, y: 190, w: 78,  h: 30 },
  pushPath:      { x: 800, y: 238, w: 92,  h: 30 },
  // Push sub-chain
  mobilePlat:    { x: 625, y: 326, w: 110, h: 30 },
  pnw:           { x: 800, y: 313, w: 92,  h: 30 },
  apn:           { x: 926, y: 292, w: 78,  h: 30 },
  firebase:      { x: 926, y: 340, w: 78,  h: 30 },
  // Status store
  cosmosdb:      { x: 472, y: 410, w: 110, h: 34 },
};

// Attachment-point helpers
const rx = (k) => N[k].x + N[k].w;
const lx = (k) => N[k].x;
const cx = (k) => N[k].x + N[k].w / 2;
const ty = (k) => N[k].y;
const by = (k) => N[k].y + N[k].h;
const my = (k) => N[k].y + N[k].h / 2;

// Draws a rect + labels
const Node = ({ id, l1, l2, type }) => {
  const { x, y, w, h } = N[id];
  const midX = x + w / 2;
  const midY = y + h / 2;
  return (
    <g className={`dn dn-${type}`}>
      <rect x={x} y={y} width={w} height={h} rx="5" />
      <text x={midX} y={l2 ? midY - 4 : midY + 4} textAnchor="middle" className="dl1">{l1}</text>
      {l2 && <text x={midX} y={midY + 8} textAnchor="middle" className="dl2">{l2}</text>}
    </g>
  );
};

// Animated path
const Flow = ({ d, phase, amber, dashed }) => (
  <path
    d={d}
    className={`dp${dashed ? ' dp-dash' : ''}${amber ? ' dp-amber' : ''}`}
    style={{ animationDelay: `${phase * 0.45}s` }}
    markerEnd={amber ? 'url(#am)' : 'url(#cm)'}
  />
);

// Zone label
const ZL = ({ x, y, text }) => (
  <text x={x} y={y} className="zl">{text}</text>
);

const DENSArchitecture = () => (
  <svg viewBox="0 0 1040 470" className="dens-svg" aria-label="DENS system architecture">
    <defs>
      {/* Cyan arrowhead */}
      <marker id="cm" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-cyan)" opacity="0.9" />
      </marker>
      {/* Amber arrowhead */}
      <marker id="am" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-amber)" opacity="0.7" />
      </marker>
      <style>{`
        .dens-svg { width: 100%; height: auto; display: block; }

        /* Node base */
        .dn rect { fill: var(--bg-surface); stroke-width: 1.5; }
        .dn-ext rect  { stroke: var(--accent-amber); }
        .dn-int rect  { stroke: var(--accent-cyan); stroke-opacity: 0.7; }
        .dn-hub rect  { fill: rgba(34,211,238,0.07); stroke: var(--accent-cyan); stroke-width: 2; }
        .dn-data rect { stroke: var(--border); }

        /* Text */
        .dl1 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7.5px;
          fill: var(--text-primary);
          font-weight: 600;
        }
        .dl2 {
          font-family: 'DM Sans', sans-serif;
          font-size: 6px;
          fill: var(--text-secondary);
        }
        .dn-ext .dl1  { fill: var(--accent-amber); }
        .dn-hub .dl1  { fill: var(--accent-cyan); font-size: 8.5px; }
        .dn-hub .dl2  { fill: var(--accent-cyan); opacity: 0.7; }

        /* Zone labels */
        .zl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 6px;
          fill: var(--text-secondary);
          letter-spacing: 0.1em;
          opacity: 0.45;
          text-transform: uppercase;
        }

        /* Flow paths */
        .dp {
          fill: none;
          stroke: var(--accent-cyan);
          stroke-width: 1.3;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: flow-draw 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
          opacity: 0.8;
        }
        .dp-amber {
          stroke: var(--accent-amber);
          stroke-dasharray: 8 5;
          stroke-dashoffset: 0;
          animation: dash-flow 2.5s linear infinite;
          opacity: 0.55;
        }
        .dp-dash {
          stroke-dasharray: 8 5;
          stroke-dashoffset: 0;
          animation: dash-flow 2s linear infinite;
        }
        @keyframes flow-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -26; }
        }
      `}</style>
    </defs>

    {/* ── Zone labels ── */}
    <ZL x="18"  y="76"  text="Data Sources" />
    <ZL x="320" y="190" text="Message Pipeline" />
    <ZL x="800" y="84"  text="Delivery Channels" />
    <ZL x="625" y="315" text="Push Sub-Chain" />
    <ZL x="472" y="400" text="Status Store" />

    {/* ── Phase 0 — Flight Events → DENS ── */}
    <Flow phase={0}
      d={`M ${rx('flightEvents')} ${my('flightEvents')} L ${lx('dens')} ${my('dens')}`} />

    {/* ── Phase 1 — Data Sources → DENS ── */}
    {/* PostgreSQL → DENS top */}
    <Flow phase={1}
      d={`M ${rx('postgres')} ${my('postgres')} C 148 ${my('postgres')} ${cx('dens')} 135 ${cx('dens')} ${ty('dens')}`} />
    {/* Amadeus Passenger → DENS top-right */}
    <Flow phase={1}
      d={`M ${rx('amadeusPax')} ${my('amadeusPax')} C 296 ${my('amadeusPax')} ${cx('dens') + 20} 110 ${cx('dens') + 20} ${ty('dens')}`} />
    {/* Amadeus Live → DENS top-right */}
    <Flow phase={1}
      d={`M ${rx('amadeusLive')} ${my('amadeusLive')} C 296 ${my('amadeusLive')} ${cx('dens') + 30} 130 ${cx('dens') + 30} ${ty('dens')}`} />

    {/* ── Phase 2 — DENS → HTTP Service ── */}
    <Flow phase={2}
      d={`M ${rx('dens')} ${my('dens')} L ${lx('httpSvc')} ${my('httpSvc')}`} />

    {/* ── Phase 3 — HTTP → Service Bus ── */}
    <Flow phase={3}
      d={`M ${rx('httpSvc')} ${my('httpSvc')} L ${lx('serviceBus')} ${my('serviceBus')}`} />

    {/* ── Phase 4 — Service Bus → Listener ── */}
    <Flow phase={4}
      d={`M ${cx('serviceBus')} ${by('serviceBus')} L ${cx('listener')} ${ty('listener')}`} />

    {/* ── Phase 5 — Listener → MOS ── */}
    <Flow phase={5}
      d={`M ${rx('listener')} ${my('listener')} C 625 ${my('listener')} 625 240 ${lx('mos')} ${my('mos')}`} />

    {/* ── Phase 6 — MOS fanout → Channels ── */}
    {/* MOS → WhatsApp */}
    <Flow phase={6}
      d={`M ${rx('mos')} ${my('mos') - 16} C 780 ${my('mos') - 16} 780 ${my('whatsapp')} ${lx('whatsapp')} ${my('whatsapp')}`} />
    {/* MOS → SMS */}
    <Flow phase={6}
      d={`M ${rx('mos')} ${my('mos') - 5} C 780 ${my('mos') - 5} 780 ${my('sms')} ${lx('sms')} ${my('sms')}`} />
    {/* MOS → Email Microservice */}
    <Flow phase={6}
      d={`M ${rx('mos')} ${my('mos') + 5} C 780 ${my('mos') + 5} 780 ${my('emailSvc')} ${lx('emailSvc')} ${my('emailSvc')}`} />
    {/* MOS → Push Path */}
    <Flow phase={6}
      d={`M ${rx('mos')} ${my('mos') + 16} C 780 ${my('mos') + 16} 780 ${my('pushPath')} ${lx('pushPath')} ${my('pushPath')}`} />

    {/* ── Phase 7 — Email → AWS SES ── */}
    <Flow phase={7}
      d={`M ${rx('emailSvc')} ${my('emailSvc')} L ${lx('awsSes')} ${my('awsSes')}`} />

    {/* ── Phase 7 — MOS → Mobile Platform (get device token) ── */}
    <Flow phase={7}
      d={`M ${cx('mos')} ${by('mos')} L ${cx('mobilePlat')} ${ty('mobilePlat')}`} />

    {/* ── Phase 8 — Mobile Platform → PNW (with device token attached) ── */}
    <Flow phase={8}
      d={`M ${rx('mobilePlat')} ${my('mobilePlat')} L ${lx('pnw')} ${my('pnw')}`} />

    {/* ── Phase 9 — PNW → APN + Firebase ── */}
    <Flow phase={9}
      d={`M ${rx('pnw')} ${my('pnw') - 5} L ${lx('apn')} ${my('apn')}`} />
    <Flow phase={9}
      d={`M ${rx('pnw')} ${my('pnw') + 5} L ${lx('firebase')} ${my('firebase')}`} />

    {/* ── Phase 10 — Pingback (all vendors → MOS → CosmosDB, dashed amber) ── */}
    {/* WhatsApp pingback */}
    <Flow phase={10} amber
      d={`M ${cx('whatsapp')} ${by('whatsapp')} C ${cx('whatsapp')} 440 ${cx('cosmosdb')} 440 ${cx('cosmosdb')} ${by('cosmosdb')}`} />
    {/* SMS pingback */}
    <Flow phase={10} amber
      d={`M ${cx('sms')} ${by('sms')} C ${cx('sms')} 450 ${cx('cosmosdb') + 10} 450 ${cx('cosmosdb') + 10} ${by('cosmosdb')}`} />
    {/* Email pingback */}
    <Flow phase={10} amber
      d={`M ${cx('emailSvc')} ${by('emailSvc')} C ${cx('emailSvc')} 460 ${cx('cosmosdb') - 10} 460 ${cx('cosmosdb') - 10} ${by('cosmosdb')}`} />
    {/* Push pingback */}
    <Flow phase={10} amber
      d={`M ${cx('pushPath')} ${by('pushPath')} C ${cx('pushPath')} 455 ${cx('cosmosdb') - 20} 455 ${cx('cosmosdb') - 20} ${by('cosmosdb')}`} />
    {/* MOS → CosmosDB */}
    <Flow phase={10} amber
      d={`M ${cx('mos')} ${by('mos')} C ${cx('mos')} 455 ${cx('cosmosdb')} 455 ${cx('cosmosdb')} ${by('cosmosdb')}`} />

    {/* ── Render Nodes (on top of paths) ── */}
    {/* Data sources */}
    <Node id="postgres"    l1="PostgreSQL"    l2="Data Platform"   type="data" />
    <Node id="amadeusPax"  l1="Amadeus API"   l2="Passenger Data"  type="ext"  />
    <Node id="amadeusLive" l1="Amadeus API"   l2="Live Updates"    type="ext"  />
    {/* Entry + core */}
    <Node id="flightEvents" l1="Flight Events" l2="External System" type="ext" />
    <Node id="dens"        l1="DENS"          l2="Event Processor" type="hub" />
    {/* Pipeline */}
    <Node id="httpSvc"     l1="HTTP Service"  l2="Events Endpoint" type="int"  />
    <Node id="serviceBus"  l1="Service Bus"   l2="Topic"           type="data" />
    <Node id="listener"    l1="Listener"      l2="Service"         type="int"  />
    <Node id="mos"         l1="MOS"           l2="Msg Optimizer"   type="hub" />
    {/* Delivery */}
    <Node id="whatsapp"    l1="WhatsApp"      l2="Provider"        type="ext"  />
    <Node id="sms"         l1="SMS"           l2="Provider"        type="ext"  />
    <Node id="emailSvc"    l1="Email"         l2="Microservice"    type="int"  />
    <Node id="awsSes"      l1="AWS SES"       l2=""                type="data" />
    <Node id="pushPath"    l1="Push Notif"    l2="Path"            type="int"  />
    {/* Push sub-chain */}
    <Node id="mobilePlat"  l1="Mobile Platform" l2="Device Token"  type="int"  />
    <Node id="pnw"         l1="Push Wrapper"  l2="(PNW)"          type="int"  />
    <Node id="apn"         l1="APN"           l2="(Apple)"         type="ext"  />
    <Node id="firebase"    l1="Firebase"      l2="(Android)"       type="ext"  />
    {/* Storage */}
    <Node id="cosmosdb"    l1="CosmosDB"      l2="Status Store"    type="data" />

    {/* Pingback label */}
    <text x="260" y="463" className="zl" style={{ fill: 'var(--accent-amber)', opacity: 0.6 }}>
      ← Delivery Status Pingback (delivered / read / failed)
    </text>
  </svg>
);

export default DENSArchitecture;
