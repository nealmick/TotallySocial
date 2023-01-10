
import React,{useEffect,useState} from 'react';
import {apiPostFeed} from'./lookup'
import{Post} from './detail'
export function FeedList(props){
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
        if (status===200){
            setNextUrl(response.next)
            setPostsInit(response.results)
            setPostsDidSet(true)

        }

        }
        apiPostFeed(handlePostListLookup)
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
            apiPostFeed(handleLoadNextResponse,nextUrl)

        }
    }
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        console.log("bottom")
        
        if (bottom) { 
            console.log("bottom")
        }
     }
    return <React.Fragment>{posts.map((item, index)=>{
      return <Post  
       post={item}
       
       is_detail={false}
       didRepost = {handleDidRepost}
       className="my-3 py-4 border bg-white text-dark"
       key={`${index}-{item.id}`}/>
    })}
    { nextUrl !== null&&<center><button onClick={handleLoadNext}  id="load_more" style={{marginBottom:"20px"}}className="btn btn-sm btn-outline-primary">Load More...</button> </center>}
    </React.Fragment>
  }
 