import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Prontuario from './prontuario';

const useStyles = makeStyles((theme) => ({
    Card: {
        width: '220px',
        margin: 8
    }
}));

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        
    </Box>
);
const CardAnimal = ({ data }) => {
    const history = useHistory()
    
    const { nome, idade, raca, especie, sexo, pelagem, temperamento, peso, _id:id  } = data;
    
    const onClick = () => {
        history.push(`pets/prontuario/${id}`)
    };

    const classes = useStyles();

    return (
        <Card className={classes.Card}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {especie}
                </Typography>
                <Typography variant="h5" component="div">
                    {nome}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Raça: {raca}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Idade: {idade}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Sexo: {sexo}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Peso: {peso}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Temperamento: {temperamento}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClick}>Prontuário</Button>
            </CardActions>
        </Card>
    )
};

export default CardAnimal;