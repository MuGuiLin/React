// let goods = [{
//     id: 1,
//     name: '苹果 - Apple',
//     rmb: 9.80
// }]

// export default (state = goods, action) => {
//     switch(action.type) {
//         case 'ADD-GOODS':
//             return [...state, {
//                 id: ++goods.length,
//                 name: action.data.name,
//                 rmb: (Math.random() * 100).toFixed(2)
//             }]
//         default:
//             return state;
//     };
// };



let goods = {
    fruit: [
        {
            id: 1,
            name: '苹果 - Apple',
            rmb: 9.80
        },
        {
            id: 2,
            name: '香蕉 - Banana',
            rmb: 5.6
        }
    ],
    snack: [
        {
            id: 1,
            name: '香瓜子 - Melon Seeds',
            rmb: 12.5
        },
        {
            id: 2,
            name: '胼干 - Hangan',
            rmb: 16
        },
        {
            id: 3,
            name: '可乐 - Coke',
            rmb: 5.3
        }
    ]
}

export default (state = goods, action) => {

    switch (action.type) {
        case 'ADD-GOODS-TYPE':
            return { ...state, ...action.data }

        case 'ADD-GOODS-DATA':
            return { ...state, ...action.data }

        case 'UP-GOODS-DATA':

            return { ...state, ...action.data }
            // return {
            //     ...state, ...[
            //         ...state.boods, {
            //             id: ++goods.length,
            //             name: action.data.name,
            //             rmb: (Math.random() * 100).toFixed(2)
            //         }

            //     ]
            // }
        default:
            return state;
    };
};