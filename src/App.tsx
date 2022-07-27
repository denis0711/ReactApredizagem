
import React, { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import { useColaborador } from './hooks/useColaborador';
import { useProjetos } from './hooks/useProjetos';
import { useApontamentoDia } from './hooks/useApontamentoDia';
import { useApontamentoMensal } from './hooks/useApontamentoMensal';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCreateApontamentoDia } from './hooks';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AnyAaaaRecord, AnyARecord } from 'dns';
import { useUpApontamento } from './hooks/upApontamento';


function App() {
  
  
  const {colaboradores, getAll} =   useColaborador();
  const {projetos, getProjetos} =   useProjetos();
  const { upApontamento } = useUpApontamento();
  const {createApontamento} =   useCreateApontamentoDia();
  const [colaboradorSelecionado, setcolaboradorSelecionado] = useState<number>();
  const [projetoSelecionado, setprojetoSelecionado] = useState<number >();
  const [horasSelecionado, sethorasSelecionado] = useState<number | 0>();
  const [colUpSelecionado, setcolUpSelecionado] = useState<number | 0>();
  const [DateSelecionado, setDateSelecionado] = useState('');
  const { apontamentoDia, getApontamento} = useApontamentoDia({date: DateSelecionado, email: colaboradores.find((c) => c.codigoColaborador === colaboradorSelecionado)?.emailColaborador});
  const { apontamentoMensal, ApontamentoMensal} = useApontamentoMensal({date: DateSelecionado, email: colaboradores.find((c) => c.codigoColaborador === colaboradorSelecionado)?.emailColaborador});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event: any) => {
    console.log('Caiu no handleShow');
    setcolUpSelecionado(event.target.value);
    console.log(event.target.value);
    console.log(colUpdate);
    setShow(true);
  } 
  useEffect(() => {
    getProjetos();
    getAll();
    getApontamento();
    ApontamentoMensal();
  
    
  }, [getProjetos,getAll,getApontamento,ApontamentoMensal])

  //const {colaboradores} = getAll();

 
  const col = colaboradorSelecionado;
  const pj = projetoSelecionado;
  const hora = horasSelecionado;

  const colUpdate = colUpSelecionado;
  const pjUpdate = projetoSelecionado;
  const horaUpdate = horasSelecionado;


  const handlerColaboradorUpdate = (event:any) => {

    setcolaboradorSelecionado(event.value);
  }

 
  const handlerProjetoUpdate = (event:any) => {

    setprojetoSelecionado(event.value);
  }
 const handlerHorasUpdate = (event:any) => {
    sethorasSelecionado(event.value);
 }
  
  const handlerDateUpdate = (event:any) => {

    setDateSelecionado(event.target.value);
  }


