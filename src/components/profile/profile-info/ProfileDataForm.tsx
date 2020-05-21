import React from "react";
import s from './ProfileInfo.module.css';
import { InjectedFormProps, reduxForm } from "redux-form";
import style from "../../common/FormControls/FormControls.module.css";
import { profileType } from '../../../types/type';
import { GetStringKeys, Input, createField, Textarea } from '../../common/FormControls/FormControls';



type PropsType = {
    profile: profileType
}
type ProfileTypeKeys = GetStringKeys<profileType>

const ProfileDataForm: React.FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
        </div>

        <div>
            <b>My professional skills</b>:
            {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>


        <div>
            <b>About me</b>:
            {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    {/* todo: create some solution for embedded objects */}
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<profileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;
