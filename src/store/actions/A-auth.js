import * as actionTypes from './actionType'
import Axios from 'axios'



export const authJustStart=()=>{
    return{
        type:actionTypes.AUTH_JUST_START
    }
}
export const authSucces=(idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId,
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}
export const logout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const sessionTimeOut=(time)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(logout())
        }, time*1000);
    }
}

export const authDispatch=(email,password,isSingUp)=>{
    return dispatch=>{
        dispatch(authJustStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaT1ToZvBT6iqNGVgun5B6mdjqHYuUnhw'
        if(!isSingUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaT1ToZvBT6iqNGVgun5B6mdjqHYuUnhw'
        }
        Axios.post(url,authData).then(response=>{
            // console.log(response);
            //SETTING TOKEN , LOCALID & EXPRIRETIME IN LOCSTORAGE 
            const expiryDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expiryDate',expiryDate)
            localStorage.setItem('userId',response.data.localId)
            
            dispatch(authSucces(response.data.idToken,response.data.localId))
            dispatch(sessionTimeOut(response.data.expiresIn))
        }).catch(err=>{
            dispatch(authFail(err))
        })
    }
}

export const authRedirect=(path)=>{
    return {
        type:actionTypes.AUTH_REDIRECT,
        path:path,
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }
        else{
            const expiryDate=new Date(localStorage.getItem('expiryDate'))
            const userId=localStorage.getItem('userId')
            if(new Date() >= expiryDate){
                dispatch(logout())
            }
            else
            {
                dispatch(authSucces(token,userId))
                dispatch(sessionTimeOut((expiryDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}