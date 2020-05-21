import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validadtor/validator';
import { Textarea, createField } from '../../../common/FormControls/FormControls';
import Message from '../../Message/Message';
import liz from './Liza.module.css';
import { PostType } from '../../../../types/type';


export type MapPropsType = {
    postLiza: Array<PostType>
}
export type DispatchPropsType = {
    addPostDialog: (newDialogText: string) => void
}

const Liza: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let messages = props.postLiza.map(mes => <Message m={mes.message} key={mes.id} />)

    let onAddPostDialog = (value: DialogFormValuesType) => {
        props.addPostDialog(value.newDialogText);
    }

    return (
        <div className={liz.item}>
            {messages}
            <DialogReduxForm onSubmit={onAddPostDialog} />
        </div>
    )
}

export type DialogFormValuesType = {
    newDialogText: string
}
type OwnPropsType = {}

export type DialogFormValuesTypeKeys = Extract<keyof DialogFormValuesType, string>

const maxLength100 = maxLengthCreator(100)

const DialogForm: React.FC<InjectedFormProps<DialogFormValuesType, OwnPropsType> & OwnPropsType> = (props) => {

    return (<form onSubmit={props.handleSubmit}>
        <div>
            {createField<DialogFormValuesTypeKeys>('Enter your message', 'newDialogText', [required, maxLength100], Textarea)}
            {/* <Field component={Textarea} name="newDialogText" placeholder='Enter your message' validate={[required, maxLength100]} /> */}
            <button>Add post</button>
        </div>
    </form>
    )
}

export const DialogReduxForm = reduxForm<DialogFormValuesType, OwnPropsType>({
    // a unique name for the form
    form: 'post'
})(DialogForm)

export default Liza;
