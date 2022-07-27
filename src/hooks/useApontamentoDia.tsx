import { useCallback, useEffect, useState } from "react"
import { IApontamento } from "../interfaces";
import { ApontamentoService } from "../Services";






export const useApontamentoDia = ({date, email} : {date?: string, email?: string}) =>{
    const [ apontamentoDia, setApontamentoDia] = useState<IApontamento[]>([]);

    const getApontamento =  useCallback( async () => {
    const {status, data} = await ApontamentoService.getApontamento({date,email});

    if(status !== 200) throw new Error();
    
    setApontamentoDia(data);

  }, [date,email])

  return {
    
    apontamentoDia,
    getApontamento
  }


};


