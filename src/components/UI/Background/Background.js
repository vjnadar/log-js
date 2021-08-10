import React from 'react';
import style from './Background.module.css';
import Bg from '../../../assets/images/bg.jpg';

const background = () => {
    return (
        <div className={style.bg}>
            <img src={Bg} alt="Background" />
        </div>
    );
};

export default background;
