

import React from 'react';
import {apiPostAction} from'./lookup'
export function ActionBtn(props){
    const {post,action,didPerformAction} = props
    const likes = post.likes ? post.likes : 0

    const className = props.className ? props.className : "btn btn-primary btn-sm"
    const actionDisplay = action.display ? action.display : 'Action'

    const handleClick = (event) =>{
        event.preventDefault()
        const handleActionBackendEvent = (response,status)=>{
            console.log(response,status)
            if((status === 200||status===201)&& didPerformAction){
                didPerformAction(response,status)
                if(action.type ==="repost"){
                    window.location.href = "/"
                }
            }

        }
        apiPostAction(post.id,action.type,handleActionBackendEvent)
        
    }
    const display = action.type === 'like' ? `${likes} ` : actionDisplay
    if(action.type === 'like'){
        return <button className={className} onClick={handleClick}>{display}  <i class="fas fa-thumbs-up" style={{marginLeft:"5px",marginTop:"4px"}}></i></button>
    }
    if(action.type === 'unlike'){

 
        return <button className={className} onClick={handleClick}><i class="far fa-thumbs-down" style={{margniLeft:"2px",marginTop:"7px"}}></i></button>
    }<i class="fas fa-redo-alt"></i>
    if(action.type === 'repost'){
        return <button className={className} onClick={handleClick}><i class="fas fa-redo-alt" style={{marginLeft:"2px",marginTop:"5px"}}></i></button>
    }
    return <button className={className} onClick={handleClick} style={{marginLeft:"2px",marginTop:"5px"}}>{display}</button>

    }