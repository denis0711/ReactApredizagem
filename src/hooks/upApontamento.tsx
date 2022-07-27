import React, { useCallback, useEffect, useState } from "react"
import { IApontamento, IProjetoUpdate } from "../interfaces";
import { ApontamentoService } from "../Services";



export const useUpApontamento = () =>{

    const upApontamento =  useCallback( async (data: IProjetoUpdate) => {
    const {status} = await ApontamentoService.UpdateApontamento(data);

    if(status !== 200) throw new Error();

  }, [])

  return {
    upApontamento
  }


};