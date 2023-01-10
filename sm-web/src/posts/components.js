import React,{useState,useEffect} from 'react'
import { PostList,PostListSearch } from './list'
import {PostCreate} from './create'
import { apiPostDetail } from './lookup'
import{FeedList} from './feed'
import {Post,PinnedPost} from './detail'

import{ConversationList,MessageList} from './messages'


export function ConversationComponent(props){

    return <div className="">
        <ConversationList/>
        </div>

}



export function MessageComponent(props){

    return <div className="">
        <MessageList/>
        </div>

}


export function FeedComponent(props){
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === "false" ? false : true
    const handleNewPost = (newPost) =>{
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)

        setNewPosts(tempNewPosts)

    }
    return <div className={props.className}>
        {canPost === true &&
        <div className="">
        <PostCreate didPost={handleNewPost}className=""style={{borderLeft:'0px'}}/>
        </div> 
        }
        <div className="">
        <FeedList newPosts={newPosts} {...props}/>
        </div>
    </div>

}

export function SearchComponent(props){
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === "false" ? false : true
    const handleNewPost = (newPost) =>{
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)

        setNewPosts(tempNewPosts)

    }
    return <div className={props.className}>
        {canPost === true &&
        <div className="">
        <PostCreate didPost={handleNewPost}className=""style={{borderLeft:'0px'}}/>
        </div> 
        }
        <div className="">
        <PostListSearch newPosts={newPosts} {...props}/>
        </div>
    </div>

}


export function PostComponent(props){
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === "false" ? false : true
    const handleNewPost = (newPost) =>{
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)

        setNewPosts(tempNewPosts)

    }
    return <div className={props.className}>
        {canPost === true &&
        <PostCreate didPost={handleNewPost}className=""/>

        }
        <PostList newPosts={newPosts} {...props}/>
    </div>

}

export function ExploreComponent(props){
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === "false" ? false : true
    const handleNewPost = (newPost) =>{
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)

        setNewPosts(tempNewPosts)

    }
    return <div className={props.className}>
        {canPost === true &&
        <PostCreate didPost={handleNewPost}className=""/>

        }
        <h2>#Explore</h2>
        <PostList newPosts={newPosts} {...props}/>
    </div>

}
export function PostDetailComponent(props){
    const {postId} = props
    const [didLookup, setDidLookup] = useState(false)
    const [post, setPost] = useState(null)
    const handleBackendLookup = (response,status) =>{
        if(status === 200){
            setPost(response)
        }
    }
    useEffect(()=>{
        if(didLookup === false){
            apiPostDetail(postId,handleBackendLookup)
            setDidLookup(true)
        }
    },[postId,didLookup,setDidLookup])

    return post === null ? null: <Post post={post} is_detail={true} classname={props.className}/>
}



export function PostPinnedComponent(props){
    const {postId} = props
    const [didLookup, setDidLookup] = useState(false)
    const [post, setPost] = useState(null)
    const handleBackendLookup = (response,status) =>{
        if(status === 200){
            setPost(response)
        }
    }
    useEffect(()=>{
        if(didLookup === false){
            apiPostDetail(postId,handleBackendLookup)
            setDidLookup(true)
        }
    },[postId,didLookup,setDidLookup])

    return post === null ? null: <PinnedPost post={post} is_detail={false} classname={props.className}/>
}