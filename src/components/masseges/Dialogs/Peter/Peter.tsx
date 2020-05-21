import React from 'react';
import Message from '../../Message/Message';


const Peter: React.FC = () => {
    return (
        <div>
            <Message m="HI" />
            <Message m="Hi Vadim" />
            <Message m="Hi Peter! How are u?" />
            <Message m="ty, all ok. and u?" />
            <Message m="i'm too fine." />
        </div>
    )
}

export default Peter;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 