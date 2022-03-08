import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

let state = {
    isLogin: false
};


let getters = {

};

let actions = {

};

let mutations = {
    isLogin(state, value) {
        state.isLogin = value
    }
};

let store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store