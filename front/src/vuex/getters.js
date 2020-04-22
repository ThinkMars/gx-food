import state from "./state"

// 获取状态的方法
const getters = {
    isLogined: state => state.logined,
    userInfo: state => state.userInfo,
    userAuthList: state => state.userAuthList
}
export default getters