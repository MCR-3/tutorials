"use client";

import {
  Mafs,
  Coordinates,
  Vector,
  Line as MafsLine,
  Plot,
  Text as MafsText,
  Point,
  Circle,
} from "mafs";

export function VectorDiagram() {
  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-0.5, 4.5], y: [-0.5, 3.5], padding: 0 }}
        height={220}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
        <MafsLine.Segment
          point1={[0, 2]}
          point2={[3, 2]}
          style="dashed"
          color="var(--color-green)"
          weight={1.5}
        />
        <MafsLine.Segment
          point1={[3, 0]}
          point2={[3, 2]}
          style="dashed"
          color="var(--color-green)"
          weight={1.5}
        />
        <Vector tip={[3, 2]} color="var(--color-green)" weight={2.5} />
        <MafsText x={1.5} y={2} attach="n" attachDistance={10} size={15} color="var(--color-green)">
          3
        </MafsText>
        <MafsText x={3} y={1} attach="e" attachDistance={10} size={15} color="var(--color-green)">
          2
        </MafsText>
        <MafsText x={3.15} y={2.2} size={17} color="var(--color-green)">
          v
        </MafsText>
      </Mafs>
    </div>
  );
}

export function VectorAdditionDiagram() {
  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-0.3, 3.5], y: [-0.3, 3.5], padding: 0 }}
        height={220}
        pan={false}
        zoom={false}
      >
        <Vector tip={[2, 1]} color="var(--color-blue)" weight={2.5} />
        <Vector tail={[2, 1]} tip={[3, 3]} color="var(--color-orange)" weight={2.5} />
        <Vector tip={[3, 3]} color="var(--color-green)" style="dashed" weight={2} />
        <MafsText x={0.85} y={0.42} size={15} color="var(--color-blue)">
          a
        </MafsText>
        <MafsText x={2.68} y={2.05} size={15} color="var(--color-orange)">
          b
        </MafsText>
        <MafsText x={1.1} y={1.85} size={15} color="var(--color-green)">
          a + b
        </MafsText>
      </Mafs>
    </div>
  );
}

export function NormalizationDiagram() {
  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-1.4, 3.8], y: [-1.4, 4.7], padding: 0 }}
        height={300}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
        {/* Unit circle */}
        <Plot.Parametric
          xy={(t) => [Math.cos(t), Math.sin(t)]}
          domain={[0, 2 * Math.PI]}
          color="lightgray"
          weight={1.5}
        />
        {/* Original vector v = [3, 4] */}
        <Vector tip={[3, 4]} color="var(--color-blue)" weight={2} />
        {/* Normalized vector v̂ = [0.6, 0.8] */}
        <Vector tip={[0.6, 0.8]} color="var(--color-green)" weight={3} />
        <MafsText x={3.15} y={4.18} size={15} color="var(--color-blue)">
          v
        </MafsText>
        <MafsText x={0.68} y={0.96} size={14} color="var(--color-green)">
          v̂
        </MafsText>
        <MafsText x={1.08} y={0.1} size={13} color="white">
          r = 1
        </MafsText>
      </Mafs>
    </div>
  );
}

function bracketPath(x: number, y: number, h: number, side: "left" | "right"): string {
  const bw = 5;
  return side === "left"
    ? `M ${x + bw},${y} L ${x},${y} L ${x},${y + h} L ${x + bw},${y + h}`
    : `M ${x - bw},${y} L ${x},${y} L ${x},${y + h} L ${x - bw},${y + h}`;
}

function svgMatrix(
  data: number[][],
  startX: number,
  startY: number,
  cW: number,
  cH: number,
  hlFn: (i: number, j: number) => [boolean, string],
  fontSize = 15,
) {
  const rows = data.length, cols = data[0].length;
  return (
    <>
      {data.map((row, i) =>
        row.map((val, j) => {
          const cx = startX + j * cW, cy = startY + i * cH;
          const [isHl, color] = hlFn(i, j);
          return (
            <g key={`${startX}-${i}-${j}`}>
              <rect x={cx} y={cy} width={cW} height={cH}
                fill={color} fillOpacity={isHl ? 0.14 : 0}
                stroke="var(--border)" strokeWidth={1} />
              <text x={cx + cW / 2} y={cy + cH / 2 + 5} textAnchor="middle"
                fill={isHl ? color : "var(--color-fg)"}
                fontSize={fontSize} fontWeight={isHl ? 600 : 400} fontFamily="var(--font-code)">
                {val}
              </text>
            </g>
          );
        })
      )}
      <path d={bracketPath(startX, startY, rows * cH, "left")}
        fill="none" stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="square" />
      <path d={bracketPath(startX + cols * cW, startY, rows * cH, "right")}
        fill="none" stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="square" />
    </>
  );
}

