import Vue from "vue"
import Router from "vue-router"
import main from "../components/layout/main.vue"
Vue.use(Router)

// 解决首页路由跳转的时候同一个路由多次添加，未跳转完成就重复跳转
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router ({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[
        {
            path: "/",
            name:"home",
            component:main,
            redirect:"/index",
            meta:{
				name:"主页",
            },
            children:[
                {
					path:"/index",
					name:"homepage",
					component:() => import("@/views/index"),
					meta:{
						name:"主页主区"
                    }
                },
                {
                    path: "/index/foodDetail",
                    name: "foodDetail",
                    component:() => import("@/views/food/foodDetail"),
                    meta: {
                        name: "美食详情"
                    }
                },
                {
                    path: "/index/storyDetail",
                    name: "storyDetail",
                    component:() => import("@/views/story/storyDetail"),
                    meta: {
                        name: "故事详情"
                    }
                }
            ]
        }
    ]
})