const testeMensal = apontamentoMensal.map(a=> a.meses.map((projetoList)=> 
projetoList.projetoList.map(a => <tr>
       
  <td>{a.codigoApontamento}</td>
  <td>{projetoList.data}</td>
  <td>{ a.projeto}</td>
  <td>{ a.horas}</td>
</tr>
)
        // <tr>
       
        //   <td>{projetoList.projetoList.map(a => a.codigoApontamento)}</td>
        //   <td>{projetoList.data}</td>
        //   <td>{projetoList.projetoList.map(a => a.projeto).join(', ')}</td>
        //   <td>{projetoList.projetoList.map(a => a.horas)}</td>
        // </tr>

        
     
));


  const teste = apontamentoDia.map(map => map.projetos.map((projeto,index)=> <tr key={index}>

    <td>{projeto.codigoApontamento}</td>
    <td>{projeto.projeto}</td>
    <td>{projeto.horas}</td>
    <td><button className ='btn btn-warning' onClick={handleShow} value={projeto.codigoApontamento}>Editar</button></td>
  </tr>));



  const projetosOptions = projetos.map(pj => ({
    value: pj.codigoProjeto,
    label: pj.concatenado
  }));

  const colaboradoresOptions = colaboradores.map(col => ({
    value: col.codigoColaborador,
    label: col.emailColaborador
  }));

  const colaboradoresOptionsSelecionado = colaboradoresOptions.find(c=>c.value === colaboradorSelecionado)



  const inputRef = useRef<HTMLInputElement>(null);

   inputRef.current?.focus();

   
   const handlerClickSubmit = (event:any) =>{
    const hora =  inputRef.current?.value || '1';
    event.preventDefault();

      
     const data= {
      codigoColaborador: colaboradorSelecionado || 1,
      codigoProjeto: projetoSelecionado || 1,
      horasApontamento: Number.parseInt(hora) || 1
    }

    console.log(colaboradorSelecionado)
    console.log(projetoSelecionado)
    console.log(data)

     createApontamento(data);
    //createAponamento({data}); //

    //const col = colaboradorSelecionado;
   // const pj = projetoSelecionado;
    //const hora = horasSelecionado;

   }
   const handlerClickSubmitUpdate = (event:any) =>{
    const hora =  inputRef.current?.value || '1';
    event.preventDefault();

      
     const data= {
      codigoApontamento: colUpdate || 16,
      codigoProjeto: projetoSelecionado || 1,
      horasApontamento: Number.parseInt(hora) || 1
    }

    console.log(colaboradorSelecionado)
    console.log(projetoSelecionado)
    console.log(data)

     upApontamento(data);

     setShow(false);
    //createAponamento({data}); //

    //const col = colaboradorSelecionado;
   // const pj = projetoSelecionado;
    //const hora = horasSelecionado;

   }


  
  //  ApontamentoService.PostApontamento();


  return (
    <div className="App">

      <div className='container'>
        <h1>Tela GET</h1>
        <br>
        </br>
        <br>
        </br>
        <p className='text-left'>Colaborador:</p>
      <Select options={colaboradoresOptions} className='mt-3' value={colaboradoresOptionsSelecionado} onChange={handlerColaboradorUpdate}/>

                 <div className="form-group mt-2 calendar">
                    <div className="input-group">
                      <input className="form-control" placeholder="dd-mm-yyyy" type="date" onChange={handlerDateUpdate} value={DateSelecionado}/>
                    </div>
                  </div>


      <div className="container mb-t" >
           <h3>Nome: {apontamentoDia.map(map => map.nome)}</h3>
           <h3>Data:{apontamentoDia.map(map => map.data)}</h3>
          

            <table className="table table-striped container">
               <thead>
                 <tr>
                   <th scope="col">Codigo Apontamento</th>
                   <th scope="col">Projeto</th>
                   <th scope="col">Horas</th>
                   <th scope="col"></th>
                 </tr>
               </thead>
               <tbody >
                     {teste}
                  
               </tbody>
               <tfoot>
                <tr>
                   <th scope="col"></th>
                   <th scope="col">Horas Totais:</th>
                   <th scope="col"></th>
                </tr>
                <tr>
                  <td>
                  </td>
                  <td>{apontamentoDia.map(map => map.horasApontamentoTotal)}</td>
                  <td>
                  </td>
                </tr>
               </tfoot>
           </table>

       
                <br>
              </br>
              <br>
              </br>    <br>
              </br>
              <br>
              </br>
              <hr></hr>
     </div>
      
</div>

     
     
        <h1>Tela POST</h1>

        <form className="row g-3 form-group"  >
            <div className="mr-5 mt-3">
                <h5>Colaborador:</h5>
                <Select options={colaboradoresOptions}  className='mt-3' onChange={handlerColaboradorUpdate} />
            </div>
           
            <div className="mr-5 mt-3">
                <h5>Projeto:</h5>
                <Select options={projetosOptions} className='mt-3' onChange={handlerProjetoUpdate}/>
                
            </div>
            <div className="mr-5 mt-3">
                <div className="p-field p-col-12 p-md-3">
                    <h5><label>Horas:</label></h5>
                    <input type="number" className="form-control ml-5" title="horas" onChange={handlerHorasUpdate} ref={inputRef} />
                </div>
            </div>
          

            <div className="input-group mt-5">
                <input type="submit" value="Criar" className="btn btn-outline-success" onClick={handlerClickSubmit} />
            </div>
        
            
        </form>
         
        <div className='container'>
        <h1>Tela GET - MENSAL </h1>
        <br>
        </br>
        <br>
        </br>
        <p className='text-left'>Colaborador:</p>
      <Select options={colaboradoresOptions} className='mt-3' value={colaboradoresOptionsSelecionado} onChange={handlerColaboradorUpdate}/>

                 <div className="form-group mt-2 calendar">
                    <div className="input-group">
                      <input className="form-control" placeholder="dd-mm-yyyy" type="date" onChange={handlerDateUpdate} value={DateSelecionado}/>
                    </div>
                  </div>


      <div className="container mb-t" >
           <h3>Nome: {apontamentoMensal.map(map => map.nome)}</h3>
           

            <table className="table table-striped container" >
               <thead>
                 <tr>
                   <th scope="col">Codigo Apontamento</th>
                   <th scope="col">Data</th>
                   <th scope="col">Projeto</th>
                   <th scope="col">Horas</th>
                 </tr>
               </thead>
               <tbody >
                     {testeMensal}
               </tbody>
               <tfoot>
                <tr>
                   <th scope="col"></th>
                   <th scope="col">Horas Totais:</th>
                   <th scope="col"></th>
                </tr>
                <tr>
                  <td>
                  </td>
                  <td>{apontamentoMensal.map(map => map.horasApontamentoTotal)}hs</td>
                  <td>
                  </td>
                </tr>
               </tfoot>
           </table>

       
                <br>
              </br>
              <br>
              </br>    <br>
              </br>
              <br>
              </br>
              <hr></hr>
     </div>
      
</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar: {colUpdate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3 form-group"  >
        <div className="mr-5 mt-3">
                <h5>Projeto:</h5>
                <Select options={projetosOptions} className='mt-3' onChange={handlerProjetoUpdate}/>
                
            </div>
            <div className="mr-5 mt-3">
                <div className="p-field p-col-12 p-md-3">
                    <h5><label>Horas:</label></h5>
                    <input type="number" className="form-control ml-5" title="horas" onChange={handlerHorasUpdate} ref={inputRef} />
                </div>
            </div>
          

           
        </form>
          Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handlerClickSubmitUpdate} >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
       
    
       </div>

     
  );
  
}

