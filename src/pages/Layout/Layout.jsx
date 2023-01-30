import { Outlet } from 'react-router';
import Header from '../../components/Header/Header'

function Layout({logout}) {
    return ( 
    <>
    <Header logout={logout}/>
    <Outlet />
    </> );
}

export default Layout;