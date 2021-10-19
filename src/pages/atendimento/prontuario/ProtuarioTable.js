import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Visibility from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button';
import { fetchAnimals } from '../../../redux/actions'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const ProntuarioTable = ({ fetchAnimals, data, animalReducer, viewProntuario }) => {
    
    useEffect(async()=>{
        await fetchAnimals()
    },[])
    const history = useHistory()
    const animal = animalReducer.animals
    const redenrTable = animal.filter(el => el._id === data)
    const classes = useStyles();
    const showView = e => {
        viewProntuario(e)
    } 
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
                    {redenrTable[0].prontuarios.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.data}</TableCell>
                            <TableCell>{row.descricao}</TableCell>
                            <TableCell>{row.veterinario}</TableCell>
                            <TableCell>
                               <Button onClick={()=> showView(row)} > <Visibility /> </Button>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </>
    );
};

const mapStateToProps = state => ({
    animalReducer: state.animals,
    userReducer: state.user,
    stateAll: state
});

const mapDispatch = dispatch => bindActionCreators({
    fetchAnimals
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(ProntuarioTable)