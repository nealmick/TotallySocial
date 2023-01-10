import React,{useEffect,useState} from 'react'
import {apiProfileDetail, apiProfileFollowToggle,apiGetConversation} from './lookup'
import {UserDisplay,UserPicture,UserPictureProfile,UserPictureProfileSmall} from './components'
import {DisplayCount} from './utils'
function ProfileBadge(props){
    const {user, didFollowToggle,profileLoading} = props
    let currentVerb =( user && user.is_following) ? "Unfollow":"Follow"
    currentVerb = profileLoading ? "Loading..." :currentVerb
    const handleFollowToggle = (event) =>{
        event.preventDefault()

        if(didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }
    }
    const handleMessage = (event) =>{
        var getredirect = (response,status) =>{
            console.log(response, status)
            if (status===200){
                window.location.href = '/conversation/'+response+'/'
            }
    
            }
            apiGetConversation(getredirect)
        }

    return user ? <div className="row">
        <div className="col-3" id="profile_pic"style={{minWidth:"230px",maxWidth:"230px"}}>
        <UserPictureProfile user={user} hideLink/>
        </div>
        <div id="profile_info"className="col-6 mx-2">
            <h1 className='mb-0'>{user.first_name} {user.last_name}</h1>
            <p className='mb-0'><UserDisplay user={user} hideLink/></p>
            <p className='mb-0'>Followers: <DisplayCount>{user.follower_count}</DisplayCount> </p>
            <p className='mb-0'>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
            <p className='mb-2'>Status: {user.status}</p>


            <button onClick={handleFollowToggle} className='btn btn-primary'>{currentVerb}</button>
            <button onClick={handleMessage} className='btn btn-outline-primary mx-1' >Message</button>
            </div>
            

        </div> : null
}
export function ProfileBadgeComponent(props){
    const {username} = props
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response,status) =>{
        if(status === 200){
            setProfile(response)
        }
    }
    useEffect(()=>{
        if(didLookup === false){
            apiProfileDetail(username,handleBackendLookup)
            setDidLookup(true)
        }
    },[username,didLookup,setDidLookup])
    const handleNewFollow = (actionVerb) =>{
        apiProfileFollowToggle(username,actionVerb,(response, status)=>{
            if(status === 200){
                setProfile(response)
                //apiProfileDetail(username,handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
    
    return  didLookup===false? "loading...":<ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/>
}

export function ProfileBadgeComponentSmall(props){
    const {username} = props
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response,status) =>{
        if(status === 200){
            setProfile(response)
        }
    }
    useEffect(()=>{
        if(didLookup === false){
            apiProfileDetail(username,handleBackendLookup)
            setDidLookup(true)
        }
    },[username,didLookup,setDidLookup])
    const handleNewFollow = (actionVerb) =>{
        apiProfileFollowToggle(username,actionVerb,(response, status)=>{
            if(status === 200){
                setProfile(response)
                //apiProfileDetail(username,handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
    
    return  didLookup===false? "loading...":<ProfileBadgeSmall user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/>
}



function ProfileBadgeSmall(props){
    const {user, didFollowToggle,profileLoading} = props
    let currentVerb =( user && user.is_following) ? "Unfollow":"Follow"
    currentVerb = profileLoading ? "Loading..." :currentVerb
    const handleFollowToggle = (event) =>{
        event.preventDefault()

        if(didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }
    }
    const handleMessage = (event) =>{
        var getredirect = (response,status) =>{
            console.log(response, status)
            if (status===200){
                window.location.href = '/conversation/'+response+'/'
            }
    
            }
            apiGetConversation(getredirect)
        }

    return user ? <div className=""style={{display:"flex"}}>
        <div className="" style={{flex:"1",maxWidth:"50px",minWidth:"50px",marginTop:"5px"}}>
        <UserPictureProfileSmall user={user}/>
        </div>
        <div className="col-3 mx-2" style={{flex:"1",minWidth:"82%",maxWidth:"82%"}}>
            <div style={{marginTop:"8px"}}> 
            
            <UserDisplay user={user}  includeFullName/>
            </div>
        </div>
            

        </div> : null
}