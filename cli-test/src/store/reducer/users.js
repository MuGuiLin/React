// 用户默认数据，可以假设为存在localStorage中的数据一样
let userInit = [
    {
        id: 1,
        username: 'root',
        password: '123'
    },
    {
        id: 2,
        username: 'admin',
        password: '666'
    },
    {
        id: 3,
        username: 'guest',
        password: '888'
    }
];

// 如果state中没有数据传过来时，默认值就是上面的initData中的值
function userData( state = userInit, action) {
    switch (action.type) {
        // case value:
            
        //     break;
    
        default:
            return state
            break;
    }

}
export default userData