const items = [
    {
        id: 1,
        name: '沐枫',
        rmb: 28
    }
];

export default (state = items, action) => {

    switch (action.type) {
        case 'ADD-ITEMS':
            // 自动添加 id 和 rmb
            let redom = {
                id: state.length + 1,
                name: '',
                rmb: (Math.random() * 100).toFixed(2)
            }
            return [ ...state, {...redom, ...action.data}]

        default:
            return state;
    }
};
