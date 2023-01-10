import React,{useState} from 'react';
import { ActionBtn } from './buttons';
import {apiCommentCreate} from'./lookup'
import{
    UserDisplay,
    UserPicture,

}from'../profiles'
export function ParentPost(props){
    const {post} = props
    return post.parent ? <Post isRepost reposter={props.reposter}hideActions className={'mx-5'} post={post.parent}/>:null
}

function CommentCreate(props){
    const textAreaRef = React.createRef()
    const {post} = props
    const handleBackendUpdate = (response, status) =>{

        if(status===201){
            window.location.reload();

        }else{
            console.log(response)
        }

    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        const newVal = textAreaRef.current.value

        apiCommentCreate(post.id,newVal,handleBackendUpdate)
        console.log(post.id,newVal)
        textAreaRef.current.value = ''
    }
    return <div className={props.className} style={{marginTop:"32px","borderTop": "1px solid #CED4DA;",borderRight: "0px solid #CED4DA;",borderBottom: "0px solid #CED4DA;"}}>
            <form onSubmit={handleSubmit}>
                <input ref={textAreaRef} placeholder="New Comment" required={true}className="form-control"style={{"padding":"5px","border": "0px","shadow": "0px","resize":"none"}}>

                </input>

                <button type="submit" className="btn pull-right btn-outline-primary btn-sm" style={{position:"relative",float:"right",bottom:"35px",height:"35px",border: "none"}}>Post <i class="fas fa-edit"></i></button>
                <br></br>
            </form>
            </div>


}

function Comment(props){
    const {comment,post,className} = props
    let user = {}
    user['imagepath'] = comment[3]
    user['username'] = comment[1]
    return <div className={className} style={{borderTop:"1px solid #CED4DA",width:"100%"}}> <UserPicture user={user}/><UserDisplay user={user}/>: {comment[0]} <div style={{float: 'right',marginRight:'10px'}}>{comment[2]}</div></div>

}

function Comments(props){
    const {post} = props
    console.log(post)
    return <React.Fragment>{post.comments.map((item, index)=>{
        return <Comment  
            comment={item}
            post={post}
            className="my-2 py-2 bg-white text-dark"
            key={`${index}-{item.id}`}/>
      })}
      </React.Fragment>


}




export function Message(props){
    const {message} = props
    let className = ""

    return <div className={className} style={{width:"100%",padding:"10px",borderTop: "1px solid #CED4DA"}}>
                <div><UserPicture user={message.user}/> <UserDisplay user={message.user}/> : {message.content} <div className="text-muted"style={{float:"right",marginRight:"10px"}}>{message.timestamp}</div></div>
            </div>

}



export function Conversation(props){
    const {conversation} = props
    let className = ""
    const handleUseLink = (event) =>{
        window.location.href = `/conversation/${conversation.id}/`
    }
    return<div style={{}}>
        <hr></hr>
            <div id="a_conversation" onClick={handleUseLink} className={className} style={{marginTop:"1px",width:"99%",padding:"10px"}}>
            {conversation.otherUser === 'user1' && <div><UserPicture user={conversation.user1}/> @{conversation.user1.username} </div>}
            {conversation.otherUser === 'user2' && <div><UserPicture user={conversation.user2}/>@{conversation.user2.username} </div>}
            <div className='text-muted' style={{position:"relative",float:"right",right:"25px",bottom:"32px",height:"25px"}}>{conversation.timestamp}</div>
            </div>
            
            </div>


}




