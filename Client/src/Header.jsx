import { Link } from "react-router-dom";

export default function Header(){

    return( 
    
    <div>
        <header className=' flex justify-between'>
          <a href='' className='flex items-center gap-5'>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-10 h-10">
              <path d="M19,0c-2.41,0-4.43,1.72-4.9,4H5.5c-1.93,0-3.5,1.57-3.5,3.5v2c0,.83,.67,1.5,1.5,1.5s1.5-.67,1.5-1.5v-2c0-.28,.22-.5,.5-.5h1.5v2.5c0,.83,.67,1.5,1.5,1.5s1.5-.67,1.5-1.5v-2.5h4.1c.46,2.28,2.48,4,4.9,4,2.76,0,5-2.24,5-5v-1c0-2.76-2.24-5-5-5Zm2,6c0,1.1-.9,2-2,2s-2-.9-2-2v-1c0-1.1,.9-2,2-2s2,.9,2,2v1Zm-.5,7c-.83,0-1.5,.67-1.5,1.5v2c0,.28-.22,.5-.5,.5h-1.5v-2.5c0-.83-.67-1.5-1.5-1.5s-1.5,.67-1.5,1.5v2.5h-4.1c-.46-2.28-2.48-4-4.9-4-2.76,0-5,2.24-5,5v1c0,2.76,2.24,5,5,5,2.41,0,4.43-1.72,4.9-4h8.6c1.93,0,3.5-1.57,3.5-3.5v-2c0-.83-.67-1.5-1.5-1.5Zm-13.5,6c0,1.1-.9,2-2,2s-2-.9-2-2v-1c0-1.1,.9-2,2-2s2,.9,2,2v1Z"/>
            </svg>
            <span className='font-bold text-xl'>Key Hotel</span>
          </a>
          <div className='flex gap-4 border border-gray-300 rounded-full p-2 px-4 shadow-md shadow-gray-300'>
            <div className="flex items-center">Destino</div>
            <div className='border-l border-gray-300'></div>
            <div className="flex items-center">Fechas</div>
            <div className='border-l border-gray-300'></div>
            <div className="flex items-center">Número de Viajeros</div>
            <button className='bg-primary p-2 rounded-full text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
          <Link to={'/login'} className='flex gap-2 border border-gray-300 rounded-full p-2 px-4 shadow-md shadow-gray-300 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          </Link>
        </header>
      </div>
      
    )



}