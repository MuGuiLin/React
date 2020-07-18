import React from 'react';

import Header from '../components/Header/Header';
import Router from '../router';
import Footer from '../components/Footer/Footer';

function App() {
    return (
        <section className="App">
            {/* 公共头部组件 */}
            <Header />

            {/* 集中管理路由 */}
            <Router />

            {/* 公共底部组件 */}
            <Footer />
        </section>
    );
};

export default App;
