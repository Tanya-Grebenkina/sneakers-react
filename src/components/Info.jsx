import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCardOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Cart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Повернутися назад
      </button>
    </div>
  );
};

export default Info;
