import { ACTION_TYPE } from "../types";

export const user_initial = {
    loading:false,
    data: {
        "company":"",
        "admin_email":"",
        "address":"",
        "city":"",
        "state":"",
        "domain_state":"",
        "domain_name":"",
        "logo":null,
        "tagline":"",
        "content":null,
        "overview":"",
        "digital_service":"",
        "note":""
    },
    success:false,
    error: false,
    msg:""
}

export const UserReducer = (state, action) => {
    switch(action.type){
        case ACTION_TYPE.USER_FIELD:
        return {
            ...state,
            error:false,
            data: {...state.data, [action.payload.name]:action.payload.value, 'client_id':action.payload.client}
        }
        case ACTION_TYPE.USER_START:
            return {
                ...state,
                loading:true
            }
        case ACTION_TYPE.USER_SUCCESS:
            return {
                ...state,
                loading:false,
                data:user_initial,
                success:true
            }
        case ACTION_TYPE.USER_ERROR:
            return {
                ...state,
                loading:false,
                error:true,
                msg:action.payload.msg
            }
        default: 
            return state
    }
}