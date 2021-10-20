import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid'
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@material-ui/icons/Add';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { useStyles } from "./../../styles"
import { fetchAnimals } from "./../../redux/actions"

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome do animal', width: 200 },
  { field: 'especie', headerName: 'Especie do animal', width: 200 },
];

const listSelector = createSelector(
  (state) => state.animals.animals,
  (list) => list,
  (list) => list.map(animal => {
    return {
      id: animal._id,
      nome: animal.nome,
      especie: animal.especie
    }
  })
)

const Pets = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const result = useSelector(listSelector)

  useEffect(() => {
    dispatch(fetchAnimals())
  }, [dispatch])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Box style={{ marginBottom: 20 }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Link to="/pets/add">
            <Button variant="contained" endIcon={<AddIcon />}>
              Adicionar
            </Button>
          </Link>
        </Stack>
      </Box>

      <Paper >
        <DataGrid
          rows={result}
          columns={columns}
          rowsPerPageOptions={[10]}
          checkboxSelection
          autoHeight
        />
      </Paper>
    </Container>
  )
}


export default Pets