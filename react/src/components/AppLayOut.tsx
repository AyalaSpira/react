import { Outlet } from "react-router"
import DrawerAppBar from './navBar'


const AppLayout = () => {
    return (<>
        {/* <Outlet /> */}
    
<DrawerAppBar/>

        <Outlet />
    </>)
}

export default AppLayout