/**
 * 发布订阅模式 Subscribe To Publish
 *      发布订阅模式是面向对象中的设计模式之一，在各类高级编程语言中都适用！！
 *      Redux库 也是基于发布订阅原理来实现的。
 */

// 最简 发布订阅模式 调度中心
class Stp {
    constructor() {
        this.events = [];
    };

    // 订阅方法
    subscribe(callback) {
        // 将每次订阅的回调函数保存起来，到发布的时候在执行。
        this.events.push(callback);
    };

    // 发布方法
    publish(msg) {
        this.events.forEach(callback => {
            // 遍历执行回调
            callback && callback(msg);
        });
    };
}

const bus = new Stp();

export default bus;


/*

// 调用方法： 先订阅，后发布！！

// 订阅者
bus.subscribe((msg) => {
    console.log('订阅者1', msg);
});

bus.subscribe((msg) => {
    console.log('订阅者2', msg);
});

bus.subscribe((msg) => {
    console.log('订阅者3', msg);
});


// 发布者
bus.publish('发布者1');

// 异步发布者
setTimeout(() => {
    bus.publish('异步发布者');
}, 2000);

*/
