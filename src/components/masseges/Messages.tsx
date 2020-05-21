import React from 'react';
import { Route } from 'react-router-dom';
import { initialStateType } from '../../redux/message-reducer';
import LizaContainer from './Dialogs/Liza/LizaContainer';
import Peter from './Dialogs/Peter/Peter';
import Serge from './Dialogs/Serge/Serge';
import Vadim from './Dialogs/Vadim/Vadim';
import style from './Messages.module.css';

type MessagesType = {}

type OwnType = {
    dialogElements: initialStateType
}

type DispatchType = {

}

const Messages: React.FC<OwnType> = (props) => {

    return (
        <div>
            <div className={style.dialogs}>
                <div className={style.dialogItems}>
                    {props.dialogElements}
                </div>
                <div className={style.messages}>
                    <Route path='/Messages/Dialogs/Vadim' render={() => <Vadim />} />
                    <Route path='/Messages/Dialogs/Peter' render={() => <Peter />} />
                    <Route path='/Messages/Dialogs/Serge' render={() => <Serge />} />
                    <Route path='/Messages/Dialogs/Liza' render={() => <LizaContainer />} />
                </div>
            </div>
        </div >
    )
}

export default Messages;
