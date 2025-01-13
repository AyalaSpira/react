import { UserData } from "../reduser/rreducerUser"


const User=(user:UserData)=>{
return (<>
<div>{user.name}</div>
<div>{user.lname}</div>
<div>{user.email}</div>
<div>{user.phone}</div>

</>)
}
export default User