const DOT_ANGLE = Math.PI / 4;

export function DotProductDiagram() {
  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-0.3, 3], y: [-0.3, 2], padding: 0 }}
        height={180}
        pan={false}
        zoom={false}
      >
        <Vector tip={[2.5, 0]} color="var(--color-blue)" weight={2.5} />
        <Vector
          tip={[2 * Math.cos(DOT_ANGLE), 2 * Math.sin(DOT_ANGLE)]}
          color="var(--color-orange)"
          weight={2.5}
        />
        <Plot.Parametric
          xy={(t) => [0.55 * Math.cos(t), 0.55 * Math.sin(t)]}
          domain={[0, DOT_ANGLE]}
          color="green"
          weight={1.5}
        />
        <MafsText x={2.6} y={0.1} size={15} color="var(--color-blue)">
          a
        </MafsText>
        <MafsText
          x={2 * Math.cos(DOT_ANGLE) + 0.18}
          y={2 * Math.sin(DOT_ANGLE) + 0.05}
          size={15}
          color="var(--color-orange)"
        >
          b
        </MafsText>
        <MafsText
          x={0.72 * Math.cos(DOT_ANGLE / 2)}
          y={0.72 * Math.sin(DOT_ANGLE / 2)}
          size={14}
          color="green"
        >
          θ
        </MafsText>
      </Mafs>
    </div>
  );
}

export function MatrixDiagram() {
  const cW = 52, cH = 46, bw = 5, padL = 24, padT = 44;
  const data = [[1, 2, 3], [4, 5, 6]];
  const rows = data.length, cols = data[0].length;
  const mW = cols * cW, mH = rows * cH;
  const caption = "2 × 3 matrix — aᵢⱼ is in row i, column j";
  const naturalW = padL + bw + mW + bw + padL;
  const svgW = Math.max(naturalW, Math.ceil(caption.length * 7.2) + 2 * padL);
  const svgH = padT + mH + 28;
  const mX = padL + bw + (svgW - naturalW) / 2, mY = padT;
  const hlRow = 0, hlCol = 1;

  return (
    <div className="my-8 flex justify-center overflow-x-auto">
      <svg width={svgW} height={svgH}>
        <text x={mX + hlCol * cW + cW / 2} y={mY - 24} textAnchor="middle"
          fill="var(--color-green)" fontSize={13} fontFamily="var(--font-code)">
          a₁₂
        </text>
        <line
          x1={mX + hlCol * cW + cW / 2} y1={mY - 20}
          x2={mX + hlCol * cW + cW / 2} y2={mY}
          stroke="var(--color-green)" strokeWidth={1} strokeDasharray="3 2"
        />
        {data.map((row, i) => row.map((val, j) => {
          const cx = mX + j * cW, cy = mY + i * cH;
          const hl = i === hlRow && j === hlCol;
          return (
            <g key={`${i}-${j}`}>
              <rect x={cx} y={cy} width={cW} height={cH}
                fill="var(--color-green)" fillOpacity={hl ? 0.12 : 0}
                stroke="var(--border)" strokeWidth={1} />
              <text x={cx + cW / 2} y={cy + cH / 2 + 5} textAnchor="middle"
                fill={hl ? "var(--color-green)" : "var(--color-fg)"}
                fontSize={16} fontWeight={hl ? 600 : 400} fontFamily="var(--font-code)">
                {val}
              </text>
            </g>
          );
        }))}
        <path d={bracketPath(mX, mY, mH, "left")} fill="none"
          stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="square" />
        <path d={bracketPath(mX + mW, mY, mH, "right")} fill="none"
          stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="square" />
        <text x={svgW / 2} y={svgH - 5} textAnchor="middle"
          fill="var(--muted)" fontSize={12} fontFamily="var(--font-code)">
          {caption}
        </text>
      </svg>
    </div>
  );
}

