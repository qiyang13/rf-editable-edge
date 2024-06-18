import { Handle, Position } from 'reactflow';

import css from './CustomNode.module.css';

// This is just a very simple node with a handle on each side
// Because ConnectionMode is set to 'loose' all of them are
// of type 'source' and can be connected to each other

export function CustomNode() {
  return (
    <div className={css.container}>
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className={css.handle}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className={css.handle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={css.handle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className={css.handle}
      />
    </div>
  );
}
