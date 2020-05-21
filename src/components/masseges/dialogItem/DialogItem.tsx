import React from 'react';
import style from './DialogItem.module.css'
import { NavLink } from 'react-router-dom'



type PropsType = {
    name: string
    id: string | number
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/Messages/Dialogs/" + props.id;
    return (
        <div className={style.items}><NavLink to={path} activeClassName={style.active}>{props.name}</NavLink></div>
    )
}

export default DialogItem;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 