import React from 'react';

type SquareComponentProps = {
  id: number;
  color: string; // 方格的颜色
  name: string; // 方格的名称
};

const SquareComponent = ({ id ,color, name }: SquareComponentProps) => {
  const style = {
    width: '60px',
    height: '60px',
    padding:'10px',
    marginTop:'20px',
    background:color,
    backgroundColor: color,
    border: '1px solid black',
    display: 'inline-block',
    lineHeight: '30px',
    
  };

  return (
    <div style={style}>
      <div>{name}</div>
      <div> {id}</div>
    </div>
  )
  ;
};

export default SquareComponent;
