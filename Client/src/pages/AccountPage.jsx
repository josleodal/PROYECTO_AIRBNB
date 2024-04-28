import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AccountPage (){

const[redirect, setRedirect]=useState(null);

const {ready, user,setUser} =useContext(UserContext);

let {subpage}= useParams();
if(subpage===undefined){

    subpage='profile'


}

async function logout(){

    await axios.post('/logout')
    
    setRedirect('/');
    setUser(null)
}

if(!ready){
return 'Loading...'

}

if(ready && !user){

    return <Navigate to={'/login'}/>

}



function linkClases(type=null){
    let clases ='py-2 px-6';
    if(type===subpage){

        clases +=' bg-primary   text-white rounded-full'
    }

    return clases;
}

if(redirect){

return <Navigate to={redirect}/>

}
    return(
        <div>
            <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className={linkClases('profile')} to={'/account/profile'}>Mi Perfil</Link>
                <Link className={linkClases('bookings')} to={'/account/bookings'}>Mis Reservas</Link>
                <Link className={linkClases('places')} to={'/account/places'}>Mis Alojamientos</Link>

            </nav>

            {subpage=== 'profile'&&(

                <div className="text-center max-w-lg mx-auto">

                    Bienvenido {user.name} ({user.email})
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>

                </div>


            )}

        </div>

    )



}