export function Post(props){
    const {post, didRepost,hideActions, isRepost,reposter,is_detail} = props
    const [actionPost , setActionPost] = useState(props.post?props.post:null)
    let className = props.className ? props.className : "mx-2"
    if(isRepost === true){
        className=`${className} mx-5`
    }
    //className+=' my-2'
    const path = window.location.pathname
    const match = path.match(/(?<postid>\d+)/)
    const urlPostId = match? match.groups.postid : -1





    
    const isDetail = `${post.id}` === `${urlPostId}`
    const handleLink = (event) =>{
        event.preventDefault()
        window.location.href = `/${post.id}`
    }
    const handlePerformAction = (newActionPost,status) =>{
        if(status === 200){
            setActionPost(newActionPost)

        }else if (status ===201){
            //let post list know
            if(didRepost){
                didRepost(newActionPost)
            }
        }
    }
    return <div className={className} >
            {isRepost === true && <div className="mb-2 ">
        <span className="small text-muted" >Repost <UserDisplay user={reposter}/></span>
        </div>}

        
        <div className='' style={{"height":'30px'}}>
            <UserPicture  style={{"width":'20px'}} user={post.user}/>
            <p className="d-inline" style={{marginTop:'3px'}}>
                <UserDisplay includeFullName user={post.user}/>

            </p>
        </div>



        <div>
        <div className='mx-2 my-1' >
            <p style={{marginLeft: "5px"}}>{post.content}</p>
            {post.imagepath ? <img className="" style={{maxHeight:'800px',maxWidth:'100%',height:'auto'}} src={'https://totally.social/media/images/'+post.imagepath}></img>:null}

            <ParentPost post={post} reposter={post.user} />
        </div>
        
        <div className="btn btn-group px-0 mx-2" >
        {(actionPost && hideActions !== true) &&<React.Fragment>
        <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:"like",display:"Likes"}}/>
        <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:"unlike",display:"Unlike"}}/>
        <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:"repost",display:"Repost"}}/>
        </React.Fragment>
        }
        {document.location.host.pathname === true? null:
        <button className='btn btn-sm btn-outline-primary'onClick={handleLink}>View</button>
        }
        </div>
        </div>


    {is_detail?<div id="createcomment" style={{marginTop:"10px"}}><CommentCreate post={post}/></div>:null}

    {is_detail?<Comments post={post}/>:null}
    

    

    </div>
    }

    




    export function PinnedPost(props){
        const {post, didRepost,hideActions, isRepost,reposter,is_detail} = props
        const [actionPost , setActionPost] = useState(props.post?props.post:null)
        let className = props.className ? props.className : "mx-0"
        if(isRepost === true){
            className=`${className} mx-5`
        }
        //className+=' my-2'
        const path = window.location.pathname
        const match = path.match(/(?<postid>\d+)/)
        const urlPostId = match? match.groups.postid : -1
    
    
    
    
    
        
        const isDetail = `${post.id}` === `${urlPostId}`
        const handleLink = (event) =>{
            event.preventDefault()
            window.location.href = `/${post.id}`
        }
        const handlePerformAction = (newActionPost,status) =>{
            if(status === 200){
                setActionPost(newActionPost)
    
            }else if (status ===201){
                //let post list know
                if(didRepost){
                    didRepost(newActionPost)
                }
            }
        }
        return <div className={className} >
                {isRepost === true && <div className="mb-2 ">
            <span className="small text-muted" >Repost <UserDisplay user={reposter}/></span>
            </div>}
    
            
            <div className='' style={{"height":'45px'}}>
                <UserPicture  style={{"width":'30px'}} user={post.user}/>
                <p className="d-inline" style={{marginTop:'5px'}}>
                    <UserDisplay includeFullName user={post.user}/>
    
                </p>
            </div>
    
    
    
            <div>
            <div className='mx-1 my-1' >
                <p style={{marginLeft: "5px"}}>{post.content}</p>
                {post.imagepath ? <img className="" style={{maxHeight:'800px',maxWidth:'100%',height:'auto'}} src={'https://totally.social/media/images/'+post.imagepath}></img>:null}
    
                <ParentPost post={post} reposter={post.user} />
            </div>
            
            <div className="btn btn-group px-0 mx-1" >

            {document.location.host.pathname === true? null:
            <button className='btn btn-sm btn-outline-primary'onClick={handleLink}>View</button>
            }
            </div>
            </div>
    
    
    
        
    
        </div>
        }
    
        
    
    
    
    