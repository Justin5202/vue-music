import Vue from 'vue'
import Router from 'vue-router'

const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    //首页
    {
    	path: '/recommend',
    	component: Recommend
    },
    //歌手
    {
    	path: '/singer',
    	component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    //排行
    {
    	path: '/rank',
    	component: Rank
    },
    //搜索
    {
    	path: '/search',
    	component: Search
    }
  ]
})
