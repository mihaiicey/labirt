import { NavLink } from 'react-router-dom';
import { LiaBeerSolid } from "react-icons/lia";
import UserMen from './User';
export default function Nav(){
    return(
        <nav className="bg-white relative z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-5">
                <div id="logo">
                    <NavLink href="/" className="fontMavenPro font-bold text-2xl flex items-center">
                        <LiaBeerSolid className='text-2xl fill-primary'/> LaBirt
                    </NavLink>
                </div>
                <div id="menu" className='fontDmSans'>
                    ...aici meniu...
                </div>
                <div id="login" className='fontDmSans relative'>
                   <UserMen/>
                </div>
            </div>
        </nav>
    )
}