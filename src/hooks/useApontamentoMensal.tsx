import { useCallback, useEffect, useState } from "react"
import { IApontamentoMensal } from "../interfaces";
import { ApontamentoService } from "../Services";

export const useApontamentoMensal = ({date, email} : {date?: string, email?: string}) => {
    const [apontamentoMensal, setTasks] = useState<IApontamentoMensal[]>([]);

    const ApontamentoMensal = useCallback(async () => {
        const {status, data} = await ApontamentoService.getApontamentoMensal({date,email});

        if(status !== 200) throw new Error();

        setTasks(data);


    }, [date, email]);

    return {
        apontamentoMensal,
        ApontamentoMensal
    }

};