import React from 'react';
// import pf from './Profile.module.css'
import ProfileInfo from './profile-info/ProfileInfo';
import MyPostsContainer from './myposts/mypostsContainer';
import { profileType } from '../../types/type';


type PropsType = {
    profile: profileType | null,
    isOwner: boolean,
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                updateStatus={props.updateStatus} isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile;

//Важно! для двух классов кавычки наклонные `${pf.item} ${pf.first}` 