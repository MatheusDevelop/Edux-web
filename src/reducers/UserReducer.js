const initialState = {
    id:'',
    idAll:'',
    role:'',
    nomeUser:'',
    logged:false,
    allData:{

    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGAR':
            return {...state,logged:true,id:action.payload.idUser,idAll:action.payload.idAll,role:action.payload.role,nomeUser:action.payload.nomeUser}
        case 'DESLOGAR':
            return{...state,logged:false}
        default:
            return state;
    }
};