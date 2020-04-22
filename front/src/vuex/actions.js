// 创建驱动action可以使得mutations得以启动
const actions = {
    // 需要用this.$store.dispatch("login")去触发
    // login(context) {
    //     context.commit('LOGIN')
    // }
     login({commit}, data) {
        commit('LOGIN', data)
    }
}

export default actions