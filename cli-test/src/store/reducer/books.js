
let bookInit = [
    {
        id: 1,
        name: 'HTML5权威指南',
        rmb: '89.9'
    },
    {
        id: 2,
        username: 'CSS3秘笈',
        password: '68.5'
    },
    {
        id: 3,
        username: 'JavaScript绿宝书',
        password: '100'
    }
];


function bookData( state = bookInit, action) {
    switch (action.type) {
        // case value:
            
        //     break;
    
        default:
            return state
            break;
    }

}
export default bookData