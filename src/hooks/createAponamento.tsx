import React, { useCallback, useEffect, useState } from "react"
import { IApontamento, IProjetoCreate } from "../interfaces";
import { ApontamentoService } from "../Services";




export const useCreateApontamentoDia = () =>{

    const createApontamento =  useCallback( async (data: IProjetoCreate) => {
    const {status} = await ApontamentoService.PostApontamento(data);

    if(status !== 200) throw new Error();

  }, [])

  return {
    createApontamento
  }


};