export function MatrixMultiplicationDiagram() {
  const cW = 44, cH = 44, bw = 5, gap = 36, padL = 16, padT = 24;
  const A = [[1, 2], [3, 4]];
  const B = [[5, 6], [7, 8]];
  const C = [[19, 22], [43, 50]];
  const mW = 2 * cW, mH = 2 * cH;
  const caption = "C₁₁ = 1·5 + 2·7 = 19 — each entry is a dot product (row · column)";
  const naturalAX = padL + bw;
  const naturalBX = naturalAX + mW + bw + gap + bw;
  const naturalCX = naturalBX + mW + bw + gap + bw;
  const naturalW = naturalCX + mW + bw + padL;
  const svgW = Math.max(naturalW, Math.ceil(caption.length * 7.2) + 2 * padL);
  const aX = naturalAX + (svgW - naturalW) / 2;
  const bX = aX + mW + bw + gap + bw;
  const cX = bX + mW + bw + gap + bw;
  const svgH = padT + mH + 32;
  const mY = padT;
  const opY = mY + mH / 2 + 6;

  function renderCells(
    data: number[][],
    startX: number,
    hlType: "row" | "col" | "entry",
  ) {
    const hlColor =
      hlType === "row" ? "var(--color-blue)"
        : hlType === "col" ? "var(--color-orange)"
          : "var(--color-green)";
    return data.map((row, i) => row.map((val, j) => {
      const cx = startX + j * cW, cy = mY + i * cH;
      const isHl =
        (hlType === "row" && i === 0) ||
        (hlType === "col" && j === 0) ||
        (hlType === "entry" && i === 0 && j === 0);
      return (
        <g key={`${startX}-${i}-${j}`}>
          <rect x={cx} y={cy} width={cW} height={cH}
            fill={hlColor} fillOpacity={isHl ? 0.14 : 0}
            stroke="var(--border)" strokeWidth={1} />
          <text x={cx + cW / 2} y={cy + cH / 2 + 5} textAnchor="middle"
            fill={isHl ? hlColor : "var(--color-fg)"}
            fontSize={15} fontWeight={isHl ? 600 : 400} fontFamily="var(--font-code)">
            {val}
          </text>
        </g>
      );
    }));
  }

  function renderBrackets(startX: number) {
    return (
      <>
        <path d={bracketPath(startX, mY, mH, "left")} fill="none"
          stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="square" />
        <path d={bracketPath(startX + mW, mY, mH, "right")} fill="none"
          stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="square" />
      </>
    );
  }

  return (
    <div className="my-8 flex justify-center">
      <svg width={svgW} height={svgH}>
        {renderCells(A, aX, "row")}
        {renderBrackets(aX)}
        <text x={aX + mW + bw + gap / 2} y={opY} textAnchor="middle"
          fill="var(--muted)" fontSize={20} fontFamily="var(--font-code)">×</text>

        {renderCells(B, bX, "col")}
        {renderBrackets(bX)}
        <text x={bX + mW + bw + gap / 2} y={opY} textAnchor="middle"
          fill="var(--muted)" fontSize={20} fontFamily="var(--font-code)">=</text>

        {renderCells(C, cX, "entry")}
        {renderBrackets(cX)}

        <text x={svgW / 2} y={svgH - 5} textAnchor="middle"
          fill="var(--muted)" fontSize={12} fontFamily="var(--font-code)" overflow={"auto"}>
          {caption}
        </text>
      </svg>
    </div>
  );
}

