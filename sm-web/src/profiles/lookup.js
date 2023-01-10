
import {backendLookup} from '../lookup'



export function apiProfileDetail(username,callback){

    backendLookup("GET",`/profile/${username}/`,callback)
  
    }

export function apiProfileFollowToggle(username,action,callback){
    const data = {action:`${action && action}`.toLowerCase()}
    backendLookup("POST",`/profile/${username}/follow/`,callback,data)
    
    }

export function apiGetConversation(callback){
    var username = ''
    var x = window.location.href.split('/')
    var username =x[x.length-1]
    console.log(username)
    backendLookup("GET",`/posts/conversations/${username}`,callback)
    
    }
        