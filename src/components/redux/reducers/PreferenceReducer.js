const defaultState = {
    paused : false,
    status : "normal",
    subId : undefined,
}

const preferenceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'MUSIC_STATE_CHANGE':
            console.log("Redux detects user request music state change")
            return {
                ...state,
                paused : !state.paused
            }
        case 'MUSIC_CHANGE':
            console.log("Redux detects user request music change")
            return {
                ...state,
                music : action.music
            }
        case 'MUSIC_CHANGE_ERROR':
            alert("Error in changing music: ", action.err.message)
            console.error(action)
            return {
                ...state,
            }
        case 'MUSIC_LOAD_ERROR':
            console.log("Redux detects music load error")
            return {
                ...state, 
                status : "unable to load"
            }
        case 'MUSIC_START':
            console.log("Redux detects new music started")
            return {
                ...state, 
                status : "normal"
            }
        case 'SUB':
            console.log("Subscription added")
            return {
                ...state,
            }
        case 'SUB_CHANGE':
            console.log('Subscription changed')
            return {
                ...state,
            }
        case 'SUB_ERROR':
            alert("Subscription error")
            return {
                ...state
            }
        case 'SUB_CHANGE_ERROR':
            alert(action.err.message)
            return {
                ...state
            }
        case 'SUB_RES':
            return {
                ...state,
                subId : action.subId
            }
        case 'RESET_SUB':
            return {
                ...state,
                subId : undefined
            }
    }
    return state
}



export default preferenceReducer;