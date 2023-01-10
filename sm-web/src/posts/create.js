import React,{useState} from 'react';
import {apiPostCreate} from'./lookup'

export function PostCreate(props){
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const textAreaRef = React.createRef()
    const {didPost} = props
    const handleBackendUpdate = (response, status) =>{

        if(status===201){
            didPost(response)

        }else{
            console.log(response)
            alert("Error")
        }

    }
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);


	};

    const handleSubmit = (event) =>{
        event.preventDefault()
        const newVal = textAreaRef.current.value
        apiPostCreate(newVal,selectedFile,handleBackendUpdate)
        textAreaRef.current.value = ''
        window.location.reload();
    }
    return <div className={props.className} style={{borderTop: "0px solid #CED4DA",borderRight: "0px solid #CED4DA",borderBottom: "0px solid #CED4DA"}}>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} placeholder="New Post" required={true}className="form-control"style={{"border": "0px","border": "0px","shadow": "0px","resize":"none"}}>

                </textarea>


    
                    

                    <div className='mx-2'style={{marginTop:"15px",marginBottom:"15px"}}>
                    <button style={{height:"32px"}}  type="submit" className="btn btn-primary d-inline btn-sm">Post <i class="fas fa-edit"></i></button>



                        <label onChange={changeHandler} htmlFor="formId">
                            <input name="file" type="file" id="formId" hidden />

                            <a style={{marginLeft:"5px",height:"32px"}} className="d-inline  btn btn-outline-primary">Upload <i class="fas fa-cloud-upload-alt"></i></a>
                            {isFilePicked && <p className="d-inline"> - {selectedFile.name}</p>}
                        </label>
                    <input type="file"id="formID" hidden className="btn btn-outline-primary" name="file" style={{width:"220px"}}onChange={changeHandler} />
                    </div>
            </form>
            </div>


}