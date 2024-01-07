
import React, { useState } from 'react'
// import axios from 'axios'

const ChatArea = ({ changestate }) => {
    const [state, setstate] = useState("start")
    const [file, setFile] = useState()
    const [name, setName] = useState("")
    const [query, setquery] = useState("")
    const [messages, setMessages] = useState([]);

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


    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('manual_pdf', file);
            // console.log(file)

            fetch('http://127.0.0.1:8000/assembly/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Upload successful:', data);
                    setstate("query");
                    changestate("query");
                })
                .catch(error => {
                    console.error('Error during upload:', error);
                });
        }
    };

    function handleQuery(event) {
        setquery(event.target.value);
    }

    const addMessage = (message, sender) => {
        setMessages([...messages, { message, sender }]);
    };
    const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
    function handleQueryBtn() {
        if (query) {
            // const formData = new FormData();
            // formData.append('query', query);
            // console.log(file)
            // setMessages([...messages, { 'text': query, 'sender': 'You' }]);
            
            
            

            fetch('https://bb1d-35-238-216-206.ngrok-free.app/assembly/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Upload successful:', data);
                    // setMessages([...messages, { 'text': data['message'] + "1", 'sender': 'AI' }]);
                    // addMessage(query, "You");
                    // setTimeout(() => {
                    //     addMessage(data['message'],"AI");
                    // }, 1000);
                    setMessages([
                        ...messages,
                        { sender: 'You', message: query },
                        { sender: 'AI', message: data['message'] },
                      ]);
                    console.log(messages)
                    setquery("")
                })
                .catch(error => {
                    console.error('Error during upload:', error);
                });
        }
    }


    function handleClearChat() {
        setMessages([]);
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
                                                <button className='form-control btn btn-warning upload-btn' onClick={handleUpload}>Upload</button>
                                            </>
                                            :
                                            <>
                                                {
                                                    state === "query" ?
                                                        <>
                                                            <div className='chatbox'>
                                                                {messages.map((msg, index) => (
                                                                    <div key={index}>
                                                                        <strong>{msg.sender}:</strong> {msg.message}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <input className='form-control queryText' type='text' onChange={handleQuery} placeholder='Enter Query' />
                                                            <div className='query-btns'>
                                                                <button className='form-control btn btn-warning query-btn' onClick={handleQueryBtn}>Enter</button>
                                                                <button className='form-control btn btn-danger query-btn' onClick={handleClearChat}>Clear Chat</button>
                                                            </div>

                                                        </>
                                                        :
                                                        <></>
                                                }
                                            </>
                                    }
                                </>
                        }

                    </>
            }
        </div>


    )
}

export default ChatArea
