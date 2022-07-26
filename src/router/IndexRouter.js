import React from 'react'
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandBox/NewsSandBox'
export default function IndexRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" render={()=>
                    localStorage.getItem("token")?<NewsSandBox/>:<Redirect to='/login'/>
                } />
            </Switch>
            
        </HashRouter>
    )
}
