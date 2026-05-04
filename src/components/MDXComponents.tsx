import type { ComponentPropsWithoutRef } from "react";
import { TutorialLineChart, TutorialBarChart } from "./charts";

function MdxTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-wrapper">
      <table {...props}>{children}</table>
    </div>
  );
}

import {
  VectorDiagram,
  VectorAdditionDiagram,
  DotProductDiagram,
  NormalizationDiagram,
  MatrixDiagram,
  MatrixMultiplicationDiagram,
  MatrixVectorDiagram,
  BatchMatrixDiagram,
  TangentLineDiagram,
  GradientDiagram,
  GradientDescentDiagram,
  MomentumDiagram,
  AdamDiagram,
  TrainingLoopDiagram,
  LossCurveDiagram,
  ReLUDiagram,
  SigmoidTanhDiagram,
  ChainRuleDiagram,
  ComputationGraphDiagram,
  BackpropDiagram,
  MSELossDiagram,
  CrossEntropyDiagram,
} from "./diagrams";

export const mdxComponents = {
  table: MdxTable,
  TutorialLineChart,
  TutorialBarChart,
  VectorDiagram,
  VectorAdditionDiagram,
  DotProductDiagram,
  NormalizationDiagram,
  MatrixDiagram,
  MatrixMultiplicationDiagram,
  MatrixVectorDiagram,
  BatchMatrixDiagram,
  TangentLineDiagram,
  GradientDiagram,
  GradientDescentDiagram,
  MomentumDiagram,
  AdamDiagram,
  TrainingLoopDiagram,
  LossCurveDiagram,
  ReLUDiagram,
  SigmoidTanhDiagram,
  ChainRuleDiagram,
  ComputationGraphDiagram,
  BackpropDiagram,
  MSELossDiagram,
  CrossEntropyDiagram,
};
