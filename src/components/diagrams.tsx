"use client";

import {
  Mafs,
  Coordinates,
  Vector,
  Line as MafsLine,
  Plot,
  Text as MafsText,
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
