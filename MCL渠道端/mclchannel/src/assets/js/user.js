import router from '@/router/index.js' // 路由
import {PATIENTURL} from '@/configURL.js'

export function logout(){
    localStorage.removeItem('userInfo')
    // 开发模式
    if (process.env.NODE_ENV == 'development') {
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.name == 'login' ? '/': router.currentRoute.fullPath // 从哪个页面跳转
             }
        })
    // 正式环境 跳转到患者的登录页面    
    } else {
        location.replace(`${PATIENTURL}#login?redirect=${router.currentRoute.name == 'login' ? '/': router.currentRoute.fullPath}`)
    }
}

// 获取用户类型
export function getUserType(){
    let userInfo = localStorage.getItem('userInfo')
    if(userInfo){
        userInfo = JSON.parse(userInfo)
        // 患者端
        if((userInfo.UserType == 1) || (userInfo.UserType == 2) || (userInfo.UserType == 3)){
            return 'patient'
        // 渠道端
        }else if((userInfo.UserType == 5) || (userInfo.UserType == 6) || (userInfo.UserType == 7) || (userInfo.UserType == 8)){
            return 'channel'
        //医生端    
        }else if(userInfo.UserType == 4){
            return 'doctor'
        }
    }else{
        logout()
    }
}

// 跳转到系统首页
export function goHome() {
    // 开发模式
    if (process.env.NODE_ENV == 'development') {
        router.replace({path: '/'})
    // 正式环境 跳转到患者的登录页面    
    } else {
        location.href = `${PATIENTURL}#/`
    }
}