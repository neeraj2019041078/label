import React, { useState } from 'react';

function ImageAnnotator({ image, annotations, handleAnnotationSelection }) {
  const [rectangles, setRectangles] = useState([]);
  const [textInputs, setTextInputs] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  const handleMouseDown = (event) => {
    const boundingBox = event.target.getBoundingClientRect();
    const x = event.clientX - boundingBox.left;
    const y = event.clientY - boundingBox.top;
    setIsDrawing(true);
    setStartX(x);
    setStartY(y);
    setRectangles([...rectangles, { startX: x, startY: y, endX: x, endY: y }]);
    setTextInputs([...textInputs, '']);
  };

  const handleMouseMove = (event) => {
    if (isDrawing) {
      const boundingBox = event.target.getBoundingClientRect();
      const x = event.clientX - boundingBox.left;
      const y = event.clientY - boundingBox.top;
      const updatedRectangles = [...rectangles];
      updatedRectangles[rectangles.length - 1] = {
        ...updatedRectangles[rectangles.length - 1],
        endX: x,
        endY: y,
      };
      setRectangles(updatedRectangles);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTextInput = (event, index) => {
    const updatedTextInputs = [...textInputs];
    updatedTextInputs[index] = event.target.value;
    setTextInputs(updatedTextInputs);
  };

  return (
    <div>
      <h1>Image Annotator</h1>
      
      {image && (
        <div style={{ position: 'relative' }}>
          <img
            src={image}
            alt="Annotatable Image"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ cursor: 'crosshair', maxWidth: '450px' }}
          />
          {rectangles.map((rectangle, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: rectangle.startX,
                top: rectangle.startY,
                width: rectangle.endX - rectangle.startX,
                height: rectangle.endY - rectangle.startY,
                border: '2px dashed blue',
              }}
            >
              <input
                type="text"
                value={textInputs[index] || ''}
                onChange={(event) => handleTextInput(event, index)}
                style={{ position: 'absolute', bottom: '-20px', left: '0', width: '100%' }}
              />
            </div>
          ))}
          {annotations.map((annotation, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: annotation.x,
                top: annotation.y,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  border: '2px solid red',
                  padding: '5px',
                }}
              >
                {annotation.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageAnnotator;
