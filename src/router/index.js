import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import MyDev from '@/components/MyDev/MyDev'
import Register from '@/components/Register/Register'
import DevInfo from '@/components/DevInfo/DevInfo'
import Camera from '@/components/Camera/Camera'
import Cpu from '@/components/Cpu/cpu'
import CpuDount from '@/components/Cpu/cpudount'
// import AddDev from '@/components/MyDev/AddDev'
import CpuIdle from '@/components/Cpu/cpuidle'
import CpuGroup from '@/components/Cpu/cpugroup'
import CpuIrqGroup from '@/components/Cpu/cpuirqgroup'
import CpuIrq from '@/components/Cpu/cpuirq'
import CpuNettxIrq from '@/components/Cpu/cpunettxirq'   
import CpuNetrxIrq from '@/components/Cpu/cpunetrxirq' 
import CpuTaskletIrq from '@/components/Cpu/cputaskletirq' 
import CpuHrtimerIrq from '@/components/Cpu/cpuhrtimerirq' 
import CpuAvgload from '@/components/Cpu/cpuavgload' 
import ProcrankFreevspie from '@/components/Cpu/procrankfreevspie'
import ProcrankPsspie from '@/components/Cpu/procrankpsspie'
import IoStat from '@/components/Cpu/iostat'
import LineStyle from '@/components/Cpu/linestyle'
import PieStyle from '@/components/Cpu/piestyle'
import Sonar from '@/components/Sonar/Sonar'
import Gesture from '@/components/Sonar/Gesture'
import Laser from '@/components/Sonar/Laser'
import Mapp from '@/components/Camera/map'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/mydev/:id',
      name:'MyDev',
      meta:{
        requireAuth:true,
      },
      component:MyDev
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/devinfo/:id',
      name:'DevInfo',
      component:DevInfo
    },
    {
      path:'/camera',
      name:'Camera',
      component:Camera
    },
    {
      path:'/sonar',
      name:'Sonar',
      component:Sonar
    },
    {
      path:'/cpudount',
      name:'CpuDount',
      component:CpuDount
    },
    // {
    //   path:'/adddev',
    //   name:'AddDev',
    //   component:AddDev
    // },
    {
      path:'/cpuidle',
      name:'CpuIdle',
      component:CpuIdle
    },
    {
      path:'/cpugroup',
      name:'CpuGroup',
      component:CpuGroup
    },
    {
      path:'/cpuirqgroup',
      name: 'CpuIrqGroup',
      component:CpuIrqGroup
    },
    {
      path:'/cpuirq',
      name: 'CpuIrq',
      component:CpuIrq
    },
    {
      path:'/cpu',
      name: 'Cpu',
      component:Cpu
    },
    {
      path:'/cpunettxirq',
      name:'CpuNettxIrq',
      component:CpuNettxIrq
    },
    {
      path:'/cpunetrxirq',
      name:'CpuNetrxIrq',
      component:CpuNetrxIrq
    },
    {
      path:'/cputaskletirq',
      name:'CpuTaskletIrq',
      component:CpuTaskletIrq
    },
    {
      path:'/cpuhrtimerirq',
      name:'CpuHrtimerIrq',
      component:CpuHrtimerIrq
    },
    {
      path:'/cpuavgload',
      name:'CpuAvgload',
      component:CpuAvgload
    },
    {
      path:'/procrankfreevspie',
      name:'ProcrankFreevspie',
      component:ProcrankFreevspie
    },
    {
      path:'/procrankpsspie',
      name:'ProcrankPsspie',
      component:ProcrankPsspie
    },
    {
      path:'/iostat',
      name:'IoStat',
      component:IoStat
    },
    {
      path:'/piestyle',
      name:'PieStyle',
      component:PieStyle
    },
    {
      path:'/linestyle',
      name:'LineStyle',
      component:LineStyle
    },
    {
      path:'/laser',
      name:'Laser',
      component:Laser
    },
    {
      path:'/gesture',
      name:'Gesture',
      component:Gesture
    },
    {
      path:'/map',
      name:'Map',
      component:Mapp
    },
   
  ]
})
