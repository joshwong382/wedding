"use client";

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
  size = 9,
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
      viewBox="0 0 800 780"
      className="w-full h-auto"
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
        fill={highlightedTable === "0" ? "#B8674A" : "#F5EDE6"}
        stroke={highlightedTable === "0" ? "#B8674A" : "#C9BFB2"}
        strokeWidth="1.25"
        strokeLinejoin="round"
        className={highlightedTable === "0" ? "seating-map-glow" : ""}
        filter={highlightedTable === "0" ? "url(#table-glow)" : undefined}
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
        fontSize="28"
        letterSpacing=".01em"
        fill={highlightedTable === "0" ? "#fff" : "#2B2622"}
      >
        Daniel &amp; Eugenia
      </text>

      <Label x={403.75} y={240} text="Dance" />
      <Label x={403.75} y={258} text="Floor" />

      {/* Adjacent room label */}
      <Label x={100} y={393} text="Adjacent" />
      <Label x={100} y={413} text="room" />

      {/* Venue features */}
      <rect x="551" y="129" width="61" height="22" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={581.5} y={140} text="DJ" />

      <rect x="656" y="465" width="69" height="32" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={690.5} y={477} text="Ice" />
      <Label x={690.5} y={491} text="cream" />

      <rect x="258.5" y="706" width="90" height="44" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={303.5} y={728} text="Photobooth" />

      <rect x="460" y="706" width="127.5" height="44" fill="#fff" stroke="#CFC4B4" strokeWidth="1" rx="2" />
      <Label x={523.75} y={728} text="Welcome table" />

      <Label x={410} y={745} text="Screen" size={9} />

      {/* Screen labels near head table */}
      <Label x={298} y={101} text="Screen" />
      <Label x={510} y={101} text="Screen" />
      <text
        x="314"
        y="118"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#B8674A"
        fontSize={9}
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight={300}
        letterSpacing=".14em"
      >
        CAKE
      </text>

      {/* Entrance arrow */}
      <g transform="translate(405, 788)">
        <path
          d="M0 34 L0 4 M-4.5 9 L0 3.5 L4.5 9"
          fill="none"
          stroke="#B8674A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="435"
        y="808"
        fill="#B8674A"
        fontSize={9}
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight={300}
        letterSpacing=".2em"
        style={{ textTransform: "uppercase" as const }}
      >
        Entrance
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
        fontSize="21"
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
          <g key={id} className={isHighlighted ? "seating-map-glow" : ""}>
            {isHighlighted && (
              <circle
                cx={cx}
                cy={cy}
                r={TABLE_RADIUS + 6}
                fill="none"
                stroke="#B8674A"
                strokeWidth="3"
                className="seating-map-pulse"
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={TABLE_RADIUS}
              fill={isHighlighted ? "#B8674A" : "#fff"}
              stroke={isHighlighted ? "#B8674A" : "#CFC4B4"}
              strokeWidth={isHighlighted ? 2 : 1}
              filter={isHighlighted ? "url(#table-glow)" : undefined}
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="22"
              fontWeight={600}
              fill={isHighlighted ? "#fff" : "#2B2622"}
            >
              {id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
