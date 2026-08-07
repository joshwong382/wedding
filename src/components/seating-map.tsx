"use client";

import { HEAD_TABLE_ID } from "@/lib/seating-search";

const TABLE_RADIUS = 31;

const GUEST_TABLES: readonly { id: string; cx: number; cy: number }[] = [
  { id: "1", cx: 241.5, cy: 193 },
  { id: "2", cx: 241.5, cy: 265 },
  { id: "3", cx: 241.5, cy: 400 },
  { id: "4", cx: 241.5, cy: 473 },
  { id: "5", cx: 241.5, cy: 546 },
  { id: "6", cx: 323, cy: 400 },
  { id: "7", cx: 323, cy: 473 },
  { id: "8", cx: 323, cy: 546 },
  { id: "9", cx: 323, cy: 620 },
  { id: "10", cx: 485.5, cy: 400 },
  { id: "11", cx: 485.5, cy: 473 },
  { id: "12", cx: 485.5, cy: 546 },
  { id: "13", cx: 485.5, cy: 620 },
  { id: "14", cx: 568.5, cy: 193 },
  { id: "15", cx: 568.5, cy: 265 },
  { id: "16", cx: 568.5, cy: 400 },
  { id: "17", cx: 568.5, cy: 473 },
  { id: "18", cx: 568.5, cy: 546 },
  { id: "19", cx: 650.5, cy: 193 },
  { id: "20", cx: 650.5, cy: 265 },
  { id: "21", cx: 650.5, cy: 339.5 },
  { id: "22", cx: 650.5, cy: 413.5 },
  { id: "23", cx: 732, cy: 265 },
  { id: "24", cx: 732, cy: 339.5 },
  { id: "25", cx: 732, cy: 413.5 },
];

function Label({
  x,
  y,
  text,
  size = 11,
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#6E6459"
      fontSize={size}
      fontFamily="'Montserrat', system-ui, sans-serif"
      fontWeight={300}
      letterSpacing=".14em"
      style={{ textTransform: "uppercase" as const }}
    >
      {text}
    </text>
  );
}

