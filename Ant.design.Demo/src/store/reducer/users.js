let users = sessionStorage.getItem('users')?JSON.parse(sessionStorage.getItem('users')):{};
let type = sessionStorage.getItem('type')?JSON.parse(sessionStorage.getItem('type')):{};
let menu = sessionStorage.getItem('menu')?JSON.parse(sessionStorage.getItem('menu')):{};

const defaultState  = {
    users,
    type,
    menu
}

export default (state = defaultState,action)=>{
    if (action.type==='change_input_value'){
        console.log(action.value)
        sessionStorage.setItem('users', JSON.stringify(action.value));
        return {...state, ...{users: action.value}};
    }else if (action.type==='change_type_value') {
        sessionStorage.setItem('type', JSON.stringify(action.value));
        return {...state, ...{type: action.value}};
    }else if (action.type==='change_menu_value') {
        sessionStorage.setItem('menu', JSON.stringify(action.value));
        return {...state, ...{menu: action.value}};
    }else{
        return state;
    }     
}