import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/useReducedMotion";
import "./ScrollScrubShowcase.css";

/**
 * CustomsIQ "scroll to scrub" agent pipeline. As you scroll the tall wrapper,
 * a sticky stage scrubs through five stages (Read → Ground → Reason → Classify
 * → Cite), revealing an agent trace, lighting up a knowledge graph and swapping
 * captions. Progress is derived from the wrapper's position relative to the
 * viewport, which stays accurate under Lenis (it scrolls the real window).
 *
 * On reduced motion the tall track collapses to a single screen showing the
 * completed pipeline (no scrubbing).
 */
const steps = [
  {
    label: "Read",
    trace: [
      ["$ ", " ingest invoice_8842.pdf + packing_list.xlsx"],
      ["→", "OCR + layout parse · 3 docs, 41 line items"],
      ["", "12 product descriptions extracted"],
    ],
    cap: [
      "Read",
      "The agent parses the invoice, packing list and prior filings.",
      "It pulls descriptions, values, origin and quantities — no template, any format.",
    ],
  },
  {
    label: "Ground",
    trace: [
      ["$ ", " query graph: similar goods + duty notes"],
      ["→", "Neo4j · 6 candidate HS headings"],
      ["→", "pgvector · 14 precedent rulings"],
      ["", "grounded in CBIC notifications, not guesses"],
    ],
    cap: [
      "Ground",
      "It retrieves candidate HS codes, duty rules and precedent from the knowledge graph.",
      "Every option is anchored to a real notification or ruling.",
    ],
  },
  {
    label: "Reason",
    trace: [
      ["$ ", " apply GIR rules + chapter notes"],
      ["→", "weigh 8471.30 vs 8471.41 · essential character"],
      ["→", "flag: AIDC anti-dumping check needed"],
      ["", "confidence 0.94"],
    ],
    cap: [
      "Reason",
      "It applies the interpretive rules, weighs competing headings and surfaces risks.",
      "You see the logic, not just an answer.",
    ],
  },
  {
    label: "Classify",
    trace: [
      ["$ ", " commit classification"],
      ["→", "HS 8471.30 · BCD 0% · IGST 18%"],
      ["→", "duty payable ₹0 · IGST ₹2,41,800"],
      ["", "draft Bill of Entry generated"],
    ],
    cap: [
      "Classify",
      "It assigns the code, computes duty and drafts the Bill of Entry.",
      "Numbers and headings, ready for the CHA to review.",
    ],
  },
  {
    label: "Cite",
    trace: [
      ["$ ", " attach provenance"],
      ["→", "source: Notification 24/2005-Cus"],
      ["→", "source: CAAR ruling AAR/2023/114"],
      ["✓", "every line item traceable to law", true],
    ],
    cap: [
      "Cite",
      "Every decision ships with its source — the notification, the ruling, the chapter note.",
      "Verifiable reasoning is the product. That is the moat.",
    ],
  },
];

// knowledge-graph nodes + edges (each tagged with the step it lights up on)
const G = [
  { id: "inv", x: 60, y: 60, t: "invoice", step: 0 },
  { id: "doc", x: 60, y: 150, t: "docs", step: 0 },
  { id: "h84", x: 180, y: 50, t: "Ch.84", step: 1 },
  { id: "h85", x: 180, y: 130, t: "Ch.85", step: 1 },
  { id: "rul", x: 180, y: 215, t: "rulings", step: 1 },
  { id: "gir", x: 290, y: 90, t: "GIR", step: 2 },
  { id: "adc", x: 290, y: 185, t: "AIDC", step: 2 },
  { id: "hs", x: 355, y: 120, t: "8471.30", step: 3 },
  { id: "not", x: 300, y: 255, t: "Notif.", step: 4 },
];
const E = [
  ["inv", "h84", 1],
  ["inv", "h85", 1],
  ["doc", "rul", 1],
  ["h84", "gir", 2],
  ["h85", "gir", 2],
  ["rul", "adc", 2],
  ["gir", "hs", 3],
  ["adc", "hs", 3],
  ["hs", "not", 4],
];

const SVG_NS = "http://www.w3.org/2000/svg";

