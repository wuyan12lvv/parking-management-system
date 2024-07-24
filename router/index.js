import VueRouter from 'vue-router';

const routes = [
    {
        path:'/',
        name:'login',
        component:()=>import('../components/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: ()=>import('../components/register.vue')
    },

    {
        path:'/Index',
        name:'index',
        component:()=>import('../components/Index'),
        children:[
            // {
            //     path:'/Home',
            //     name:'home',
            //     meta:{
            //         title:'首页'
            //     },
            //     component:()=>import('../components/Home')
            // },
            {
                path:'/Home',
                name:'home',
                meta:{
                    title:'个人中心'
                },
                component:()=>import('../components/Home')
            },
            {
                path:'/IndexMain',
                name:'indexMain',
                meta:{
                    title:'首页'
                },
                component:()=>import('../components/Index/IndexManage.vue')
            },
        ]
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export function resetRouter() {
    const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    router.matcher = new VueRouter({
        mode: 'history',
        routes: [...router.options.routes] // 使用现有的路由数组复制
    }).matcher
}
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export  default router;