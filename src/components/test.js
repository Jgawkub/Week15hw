import axios from "axios";
import React,{useState, useEffect, editText} from "react";

export default function Test() {
    const [APIData,setAPIData]=useState([])
    const [fullName, setFullName]=useState('')
    const [email, setEmail]=useState('')
    const [editText, setEditText]=useState('')
    const [id, setID]=useState('')
    const endpoint='https://6352caffd0bca53a8eb55114.mockapi.io/lists'
    // const[ newList, setNewList]=(useState(''))



//use Effectg is like component did mount so on loading the page it gets all of the data in the API and renders it. 
useEffect(() => { 
    axios.get(endpoint).then((response) => {
      setAPIData(response.data);
      console.log(response.data)
    });
  }, []);



// const handleSubmit= async (e)=>{
//     e.preventDefault()
//     updateData(id);
//     setEditText('')
//     console.log(document.getElementsByClassName('update').value=(''))
// }

const updateData=(id,e)=>{ 
    console.log( "Updating" + id + fullName);
    axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/lists/${id}`,{
        fullName,
        email
    }).then(()=>{getData()})
    console.log(fullName)
    console.log('Updating')
    setFullName('')
    setEmail('')
    setEditText('')
    }


// const handleSubmit=(e)=>{
//     setFullName(e.target.value)
//     setEmail(e.target.value)
//     updateData()
// }
// }

const getData=()=>{//getData re-renders my data, I invoke it after an operation. 
       axios.get(endpoint).then((getData)=>{
            setAPIData(getData.data);
        })
    }
const postList=(e)=>{// This sends my data, in this case the name of a list to the API.Upon that it invokes getData, sets an array to whatever the data is stored in the API. 
    e.preventDefault()
    axios.post(endpoint, {
            fullName,
            email
        }).then(()=>{getData()});
        console.log(fullName+email)   
        document.getElementById('name').value=('')
        document.getElementById('email').value=('')
        
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
    console.log({index})    
    return( <tr key={index}><td>{data.fullName}</td><td>{data.email}</td><td><button className="btn btn-danger" onClick={()=>onDelete(data.id)}>DELETE</button>
    {/* I had an issue below where using the form tag the entire page would reload as opposed to re-rendering. Using a div fixed the issue */}
        <div>
        <br/><input className="update" type="text"  placeholder="Update Name" onChange={(e)=>{setFullName(e.target.value)}}></input>
        <br/><input className="update" type='text'  placeholder="Update Email" onChange={(e)=>{setEmail(e.target.value)}}></input>
        <br/>
        <br/><button type = "submit" className="btn btn-success" onClick={()=>updateData(data.id,)}>UPDATE</button></div></td></tr>
        
            )
    })

    
        return(
          
            <div><h3 className="align-center">Add your name below if you'd like to sign up for our mailing list!</h3>
           
                <form onSubmit={postList} >
                <input id='name' className="update" placeholder="Name" onChange={(e)=>{setFullName(e.target.value)}}></input>
                <input id='email'className="update" placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}}></input>
                <button  type='submit' className="btn btn-primary">Input Info Below</button>
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