import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";


export default function PlacesPages() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedImages, setAddedImages] = useState([]);
    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    async function addPhotosByLink(e){

        e.preventDefault();
       const {data:filename}=await axios.post('/upload-by-link' ,{link:imageLink})
        setAddedImages(prev=>{

            return [...prev, filename];

        })

        setImageLink('');
    }

    function uploadImage(e){
    
        const files= e.target.files;
        const data = new FormData();
      
        for(let i = 0; i<files.length; i++){

            data.append('images',files[i]);
        }

        axios.post('/upload', data, {

            headers:{'Content-type': 'multipart/form-data'}
        }).then(response =>{

            const{data:filename}=response;
            setAddedImages(prev=>{

                return [...prev, filename];
    
            })
        })

    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to='/account/places/new'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Añade un nuevo Alojamiento
                    </Link>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form>
                        <h2 className="text-xl mt-4">Título</h2>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de mi apartamento" />
                        <h2 className="text-xl mt-4">Dirección del apartamento</h2>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección" />
                        <h2 className="text-xl mt-4">Fotos</h2>

                        <div className="flex gap-2">
                        <input type="text" name="imageLink" value={imageLink} onChange={e => setImageLink(e.target.value)} placeholder="Añada sus fotos en formato jpg con un link" />
                        <button onClick={addPhotosByLink} className="bg-gray-200 px-4 rounded-2xl">Añada fotos</button>
                        </div>


                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                             {addedImages.length > 0 && addedImages.map((link, index) => (
                        <div key={index}> {/* Agregar key prop aquí */}
                        <img className="rounded-2xl p-2" src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                            ))}
                        <label className="cursor-pointer p-5 text-2xl text-gray-600 border border-gray-200 rounded-lg flex justify-center items-center">

                                <input type="file" multiple className="hidden" onChange={uploadImage}/>
                                Upload
                            </label>
                        </div>


                        <h2 className="text-xl mt-4">Descripción</h2>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Añade una descripción del apartamento" ></textarea>
                        
                        <h2 className="text-xl mt-4">Señala los servicios de tu apartamento</h2>

                        <div className="flex justify-between gap-2 m-1">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>

                        <h2 className="text-xl mt-4">Reglas del Alojamiento</h2>
                        <textarea placeholder="Añada las reglas de su alojamiento"></textarea>

                        <div>
                            <h2 className="text-xl mt-4">Check-In Time</h2>
                            <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="16:00" />
                        </div>
                        <div>
                            <h2 className="text-xl mt-4">Check-Out Time</h2>
                            <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="11:00" />
                        </div>
                        <div>
                            <h2 className="text-xl mt-4">Número de huéspedes</h2>
                            <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder="1" />
                        </div>

                        <div>
                            <button className="primary my-4">Guardar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
