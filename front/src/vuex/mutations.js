import storage from "../utils/storage.js"

// 改变状态的方法，分发
const mutations = {
    LOGIN(state, data) { // 登录后对用户信息进行处理
        // 然后去Storage取用户数据
        let user = storage.get("user")
        // console.log(user)
        if (user) {
            // console.log(123)
            state.logined = true
            // 再把用户数据发下去
            state.userInfo = user
            state.userAuthList = [user.auth_num]
        }

    }
}

export default mutations