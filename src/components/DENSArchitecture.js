import React from 'react';

// ViewBox: 0 0 1080 470
const N = {
  // Single external vendor (Amadeus — sends flight events + provides data on request)
  externalVendor: { x: 8,   y: 148, w: 118, h: 92 },
  // Data platform (internal PostgreSQL)
  postgres:       { x: 18,  y: 78,  w: 110, h: 32 },
  // DENS core processor
  dens:           { x: 165, y: 183, w: 124, h: 66 },
  // Message pipeline
  httpSvc:        { x: 332, y: 202, w: 106, h: 36 },
  serviceBus:     { x: 484, y: 202, w: 106, h: 36 },
  listener:       { x: 484, y: 286, w: 106, h: 36 },
  mos:            { x: 638, y: 183, w: 122, h: 66 },
  // Delivery channels
  whatsapp:       { x: 815, y: 96,  w: 92,  h: 30 },
  sms:            { x: 815, y: 142, w: 92,  h: 30 },
  emailSvc:       { x: 815, y: 190, w: 92,  h: 30 },
  awsSes:         { x: 940, y: 190, w: 78,  h: 30 },
  pushPath:       { x: 815, y: 238, w: 92,  h: 30 },
  // Push sub-chain
  mobilePlat:     { x: 638, y: 328, w: 110, h: 30 },
  pnw:            { x: 815, y: 318, w: 92,  h: 30 },
  apn:            { x: 940, y: 297, w: 78,  h: 30 },
  firebase:       { x: 940, y: 345, w: 78,  h: 30 },
  // Status store
  cosmosdb:       { x: 484, y: 415, w: 110, h: 34 },
};

const rx = (k) => N[k].x + N[k].w;
const lx = (k) => N[k].x;
const cx = (k) => N[k].x + N[k].w / 2;
const ty = (k) => N[k].y;
const by = (k) => N[k].y + N[k].h;
const my = (k) => N[k].y + N[k].h / 2;

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

// Animated forward-flow path
const Flow = ({ d, phase }) => (
  <path
    d={d}
    className="dp"
    style={{ animationDelay: `${phase * 0.45}s` }}
    markerEnd="url(#cm)"
  />
);

// Static dashed amber path (pingback)
const Pingback = ({ d, noArrow }) => (
  <path
    d={d}
    className="dp-pingback"
    markerEnd={noArrow ? undefined : 'url(#am)'}
  />
);

// Small arrow label
const ArrowLabel = ({ x, y, text }) => (
  <text x={x} y={y} textAnchor="middle" className="al">{text}</text>
);

const ZL = ({ x, y, text }) => (
  <text x={x} y={y} className="zl">{text}</text>
);

