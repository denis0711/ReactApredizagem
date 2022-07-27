export interface IApontamento {
    data:                  string;
    projetos:              IProjeto[];
    nome:                  string;
    meses:                 any[];
    horasApontamentoTotal: number;
}

export interface IProjeto {
    codigoApontamento: number;
    projeto:           string;
    horas:             number;
}


export interface IProjetoUpdate {
    codigoApontamento: number;
    codigoProjeto:     number;
    horasApontamento:  number;
}


export interface IProjetoCreate {
    codigoColaborador?: number;
    codigoProjeto?:     number;
    horasApontamento?:             number;
}
