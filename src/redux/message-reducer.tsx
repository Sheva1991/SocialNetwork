import { InferActionsType } from './redux-store';

let initialState = {
    // messages 
    dialogsData: [
        { id: 'Vadim', name: 'Vadim' },
        { id: 'Liza', name: 'Liza' },
        { id: 'Peter', name: 'Peter' },
        { id: 'Serge', name: 'Serge' }
    ] as Array<dialogType>,
    // messages-dialogs-liza 
    dialogDataLiza: [
        { id: 1, message: 'HI' },
        { id: 2, message: 'Hi Vadimessage' },
        { id: 3, message: 'Hi Liza! How are u?' },
        { id: 4, message: 'ty, all ok. and u?' },
        { id: 5, message: "i'm too fine." },
    ] as Array<messageType>
};

const MessageReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case 'SN/MESSAGE/ADD-POST-LIZA':
            return {
                ...state,
                dialogDataLiza: [...state.dialogDataLiza, { id: state.dialogDataLiza.length + 1, message: action.newDialogText, count: 0 }]
            }
        default:
            return state;
    }
}

export const actions = {
    addPostLizaActionCreator: (newDialogText: string) => { return { type: 'SN/MESSAGE/ADD-POST-LIZA', newDialogText } as const }
}

export default MessageReducer;

type dialogType = {
    id: string | number,
    name: string
}

type messageType = {
    id: number,
    message: string
}

export type initialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>
