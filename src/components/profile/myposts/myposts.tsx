import React from 'react';
import mps from './myposts.module.css';
import Post from './post/mypost';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validadtor/validator';
import { Textarea, createField, GetStringKeys } from '../../common/FormControls/FormControls';
import { PostType } from '../../../types/type';


export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {
    const AddNewMessage = (formData: MyPostsFormValuesType) => {
        // console.log(formData)
        props.addPost(formData.newPostText)
    }

    let posts = props.posts.map(p => <Post message={p.message} count={p.count} key={p.id} />)

    return (
        <div>
            <h3>my posts</h3>
            <PostReduxForm onSubmit={AddNewMessage} />
            {posts}
        </div>
    )
})

const maxLength30 = maxLengthCreator(30)

const MyPostsForm: React.FC<InjectedFormProps<MyPostsFormValuesType, MyPostsFormOwnPropsType> & MyPostsFormOwnPropsType> = (props) => {

    return (<form onSubmit={props.handleSubmit}>
        <div className={mps.item}>
            {createField<MyPostsValuesTypeKeys>('Enter your message', 'newPostText', [required, maxLength30], Textarea)}
            {/* <Field component={Textarea} name="newPostText" placeholder='Enter your message' validate={[required, maxLength30]} /> */}
            <button>Add post</button>
        </div>
    </form>
    )
}

const PostReduxForm = reduxForm<MyPostsFormValuesType, MyPostsFormOwnPropsType>({
    // a unique name for the form
    form: 'post'
})(MyPostsForm)

export default MyPosts;


type MyPostsFormOwnPropsType = {

}

type MyPostsFormValuesType = {
    newPostText: string
}

type MyPostsValuesTypeKeys = GetStringKeys<MyPostsFormValuesType>
