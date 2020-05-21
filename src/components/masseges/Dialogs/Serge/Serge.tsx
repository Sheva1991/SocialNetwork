import React from 'react';
import Message from '../../Message/Message';


const Serge: React.FC = () => {
    return (
        <div>
            <Message m="HI" />
            <Message m="Hi Vadim" />
            <Message m="Hi Serge! How are u?" />
            <Message m="ty, all ok. and u?" />
            <Message m="i'm too fine." />
        </div>
    )
}

export default Serge;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 