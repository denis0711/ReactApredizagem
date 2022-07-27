import { useCallback, useEffect, useState } from "react"
import { IColaborador } from "../interfaces";
import { ApontamentoService } from "../Services";


export const useColaborador = () =>{

    const [colaboradores, setTasks] = useState<IColaborador[]>([]);

    const getAll =  useCallback( async () => {
    const {status, data} = await ApontamentoService.getAll();

    if(status !== 200) throw new Error();
    
    setTasks(data);

  }, [])

  return {
    colaboradores,
    getAll
  }
};


/*

  const [ colaboradores, setColaboradores] = useState<IColaborador[]>([])
    useEffect(()=> {
        fetch('http://189.113.15.118:4265/api/Colaborador')
            .then(response => response.json())
            .then((data)=> setColaboradores(data));
    }, []);

    return {
        colaboradores
    };


*/