export function SeatingMap({ highlightedTable }: { highlightedTable: string | null }) {
  return (
    <svg
      viewBox="140 0 660 930"
      className="w-full h-auto max-h-[60vh] sm:max-h-[70vh]"
      role="img"
      aria-label="Venue floor plan"
    >
      <defs>
        <filter id="table-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Adjacent room */}
      <rect x="15" y="122.5" width="170" height="607.5" fill="#EBE4D9" stroke="#CFC4B4" strokeWidth="1.5" />

      {/* Main venue walls */}
      <polygon
        points="185,20 615,20 615,75 785,75 785,502.5 615,502.5 615,780 242.5,780 242.5,730 185,730"
        fill="#FDFBF8"
        stroke="#2B2622"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {/* Head table shape */}
      <polygon
        points="242.5,22.5 565,22.5 565,110 537,142.5 270.5,142.5 242.5,110"
        fill={highlightedTable === HEAD_TABLE_ID ? "#B8674A" : "#F5EDE6"}
        stroke={highlightedTable === HEAD_TABLE_ID ? "#B8674A" : "#C9BFB2"}
        strokeWidth="1.25"
        strokeLinejoin="round"
        className={highlightedTable === HEAD_TABLE_ID ? "seating-map-glow" : ""}
        filter={highlightedTable === HEAD_TABLE_ID ? "url(#table-glow)" : undefined}
        style={highlightedTable === HEAD_TABLE_ID ? { transformOrigin: "403.75px 82.5px" } : undefined}
      />

      {/* Dance floor */}
      <rect
        x="327.5"
        y="146.5"
        width="152.5"
        height="203.5"
        fill="#F1EBE1"
        stroke="#CFC4B4"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Right wall segment */}
      <line x1="615" y1="502.5" x2="785" y2="502.5" stroke="#CFC4B4" strokeWidth="1.25" />

      {/* Entrance gap */}
      <line x1="385" y1="780" x2="425" y2="780" stroke="#FDFBF8" strokeWidth="5" />

      {/* Labels */}
      <text
        x="403.75"
        y="66.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontWeight={500}
        fontSize="32"
        letterSpacing=".01em"
        fill={highlightedTable === HEAD_TABLE_ID ? "#fff" : "#2B2622"}
      >
        Daniel &amp; Eugenia
      </text>

      <Label x={403.75} y={240} text="Dance" />
      <Label x={403.75} y={258} text="Floor" />

      {/* Adjacent room label */}
      <Label x={100} y={393} text="Adjacent" />
      <Label x={100} y={413} text="room" />

      {/* Venue features */}
      <rect x="551" y="128" width="61" height="24" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={581.5} y={140} text="DJ" />

      <rect x="650" y="460" width="81" height="40" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={690.5} y={473} text="Ice" />
      <Label x={690.5} y={487} text="cream" />

      <rect x="248" y="702" width="110" height="50" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={303.5} y={728} text="Photobooth" />

      <rect x="448" y="702" width="150" height="50" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={523.75} y={728} text="Welcome table" />

      <text
        x={410}
        y={745}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#B8674A"
        fontSize={12}
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight={500}
        letterSpacing=".14em"
        style={{ textTransform: "uppercase" as const }}
      >
        Screen
      </text>

      {/* Screen labels near head table */}
      <Label x={298} y={101} text="Screen" />
      <Label x={510} y={101} text="Screen" />
      <text
        x="314"
        y="118"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#B8674A"
        fontSize={11}
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight={300}
        letterSpacing=".14em"
      >
        CAKE
      </text>

      {/* Entrance arrow: comes from right, turns 90° up into venue */}
      <g className="seating-map-glow" style={{ transformOrigin: "470px 820px" }}>
        <path
          d="M530 820 L410 820 L410 775 M404 785 L410 774 L416 785"
          fill="none"
          stroke="#B8674A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="545"
          y="820"
          textAnchor="start"
          dominantBaseline="central"
          fill="#B8674A"
          fontSize={11}
          fontFamily="'Montserrat', system-ui, sans-serif"
          fontWeight={600}
          letterSpacing=".14em"
          style={{ textTransform: "uppercase" as const }}
        >
          Entrance
        </text>
      </g>

      {/* Public area label */}
      <Label x={400} y={845} text="Public area" />

      {/* Bar */}
      <rect x="320" y="865" width="160" height="32" fill="#fff" stroke="#CFC4B4" strokeWidth="1.5" rx="3" />
      <text
        x={400}
        y={882}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#2B2622"
        fontSize={14}
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight={500}
        letterSpacing=".14em"
        style={{ textTransform: "uppercase" as const }}
      >
        Bar
      </text>

      {/* Vendor table */}
      <circle
        cx={744}
        cy={113.5}
        r={TABLE_RADIUS}
        fill="#FBF4F0"
        stroke="#C09A86"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text
        x={744}
        y={113.5}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="24"
        fontWeight={600}
        letterSpacing=".06em"
        fill="#B8674A"
      >
        V
      </text>

      {/* Guest tables */}
      {GUEST_TABLES.map(({ id, cx, cy }) => {
        const isHighlighted = highlightedTable === id;
        return (
          <g key={id} className={isHighlighted ? "seating-map-glow" : ""} style={isHighlighted ? { transformOrigin: `${cx}px ${cy}px` } : undefined}>
            {isHighlighted && (
              <circle
                cx={cx}
                cy={cy}
                r={TABLE_RADIUS + 10}
                fill="none"
                stroke="#B8674A"
                strokeWidth="3"
                className="seating-map-pulse"
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={TABLE_RADIUS}
              fill={isHighlighted ? "#B8674A" : "#fff"}
              stroke={isHighlighted ? "#B8674A" : "#CFC4B4"}
              strokeWidth={isHighlighted ? 2 : 1}
              opacity={!isHighlighted && highlightedTable ? 0.4 : 1}
              filter={isHighlighted ? "url(#table-glow)" : undefined}
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize={isHighlighted ? "32" : "26"}
              fontWeight={600}
              fill={isHighlighted ? "#fff" : "#2B2622"}
              opacity={!isHighlighted && highlightedTable ? 0.4 : 1}
            >
              {id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
