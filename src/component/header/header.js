import React from 'react';

export default function Header(props) {
  return (
    <div className={props.className} id={props.id}>
      {props.children}
    </div>
  );
}
