let goods = [{
    id: 1,
    name: '苹果 - Apple',
    rmb: 9.80
}]

export default (state = goods, action) => {
    switch(action.type) {
        case 'ADD_GOODS':
            return [...state, {
                id: ++goods.length,
                name: action.payload.name,
                rmb: (Math.random() * 100).toFixed(2)
            }]
        default:
            return state;
    };
};