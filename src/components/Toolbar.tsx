import { type ChangeEventHandler } from 'react';
import { Edge, useEdges, useReactFlow } from 'reactflow';

import { Algorithm, COLORS } from '../edges/EditableEdge/constants';
import css from './Toolbar.module.css';
import { EditableEdgeData } from '../edges/EditableEdge';

const edgeVariants = [
  {
    algorithm: Algorithm.BezierCatmullRom,
    label: 'Bezier-Catmull-Rom',
  },
  {
    algorithm: Algorithm.CatmullRom,
    label: 'Catmull-Rom',
  },
  {
    algorithm: Algorithm.Linear,
    label: 'Linear',
  },
];

// A toolbar that allows the user to change the algorithm of the selected edge
export function Toolbar() {
  const edges = useEdges();
  const { setEdges } = useReactFlow();

  const selectedEdge = edges.find((edge) => edge.selected) as
    | Edge<EditableEdgeData>
    | undefined;
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEdges((edges) => {
      return edges.map((edge) => {
        if (edge.id === selectedEdge?.id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              algorithm: e.target.value,
            },
          };
        }
        return edge;
      });
    });
  };

  return (
    <div className={css.toolbar}>
      <div>
        {selectedEdge
          ? `Selected edge: ${selectedEdge.id}`
          : '👉 Select an edge to change its type here.'}
      </div>
      {selectedEdge && (
        <div className={css.edgevariants}>
          {edgeVariants.map((edgeVariant) => (
            <div key={edgeVariant.algorithm}>
              <input
                type="radio"
                id={edgeVariant.algorithm}
                name="algorithm"
                value={edgeVariant.algorithm}
                checked={
                  selectedEdge?.data?.algorithm === edgeVariant.algorithm
                }
                disabled={!selectedEdge}
                style={{
                  accentColor: COLORS[edgeVariant.algorithm],
                  color: COLORS[edgeVariant.algorithm],
                }}
                onChange={onChange}
              />
              <label
                htmlFor={edgeVariant.algorithm}
                style={{
                  color: selectedEdge ? COLORS[edgeVariant.algorithm] : '',
                }}
              >
                {edgeVariant.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