export function MatrixVectorDiagram() {
  const cW = 46, cH = 46, bw = 5, gap = 32, padL = 16, padT = 28;
  const W = [[2, 1], [0, 3]];
  const xV = [[1], [2]];
  const yV = [[4], [6]];
  const mW = 2 * cW, vW = cW, mH = 2 * cH;
  const mY = padT;
  const caption = "y₁ = 2·1 + 1·2 = 4 — each output is one row dotted with x";
  const naturalWX = padL + bw;
  const naturalW = naturalWX + mW + bw + gap + bw + vW + bw + gap + bw + vW + bw + padL;
  const svgW = Math.max(naturalW, Math.ceil(caption.length * 7.2) + 2 * padL);
  const wX = naturalWX + (svgW - naturalW) / 2;
  const xX = wX + mW + bw + gap + bw;
  const yX = xX + vW + bw + gap + bw;
  const svgH = padT + mH + 32;
  const opY = mY + cH + 6;

  return (
    <div className="my-8 flex justify-center overflow-x-auto">
      <svg width={svgW} height={svgH}>
        {svgMatrix(W, wX, mY, cW, cH, (i) => [i === 0, "var(--color-blue)"])}
        <text x={wX + mW + bw + gap / 2} y={opY} textAnchor="middle"
          fill="var(--muted)" fontSize={20} fontFamily="var(--font-code)">×</text>

        {svgMatrix(xV, xX, mY, cW, cH, () => [true, "var(--color-orange)"])}
        <text x={xX + vW + bw + gap / 2} y={opY} textAnchor="middle"
          fill="var(--muted)" fontSize={20} fontFamily="var(--font-code)">=</text>

        {svgMatrix(yV, yX, mY, cW, cH, (i) => [i === 0, "var(--color-green)"])}

        <text x={svgW / 2} y={svgH - 5} textAnchor="middle"
          fill="var(--muted)" fontSize={12} fontFamily="var(--font-code)">
          {caption}
        </text>
      </svg>
    </div>
  );
}

export function TangentLineDiagram() {
  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-0.3, 2.8], y: [-0.6, 5], padding: 0 }}
        height={260}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
        <Plot.OfX y={(x) => x * x} color="var(--color-blue)" weight={2} />
        {/* Tangent at x=1: y = 2x − 1 */}
        <MafsLine.Segment
          point1={[0.1, -0.8]}
          point2={[2.7, 4.4]}
          color="var(--color-orange)"
          weight={1.5}
          style="dashed"
        />
        <Point x={1} y={1} color="var(--color-green)" />
        <MafsText x={1.15} y={0.72} size={13} color="var(--color-green)">
          (1, 1)
        </MafsText>
        <MafsText x={2.1} y={3.85} size={14} color="var(--color-blue)">
          f(x) = x²
        </MafsText>
        <MafsText x={0.6} y={-0.42} size={13} color="var(--color-orange)">
          f ′(1) = 2
        </MafsText>
      </Mafs>
    </div>
  );
}

export function GradientDiagram() {
  const scale = 0.72;
  const u = 1 / Math.SQRT2; // unit direction of [1, 1]
  const gradTip: [number, number] = [1 + u * scale, 1 + u * scale];
  const negTip: [number, number] = [1 - u * scale, 1 - u * scale];

  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-2.5, 2.5], y: [-2.5, 2.5], padding: 0 }}
        height={270}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
        {/* Level curves of f(x,y) = x² + y² */}
        <Circle center={[0, 0]} radius={1} color="lightgray" fillOpacity={0} weight={1} />
        <Circle center={[0, 0]} radius={Math.SQRT2} color="lightgray" fillOpacity={0} weight={1} />
        <Circle center={[0, 0]} radius={2} color="lightgray" fillOpacity={0} weight={1} />
        <Point x={1} y={1} color="var(--color-fg)" />
        {/* ∇f: steepest increase */}
        <Vector tail={[1, 1]} tip={gradTip} color="var(--color-orange)" weight={2.5} />
        {/* −∇f: steepest decrease */}
        <Vector tail={[1, 1]} tip={negTip} color="var(--color-green)" weight={2.5} />
        <MafsText x={gradTip[0] + 0.12} y={gradTip[1]} size={14} color="var(--color-orange)">
          ∇f
        </MafsText>
        <MafsText x={negTip[0] - 0.58} y={negTip[1]} size={14} color="var(--color-green)">
          −∇f
        </MafsText>
        <MafsText x={2.0} y={-1.9} size={12} color="lightgray">
          level curves
        </MafsText>
      </Mafs>
    </div>
  );
}

