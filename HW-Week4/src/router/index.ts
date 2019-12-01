import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)


const routes = [
	{
		path: '*', // 隨意輸入的路由
		redirect: '/' // 重新導回首頁
	},
	{
		path: '/',
		component: () => import('@/views/Main.vue'),
		children: [
			{
				path: '',
				name: '首頁',
				component: () => import('@/views/Home.vue')
			},
			{
				path: 'subject',
				name: '科目管理',
				component: () => import('@/views/SubjectManage.vue')
			},
			{
				path: 'student',
				name: '學生管理',
				component: () => import('@/views/StudentManage.vue')
			},
			{
				path: 'account',
				name: '帳號管理',
				component: () => import('@/views/AccountManage.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue')
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	// to and from are both route objects. must call `next`.
	switch (to.path) {
		case '/':
			if (store.getters['myModule/getLoginStatus']) {
				next();
				break;
			}
			next('/login');
			break;
		default:
			next();
			break;
	}
})

export default router
