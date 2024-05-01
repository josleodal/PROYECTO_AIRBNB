import axios from "axios";
import { useState } from "react";

export default function ImagesUploader({ addedImages, onChange }) {
    const [imageLink, setImageLink] = useState('');

    async function addPhotosByLink(e) {
        e.preventDefault();
        try {
            const { data: filename } = await axios.post('/upload-by-link', { link: imageLink });
            onChange(prev => [...prev, filename]);
            setImageLink('');
        } catch (error) {
            console.error('Error al subir imágenes:', error);
        }
    }

    function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }

        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
        .then(response => {
            const filenames = response.data;
            onChange(prev => prev.concat(filenames));
        })
        .catch(error => {
            console.error('Error al subir imágenes:', error);
        });
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text" name="imageLink" value={imageLink} onChange={e => setImageLink(e.target.value)} placeholder="Añada sus fotos en formato jpg con un link" />
                <button onClick={addPhotosByLink} className="bg-gray-200 px-4 rounded-2xl">Añada fotos</button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedImages.length > 0 && addedImages.map((link, index) => (
                    <div key={index} className="h-32 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden mr-2 mb-2">
                        <img className="w-full h-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="imagen" />
                    </div>
                ))}
                <label className="cursor-pointer w-full p-10 text-lg text-gray-600 border border-gray-200 rounded-lg flex justify-center items-center">
                    <input type="file" multiple className="hidden" onChange={uploadImage} />
                    <div className="text-center">Upload</div>
                </label>
            </div>
        </>
    );
}
