import ProfileReducer from "./profile-reducer";
import MessageReducer from "./message-reducer";

let store = {
    _state: {
        ProfilePage: {
            // myposts 
            postData: [
                { id: 1, count: 4, message: 'My first post' },
                { id: 2, count: 7, message: 'My name is Vlad' },
                { id: 3, count: 9, message: 'My name is Vlad' },
                { id: 4, count: 1, message: 'My name is Vlad' },
            ],
            newPostText: ""
        },
        MessagePage: {
            // messages 
            dialogsData: [
                { id: 'Vadim', name: 'Vadim' },
                { id: 'Liza', name: 'Liza' },
                { id: 'Peter', name: 'Peter' },
                { id: 'Serge', name: 'Serge' }
            ],
            // messages-dialogs-liza 
            dialogDataLiza: [
                { id: 1, message: 'HI' },
                { id: 2, message: 'Hi Vadimessage' },
                { id: 3, message: 'Hi Liza! How are u?' },
                { id: 4, message: 'ty, all ok. and u?' },
                { id: 5, message: "i'm too fine." },
            ],
            newDialogText: ""
        }
    },
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { // {type: 'ADD-POST'}

        ProfileReducer(this._state.ProfilePage, action);
        MessageReducer(this._state.MessagePage, action);

        this._callSubscriber(this._state);

    }

}


export default store;
window.store = store;