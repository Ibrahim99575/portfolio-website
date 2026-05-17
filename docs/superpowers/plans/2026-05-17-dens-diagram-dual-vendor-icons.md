# DENS Diagram — Dual Vendor Split + Brand Icons — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `DENSArchitecture.js` to show two separate external vendor ingestion lanes (events via Azure Event Hub, data pull via GDS/SOAP) and add brand-recognizable SVG icons inside every node.

**Architecture:** Single-file SVG component change. ViewBox expands from `1080×490` to `1200×560`. Left side gets two new ingestion lanes: top lane (Vendor1→EventHub→DENS, push) and bottom lane (DENS→GDS→Vendor2, pull/SOAP). All delivery-side paths stay structurally the same, coordinates shift slightly due to re-aligned nodes.

**Tech Stack:** React, inline SVG, CSS-in-JS (SVG `<style>` block), no external dependencies.

---

## Coordinate Reference (read before editing any path)

All units are SVG coordinate units (viewBox `0 0 1200 560`).

| Node | x | y | w | h | key edges |
|------|---|---|---|---|-----------|
| extVendor1 | 15 | 62 | 135 | 60 | bottom=(82.5,122) right=(150,92) |
| azureEventHub | 15 | 185 | 135 | 48 | top=(82.5,185) right=(150,209) |
| postgres | 210 | 42 | 125 | 40 | bottom=(272.5,82) |
| dens | 205 | 150 | 140 | 76 | center=(275,188) right=(345,188) bottom=(275,226) left=(205,188) |
| gds | 205 | 358 | 140 | 52 | center=(275,384) top=(275,358) left=(205,384) right=(345,384) |
| extVendor2 | 15 | 358 | 135 | 52 | center=(82.5,384) right=(150,384) |
| httpSvc | 405 | 168 | 120 | 40 | left=(405,188) right=(525,188) |
| serviceBus | 580 | 168 | 120 | 40 | right=(700,188) bottom=(640,208) |
| listener | 580 | 275 | 120 | 40 | center=(640,295) right=(700,295) |
| mos | 745 | 150 | 135 | 76 | center=(812.5,188) left=(745,188) right=(880,188) bottom=(812.5,226) |
| whatsapp | 935 | 116 | 105 | 40 | left=(935,136) right=(1040,136) |
| sms | 935 | 168 | 105 | 40 | left=(935,188) right=(1040,188) |
| emailSvc | 935 | 220 | 105 | 40 | left=(935,240) right=(1040,240) |
| awsSes | 1082 | 220 | 88 | 40 | left=(1082,240) right=(1170,240) |
| pushPath | 935 | 272 | 105 | 40 | left=(935,292) right=(1040,292) |
| mobilePlat | 745 | 356 | 135 | 40 | left=(745,376) right=(880,376) |
| pnw | 935 | 356 | 105 | 40 | left=(935,376) right=(1040,376) |
| apn | 1082 | 334 | 88 | 40 | left=(1082,354) |
| firebase | 1082 | 386 | 88 | 40 | left=(1082,406) |
| cosmosdb | 580 | 460 | 120 | 40 | left=(580,480) |

---

## Task 1: Replace NODES and update viewBox

**Files:**
- Modify: `src/components/DENSArchitecture.js`

- [ ] **Step 1: Replace the NODES constant and viewBox**

Replace the entire NODES block (lines 8–26) with:

```js
const NODES = {
  extVendor1:    { x: 15,  y: 62,  w: 135, h: 60 },
  azureEventHub: { x: 15,  y: 185, w: 135, h: 48 },
  postgres:      { x: 210, y: 42,  w: 125, h: 40 },
  dens:          { x: 205, y: 150, w: 140, h: 76 },
  gds:           { x: 205, y: 358, w: 140, h: 52 },
  extVendor2:    { x: 15,  y: 358, w: 135, h: 52 },
  httpSvc:       { x: 405, y: 168, w: 120, h: 40 },
  serviceBus:    { x: 580, y: 168, w: 120, h: 40 },
  listener:      { x: 580, y: 275, w: 120, h: 40 },
  mos:           { x: 745, y: 150, w: 135, h: 76 },
  whatsapp:      { x: 935, y: 116, w: 105, h: 40 },
  sms:           { x: 935, y: 168, w: 105, h: 40 },
  emailSvc:      { x: 935, y: 220, w: 105, h: 40 },
  awsSes:        { x: 1082, y: 220, w: 88,  h: 40 },
  pushPath:      { x: 935, y: 272, w: 105, h: 40 },
  mobilePlat:    { x: 745, y: 356, w: 135, h: 40 },
  pnw:           { x: 935, y: 356, w: 105, h: 40 },
  apn:           { x: 1082, y: 334, w: 88,  h: 40 },
  firebase:      { x: 1082, y: 386, w: 88,  h: 40 },
  cosmosdb:      { x: 580, y: 460, w: 120, h: 40 },
};
```

