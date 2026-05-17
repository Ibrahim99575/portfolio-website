# DENS Diagram — Dual Vendor Split + Brand Icons

**Date:** 2026-05-17  
**File:** `src/components/DENSArchitecture.js`

---

## Summary

Two changes to the DENS architecture SVG diagram:
1. Split the single External Vendor into two vendors with distinct data paths and an Azure Event Hub intermediary
2. Add brand SVG path icons inside each node

---

## Architecture (Approach B — Two Ingestion Lanes)

### Left side — two separate ingestion lanes into DENS

**Top lane — Event Push (async, vendor-initiated):**
```
External Vendor 1 → [push] → Azure Event Hub → [pull] → DENS
```
- External Vendor 1 is an amber node (external type)
- Azure Event Hub is a data/cloud node (cyan-border)
- Arrow from Vendor 1 to Event Hub is amber (vendor pushes)
- Arrow from Event Hub to DENS is cyan (we pull)
- Label: "Flight Events"

**Bottom lane — Data Pull (sync, DENS-initiated request-response):**
```
DENS → [REST API] → GDS → [SOAP API] → External Vendor 2
External Vendor 2 → [data] → GDS → [Passenger Data / Live Updates] → DENS
```
- DENS initiates the request; arrows go DENS → GDS → Vendor 2
- Return data shown as dashed amber arrows going Vendor 2 → GDS → DENS
- Label on outgoing: "REST API" (DENS→GDS), "SOAP API" (GDS→Vendor 2)
- Label on return: "Passenger Data / Live Updates"
- GDS is an amber node (external/named 3rd party)
- External Vendor 2 is an amber node

**Unchanged config path:**
```
PostgreSQL → DENS
```

### Right side — unchanged
DENS → HTTP Service → Service Bus → Listener → MOS → delivery channels (WhatsApp, SMS, Email/AWS SES, Push/Mobile/APN/Firebase) + CosmosDB pingback

---

## Layout

**ViewBox:** `0 0 1200 540`

| Node | x | y | w | h | Notes |
|------|---|---|---|---|-------|
| extVendor1 | 15 | 65 | 130 | 55 | Top-left, amber |
| azureEventHub | 15 | 175 | 130 | 45 | Below Vendor 1, cyan-border |
| postgres | 210 | 45 | 120 | 35 | Above DENS |
| dens | 210 | 150 | 130 | 65 | Core hub |
| gds | 210 | 355 | 130 | 45 | Below DENS, amber |
| extVendor2 | 15 | 355 | 130 | 55 | Bottom-left, amber |
| httpSvc | 400 | 170 | 115 | 38 | Pipeline |
| serviceBus | 570 | 170 | 115 | 38 | Pipeline |
| listener | 570 | 275 | 115 | 38 | Pipeline |
| mos | 730 | 155 | 120 | 65 | Delivery hub |
| whatsapp | 900 | 120 | 95 | 32 | Delivery |
| sms | 900 | 170 | 95 | 32 | Delivery |
| emailSvc | 900 | 220 | 95 | 32 | Delivery |
| awsSes | 1045 | 220 | 80 | 32 | Delivery |
| pushPath | 900 | 272 | 95 | 32 | Delivery |
| mobilePlat | 730 | 345 | 120, 32 | 32 | Push sub-chain |
| pnw | 900 | 345 | 95 | 32 | Push sub-chain |
| apn | 1045 | 320 | 80 | 32 | Push sub-chain |
| firebase | 1045 | 370 | 80 | 32 | Push sub-chain |
| cosmosdb | 570 | 450 | 115 | 36 | Status store |

---

## Icon System

Each node gets a small (12×12 SVG path icon) positioned top-center or left of the text label. Icons are brand-recognizable SVG paths scaled into node space.

| Node | Icon |
|------|------|
| PostgreSQL | Database cylinder (3 stacked ellipses) |
| Azure Event Hub | Azure Event Hubs mark (lightning/stream) |
| External Vendor 1 | Globe/cloud with arrow-out |
| External Vendor 2 | Globe/cloud with arrow-in |
| GDS | Network nodes / API hub icon |
| DENS | Gear/processor |
| HTTP Service | `</>` code brackets |
| Service Bus | Azure Service Bus (queue lines) |
| Listener | Antenna / receive waves |
| MOS | Funnel/optimization |
| WhatsApp | WhatsApp speech bubble mark |
| SMS | Speech bubble with lines |
| Email Service | Envelope |
| AWS SES | AWS envelope-cloud |
| Push Notif | Bell |
| Mobile Platform | Mobile phone outline |
| PNW | Dispatch arrows |
| APN | Apple logo |
| Firebase | Firebase flame |
| CosmosDB | Azure Cosmos (planet ring) |

Icons are implemented as inline `<path>` elements inside each `<g>` node group, rendered above the rect and below the text labels. Icon size: 10px, positioned at node top-center, text shifts down accordingly.

---

## Connection Arrows

### New arrows (left-side ingestion)
| From | To | Color | Style | Label |
|------|----|-------|-------|-------|
| Ext Vendor 1 | Azure Event Hub | amber | solid | "push" |
| Azure Event Hub | DENS | cyan | solid (flow) | "Flight Events" |
| DENS | GDS | cyan | solid (flow) | "REST API" |
| GDS | Ext Vendor 2 | cyan | solid (flow) | "SOAP API" |
| Ext Vendor 2 | GDS | amber | dashed | "Passenger Data" |
| GDS | DENS | amber | dashed | "Live Updates" |

### Removed arrows
- Old single External Vendor → DENS (3 lines: Flight Events, Passenger Data, Live Updates)

### Unchanged arrows
All existing DENS → pipeline → delivery arrows remain identical.

---

## Self-Review

- No contradictions between sections
- Layout coordinates are concrete and non-overlapping
- Icons described precisely enough to implement without ambiguity
- Scope is a single-file change to `DENSArchitecture.js`
- No TBDs remaining