const DENSArchitecture = () => (
  <svg viewBox="0 0 1080 470" className="dens-svg" aria-label="DENS system architecture">
    <defs>
      <marker id="cm" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-cyan)" opacity="0.9" />
      </marker>
      <marker id="am" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L7,3.5 z" fill="var(--accent-amber)" opacity="0.8" />
      </marker>
      <style>{`
        .dens-svg { width: 100%; height: auto; display: block; }

        .dn rect { fill: var(--bg-surface); stroke-width: 1.5; }
        .dn-ext  rect { stroke: var(--accent-amber); }
        .dn-int  rect { stroke: var(--accent-cyan); stroke-opacity: 0.7; }
        .dn-hub  rect { fill: rgba(34,211,238,0.07); stroke: var(--accent-cyan); stroke-width: 2; }
        .dn-data rect { stroke: var(--border); }

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
        .dn-ext .dl1 { fill: var(--accent-amber); }
        .dn-hub .dl1 { fill: var(--accent-cyan); font-size: 8.5px; }
        .dn-hub .dl2 { fill: var(--accent-cyan); opacity: 0.7; }

        .zl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 6px;
          fill: var(--text-secondary);
          letter-spacing: 0.1em;
          opacity: 0.45;
          text-transform: uppercase;
        }

        /* Arrow labels */
        .al {
          font-family: 'DM Sans', sans-serif;
          font-size: 5.5px;
          fill: var(--accent-amber);
          opacity: 0.75;
        }

        /* Forward flow paths */
        .dp {
          fill: none;
          stroke: var(--accent-cyan);
          stroke-width: 1.3;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: flow-draw 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
          opacity: 0.8;
        }

        /* Pingback dashed amber */
        .dp-pingback {
          fill: none;
          stroke: var(--accent-amber);
          stroke-width: 1.2;
          stroke-dasharray: 6 4;
          stroke-dashoffset: 0;
          animation: dash-flow 2.2s linear infinite;
          opacity: 0.55;
        }
        /* Pingback bus - static vertical line */
        .dp-bus {
          fill: none;
          stroke: var(--accent-amber);
          stroke-width: 1;
          stroke-dasharray: 4 4;
          opacity: 0.3;
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
    <ZL x="18"  y="66"  text="Data Sources" />
    <ZL x="332" y="190" text="Message Pipeline" />
    <ZL x="815" y="84"  text="Delivery Channels" />
    <ZL x="638" y="316" text="Push Sub-Chain" />
    <ZL x="484" y="403" text="Status Store" />

    {/* ═══════════════════════════════════════════════════════ */}
    {/* PHASE 0 — External Vendor → DENS (3 connections)       */}
    {/* ═══════════════════════════════════════════════════════ */}
    {/* Flight Events (top arrow) */}
    <Flow phase={0} d={`M ${rx('externalVendor')} ${N.externalVendor.y + 22} L ${lx('dens')} 200`} />
    {/* Passenger Data (middle arrow) */}
    <Flow phase={0} d={`M ${rx('externalVendor')} ${my('externalVendor')} L ${lx('dens')} 216`} />
    {/* Live Updates (bottom arrow) */}
    <Flow phase={0} d={`M ${rx('externalVendor')} ${N.externalVendor.y + 70} L ${lx('dens')} 232`} />

    {/* Arrow labels on the 3 connections */}
    <ArrowLabel x="145" y="188" text="Flight Events" />
    <ArrowLabel x="145" y="211" text="Passenger Data" />
    <ArrowLabel x="145" y="234" text="Live Updates" />

    {/* ── PostgreSQL → DENS ── */}
    <Flow phase={0} d={`M ${rx('postgres')} ${my('postgres')} C 165 ${my('postgres')} ${cx('dens')} 130 ${cx('dens')} ${ty('dens')}`} />

    {/* ═══════════════════════════════════════════════════════ */}
    {/* PHASE 1-5 — Message Pipeline                           */}
    {/* ═══════════════════════════════════════════════════════ */}
    <Flow phase={1} d={`M ${rx('dens')} ${my('dens')} L ${lx('httpSvc')} ${my('httpSvc')}`} />
    <Flow phase={2} d={`M ${rx('httpSvc')} ${my('httpSvc')} L ${lx('serviceBus')} ${my('serviceBus')}`} />
    <Flow phase={3} d={`M ${cx('serviceBus')} ${by('serviceBus')} L ${cx('listener')} ${ty('listener')}`} />
    <Flow phase={4} d={`M ${rx('listener')} ${my('listener')} C 638 ${my('listener')} 638 240 ${lx('mos')} ${my('mos')}`} />

    {/* ═══════════════════════════════════════════════════════ */}
    {/* PHASE 5 — MOS fanout to delivery channels              */}
    {/* ═══════════════════════════════════════════════════════ */}
    <Flow phase={5} d={`M ${rx('mos')} ${my('mos') - 16} C 782 ${my('mos') - 16} 782 ${my('whatsapp')} ${lx('whatsapp')} ${my('whatsapp')}`} />
    <Flow phase={5} d={`M ${rx('mos')} ${my('mos') - 5}  C 782 ${my('mos') - 5}  782 ${my('sms')}      ${lx('sms')}      ${my('sms')}`} />
    <Flow phase={5} d={`M ${rx('mos')} ${my('mos') + 5}  C 782 ${my('mos') + 5}  782 ${my('emailSvc')} ${lx('emailSvc')} ${my('emailSvc')}`} />
    <Flow phase={5} d={`M ${rx('mos')} ${my('mos') + 16} C 782 ${my('mos') + 16} 782 ${my('pushPath')} ${lx('pushPath')} ${my('pushPath')}`} />

    {/* ── Email → AWS SES ── */}
    <Flow phase={6} d={`M ${rx('emailSvc')} ${my('emailSvc')} L ${lx('awsSes')} ${my('awsSes')}`} />

    {/* ═══════════════════════════════════════════════════════ */}
    {/* PHASE 6 — Push sub-chain                               */}
    {/* ═══════════════════════════════════════════════════════ */}
    <Flow phase={6} d={`M ${cx('mos')} ${by('mos')} L ${cx('mobilePlat')} ${ty('mobilePlat')}`} />
    <Flow phase={7} d={`M ${rx('mobilePlat')} ${my('mobilePlat')} L ${lx('pnw')} ${my('pnw')}`} />
    <Flow phase={8} d={`M ${rx('pnw')} ${my('pnw') - 5} L ${lx('apn')} ${my('apn')}`} />
    <Flow phase={8} d={`M ${rx('pnw')} ${my('pnw') + 5} L ${lx('firebase')} ${my('firebase')}`} />

    {/* ═══════════════════════════════════════════════════════ */}
    {/* PINGBACK — Delivery vendors → MOS → CosmosDB           */}
    {/* ═══════════════════════════════════════════════════════ */}
    {/* Pingback bus (vertical amber dashed line on right) */}
    <line x1="1055" y1="111" x2="1055" y2="333" className="dp-bus" />

    {/* Stubs: each channel's right edge → pingback bus */}
    <Pingback noArrow d={`M ${rx('whatsapp')} ${my('whatsapp')} L 1055 ${my('whatsapp')}`} />
    <Pingback noArrow d={`M ${rx('sms')}      ${my('sms')}      L 1055 ${my('sms')}`} />
    <Pingback noArrow d={`M ${rx('emailSvc')} ${my('emailSvc')} L 1055 ${my('emailSvc')}`} />
    <Pingback noArrow d={`M ${rx('pnw')}      ${my('pnw')}      L 1055 ${my('pnw')}`} />

    {/* Pingback bus → MOS right side */}
    <Pingback d={`M 1055 ${my('mos')} C 1055 ${my('mos')} 820 ${my('mos')} ${rx('mos')} ${my('mos')}`} />

    {/* MOS → CosmosDB (status update) */}
    <Pingback d={`M ${cx('mos')} ${by('mos')} C ${cx('mos')} 432 ${cx('cosmosdb')} 432 ${cx('cosmosdb')} ${ty('cosmosdb')}`} />

    {/* Pingback label */}
    <text x="1058" y="228" className="zl" style={{ fill: 'var(--accent-amber)', opacity: 0.55, writingMode: 'tb' }}>
      PINGBACK (delivered/read)
    </text>

    {/* ═══════════════════════════════════════════════════════ */}
    {/* NODES — rendered on top of all paths                   */}
    {/* ═══════════════════════════════════════════════════════ */}
    <Node id="postgres"       l1="PostgreSQL"      l2="Data Platform"    type="data" />
    <Node id="externalVendor" l1="External Vendor" l2="(Amadeus System)"  type="ext"  />
    <Node id="dens"           l1="DENS"            l2="Event Processor"  type="hub"  />
    <Node id="httpSvc"        l1="HTTP Service"    l2="Events Endpoint"  type="int"  />
    <Node id="serviceBus"     l1="Service Bus"     l2="Topic"            type="data" />
    <Node id="listener"       l1="Listener"        l2="Service"          type="int"  />
    <Node id="mos"            l1="MOS"             l2="Msg Optimizer"    type="hub"  />
    <Node id="whatsapp"       l1="WhatsApp"        l2="Provider"         type="ext"  />
    <Node id="sms"            l1="SMS"             l2="Provider"         type="ext"  />
    <Node id="emailSvc"       l1="Email"           l2="Microservice"     type="int"  />
    <Node id="awsSes"         l1="AWS SES"         l2=""                 type="data" />
    <Node id="pushPath"       l1="Push Notif"      l2="Path"             type="int"  />
    <Node id="mobilePlat"     l1="Mobile Platform" l2="Device Token"     type="int"  />
    <Node id="pnw"            l1="Push Wrapper"    l2="(PNW)"            type="int"  />
    <Node id="apn"            l1="APN"             l2="(Apple)"          type="ext"  />
    <Node id="firebase"       l1="Firebase"        l2="(Android)"        type="ext"  />
    <Node id="cosmosdb"       l1="CosmosDB"        l2="Status Store"     type="data" />
  </svg>
);

export default DENSArchitecture;
