import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const ProntuarioTable = ({ data }) => {
    console.log('data',data[0].prontuarios)
    const classes = useStyles();
    return (
        <>
            
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Veterinário</TableCell>
                        <TableCell></TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data[0].prontuarios.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.data}</TableCell>
                            <TableCell>{row.descricao}</TableCell>
                            <TableCell>{row.veterinario}</TableCell>
                            <TableCell>
                               <Button> <Edit/> </Button>
                               <Button> <Visibility/></Button>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </>
    );
};

export default ProntuarioTable;