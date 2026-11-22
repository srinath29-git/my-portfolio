import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  cover: Project["cover"];
  index?: string;
  year?: string;
  className?: string;
};

function AgentsArt() {
  return (
    <g>
      <circle cx="400" cy="250" r="205" fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray="2 9" />
      <circle cx="400" cy="250" r="145" fill="none" stroke="rgba(255,255,255,0.06)" />
      <circle cx="400" cy="250" r="92" fill="none" stroke="rgba(77,141,255,0.18)" strokeDasharray="3 7" />
      <line x1="400" y1="250" x2="185" y2="136" stroke="rgba(77,141,255,0.35)" strokeDasharray="3 5" />
      <line x1="400" y1="250" x2="615" y2="136" stroke="rgba(77,141,255,0.35)" strokeDasharray="3 5" />
      <line x1="400" y1="250" x2="185" y2="364" stroke="rgba(77,141,255,0.35)" strokeDasharray="3 5" />
      <line x1="400" y1="250" x2="615" y2="364" stroke="rgba(77,141,255,0.35)" strokeDasharray="3 5" />

      <g className="visual-float">
        <rect x="312" y="202" width="176" height="96" rx="18" fill="#0a1021" stroke="rgba(77,141,255,0.55)" />
        <rect x="312" y="202" width="176" height="96" rx="18" fill="url(#agents-glow)" />
        <circle cx="336" cy="226" r="4" fill="#4d8dff" />
        <text x="350" y="230" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="1.4">
          AGENT LAYER
        </text>
        <text x="332" y="262" fill="#f2f5fd" fontSize="19" fontFamily="monospace" letterSpacing="1.6">
          ORCHESTRATE
        </text>
        <text x="332" y="282" fill="rgba(255,255,255,0.42)" fontSize="10" fontFamily="monospace">
          IBM watsonx · lab build
        </text>
      </g>

      {[
        { x: 100, y: 98, label: "Nutrition Agent", tag: "agent 01" },
        { x: 540, y: 98, label: "Crop Recommender", tag: "model 02" },
        { x: 100, y: 342, label: "Recipe RAG", tag: "retrieval 03" },
        { x: 540, y: 342, label: "Admissions Bot", tag: "assistant 04" },
      ].map((node) => (
        <g key={node.label} className="visual-float-slow">
          <rect
            x={node.x}
            y={node.y}
            width="160"
            height="64"
            rx="13"
            fill="#080d19"
            stroke="rgba(255,255,255,0.13)"
          />
          <circle cx={node.x + 18} cy={node.y + 20} r="3.5" fill="#8be9ff" opacity="0.8" />
          <text
            x={node.x + 30}
            y={node.y + 24}
            fill="rgba(255,255,255,0.42)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="1"
          >
            {node.tag}
          </text>
          <text
            x={node.x + 16}
            y={node.y + 46}
            fill="#e9effc"
            fontSize="12.5"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
      <circle cx="400" cy="202" r="3" fill="#8be9ff">
        <animate attributeName="opacity" values="1;0.25;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function ChatArt() {
  return (
    <g>
      <rect x="64" y="64" width="672" height="372" rx="18" fill="#080d19" stroke="rgba(255,255,255,0.14)" />
      <path d="M64 108h672" stroke="rgba(255,255,255,0.1)" />
      <circle cx="92" cy="86" r="4" fill="#ff6b6b" opacity="0.65" />
      <circle cx="108" cy="86" r="4" fill="#ffb86b" opacity="0.65" />
      <circle cx="124" cy="86" r="4" fill="#52e3a5" opacity="0.65" />
      <text x="150" y="90" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">
        chatbot.py — rule-based conversation
      </text>
      <text x="664" y="90" fill="#52e3a5" fontSize="9" fontFamily="monospace">
        ● ONLINE
      </text>

      <g>
        <rect x="96" y="138" width="214" height="54" rx="14" fill="#0d1528" stroke="rgba(255,255,255,0.1)" />
        <text x="112" y="160" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
          USER / 09:41
        </text>
        <text x="112" y="178" fill="#f2f5fd" fontSize="13" fontFamily="monospace">
          hello
        </text>
      </g>
      <g>
        <rect x="332" y="206" width="368" height="58" rx="14" fill="rgba(77,141,255,0.16)" stroke="rgba(77,141,255,0.45)" />
        <text x="350" y="228" fill="#8be9ff" fontSize="8" fontFamily="monospace" letterSpacing="1">
          BOT / INTENT MATCHED → GREETING
        </text>
        <text x="350" y="246" fill="#eaf0ff" fontSize="13" fontFamily="monospace">
          Hi. Ask me for help or a little small talk.
        </text>
      </g>
      <g>
        <rect x="96" y="282" width="288" height="58" rx="14" fill="#0d1528" stroke="rgba(255,255,255,0.1)" />
        <text x="112" y="304" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
          USER / 09:41
        </text>
        <text x="112" y="322" fill="#f2f5fd" fontSize="13" fontFamily="monospace">
          what can you do?
        </text>
      </g>
      <g>
        <rect x="332" y="356" width="368" height="50" rx="12" fill="#0d1528" stroke="rgba(255,255,255,0.1)" />
        <text x="348" y="386" fill="rgba(255,255,255,0.6)" fontSize="11.5" fontFamily="monospace">
          Type a message…
        </text>
        <rect x="664" y="368" width="24" height="24" rx="7" fill="#4d8dff" />
        <path d="M672 380h8m-4-4v8" stroke="#fff" strokeWidth="1.2" />
      </g>
      <text x="96" y="394" fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily="monospace">
        intents: 03 · knowledge base: 12 · conversation.log ✓
      </text>
    </g>
  );
}

function RulesArt() {
  const nodes = [
    { x: 48, label: "FACTS", sub: "symptoms in", accent: false },
    { x: 232, label: "IF → THEN", sub: "knowledge base", accent: false },
    { x: 416, label: "INFERENCE", sub: "forward chaining", accent: false },
    { x: 600, label: "DIAGNOSIS", sub: "with reasoning", accent: true },
  ];

  return (
    <g>
      <text x="48" y="66" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">
        FORWARD CHAINING / INFERENCE TRACE
      </text>
      {nodes.map((node, index) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="152"
            width="152"
            height="92"
            rx="15"
            fill={node.accent ? "rgba(77,141,255,0.14)" : "#0a1021"}
            stroke={node.accent ? "rgba(77,141,255,0.55)" : "rgba(255,255,255,0.13)"}
          />
          <text
            x={node.x + 16}
            y="181"
            fill={node.accent ? "#8be9ff" : "rgba(255,255,255,0.35)"}
            fontSize="8.5"
            fontFamily="monospace"
          >
            0{index + 1}
          </text>
          <text
            x={node.x + 16}
            y="208"
            fill="#eef3ff"
            fontSize="14"
            fontFamily="monospace"
            letterSpacing="0.6"
          >
            {node.label}
          </text>
          <text x={node.x + 16} y="228" fill="rgba(255,255,255,0.4)" fontSize="9.5" fontFamily="monospace">
            {node.sub}
          </text>
          {index < nodes.length - 1 && (
            <g>
              <line x1={node.x + 152} y1="198" x2={node.x + 184} y2="198" stroke="rgba(139,233,255,0.4)" strokeWidth="1" />
              <path d={`M${node.x + 178} 194l6 4-6 4`} fill="none" stroke="rgba(139,233,255,0.55)" strokeWidth="1" />
            </g>
          )}
        </g>
      ))}

      <rect x="48" y="290" width="704" height="132" rx="14" fill="#070b15" stroke="rgba(255,255,255,0.1)" />
      <text x="68" y="316" fill="rgba(255,255,255,0.35)" fontSize="8.5" fontFamily="monospace" letterSpacing="1.4">
        INFERENCE LOG
      </text>
      <text x="68" y="342" fill="#8be9ff" fontSize="10.5" fontFamily="monospace">
        [rule 03] fever + cough → flu
      </text>
      <text x="68" y="362" fill="rgba(242,245,253,0.68)" fontSize="10.5" fontFamily="monospace">
        [rule 07] flu → rest + fluids
      </text>
      <text x="68" y="382" fill="rgba(242,245,253,0.4)" fontSize="10.5" fontFamily="monospace">
        [rule 11] persistent → consult a clinician
      </text>
      <text x="68" y="406" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">
        5 facts · 3 rules applied · path visible
      </text>
      <circle cx="722" cy="312" r="4" fill="#52e3a5" />
    </g>
  );
}

function MazeArt() {
  const points = "80,420 200,420 200,300 360,300 360,180 520,180 520,340 680,340 680,80";
  return (
    <g>
      <text x="48" y="56" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">
        A* SEARCH / MANHATTAN HEURISTIC
      </text>
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="7" strokeLinecap="square">
        <line x1="48" y1="120" x2="260" y2="120" />
        <line x1="260" y1="48" x2="260" y2="150" />
        <line x1="260" y1="380" x2="440" y2="380" />
        <line x1="440" y1="420" x2="720" y2="420" />
        <line x1="620" y1="180" x2="620" y2="240" />
        <line x1="120" y1="280" x2="120" y2="360" />
        <line x1="48" y1="240" x2="160" y2="240" />
        <line x1="720" y1="240" x2="780" y2="240" />
      </g>
      <polyline
        points={points}
        fill="none"
        stroke="rgba(139,233,255,0.16)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={points}
        fill="none"
        stroke="#8be9ff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="700"
        strokeDashoffset="0"
        className="visual-path"
      />
      {points.split(" ").map((point) => {
        const [x, y] = point.split(",");
        return <circle key={point} cx={x} cy={y} r="3" fill="#f2f5fd" opacity="0.7" />;
      })}
      <circle cx="80" cy="420" r="9" fill="rgba(82,227,165,0.18)" stroke="#52e3a5" />
      <circle cx="80" cy="420" r="3" fill="#52e3a5" />
      <circle cx="680" cy="80" r="12" fill="rgba(77,141,255,0.16)" stroke="#4d8dff" />
      <circle cx="680" cy="80" r="4" fill="#4d8dff" />
      <text x="64" y="456" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
        START
      </text>
      <text x="660" y="116" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
        GOAL
      </text>
      <text x="590" y="456" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" textAnchor="end">
        heapq · cost-so-far · heuristic
      </text>
    </g>
  );
}

function ResponsiveArt() {
  return (
    <g>
      <text x="48" y="56" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">
        RESPONSIVE SYSTEM / 1440 · 768 · 390
      </text>

      <g>
        <rect x="48" y="92" width="430" height="286" rx="14" fill="#080d19" stroke="rgba(255,255,255,0.16)" />
        <rect x="48" y="92" width="430" height="28" rx="14" fill="#0c1220" />
        <circle cx="66" cy="106" r="3" fill="rgba(255,255,255,0.25)" />
        <circle cx="78" cy="106" r="3" fill="rgba(255,255,255,0.25)" />
        <circle cx="90" cy="106" r="3" fill="rgba(255,255,255,0.25)" />
        <rect x="68" y="140" width="170" height="10" rx="3" fill="rgba(77,141,255,0.7)" />
        <rect x="68" y="158" width="120" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
        <rect x="68" y="182" width="66" height="18" rx="9" fill="#4d8dff" opacity="0.7" />
        <rect x="142" y="182" width="66" height="18" rx="9" fill="none" stroke="rgba(255,255,255,0.2)" />
        <rect x="68" y="224" width="390" height="1" fill="rgba(255,255,255,0.1)" />
        {[0, 1, 2].map((item) => (
          <g key={item}>
            <rect x={68 + item * 134} y="244" width="122" height="74" rx="8" fill="#0c1424" stroke="rgba(255,255,255,0.09)" />
            <rect x={80 + item * 134} y="258" width="22" height="22" rx="6" fill="rgba(77,141,255,0.28)" />
            <rect x={80 + item * 134} y="290" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
            <rect x={80 + item * 134} y="301" width="58" height="4" rx="2" fill="rgba(255,255,255,0.14)" />
          </g>
        ))}
        <text x="68" y="356" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="monospace">
          DESKTOP / 1440
        </text>
      </g>

      <g>
        <rect x="510" y="122" width="152" height="214" rx="14" fill="#080d19" stroke="rgba(255,255,255,0.15)" />
        <rect x="528" y="146" width="58" height="7" rx="3" fill="rgba(77,141,255,0.65)" />
        <rect x="528" y="160" width="116" height="1" fill="rgba(255,255,255,0.08)" />
        <rect x="528" y="174" width="116" height="44" rx="6" fill="#0c1424" stroke="rgba(255,255,255,0.08)" />
        <rect x="528" y="228" width="116" height="34" rx="6" fill="#0c1424" stroke="rgba(255,255,255,0.08)" />
        <rect x="528" y="272" width="84" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
        <rect x="528" y="284" width="110" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <circle cx="586" cy="320" r="12" fill="rgba(77,141,255,0.3)" />
        <text x="510" y="356" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="monospace">
          TABLET / 768
        </text>
      </g>

      <g>
        <rect x="676" y="162" width="86" height="174" rx="14" fill="#080d19" stroke="rgba(255,255,255,0.15)" />
        <rect x="704" y="172" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        <rect x="692" y="190" width="36" height="6" rx="3" fill="rgba(77,141,255,0.65)" />
        <rect x="692" y="202" width="54" height="1" fill="rgba(255,255,255,0.08)" />
        <rect x="692" y="214" width="54" height="28" rx="5" fill="#0c1424" stroke="rgba(255,255,255,0.08)" />
        <rect x="692" y="250" width="54" height="24" rx="5" fill="#0c1424" stroke="rgba(255,255,255,0.08)" />
        <rect x="692" y="284" width="30" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
        <circle cx="717" cy="314" r="8" fill="rgba(77,141,255,0.3)" />
        <text x="676" y="356" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="monospace">
          MOBILE / 390
        </text>
      </g>

      <g>
        <path d="M478 220h20m-6-5 6 5-6 5" stroke="rgba(139,233,255,0.5)" fill="none" strokeWidth="1.2" />
        <path d="M662 220h4" stroke="rgba(139,233,255,0.3)" />
      </g>
    </g>
  );
}

function StaticArt() {
  return (
    <g>
      <text x="48" y="56" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">
        STATIC WEB DESIGN / HTML + CSS
      </text>
      <rect x="92" y="88" width="648" height="354" rx="16" fill="#070c17" stroke="rgba(255,255,255,0.08)" transform="rotate(1.6 416 265)" />
      <rect x="72" y="76" width="648" height="354" rx="16" fill="#0a1021" stroke="rgba(255,255,255,0.14)" />
      <path d="M72 112h648" stroke="rgba(255,255,255,0.1)" />
      <circle cx="94" cy="94" r="3.5" fill="rgba(255,255,255,0.25)" />
      <circle cx="108" cy="94" r="3.5" fill="rgba(255,255,255,0.25)" />
      <circle cx="122" cy="94" r="3.5" fill="rgba(255,255,255,0.25)" />
      <rect x="148" y="88" width="210" height="12" rx="6" fill="rgba(255,255,255,0.06)" />

      <text x="104" y="148" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="1">
        SRINATH / PORTFOLIO
      </text>
      <g stroke="rgba(255,255,255,0.16)" strokeWidth="1">
        <line x1="590" y1="140" x2="604" y2="140" />
        <line x1="614" y1="140" x2="628" y2="140" />
        <line x1="638" y1="140" x2="652" y2="140" />
      </g>

      <text x="104" y="224" fill="#f2f5fd" fontSize="48" fontFamily="Georgia, serif" letterSpacing="-2">
        Srinath
      </text>
      <text x="104" y="252" fill="rgba(139,233,255,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">
        COMPUTER SCIENCE / HYDERABAD
      </text>
      <rect x="104" y="274" width="122" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
      <rect x="104" y="286" width="186" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />

      <rect x="104" y="314" width="800" height="1" fill="none" />
      <g>
        <rect x="104" y="322" width="88" height="22" rx="11" fill="#4d8dff" opacity="0.75" />
        <rect x="202" y="322" width="88" height="22" rx="11" fill="none" stroke="rgba(255,255,255,0.2)" />
      </g>

      <g>
        <rect x="454" y="164" width="218" height="120" rx="10" fill="#0c1424" stroke="rgba(255,255,255,0.1)" />
        <circle cx="490" cy="198" r="18" fill="rgba(77,141,255,0.24)" />
        <rect x="520" y="186" width="92" height="6" rx="3" fill="rgba(255,255,255,0.28)" />
        <rect x="520" y="198" width="120" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="474" y="238" width="178" height="4" rx="2" fill="rgba(255,255,255,0.14)" />
        <rect x="474" y="248" width="146" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      </g>

      <g>
        <rect x="454" y="300" width="218" height="104" rx="10" fill="#0c1424" stroke="rgba(255,255,255,0.1)" />
        <rect x="474" y="318" width="42" height="5" rx="2.5" fill="rgba(139,233,255,0.5)" />
        <rect x="474" y="334" width="178" height="4" rx="2" fill="rgba(255,255,255,0.13)" />
        <rect x="474" y="344" width="154" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="474" y="366" width="76" height="18" rx="9" fill="rgba(77,141,255,0.16)" stroke="rgba(77,141,255,0.35)" />
        <rect x="558" y="366" width="76" height="18" rx="9" fill="none" stroke="rgba(255,255,255,0.14)" />
      </g>
    </g>
  );
}

function AmixyArt() {
  return (
    <g>
      <text x="48" y="56" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="2">
        AMIXY / MULTI-MODEL AI CORE
      </text>

      <rect x="48" y="82" width="704" height="346" rx="18" fill="#070c17" stroke="rgba(255,255,255,0.14)" />
      <rect x="48" y="82" width="704" height="42" rx="18" fill="#0b1220" />
      <rect x="48" y="106" width="704" height="18" fill="#0b1220" />
      <circle cx="70" cy="103" r="3.2" fill="rgba(255,255,255,0.3)" />
      <circle cx="82" cy="103" r="3.2" fill="rgba(255,255,255,0.3)" />
      <circle cx="94" cy="103" r="3.2" fill="rgba(255,255,255,0.3)" />
      <text x="120" y="108" fill="#f2f6ff" fontSize="12" fontFamily="monospace" letterSpacing="2.4">
        AMIXY
      </text>
      <rect x="654" y="94" width="66" height="18" rx="9" fill="rgba(82,227,165,0.12)" stroke="rgba(82,227,165,0.4)" />
      <circle cx="665" cy="103" r="3" fill="#52e3a5" />
      <text x="673" y="107" fill="#8ef0c5" fontSize="8.5" fontFamily="monospace">
        LIVE
      </text>

      <rect x="48" y="124" width="170" height="304" fill="#060a12" />
      <line x1="218" y1="124" x2="218" y2="428" stroke="rgba(255,255,255,0.1)" />
      <rect x="64" y="142" width="138" height="30" rx="9" fill="rgba(77,141,255,0.16)" stroke="rgba(77,141,255,0.4)" />
      <text x="78" y="161" fill="#a9c8ff" fontSize="9.5" fontFamily="monospace">
        + New chat
      </text>
      {["Compare providers", "Recipe assistant", "Research brief", "Code review", "Prompt lab"].map(
        (label, index) => (
          <g key={label}>
            <rect
              x="62"
              y={188 + index * 30}
              width="142"
              height="24"
              rx="6"
              fill={index === 0 ? "rgba(255,255,255,0.06)" : "transparent"}
            />
            <text
              x="74"
              y={204 + index * 30}
              fill={index === 0 ? "#dbe6ff" : "rgba(255,255,255,0.42)"}
              fontSize="8.6"
              fontFamily="monospace"
            >
              {label}
            </text>
          </g>
        ),
      )}
      <text x="64" y="404" fill="rgba(255,255,255,0.32)" fontSize="8" fontFamily="monospace">
        conversations / 12
      </text>

      <g>
        {["GPT-4o", "Gemini", "Free"].map((model, index) => (
          <g key={model}>
            <rect
              x={234 + index * 86}
              y="142"
              width="78"
              height="24"
              rx="12"
              fill={index === 0 ? "rgba(77,141,255,0.16)" : "transparent"}
              stroke={index === 0 ? "rgba(77,141,255,0.5)" : "rgba(255,255,255,0.16)"}
            />
            <text
              x={248 + index * 86}
              y="158"
              fill={index === 0 ? "#a9c8ff" : "rgba(255,255,255,0.5)"}
              fontSize="8.6"
              fontFamily="monospace"
            >
              {model}
            </text>
          </g>
        ))}
        <text x="736" y="158" fill="rgba(255,255,255,0.34)" fontSize="8" fontFamily="monospace" textAnchor="end">
          SSE / streaming
        </text>
      </g>

      <g>
        <rect x="474" y="188" width="246" height="46" rx="14" fill="rgba(77,141,255,0.2)" stroke="rgba(77,141,255,0.4)" />
        <text x="492" y="207" fill="#e6eeff" fontSize="9.4" fontFamily="monospace">
          Compare GPT-4o and Gemini
        </text>
        <text x="492" y="222" fill="rgba(230,238,255,0.6)" fontSize="8.4" fontFamily="monospace">
          on the same prompt.
        </text>
      </g>

      <g>
        <rect x="234" y="252" width="404" height="86" rx="14" fill="#0b1322" stroke="rgba(255,255,255,0.12)" />
        <circle cx="254" cy="272" r="7" fill="rgba(139,233,255,0.2)" stroke="rgba(139,233,255,0.6)" />
        <text x="268" y="276" fill="#8be9ff" fontSize="8.6" fontFamily="monospace">
          AMIXY / both models
        </text>
        <text x="250" y="298" fill="rgba(242,246,255,0.82)" fontSize="9.2" fontFamily="monospace">
          GPT-4o: concise, structured answer.
        </text>
        <text x="250" y="315" fill="rgba(242,246,255,0.55)" fontSize="9.2" fontFamily="monospace">
          Gemini: longer reasoning, cited context.
        </text>
        <rect x="250" y="325" width="4" height="8" fill="#8be9ff" className="visual-float" />
      </g>

      <g>
        <rect x="234" y="356" width="488" height="42" rx="12" fill="#080e1b" stroke="rgba(255,255,255,0.14)" />
        <text x="250" y="382" fill="rgba(255,255,255,0.42)" fontSize="9.2" fontFamily="monospace">
          Ask anything, or pick a tool…
        </text>
        <rect x="690" y="366" width="22" height="22" rx="7" fill="#4d8dff" />
        <path d="M697 377h8m-4-4v8" stroke="#fff" strokeWidth="1.1" />
      </g>

      <text x="48" y="456" fill="rgba(255,255,255,0.4)" fontSize="8.6" fontFamily="monospace" letterSpacing="1">
        COMPARE · IMAGE STUDIO · APP BUILDER · RESEARCH · CODE LAB · DOCUMENTS · PROMPT LAB
      </text>
    </g>
  );
}

export function ProjectVisual({ cover, index, year, className }: ProjectVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "project-visual relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 100% at 75% 0%, rgba(77,141,255,0.2), transparent 62%), radial-gradient(60% 70% at 10% 100%, rgba(139,233,255,0.08), transparent 70%), #050912",
        }}
      />
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="agents-glow" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="rgba(77,141,255,0.28)" />
            <stop offset="100%" stopColor="rgba(77,141,255,0)" />
          </radialGradient>
          <pattern id="visual-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#visual-grid)" opacity="0.75" />
        {cover === "amixy" && <AmixyArt />}
        {cover === "agents" && <AgentsArt />}
        {cover === "chat" && <ChatArt />}
        {cover === "rules" && <RulesArt />}
        {cover === "maze" && <MazeArt />}
        {cover === "responsive" && <ResponsiveArt />}
        {cover === "static" && <StaticArt />}
      </svg>

      <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between font-mono text-[13px] uppercase tracking-[0.16em] text-white/40">
        <span>[ NS / {index ?? "00"} ]</span>
        <span>{year ?? "2026"}</span>
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050912]/80 to-transparent" />
    </div>
  );
}
