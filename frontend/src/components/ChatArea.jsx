import React, { useState } from 'react'
import axios from 'axios'

const ChatArea = () => {
    const [state, setstate] = useState("upload")
    const [file, setFile] = useState()
    const [name, setName] = useState("")
    function getstarted() {
        setstate("askname");
    }

    function handleSetName(event) {
        setName(event.target.value);
    }
    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    function handleAskName() {
        if (name) {
            setstate("upload")
        }
    }

    function handleUpload() {
        const url = 'http://192.168.4.210:8000/playground/hello/';
        const formData = new FormData();
        formData.append('manual_pdf', file);
        // formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        })
            .catch(() => {
                console.log("error")
            });
    }

    return (
        <div className='chatarea'>

            {
                state === "start" ?
                    <>
                        <h1 className='chatarea-welcome'>Welcome!</h1>
                        <button onClick={getstarted} className='start-btn'>Get Started</button>
                    </>
                    :
                    <>
                        {
                            state === "askname" ?
                                <>
                                    <h1 className='chatarea-welcome'>Welcome!</h1>
                                    <input className='form-control name-value' placeholder='Enter Name' onChange={handleSetName} />
                                    <button onClick={handleAskName} className='Askname-btn'>Continue</button>
                                </>
                                :
                                <>
                                    {
                                        state === "upload" ?
                                            <>
                                                <p className='upload-heading'> Hello {name} </p>
                                                <p className='upload-request '> Please Upload The Mannula PDF </p>
                                                <input class="form-control uploadbox" type="file" id="formFile" onChange={handleFileChange}></input>
                                                <button type='submit' className='form-control btn btn-warning upload-btn' onClick={handleUpload}>Upload</button>
                                            </>
                                            :
                                            <></>
                                    }
                                </>
                        }

                    </>
            }
        </div>


    )
}

export default ChatArea
