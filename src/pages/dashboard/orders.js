import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const Orders = ({ data })=> {

    const API = axios.create({
        baseURL: "http://localhost:5001",
      });
    const host = "http://localhost:5001/";
    
    const getToday = async ()=>{
        const { data } =  await API.get(`${host}animaistoday`).then((r) => r).catch(e => e);
        return data
    };
    const classes = useStyles();
    const [animais, setAnimais ] = useState();
    const [showModal, setShowModal] = useState(false)

    useEffect(async()=>{
        
        const response = await getToday()
        setAnimais(response)
        setShowModal(true)
    },[])

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Especie</TableCell>
                        <TableCell>Raça</TableCell>
                        <TableCell>Sexo</TableCell>
                        <TableCell align="right">Idade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                   showModal ?  animais.map((row) => (
                        <TableRow >
                            <TableCell>{row.nome}</TableCell>
                            <TableCell>{row.especie}</TableCell>
                            <TableCell>{row.raca}</TableCell>
                            <TableCell>{row.sexo}</TableCell>
                            <TableCell align="right">{row.idade}</TableCell>
                        </TableRow>
                    ))
                    : null
                    }
                </TableBody>
            </Table>
            
        </>
    );
}
export default Orders;