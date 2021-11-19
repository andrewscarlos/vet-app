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
import { fetchUsuarios } from '../../redux/actions'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const ProntuarioTable = ({ fetchUsuarios, data, animalReducer, viewProntuario }) => {
    
    useEffect(async()=>{
         await fetchUsuarios()  
    },[])
    const history = useHistory()
    
    const pessoas = useSelector(state => state.user.fetchPessoas)
    
    
    const showView = e => {
        viewProntuario(e)
    } 
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Função</TableCell>
                        <TableCell></TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {pessoas.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.nome}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.funcao}</TableCell>
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
    fetchUsuarios
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(ProntuarioTable)