export default App;



/*


 <div className='container'>
        <h1>Tela GET</h1>
        <br>
        </br>
        <br>
        </br>
        <p className='text-left'>Colaborador:</p>
      <Select options={colaboradoresOptions} className='mt-3' value={colaboradoresOptionsSelecionado} onChange={handlerColaboradorUpdate}/>

                 <div className="form-group mt-2 calendar">
                    <div className="input-group">
                      <input className="form-control" placeholder="dd-mm-yyyy" type="date" onChange={handlerDateUpdate} value={DateSelecionado}/>
                    </div>
                  </div>


      <div className="container mb-t" >
        <h3>Nome: {apontamentoDia.map(map => map.nome)}</h3>
        <h3>Data:{apontamentoDia.map(map => map.data)}</h3>
    
         <table className="table table-striped container">
            <thead>
              <tr>
                <th scope="col">Codigo Apontamento</th>
                <th scope="col">Projeto</th>
                <th scope="col">Horas</th>
              </tr>
            </thead>
            <tbody >
                { teste}
            </tbody>
       
          </table>
          <br>
        </br>
        <br>
        </br>    <br>
        </br>
        <br>
        </br>
        <hr></hr>



 </div>
      
    </div>


*/

/* <div>
        <select>
          {colaboradores.map(coladorador =><option>{coladorador.emailColaborador}</option>)}
        
        </select>


        <select>
          {projetos.map(projeto =><option>{projeto.concatenado}</option>)}
        </select>
      </div>*/ 