export function GradientDescentDiagram() {
  const loss = (w: number) => (w - 2) ** 2;
  const eta = 0.3;
  const w0 = 4.0;
  const w1 = w0 - eta * 2 * (w0 - 2); // 2.8
  const w2 = w1 - eta * 2 * (w1 - 2); // 2.32

  return (
    <div className="my-8">
      <Mafs
        viewBox={{ x: [-0.3, 5.2], y: [-0.6, 5.2], padding: 0 }}
        height={240}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
        <Plot.OfX y={loss} color="var(--color-blue)" weight={2} />
        {/* Dashed verticals */}
        <MafsLine.Segment
          point1={[w0, 0]} point2={[w0, loss(w0)]}
          style="dashed" color="var(--muted)" weight={1}
        />
        <MafsLine.Segment
          point1={[w1, 0]} point2={[w1, loss(w1)]}
          style="dashed" color="var(--muted)" weight={1}
        />
        <MafsLine.Segment
          point1={[w2, 0]} point2={[w2, loss(w2)]}
          style="dashed" color="var(--muted)" weight={1}
        />
        {/* Points on curve */}
        <Point x={w0} y={loss(w0)} color="var(--color-orange)" />
        <Point x={w1} y={loss(w1)} color="var(--color-orange)" />
        <Point x={w2} y={loss(w2)} color="var(--color-orange)" />
        <Point x={2} y={0} color="var(--color-green)" />
        {/* Descent arrows on w-axis */}
        <Vector tail={[w0, 0]} tip={[w1, 0]} color="var(--color-orange)" weight={2} />
        <Vector tail={[w1, 0]} tip={[w2, 0]} color="var(--color-orange)" weight={2} />
        {/* Labels */}
        <MafsText x={0.4} y={4.3} size={14} color="var(--color-blue)">
          L(w)
        </MafsText>
        <MafsText x={w0 + 0.12} y={loss(w0) + 0.3} size={13} color="var(--color-orange)">
          w₀
        </MafsText>
        <MafsText x={w1 + 0.12} y={loss(w1) + 0.28} size={13} color="var(--color-orange)">
          w₁
        </MafsText>
        <MafsText x={2.08} y={-0.38} size={12} color="var(--color-green)">
          min
        </MafsText>
      </Mafs>
    </div>
  );
}

export function BatchMatrixDiagram() {
  const cW = 44, cH = 38, bw = 5, gap = 36, padL = 20, padT = 36;
  const X = [[1, 0], [0, 1], [1, 1]];
  const WT = [[2, 1], [0, 3]];
  const Y = [[2, 1], [0, 3], [2, 4]];

  const xH = 3 * cH, wtH = 2 * cH;
  const mY = padT;
  const wtY = mY + (xH - wtH) / 2;

  const caption = "B = 3 examples in parallel — row i of X maps to row i of Y";
  const naturalXX = padL + bw;
  const naturalW = naturalXX + 2 * cW + bw + gap + bw + 2 * cW + bw + gap + bw + 2 * cW + bw + padL;
  const svgW = Math.max(naturalW, Math.ceil(caption.length * 7.2) + 2 * padL);
  const xX = naturalXX + (svgW - naturalW) / 2;
  const wtX = xX + 2 * cW + bw + gap + bw;
  const yX = wtX + 2 * cW + bw + gap + bw;
  const svgH = mY + xH + 32;
  const opY = mY + xH / 2 + 6;

  return (
    <div className="my-8 flex justify-center overflow-x-auto">
      <svg width={svgW} height={svgH}>
        {svgMatrix(X, xX, mY, cW, cH, (i) => [i === 0, "var(--color-blue)"], 14)}
        {X.map((_, i) => (
          <text key={i} x={xX - 8} y={mY + i * cH + cH / 2 + 4}
            textAnchor="end" fontSize={11} fontFamily="var(--font-code)"
            fill={i === 0 ? "var(--color-blue)" : "var(--muted)"}>
            {i + 1}
          </text>
        ))}

        <text x={xX + 2 * cW + bw + gap / 2} y={opY} textAnchor="middle"
          fill="var(--muted)" fontSize={20} fontFamily="var(--font-code)">×</text>

        <text x={wtX + cW} y={wtY - 8} textAnchor="middle"
          fill="var(--muted)" fontSize={11} fontFamily="var(--font-code)">Wᵀ</text>
        {svgMatrix(WT, wtX, wtY, cW, cH, () => [false, "var(--color-fg)"], 14)}

        <text x={wtX + 2 * cW + bw + gap / 2} y={opY} textAnchor="middle"
          fill="var(--muted)" fontSize={20} fontFamily="var(--font-code)">=</text>

        {svgMatrix(Y, yX, mY, cW, cH, (i) => [i === 0, "var(--color-green)"], 14)}

        <text x={svgW / 2} y={svgH - 5} textAnchor="middle"
          fill="var(--muted)" fontSize={12} fontFamily="var(--font-code)">
          {caption}
        </text>
      </svg>
    </div>
  );
}

