import axios from "axios";
import React,{useState, useEffect} from "react";
export default function Test() {
    const [APIData,setAPIData]=useState([])
    const [fullName, setFullName]=(useState(''))
    const [email, setEmail]=(useState(' '))
    // const [id, setID]=useState('')
    const endpoint='https://6352caffd0bca53a8eb55114.mockapi.io/lists'
    const[ newList, setNewList]=(useState(''))





//use Effectg is like component did mount so on loading the page it gets all of the data in the API and renders it. 
useEffect(() => { 
    axios.get(endpoint).then((response) => {
      setAPIData(response.data);
      console.log(response.data)
    });
  }, []);



const updateData=(id)=>{//Having a weird issue where it updates but only after hitting the update button twice. 
   
    console.log( "Updating" + id + fullName);
    axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/lists/${id}`,{
        fullName,
        email
    }).then(()=>{getData()})
    console.log(fullName)
      
    }


const getData=()=>{//getData re-renders my data, I invoke it after an operation. 
       axios.get(endpoint).then((getData)=>{
            setAPIData(getData.data);
        })
    }
const postList=(e,id)=>{// This sends my data, in this case the name of a list to the API.Upon that it invokes getData, sets an array to whatever the data is stored in the API. 
    e.preventDefault()    
    axios.post(endpoint, {
            fullName,
            email
        }).then(()=>{getData()});
        console.log(fullName+email)   
        document.getElementById('name').value=(' ')
    }   

// const update=(id)=>{
//     console.log( "Updating" + id + fullName);
//     axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/lists/${id}`,{
//         fullName,
//         email
//     }).then(()=>{getData()})
//     console.log(fullName)
// }

const onDelete=(id)=>{
        console.log("deleting" + id + fullName)//This takes the id of the element I'm deleting and sends that request to an API, eventually re-rendering the DOM. 
        axios.delete(`https://6352caffd0bca53a8eb55114.mockapi.io/lists/${id}`).then(()=>{getData()})}


const render = APIData.map((data, index)=>{//Taking the data that is now stored in the array, I map over it creating the elements to render in the table below. Two buttons allow to uopdate or delete the informartion. 
        return(
        <tr key={index}><td>{data.fullName}</td><td>{data.email}</td><td><button onClick={()=>onDelete(data.id)}>DELETE</button>
        
            <div>
            <br/><input placeholder="Update Name" onChange={(e)=>{setFullName(e.target.value)}}></input>
            <br/><input placeholder="Update Email " onChange={(e)=>{setEmail(e.target.value)}}></input>
            <br/><button onClick={()=>updateData(data.id)}>UPDATE</button></div></td></tr>
            )
    })

    
        return(
          
            <div><h3>Add your name below if you'd like to sign up for our mailing list!</h3>
                
                <form onSubmit={postList} >
                <input id='name' placeholder="Name" onChange={(e)=>{setFullName(e.target.value)}}></input>
                <input id='email' placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}}></input>
                <button>Input Info Below</button>
               </form>
               
            <div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Extra</th>
                    </tr>
                   
                       {render}

                    <tr>
                       <td>Test TJ's</td>
                       <td>Test 2</td>
                       <td>MORE TESTING</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>

    
           
        )
        }
{/* <button onClick={()=>onDelete(data.id)}>DELETE</button><form><input placeholder="Update Name" onChange={(e)=>{setLastName(e.target.value)}}></input><button onClick={()=>updateData(data.id)} >UPDATE</button></form> */}

 // fetch(`https://6352caffd0bca53a8eb55114.mockapi.io/lists/${id}`, {
    //     method:"PUT",
    //     headers:{ "Content-Type": "application/json",   
    //     },
    //     body:JSON.stringify({ fullName: fullName,
    //         email: email}).then((result)=>{console.log(result)}).then(getData),  
    // })