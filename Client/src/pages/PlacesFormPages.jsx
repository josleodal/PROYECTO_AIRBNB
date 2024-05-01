import ImagesUploader from "../ImagesUploader";
import Perks from "../Perks";
import { useState } from "react";
import axios from "axios";

export default function PlacesFormPages() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedImages, setAddedImages] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    async function addNewPlace(e) {
        e.preventDefault();
        try {
            await axios.post('/places', {
                title,
                address,
                images: addedImages,
                description,
                perks,
                checkIn,
                checkOut,
                maxGuests
            });
            setRedirect('/account/places');
        } catch (error) {
            console.error('Error al agregar un nuevo lugar:', error);
            // Manejar el error apropiadamente, como mostrar un mensaje de error al usuario
        }
    }
    return (
        <div>
                    <form onSubmit={addNewPlace}>
                        <h2 className="text-xl mt-4">Título</h2>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de mi apartamento" />
                        <h2 className="text-xl mt-4">Dirección del apartamento</h2>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección" />
                        <h2 className="text-xl mt-4">Fotos</h2>

                        

                    <ImagesUploader addedImages={addedImages} onChange={setAddedImages}/>







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
    );
}
