
import React,{useEffect,useState} from 'react';
import {apiPostList,apiPostSearch} from'./lookup'
import{Post} from './detail'
export function PostList(props){
    const[postsInit, setPostsInit] = useState([])
    const[posts, setPosts] = useState([])
    const[nextUrl, setNextUrl] = useState(null)
    const[postsDidSet, setPostsDidSet] = useState(false)
    useEffect(()=>{
        let final = [...props.newPosts].concat(postsInit)
        if(final.length !== posts.length){
            setPosts(final)
        }
    },[props.newPosts,posts,postsInit])
    useEffect(() =>{
      if(postsDidSet === false){

      
        const handlePostListLookup = (response,status) =>{
        console.log(response, status)
        if (status===200){
            setNextUrl(response.next)
            setPostsInit(response.results)
            setPostsDidSet(true)

        }

        }
        apiPostList(props.username,handlePostListLookup)
    }
    },[postsInit,postsDidSet,setPostsDidSet,props.username])

    const handleDidRepost = (newPost) =>{
        const updatePostsInit = [...postsInit]
        updatePostsInit.unshift(newPost)
        setPostsInit(updatePostsInit)
        const updateFinalPosts = [...posts]
        updateFinalPosts.unshift(posts)
        setPosts(updateFinalPosts)


    }
    const handleLoadNext = (event) =>{
        event.preventDefault()
        if(nextUrl !== null){
            const handleLoadNextResponse = (response, status) =>{
                if (status===200){
                    setNextUrl(response.next)
                    const newPosts = [...posts].concat(response.results)
                    setPostsInit(newPosts)
                    setPosts(newPosts)
        
                }
            }
            apiPostList(props.ussername,handleLoadNextResponse,nextUrl)

        }
    }
    return <React.Fragment>
        {posts.map((item, index)=>{
      return <Post  
       post={item}
       didRepost = {handleDidRepost}
       style={{"border-radius": "0px"}}
       className="col-lg-12 my-5 py-5 border bg-white text-dark"
       key={`${index}-{item.id}`}/>
    })}
    { nextUrl !== null&&<center><button onClick={handleLoadNext}  id="load_more" className="btn btn-sm btn-outline-primary" style={{marginBottom:"15vh"}}>Load More</button></center>}
    </React.Fragment>
  }
 











  export function PostListSearch(props){
    const[postsInit, setPostsInit] = useState([])
    const[posts, setPosts] = useState([])
    const[nextUrl, setNextUrl] = useState(null)
    const[postsDidSet, setPostsDidSet] = useState(false)
    useEffect(()=>{
        let final = [...props.newPosts].concat(postsInit)
        if(final.length !== posts.length){
            setPosts(final)
        }
    },[props.newPosts,posts,postsInit])
    useEffect(() =>{
      if(postsDidSet === false){

      
        const handlePostListLookup = (response,status) =>{
        console.log(response, status)
        if (status===200){
            setNextUrl(response.next)
            setPostsInit(response.results)
            setPostsDidSet(true)

        }

        }
        apiPostSearch(handlePostListLookup)
    }
    },[postsInit,postsDidSet,setPostsDidSet])

    const handleDidRepost = (newPost) =>{
        const updatePostsInit = [...postsInit]
        updatePostsInit.unshift(newPost)
        setPostsInit(updatePostsInit)
        const updateFinalPosts = [...posts]
        updateFinalPosts.unshift(posts)
        setPosts(updateFinalPosts)


    }
    const handleLoadNext = (event) =>{
        event.preventDefault()
        
        if(nextUrl !== null){
            const handleLoadNextResponse = (response, status) =>{
                if (status===200){
                    setNextUrl(response.next)
                    const newPosts = [...posts].concat(response.results)
                    setPostsInit(newPosts)
                    setPosts(newPosts)
        
                }
            }
            apiPostSearch(handleLoadNextResponse,nextUrl)

        }
    }
    var search = window.location.href.split('/').slice(-1)
    return <React.Fragment>
        <h1>Searching for: {search}</h1>
        <hr></hr>
        {Object.keys(posts).length == 0 && <h1>No Results Found</h1>}
        {posts.map((item, index)=>{
      return <Post  
       post={item}
       didRepost = {handleDidRepost}
       style={{"border-radius": "0px"}}
       className="col-lg-12 mb-5 pb-5 border-bottom bg-white text-dark"
       key={`${index}-{item.id}`}/>
    })}
    { nextUrl !== null&&<center><button onClick={handleLoadNext}  id="load_more" className="btn btn-sm btn-outline-primary mb-5">Load More</button></center>}
    </React.Fragment>
  }
 