export default function ScrollScrubShowcase() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const traceEl = root.querySelector(".trace");
    const svg = root.querySelector(".graph svg");
    const wrap = root.querySelector(".scroll-wrap");
    const stage = root.querySelector(".stage");
    const pctEl = root.querySelector(".pct");
    const fillEl = root.querySelector(".rail-fill");
    const nodeEls = [...root.querySelectorAll(".nodes .node")];
    const labelEls = [...root.querySelectorAll(".labels span")];
    const capEl = root.querySelector(".caption h2");
    const tagEl = root.querySelector(".caption .tag");

    // Idempotent build (guards against React StrictMode double-invoke).
    traceEl.innerHTML = "";
    svg.innerHTML = "";

    // Build trace lines.
    const lineMeta = [];
    steps.forEach((s, si) => {
      s.trace.forEach((t) => {
        const div = document.createElement("div");
        div.className = "ln";
        const cls = t[2] ? "ok" : t[0] === "$ " ? "k" : "m";
        div.innerHTML = `<span class="${cls}">${t[0] || "&nbsp;&nbsp;"}</span>${t[1]}`;
        traceEl.appendChild(div);
        lineMeta.push(si);
      });
    });
    const lineEls = [...traceEl.children];

    // Build knowledge graph.
    const pos = Object.fromEntries(G.map((n) => [n.id, n]));
    E.forEach((e) => {
      const a = pos[e[0]];
      const b = pos[e[1]];
      const l = document.createElementNS(SVG_NS, "line");
      l.setAttribute("x1", a.x);
      l.setAttribute("y1", a.y);
      l.setAttribute("x2", b.x);
      l.setAttribute("y2", b.y);
      l.setAttribute("class", "edge");
      l.dataset.step = e[2];
      svg.appendChild(l);
    });
    G.forEach((n) => {
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "gn");
      g.dataset.step = n.step;
      const c = document.createElementNS(SVG_NS, "circle");
      c.setAttribute("cx", n.x);
      c.setAttribute("cy", n.y);
      c.setAttribute("r", 8);
      c.setAttribute("fill", "var(--graph-dim)");
      c.setAttribute("stroke", "#3a356e");
      c.setAttribute("stroke-width", "2");
      const tx = document.createElementNS(SVG_NS, "text");
      tx.setAttribute("x", n.x);
      tx.setAttribute("y", n.y - 13);
      tx.setAttribute("text-anchor", "middle");
      tx.textContent = n.t;
      g.appendChild(c);
      g.appendChild(tx);
      svg.appendChild(g);
    });
    const gNodes = [...svg.querySelectorAll(".gn")];
    const gEdges = [...svg.querySelectorAll(".edge")];

    let cur = -1;
    const render = (p) => {
      const pct = Math.round(p * 100);
      pctEl.textContent = pct + "%";
      fillEl.style.width = pct + "%";
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length - 1e-6));
      const stepIdx = Math.max(0, idx);
      nodeEls.forEach((n, i) => {
        n.classList.toggle("on", i === stepIdx);
        n.classList.toggle("done", i < stepIdx);
      });
      labelEls.forEach((n, i) => n.classList.toggle("on", i <= stepIdx));
      lineEls.forEach((el, i) => el.classList.toggle("show", lineMeta[i] <= stepIdx));
      gNodes.forEach((n) => n.classList.toggle("on", +n.dataset.step <= stepIdx));
      gEdges.forEach((n) => n.classList.toggle("on", +n.dataset.step <= stepIdx));
      if (stepIdx !== cur) {
        cur = stepIdx;
        const s = steps[stepIdx];
        tagEl.textContent = s.cap[0];
        capEl.innerHTML = s.cap[1] + " <em>" + s.cap[2] + "</em>";
        const last = lineEls.filter((e) => e.classList.contains("show")).pop();
        if (last) traceEl.scrollTop = traceEl.scrollHeight;
      }
    };

    // Reduced motion: collapse to one screen, show completed pipeline.
    if (prefersReducedMotion()) {
      root.classList.add("no-scrub");
      render(1);
      return undefined;
    }

    const onScroll = () => {
      // The stage sticks below the navbar, so it is shorter than the viewport.
      // stickyTop is the gap between the viewport top and the stuck stage (the
      // navbar height); total is the scroll distance over which the stage stays
      // pinned. Progress runs 0 → 1 across that pinned range.
      const stickyTop = window.innerHeight - stage.offsetHeight;
      const total = wrap.offsetHeight - stage.offsetHeight;
      const p = Math.min(
        1,
        Math.max(0, (stickyTop - wrap.getBoundingClientRect().top) / total)
      );
      render(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="scrub-pipeline" ref={rootRef}>
      <div className="scroll-wrap">
        <div className="stage">
          <div className="head">
            <div className="eyebrow">CustomsIQ&nbsp;—&nbsp;Project Demo</div>
          </div>

          <div className="pipe">
            <div className="track">
              <div className="rail" />
              <div className="rail-fill" />
              <div className="nodes">
                {steps.map((s) => (
                  <div className="node" key={s.label} />
                ))}
              </div>
            </div>
            <div className="labels">
              {steps.map((s) => (
                <span key={s.label}>{s.label}</span>
              ))}
            </div>
          </div>

          <div className="live">
            <div className="panel">
              <div className="panel-bar">
                <span className="dot r" />
                <span className="dot y" />
                <span className="dot g" />
                {"  agent.trace"}
              </div>
              <div className="trace" />
            </div>
            <div className="panel">
              <div className="panel-bar">knowledge graph · HS 8471</div>
              <div className="graph">
                <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" />
              </div>
            </div>
          </div>

          <div className="caption-row">
            <div className="caption">
              <div className="tag">{steps[0].cap[0]}</div>
              <h2>
                {steps[0].cap[1]} <em>{steps[0].cap[2]}</em>
              </h2>
            </div>
            <div className="pct">0%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