export function ChainRuleDiagram() {
  const bw = 85, bh = 34, rx = 3;
  const nx1 = 15, nx2 = 210, nx3 = 400;
  const ny = 35;
  const arY = ny + bh / 2;
  const backY = 126;
  const as = 7;
  const svgW = nx3 + bw + 20;
  const svgH = 158;

  const fwdArrow = (x1: number, x2: number, label: string) => (
    <>
      <line x1={x1} y1={arY} x2={x2 - as} y2={arY}
        stroke="var(--color-blue)" strokeWidth={1.5} />
      <polygon
        points={`${x2 - as},${arY - 3.5} ${x2},${arY} ${x2 - as},${arY + 3.5}`}
        fill="var(--color-blue)"
      />
      <text x={(x1 + x2) / 2} y={arY - 12} textAnchor="middle"
        fontFamily="var(--font-code)" fontSize={13} fill="var(--color-blue)">
        {label}
      </text>
    </>
  );

  return (
    <div className="my-8 flex justify-center overflow-x-auto">
      <svg width={svgW} height={svgH}>
        {/* Node x */}
        <rect x={nx1} y={ny} width={bw} height={bh} rx={rx}
          fill="transparent" stroke="var(--color-fg)" strokeWidth={1.5} />
        <text x={nx1 + bw / 2} y={ny + bh / 2 + 5} textAnchor="middle"
          fontFamily="var(--font-code)" fontSize={13} fill="var(--color-fg)">x</text>

        {/* Node y = f(x) */}
        <rect x={nx2} y={ny} width={bw} height={bh} rx={rx}
          fill="transparent" stroke="var(--color-fg)" strokeWidth={1.5} />
        <text x={nx2 + bw / 2} y={ny + bh / 2 + 5} textAnchor="middle"
          fontFamily="var(--font-code)" fontSize={13} fill="var(--color-fg)">y = f(x)</text>

        {/* Node z = g(y) */}
        <rect x={nx3} y={ny} width={bw} height={bh} rx={rx}
          fill="transparent" stroke="var(--color-fg)" strokeWidth={1.5} />
        <text x={nx3 + bw / 2} y={ny + bh / 2 + 5} textAnchor="middle"
          fontFamily="var(--font-code)" fontSize={13} fill="var(--color-fg)">z = g(y)</text>

        {/* Forward arrows */}
        {fwdArrow(nx1 + bw, nx2, "f")}
        {fwdArrow(nx2 + bw, nx3, "g")}

        {/* Local gradient labels */}
        <text x={nx2 + bw / 2} y={ny + bh + 22} textAnchor="middle"
          fontFamily="var(--font-code)" fontSize={12} fill="var(--color-orange)">
          ∂y/∂x
        </text>
        <text x={nx3 + bw / 2} y={ny + bh + 22} textAnchor="middle"
          fontFamily="var(--font-code)" fontSize={12} fill="var(--color-orange)">
          ∂z/∂y
        </text>

        {/* Backward arrow: right to left, green */}
        <line x1={nx3 + bw} y1={backY} x2={nx1 + as} y2={backY}
          stroke="var(--color-green)" strokeWidth={1.5} />
        <polygon
          points={`${nx1 + as},${backY - 3.5} ${nx1},${backY} ${nx1 + as},${backY + 3.5}`}
          fill="var(--color-green)"
        />
        <text x={svgW / 2} y={backY + 22} textAnchor="middle"
          fontFamily="var(--font-code)" fontSize={12} fill="var(--color-green)">
          ∂z/∂x = ∂z/∂y · ∂y/∂x
        </text>
      </svg>
    </div>
  );
}
