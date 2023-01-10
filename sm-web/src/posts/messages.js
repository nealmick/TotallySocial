
import React,{useEffect,useState} from 'react';
import{Conversation,Message} from './detail'
import{apiConversationList,apiMessagesList,apiMessageCreate} from './lookup'
import{
    UserDisplay,
    UserPicture,
    UserPictureProfileMessage

}from'../profiles'


export function ConversationList(props){
    const[conversationInit, setConversationInit] = useState([])
    const[conversations, setConversations] = useState([])
    const[conversationsDidSet, setconversationsDidSet] = useState(false)
    useEffect(() =>{
        if(conversationsDidSet === false){

        
        const handleConversationListLookup = (response,status) =>{
        console.log(response, status)
        if (status===200){
            setConversationInit(response)
            setConversations(response)
            setconversationsDidSet(true)
        }

        }
        apiConversationList(handleConversationListLookup)
    }
    },[conversationInit,conversationsDidSet,setconversationsDidSet,props.username])
    return <div className='mx-2'>
    
    <React.Fragment >
        <h2> Inbox</h2>
        {conversationInit.map((item, index)=>{
        return <Conversation  
        conversation={item}
        style={{"border-radius": "0px"}}
        className="col-lg-12 my-5 py-5 border bg-white text-dark"
        key={`${index}-{item.id}`}/>
    })}
    </React.Fragment>
    </div>
    }



export function MessageList(props){
    const[messageInit, setMessagesInit] = useState([])
    const[conversationInit, setConversationInit] = useState([])
    const[messages, setMessages] = useState([])
    const[conversation, setConversation] = useState([])
    const[messagesDidSet, setmessagesDidSet] = useState(false)
    var r = 0
    const textAreaRef = React.createRef()
    useEffect(() =>{
        if(messagesDidSet === false){

        
        const handleMessagesListLookup = (response,status) =>{
        console.log(response, status)
        if (status===200){
            setMessagesInit(response.messages)
            setMessages(response.messages)
            setConversationInit(response.conversation)
            setConversation(response.conversation)
            setmessagesDidSet(true)
        }

        }
        apiMessagesList(handleMessagesListLookup)
    }
    },[messageInit,messagesDidSet,setmessagesDidSet,conversationInit,props.username])
    const handleBackendUpdate = (response, status) =>{

        if(status===201){
            window.location.reload();

        }else{
            console.log(response)
        }

    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        const m = textAreaRef.current.value
        apiMessageCreate(m,handleBackendUpdate)
        textAreaRef.current.value = ''
    }

    return <div>

        {conversation.map((item, index)=>{

        return <div style={{display: "flex",justifyContent: 'center',alignItems: 'center',fontSize:"20px"}}>
            <center>
            {item.otherUser === 'user1' && <div><UserPictureProfileMessage user={item.user1}/><br></br><UserDisplay user={item.user1}/></div>}
            {item.otherUser === 'user2' && <div><UserPictureProfileMessage user={item.user2}/><br></br><UserDisplay user={item.user2}/></div>}
            </center>
            </div>
        
        })}    
    <div className='mx-2' style={{minHeight:"300px",maxHeight:"500px",overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection: "column-reverse"}}>
    
    <React.Fragment >
        
        {messageInit.map((item, index)=>{
        return <Message  
        message={item}
        style={{"border-radius": "0px"}}
        className="col-lg-12 my-5 py-5 border bg-white text-dark"
        key={`${index}-{item.id}`}/>
    })}
    </React.Fragment>

    
    </div>

    <div style={{width:"100%",padding:"10px"}}>
    <form onSubmit={handleSubmit}>
        <input ref={textAreaRef} placeholder="New Message" required={true}className="form-control"style={{"padding":"5px","border": "0px","shadow": "0px","resize":"none"}}>

        </input>

        <button type="submit" className="btn pull-right btn-outline-primary btn-sm" style={{position:"relative",float:"right",right:"0px",bottom:"35px",height:"35px",border:"none"}}>Send <i class="fas fa-paper-plane"></i></button>
        <br></br>
    </form>
    </div>
    </div>
    }