import React, { ChangeEvent, useState } from 'react';
import pfi from './ProfileInfo.module.css'
import Preloader from '../../common/loader/preloader';
import style from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { profileType, ContactsType } from '../../../types/type';
import ProfileDataForm from "./ProfileDataForm";

const userPthoto = require('../../../assets/img/usersAva.jfif')

type PropsType = {
    profile: profileType | null,
    isOwner: boolean,
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: profileType) => {
        // todo: remove then
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }
    return (
        <div className={pfi.avatar}>
            <div className={pfi.description}>
                <div>
                    <img src={props.profile.photos.large || userPthoto} alt='ava' className={pfi.ava} />
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                </div>

                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                    : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />}

            </div>
        </div >
    )
}

type ProfileDataPropsType = {
    profile: profileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return <div className={pfi.desc}>
        {isOwner && <div className={pfi.edit}><button className={pfi.editBtn} onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {
                Object
                    .keys(profile.contacts)
                    .map((key) => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                    })}
        </div>
    </div>
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={style.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 