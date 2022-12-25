import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Datamanager.css"


function Datamanager() {

    let [data2, setdata2] = useState({data:[]})
    let [pw,setpw] = useState("")
    let[login, setlogin] = useState("")
    let[Error, setError] = useState("")
    let [token, settoken] = useState()
    useEffect(()=>{
        fetch('https://squid-app-9h43v.ondigitalocean.app/api/documents').then(res => res.json()).then((json)=> setdata2(json)).then(()=>renderino())
    },[])
    function handlelogin(){


        axios
        .post('https://squid-app-9h43v.ondigitalocean.app/api/auth/local', {
          identifier: login,
          password: pw,
        })
        .then(response => {
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
          localStorage.setItem("user", response.data.user)
          localStorage.setItem("token", response.data.jwt)
          settoken(response.data.jwt)
          setError("success")
          if(localStorage.getItem("token")){
          
          }
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
          setError("failed")
        });
          
          
      }
  

    function updatestuff(props){
        console.log(props)
        console.log(document.getElementById("la"+props).children[0])
       
        
        let Title = document.getElementById("la"+props).children[0].children[0].value
        if(Title.length < 1){
            Title = document.getElementById("la"+props).children[0].children[0].placeholder
            console.log(document.getElementById("la"+props).children[0].children[0].placeholder)
        }
        let Count = document.getElementById("la"+props).children[1].children[0].value
        if(Count.length < 1){
            Count = document.getElementById("la"+props).children[1].children[0].placeholder
            console.log(document.getElementById("la"+props).children[1].children[0].placeholder)
        }
        let Lang = document.getElementById("la"+props).children[2].children[0].value
        if(Lang.length < 1){
            Lang = document.getElementById("la"+props).children[2].children[0].placeholder
            console.log(document.getElementById("la"+props).children[2].children[0].placeholder)
        }
        let id = document.getElementById("la"+props).children[3].children[0].value
      
        console.log(Title+"::"+Lang+"::"+Count)
        let reqbody = JSON.stringify({
            "data": {
              "language":Lang,
              "title": Title,
              "country": Count
            }
          })
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${token}` },
            body: reqbody
        };
        fetch('https://squid-app-9h43v.ondigitalocean.app/api/documents/'+id, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
           
    }

    function renderino(){
        if(data2.data.length > 0){
            return(
                <>
                
                    {
                        data2.data.map((item, index)=>{
                            return(
                                <>
                                <div id={"la"+index}>
                                <label>Title--:<input  type="text" placeholder={item.attributes.title} /></label>
                                <label>Lang:<input  type="text" placeholder={item.attributes.language} /></label>
                                <label>Count--:<input  type="text" placeholder={item.attributes.country} /></label>
                                <label>id--:<input  type="text" value={item.id} /></label>
                                <button onClick={()=>{updatestuff(index)}}> change</button> 
                                </div>
                                </>
                            )
                        })
                    }
                </>
            )
        }else{
            return(
                <></>
            )
        }
    }
        return (
    <div>

            {renderino()}
            <div>
            <p>Login:</p>
                    <input name="login" onChange={(e)=>setlogin(e.target.value)} type="text"/>
                    <p>Username: </p>
                    <input name="pw" onChange={(e)=>setpw(e.target.value)} type="password"/>
                    <br />
                    {Error}
                    <button onClick={()=>handlelogin()}>submit</button>
            </div>
    </div>

  )
}

export default Datamanager