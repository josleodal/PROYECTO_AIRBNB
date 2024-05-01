export default function Perks({selected,onChange}) {
    function handleChangeClick(e){
      const{checked,name}=e.target;
      if(checked){

        onChange([...selected,name])
      }else{

        onChange([...selected.filter(selectedName=>selectedName!==name)])
      }


    }

  
    return ( 
      <div className="flex flex-wrap gap-6">

        <div className="flex">

        <label htmlFor="">
                                <input type="checkbox"name="wifi" onChange={handleChangeClick}  />
                                <span> Wifi</span>
                            </label>

        </div>
               <div className="flex">
               <label htmlFor="">
                                <input type="checkbox" name="parking"  onChange={handleChangeClick}  />
                                <span> Parking</span>
                            </label>

               </div>
                     <div className="flex">

                     <label htmlFor="">
                                <input type="checkbox" name="tv"  onChange={handleChangeClick} />
                                <span> Tv</span>
                            </label>
                     </div>
                     <div className="flex">
                     <label htmlFor="">
                                <input type="checkbox" name="pets" onChange={handleChangeClick}  />
                                <span> Mascotas</span>
                            </label>
                     </div>
                     <div className="flex">
                        
                     <label htmlFor="">
                                <input type="checkbox" name="door" onChange={handleChangeClick} />
                                <span> Entrada Privada</span>
                            </label>
                        </div>       
                            
                    <div  className="flex">


                    <label htmlFor="">
                                <input type="checkbox" name="washingMachine" onChange={handleChangeClick} />
                                <span> Lavadora</span>
                            </label>
                    </div>
                           

                       

                          
                          
      </div>
    );
  }


  