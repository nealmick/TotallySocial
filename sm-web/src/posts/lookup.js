
import {backendLookup,backendLookupCreate} from '../lookup'



export function apiMessagesList(callback,nextUrl){
  let endpoint = '/posts/conversation/'
  var x = window.location.href.split('/')
  var id =x[x.length-2]
  endpoint = endpoint+id
  console.log(endpoint)

  backendLookup("GET",endpoint,callback)

  }

export function apiConversationList(callback,nextUrl){
  let endpoint = '/posts/conversations/'

  backendLookup("GET",endpoint,callback)

  }


export function apiPostCreate(newPost,file,callback){
  if (file){
    const formData = new FormData();
    formData.append('image', file);
    formData.append('content', newPost);
    console.log('withimage')
    backendLookupCreate("POST","/posts/create-post/",callback,formData)
  }else{
    console.log('without image')
    const formData = new FormData();
    formData.append('image', null);
    formData.append('content', newPost)
    backendLookup("POST","/posts/create-post/",callback,{content:newPost})

  }


}

export function apiMessageCreate(newMessage,callback){
  var x = window.location.href.split('/')
  var id =x[x.length-2]
  console.log('asdf',newMessage)
  backendLookup("POST",`/posts/create-message/`,callback,{'content':newMessage,content:newMessage,conversation:id})
}
export function apiCommentCreate(postId,newComment,callback){
  backendLookup("POST",`/posts/${postId}/comment/`,callback,{content:newComment})
}
export function apiPostAction(postId,action,callback){
  const data = {id:postId,action:action}
  backendLookup("POST","/posts/action/",callback,data)
  
  
}
export function apiPostFeed(callback,nextUrl){
  let endpoint = '/posts/feed/'
  if(nextUrl != null&&nextUrl !== undefined){
    endpoint = nextUrl.replace("http://totally.social/api","")
  }
  backendLookup("GET",endpoint,callback)

  }


export function apiPostSearch(callback,nextUrl){
  var search = window.location.href.split('/').slice(-1)
  console.log(search)
  let endpoint = `/posts/search/${search}`

  if(nextUrl != null&&nextUrl !== undefined){
    endpoint = nextUrl.replace("http://totally.social/api","")
  }
  backendLookup("GET",endpoint,callback)
  }

export function apiPostList(username,callback,nextUrl){
  let endpoint = '/posts/'
  if(username){
    endpoint = `/posts/?username=${username}`
  }
  if(nextUrl != null&&nextUrl !== undefined){
    endpoint = nextUrl.replace("http://totally.social/api","")
  }
  backendLookup("GET",endpoint,callback)

  }
  export function apiPostDetail(postId,callback){

    backendLookup("GET",`/posts/${postId}/`,callback)
  
    }
  