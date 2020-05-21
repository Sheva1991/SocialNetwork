import React from 'react';
import style from './Message.module.css'

const Message = (props) => {
    return (
        <div className={style.message}>{props.m}</div>
    )
}

export default Message;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 