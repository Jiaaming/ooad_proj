import React from 'react';

type SquareComponentProps = {
  color: string; // 方格的颜色
  name: string; // 方格的名称
};

const SquareComponent = ({ color, name }: SquareComponentProps) => {
  const style = {
    width: '60px',
    height: '60px',
    backgroundColor: color,
    border: '1px solid black',
    display: 'inline-block',
    lineHeight: '60px',
  };

  return <div style={style}>{name}</div>;
};

export default SquareComponent;
