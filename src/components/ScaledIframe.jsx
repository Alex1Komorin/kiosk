import React, { useEffect, useState } from 'react';
import './ScaledIframe.css';

const DEFAULT_SCALE = 2;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

const clampScale = (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

const ScaledIframe = ({ src, title, background = '#0b1020', initialScale = DEFAULT_SCALE }) => {
  const [scale, setScale] = useState(() => clampScale(initialScale));

  useEffect(() => {
    setScale(clampScale(initialScale));
  }, [initialScale]);

  const changeScale = (offset) => {
    setScale((currentScale) => clampScale(currentScale + offset));
  };

  return (
    <div className="scaled-iframe" style={{ background }}>
      <div className="scaled-iframe__viewport" style={{ '--iframe-scale': scale }}>
        <iframe
          src={src}
          className="scaled-iframe__content"
          title={title}
          allowFullScreen
        />
      </div>
      <div className="scaled-iframe__controls" aria-label="Масштаб приложения">
        <button
          type="button"
          className="scaled-iframe__control"
          onClick={() => changeScale(SCALE_STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="Увеличить масштаб"
        >
          +
        </button>
        <span className="scaled-iframe__value">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          className="scaled-iframe__control"
          onClick={() => changeScale(-SCALE_STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="Уменьшить масштаб"
        >
          −
        </button>
      </div>
    </div>
  );
};

export default ScaledIframe;
