import React from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { actions } from '../../redux/message-reducer';
import DialogItem from './dialogItem/DialogItem';




let mapStateToProps = (state: AppStateType) => {
    return {
        dialogElements: state.MessagePage.dialogsData
            .map(d => <DialogItem name={d.name} id={d.id} key={d.id} />),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { ...actions }),
    withAuthRedirect
)(Messages);



//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 