Also change the `<svg viewBox=...>` attribute from `"0 0 1080 490"` to `"0 0 1200 560"`.

- [ ] **Step 2: Verify the file still compiles**

```powershell
cd d:\react\portfolio-website && npm run build 2>&1 | tail -5
```

Expected: no errors (nodes aren't rendered yet so no visual yet).

- [ ] **Step 3: Commit**

```powershell
git add src/components/DENSArchitecture.js
git commit -m "refactor: expand DENS viewBox and update node coordinates for dual-vendor layout"
```

---

## Task 2: Add ICONS constant, icon CSS, and update Node component

**Files:**
- Modify: `src/components/DENSArchitecture.js`

- [ ] **Step 1: Insert the ICONS constant after the NODES block**

Add after the closing `};` of NODES:

```jsx
// ─── Brand-recognizable SVG icons (12×12 coordinate space) ───────────────────
const ICONS = {
  database: (<><ellipse cx="6" cy="3.5" rx="4.5" ry="1.5"/><rect x="1.5" y="3.5" width="9" height="5"/><ellipse cx="6" cy="8.5" rx="4.5" ry="1.5"/></>),
  lightning: (<path d="M8.5,1 L5,6 L7,6 L3.5,11 L8,5.5 L6,5.5 Z"/>),
  globe:     (<><circle cx="6" cy="6" r="4.5"/><line x1="1.5" y1="6" x2="10.5" y2="6"/><path d="M6,1.5 C4.2,3.5 4.2,8.5 6,10.5 M6,1.5 C7.8,3.5 7.8,8.5 6,10.5"/></>),
  network:   (<><circle cx="6" cy="5.5" r="1.2"/><circle cx="6" cy="1.5" r="0.9"/><circle cx="10.5" cy="7" r="0.9"/><circle cx="1.5" cy="7" r="0.9"/><line x1="6" y1="4.3" x2="6" y2="2.4"/><line x1="7" y1="6.2" x2="9.7" y2="6.7"/><line x1="5" y1="6.2" x2="2.3" y2="6.7"/></>),
  gear:      (<><circle cx="6" cy="6" r="1.8"/><circle cx="6" cy="6" r="3.5"/><path d="M6,1 L6,2.4 M6,9.6 L6,11 M1,6 L2.4,6 M9.6,6 L11,6 M2.64,2.64 L3.63,3.63 M9.36,2.64 L8.37,3.63 M2.64,9.36 L3.63,8.37 M9.36,9.36 L8.37,8.37" strokeLinecap="round"/></>),
  code:      (<text y="9" fontSize="8" fontFamily="monospace" textAnchor="middle" x="6">{"</>"}</text>),
  queue:     (<><rect x="1" y="1.5" width="10" height="2.5" rx="0.5"/><rect x="1" y="5" width="8" height="2.5" rx="0.5"/><rect x="1" y="8.5" width="6" height="2.5" rx="0.5"/></>),
  waves:     (<><path d="M2.5,9.5 A5,5 0 0,1 9.5,9.5"/><path d="M4,7.5 A3,3 0 0,1 8,7.5"/><circle cx="6" cy="6" r="0.9"/><line x1="6" y1="6.9" x2="6" y2="11"/></>),
  funnel:    (<path d="M1,1.5 L11,1.5 L7,6.5 L7,10.5 L5,10.5 L5,6.5 Z"/>),
  whatsapp:  (<><path d="M6,1 A5,5 0 0,0 1.5,8.2 L1,11 L3.8,10.5 A5,5 0 1,0 6,1 Z"/><path d="M4.5,5.5 Q4.5,4 6,4 Q7.5,4 7.5,5.5 Q7.5,7 6,7.5 L5.5,8.5 L5.5,7.5 Q4.5,7 4.5,5.5 Z"/></>),
  bubble:    (<><path d="M2,2 L10,2 Q11,2 11,3 L11,8 Q11,9 10,9 L7,9 L5,11 L5,9 L2,9 Q1,9 1,8 L1,3 Q1,2 2,2 Z"/><line x1="3.5" y1="5" x2="8.5" y2="5"/><line x1="3.5" y1="7" x2="6.5" y2="7"/></>),
  envelope:  (<><rect x="1" y="3" width="10" height="7" rx="0.5"/><path d="M1,3 L6,7 L11,3"/></>),
  cloudMail: (<><path d="M3.5,7 A2.5,2.5 0 0,1 3.5,3 A3,3 0 0,1 9.5,5 A1.5,1.5 0 0,1 9.5,7 Z"/><rect x="2.5" y="7" width="7" height="4" rx="0.3"/><path d="M2.5,7 L6,9.5 L9.5,7"/></>),
  bell:      (<path d="M6,1.5 C6.4,1.5 6.5,2 6.5,2 C8,2.5 8.5,4.5 8.5,7 L9.5,8.5 L2.5,8.5 L3.5,7 C3.5,4.5 4,2.5 5.5,2 C5.5,2 5.6,1.5 6,1.5 Z M4.5,8.5 A1.5,1.5 0 0,0 7.5,8.5"/>),
  phone:     (<><rect x="3.5" y="1" width="5" height="10" rx="1"/><line x1="5" y1="9.2" x2="7" y2="9.2"/></>),
  arrows:    (<><line x1="1" y1="6" x2="11" y2="6"/><path d="M7.5,3 L11,6 L7.5,9"/><path d="M4.5,3 L1,6 L4.5,9"/></>),
  apple:     (<path d="M5.2,10.2 C3.5,9.2 2,7.5 2,5.5 C2,3.5 3.5,2.5 5,2.5 C5.5,2.8 6,3 6,3 C6,3 6.5,2.8 7,2.5 C8.5,2.5 10,3.5 10,5.5 C10,7.5 8.5,9.2 6.8,10.2 C6.3,10.4 5.7,10.4 5.2,10.2 Z M7.5,0.5 C7.9,0.1 8.1,0 7.8,0 C7.3,0 6.7,0.5 6.7,1.2 C6.7,1.6 7.1,2 7.4,1.8 C7.9,1.5 7.8,0.8 7.5,0.5 Z"/>),
  flame:     (<path d="M6,11 C4,10 2,8 2,5.5 C2,3.5 3.5,2.5 4.5,3 C4,2 4.5,1 5.5,1 C5.8,2 6.5,2.5 7.5,2.5 C7,1.5 7.5,1 8,2 C9.5,3 10,5 10,5.5 C10,8 8,10 6,11 Z"/>),
  cosmos:    (<><circle cx="6" cy="6.5" r="2.5"/><ellipse cx="6" cy="6.5" rx="5" ry="1.8" transform="rotate(-25,6,6.5)"/></>),
};
```

- [ ] **Step 2: Add icon CSS to the `<style>` block**

Inside the `<style>` block, after the `.pb { ... }` rule and before the `@keyframes` lines, add:

```css
/* Node icons */
.icon * { stroke-width: 1; fill: none; }
.dn-ext .icon * { stroke: var(--accent-amber); }
.dn-int .icon * { stroke: var(--accent-cyan); opacity: 0.7; }
.dn-hub .icon * { stroke: var(--accent-cyan); }
.dn-data .icon * { stroke: var(--text-secondary); opacity: 0.65; }
.icon text { stroke: none; fill: var(--text-secondary); }
.dn-ext .icon text { fill: var(--accent-amber); }
.dn-hub .icon text { fill: var(--accent-cyan); }
```

- [ ] **Step 3: Replace the Node component**

Replace the existing `Node` component (lines 29–38) with:

```jsx
const Node = ({ id, l1, l2, type, icon }) => {
  const { x, y, w, h } = NODES[id];
  const mx = x + w / 2, my = y + h / 2;

  if (icon) {
    const iSz = 12, gap = 3;
    const contentH = l2 ? iSz + gap + 8 + 8 + 6 : iSz + gap + 8;
    const startY = y + (h - contentH) / 2;
    const l1Y = startY + iSz + gap + 7;
    const l2Y = l1Y + 9;
    return (
      <g className={`dn dn-${type}`}>
        <rect x={x} y={y} width={w} height={h} rx="4" />
        <g className="icon" transform={`translate(${mx - 6},${startY})`}>{icon}</g>
        <text x={mx} y={l1Y} textAnchor="middle" className="dl1">{l1}</text>
        {l2 && <text x={mx} y={l2Y} textAnchor="middle" className="dl2">{l2}</text>}
      </g>
    );
  }

  return (
    <g className={`dn dn-${type}`}>
      <rect x={x} y={y} width={w} height={h} rx="4" />
      <text x={mx} y={l2 ? my - 4 : my + 4} textAnchor="middle" className="dl1">{l1}</text>
      {l2 && <text x={mx} y={my + 8} textAnchor="middle" className="dl2">{l2}</text>}
    </g>
  );
};
```

- [ ] **Step 4: Compile check**

```powershell
npm run build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 5: Commit**

```powershell
git add src/components/DENSArchitecture.js
git commit -m "feat: add ICONS constant, icon CSS, and update Node component for icon rendering"
```

---

## Task 3: Replace all connection paths

**Files:**
- Modify: `src/components/DENSArchitecture.js`

Replace the entire connections section (everything between `{/* ── Zone labels ── */}` and `{/* NODES — rendered last */}`) with the following. Replace it in full — do not merge with existing paths.

- [ ] **Step 1: Replace zone labels and all path elements**

```jsx
{/* ── Zone labels ── */}
<ZL x="15"  y="52"  text="Event Source" />
<ZL x="15"  y="175" text="Event Bus" />
<ZL x="210" y="32"  text="Data Source" />
<ZL x="15"  y="348" text="Data Pull" />
<ZL x="405" y="156" text="Message Pipeline" />
<ZL x="935" y="104" text="Delivery Channels" />
<ZL x="745" y="346" text="Push Sub-Chain" />
<ZL x="580" y="450" text="Status Store" />

{/* ══ INGESTION — Event push lane ══════════════════════════════════════════
    Vendor1 pushes flight events → Azure Event Hub (amber, vendor-initiated)
    Event Hub → DENS (cyan, we pull)
══════════════════════════════════════════════════════════════════════════ */}
{/* Vendor1 → Event Hub (push, amber) */}
<P d="M 82.5 122 L 82.5 185" />
<AL x="112" y="158" text="push" />

{/* Event Hub → DENS (pull, cyan, L-shaped) */}
<F phase={0} d="M 150 209 L 180 209 L 180 188 L 205 188" />
<AL x="167" y="204" text="Flight Events" />

{/* ══ INGESTION — Data pull lane ═══════════════════════════════════════════
    DENS → GDS via REST API (cyan, we initiate)
    GDS → Vendor2 via SOAP API (cyan, GDS initiates on our behalf)
    Vendor2 → GDS → DENS return path (amber dashed, data coming back)
══════════════════════════════════════════════════════════════════════════ */}
{/* DENS → GDS (REST API request, cyan, vertical) */}
<F phase={0} d="M 268 226 L 268 358" />
<AL x="242" y="295" text="REST API" />

{/* GDS → Vendor2 (SOAP API, cyan, horizontal) */}
<F phase={0} d="M 205 378 L 150 378" />
<AL x="175" y="373" text="SOAP API" />

{/* Return: Vendor2 → GDS → DENS (amber dashed, passenger data + live updates) */}
<P d="M 150 396 L 285 396 L 285 226" />
<AL x="310" y="312" text="Pax Data / Updates" />

{/* ══ CONFIG — PostgreSQL → DENS (vertical) ════════════════════════════════ */}
<F phase={0} d="M 272.5 82 L 272.5 150" />

{/* ══ PHASE 1 — DENS → HTTP Service ════════════════════════════════════════ */}
<F phase={1} d="M 345 188 L 405 188" />

{/* ══ PHASE 2 — HTTP Service → Service Bus ═════════════════════════════════ */}
<F phase={2} d="M 525 188 L 580 188" />

{/* ══ PHASE 3 — Service Bus → Listener (vertical) ══════════════════════════ */}
<F phase={3} d="M 640 208 L 640 275" />

{/* ══ PHASE 4 — Listener → MOS (L-shaped: right → up → right) ════════════ */}
<F phase={4} d="M 700 295 L 722 295 L 722 188 L 745 188" />

{/* ══ PHASE 5 — MOS fanout to 4 delivery channels ══════════════════════════ */}
{/* WhatsApp (up) */}
<F phase={5} d="M 880 168 L 905 168 L 905 136 L 935 136" />
{/* SMS (straight) */}
<F phase={5} d="M 880 188 L 935 188" />
{/* Email (down) */}
<F phase={5} d="M 880 208 L 912 208 L 912 240 L 935 240" />
{/* Push (down further) */}
<F phase={5} d="M 880 215 L 918 215 L 918 292 L 935 292" />

{/* ══ PHASE 6 — Email → AWS SES (straight) ════════════════════════════════ */}
<F phase={6} d="M 1040 240 L 1082 240" />

{/* ══ PHASE 6 — MOS → Mobile Platform (vertical) ══════════════════════════ */}
<F phase={6} d="M 812.5 226 L 812.5 356" />

{/* ══ PHASE 7 — Mobile Platform → PNW (straight) ══════════════════════════ */}
<F phase={7} d="M 880 376 L 935 376" />

{/* ══ PHASE 8 — PNW → APN + Firebase ══════════════════════════════════════ */}
<F phase={8} d="M 1040 368 L 1058 368 L 1058 354 L 1082 354" />
<F phase={8} d="M 1040 384 L 1062 384 L 1062 406 L 1082 406" />

{/* ══ PINGBACK — Delivery channels → bus → MOS → CosmosDB ══════════════════
    Amber dashed bus at x=1185. Stubs from right edges of leaf channels.
══════════════════════════════════════════════════════════════════════════ */}
<line x1="1185" y1="136" x2="1185" y2="420" className="pb" />

<P noArrow d="M 1040 136 L 1185 136" />
<P noArrow d="M 1040 188 L 1185 188" />
<P noArrow d="M 1040 240 L 1185 240" />
<P noArrow d="M 1040 376 L 1185 376" />

{/* Bus return → MOS right */}
<P d="M 1185 420 L 895 420 L 895 188 L 880 188" />

{/* MOS → CosmosDB status update */}
<P d="M 745 208 L 566 208 L 566 480 L 580 480" />

<ZL x="1188" y="290" text="pingback · delivered/read" amber />
<AL x="500" y="365" text="status update" />
```

- [ ] **Step 2: Compile check**

```powershell
npm run build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/DENSArchitecture.js
git commit -m "feat: replace all DENS connection paths for dual-vendor ingestion lanes"
```

---

## Task 4: Update Node renders with labels and icons

**Files:**
- Modify: `src/components/DENSArchitecture.js`

Replace the entire `{/* NODES — rendered last */}` block with the following. Each Node now gets an `icon` prop mapped from ICONS.

- [ ] **Step 1: Replace all Node render calls**

```jsx
{/* ══════════════════════════════════════════════════════════
    NODES — rendered last (on top of all paths)
══════════════════════════════════════════════════════════ */}
<Node id="extVendor1"    l1="External Vendor 1" l2="Event Source"      type="ext"  icon={ICONS.globe}     />
<Node id="azureEventHub" l1="Azure Event Hub"   l2="Msg Broker"        type="data" icon={ICONS.lightning}  />
<Node id="postgres"      l1="PostgreSQL"         l2="Internal DB"       type="data" icon={ICONS.database}   />
<Node id="dens"          l1="DENS"               l2="Core Processor"    type="hub"  icon={ICONS.gear}       />
<Node id="gds"           l1="GDS"                l2="REST → SOAP"       type="ext"  icon={ICONS.network}    />
<Node id="extVendor2"    l1="External Vendor 2"  l2="Pax Data Source"   type="ext"  icon={ICONS.globe}      />
<Node id="httpSvc"       l1="HTTP Service"        l2="Events Endpoint"   type="int"  icon={ICONS.code}       />
<Node id="serviceBus"    l1="Service Bus"          l2="Topic"             type="data" icon={ICONS.queue}      />
<Node id="listener"      l1="Listener"             l2="Queue Consumer"    type="int"  icon={ICONS.waves}      />
<Node id="mos"           l1="MOS"                  l2="Msg Optimizer"     type="hub"  icon={ICONS.funnel}     />
<Node id="whatsapp"      l1="WhatsApp"             l2="Provider"          type="ext"  icon={ICONS.whatsapp}   />
<Node id="sms"           l1="SMS"                  l2="Provider"          type="ext"  icon={ICONS.bubble}     />
<Node id="emailSvc"      l1="Email"                l2="Microservice"      type="int"  icon={ICONS.envelope}   />
<Node id="awsSes"        l1="AWS SES"              l2="SMTP Gateway"      type="data" icon={ICONS.cloudMail}  />
<Node id="pushPath"      l1="Push Notif"           l2="Path"              type="int"  icon={ICONS.bell}       />
<Node id="mobilePlat"    l1="Mobile Platform"      l2="Device Token"      type="int"  icon={ICONS.phone}      />
<Node id="pnw"           l1="Push Wrapper"         l2="PNW"               type="int"  icon={ICONS.arrows}     />
<Node id="apn"           l1="APN"                  l2="Apple"             type="ext"  icon={ICONS.apple}      />
<Node id="firebase"      l1="Firebase"             l2="Android"           type="ext"  icon={ICONS.flame}      />
<Node id="cosmosdb"      l1="CosmosDB"             l2="Status Store"      type="data" icon={ICONS.cosmos}     />
```

- [ ] **Step 2: Compile check**

```powershell
npm run build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/DENSArchitecture.js
git commit -m "feat: add brand icons to all DENS nodes, split External Vendor into two ingestion lanes"
```

---

## Task 5: Visual QA in browser

**Files:** none (verification only)

- [ ] **Step 1: Start dev server**

```powershell
npm run dev
```

Open the portfolio in a browser and navigate to the DENS architecture section.

- [ ] **Step 2: Verify the following checklist**

Left side:
- [ ] External Vendor 1 (amber, globe icon) at top-left
- [ ] Azure Event Hub (data style, lightning icon) below Vendor 1
- [ ] Amber dashed arrow: Vendor1 → Event Hub (push)
- [ ] Cyan arrow: Event Hub → DENS (labeled "Flight Events")
- [ ] PostgreSQL (data style, database icon) above DENS
- [ ] External Vendor 2 (amber, globe icon) at bottom-left
- [ ] GDS node (amber, network icon) to the right of Vendor 2
- [ ] Cyan arrow: DENS → GDS (labeled "REST API")
- [ ] Cyan arrow: GDS → Vendor2 (labeled "SOAP API")
- [ ] Amber dashed return path: Vendor2 → GDS → DENS (labeled "Pax Data / Updates")

Main pipeline:
- [ ] DENS → HTTP Service → Service Bus → Listener → MOS: all horizontal/vertical (no diagonal lines)
- [ ] MOS fanout to WhatsApp, SMS, Email, Push: L-shaped, no overlapping

Delivery:
- [ ] Each delivery node has its brand icon rendered inside the box
- [ ] Pingback bus at far right, dashed amber
- [ ] CosmosDB status update dashed line visible

Icons:
- [ ] All 20 nodes show an icon
- [ ] Icon color matches node border color (amber for ext, cyan for hub/int, muted for data)
- [ ] Text labels are legible and don't overlap icons

- [ ] **Step 3: Fix any visual issues found**

Common tweaks needed after first render:
- If text overlaps icon: adjust `gap` or `contentH` in Node component
- If a path is diagonal instead of orthogonal: a coordinate is misaligned — fix the offending `d=` value using the coordinate table at the top of this plan
- If an icon appears outside its node rect: adjust the `translate(${mx - 6}, ${startY})` in Node

- [ ] **Step 4: Final commit (if any tweaks were made)**

```powershell
git add src/components/DENSArchitecture.js
git commit -m "fix: visual tweaks to DENS diagram icons and path alignment"
```

---

## Self-Review

**Spec coverage:**
- ✅ Two external vendors (extVendor1, extVendor2)
- ✅ Azure Event Hub intermediary (push lane)
- ✅ GDS as REST→SOAP bridge (pull lane)
- ✅ Outgoing request chain: DENS→GDS→Vendor2 (cyan arrows)
- ✅ Return data chain: Vendor2→GDS→DENS (amber dashed)
- ✅ REST API and SOAP API labels on arrows
- ✅ Brand SVG icons for all 20 nodes
- ✅ Icon CSS via `.icon` class, color-matched to node type
- ✅ All existing delivery paths preserved with updated coordinates
- ✅ Pingback bus repositioned for new canvas width

**Placeholder scan:** None found. All paths have explicit coordinate values. All icon paths are complete SVG.

**Type consistency:** `ICONS` keys match the `icon={ICONS.<key>}` props in every Node call. `NODES` keys match the `id=` props in every Node call. No mismatches.
