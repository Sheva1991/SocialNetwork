import React from 'react';
import Message from '../../Message/Message';


const Vadim: React.FC = () => {
    return (
        <div>
            <Message m="HI" />
            <Message m="Hi Vadim" />
            <Message m="Hi Vadim! How are u?" />
            <Message m="ty, all ok. and u?" />
            <Message m="i'm too fine." />
        </div>
    )
}

export default Vadim;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 