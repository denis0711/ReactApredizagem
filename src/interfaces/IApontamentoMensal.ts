export interface IProjetoList {
    projeto: string;
    horas: number;
    codigoApontamento: number;
}

export interface IMes {
    data: string;
    projetoList: IProjetoList[];
}

export interface IApontamentoMensal {
    nome: string;
    meses: IMes[];
    horasApontamentoTotal: number;
}