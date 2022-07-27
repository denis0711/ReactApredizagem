import { useEffect, useState,useCallback } from "react"
import { IProjetos } from "../interfaces";
import { ApontamentoService } from "../Services";




export const useProjetos = () =>{
    const [projetos, setTasks] = useState<IProjetos[]>([]);

    const getProjetos =  useCallback( async () => {
    const {status, data} = await ApontamentoService.getProjetos();

    if(status !== 200) throw new Error();
    
    setTasks(data);

  }, [])

  return {
    projetos,
    getProjetos
  }

};