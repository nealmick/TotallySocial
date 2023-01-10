import React from 'react';
export function UserLink(props){
    const {username} = props
    const handleUserLink = (event) =>{
        window.location.href = `/profile/${username}`
    }
    return <span className="pointer" onClick={handleUserLink} >
    {props.children}
    </span>
} 
export function UserDisplay(props){
    const {user, includeFullName,hideLink} = props
    const nameDisplay = includeFullName===true?`${user.first_name} ${user.last_name} `:null
    const handleUseLink = (event) =>{
        window.location.href = `/profile/${user.username}`
    }
    return <React.Fragment >
    {nameDisplay} {hideLink === true ? `@${user.username}` :<UserLink username={user.username} onClick={handleUseLink}>@{user.username}</UserLink>}
    
    
    </React.Fragment>
}
export function UserPicture(props){
    const {user, hideLink} = props

    const userProfilePic = <img className="mx-1 rounded-circle " style={{height:'30px',width:'40px'}} src={'https://totally.social/media/profile_pics/'+user.imagepath}></img>
    return hideLink === true ?userProfilePic: <UserLink username={user.username}>{userProfilePic}</UserLink>
}       
export function UserPictureProfile(props){
    const {user, hideLink} = props

    const userProfilePic = <img className="mx-1 rounded-circle " style={{height:'175px',width:'220px',marginTop:"12px"}} src={'https://totally.social/media/profile_pics/'+user.imagepath}></img>
    return hideLink === true ?userProfilePic: <UserLink username={user.username}>{userProfilePic}</UserLink>
}       

export function UserPictureProfileSmall(props){
    const {user, hideLink} = props

    const userProfilePic = <img className="mx-1 rounded-circle " style={{height:'30px',width:'45px'}} src={'https://totally.social/media/profile_pics/'+user.imagepath}></img>
    return hideLink === true ?userProfilePic: <UserLink username={user.username}>{userProfilePic}</UserLink>
}       

export function UserPictureProfileMessage(props){
    const {user, hideLink} = props

    const userProfilePic = <img className="mx-1 rounded-circle " style={{height:'100px',width:'150px'}} src={'https://totally.social/media/profile_pics/'+user.imagepath}></img>
    return hideLink === true ?userProfilePic: <UserLink username={user.username}>{userProfilePic}</UserLink>
}       