import { IApontamento, IColaborador } from "../interfaces"
import { IProjetos } from "../interfaces"
import { IProjetoUpdate } from "../interfaces"
import { IProjetoCreate } from "../interfaces";
import { Api } from "../providers"



const getProjetos     = () => Api.get<IProjetos[]>('/Projeto');
const getAll          = () => Api.get<IColaborador[]>('/Colaborador');
const getApontamento  = ({date, email} : {date?: string, email?: string}) => Api.get<IApontamento[]>(`/Apontamento?DataApontamento=${date}&Email=${email}`);
const PostApontamento = (apontamento: IProjetoCreate) => Api.post('/Apontamento',apontamento);
const UpdateApontamento = (apontamento: IProjetoUpdate) => Api.put('/Apontamento',apontamento);
const getApontamentoMensal = ({date, email} : {date?: string, email?: string}) => Api.get<IApontamento[]>(`/Apontamento/Mensal?DataApontamento=${date}&Email=${email}`);

export const ApontamentoService = {
    getAll,
    getProjetos,
    PostApontamento,
    getApontamento,
    getApontamentoMensal,
    UpdateApontamento

}