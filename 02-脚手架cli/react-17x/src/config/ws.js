class ws {
    constructor() {
        this.init();
    };

    init() {
        setInterval(() => {
            this.on(666)
        }, 2000);
    }

    on(msg) {
        console.log(msg)
    }
}

export default new ws();