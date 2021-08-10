import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <footer className={style.footer}>
                <p>
                    <small>
                        © {new Date().getFullYear()}
                        <a href="https://github.com/vjnadar"> Korkai Software,</a> All Rights Reserved.
                    </small>
                </p>
            </footer>
        </>
    );
};

export default Footer;
