import React from 'react';
const preloader = require('./preloader.gif');

let Preloader: React.FC = () => {
    return <div>
        <img src={preloader} alt="preloader" />
    </div>
}

export default Preloader