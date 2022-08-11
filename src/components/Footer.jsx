import React from 'react';
import { linkedin, github } from '../img';

const Footer = () => {
    return (
        <footer>
            <div className="copyright">© José Martínez 2022</div>
            <div className="social-networks">
                <a href="https://www.linkedin.com/in/jose-martinez-761aa01ab/"><img src={linkedin} alt="" /></a>
                <a href="https://github.com/josemartinez91" ><img className='image-footer' src={github} alt="" /></a>
            </div>
        </footer>
    );
};

export default Footer;