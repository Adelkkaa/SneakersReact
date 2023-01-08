import React from 'react';
import AppContext from './context';

const Info = ({name, description, image}) => {

    const {setCart} = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img width={120} src={image} alt="Empty_Cart" className="mb-20" />
            <h2>{name}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCart(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
            </button>
    </div>
  )
}

export default Info;
