import React from "react";
import { DataGrid } from '@mui/x-data-grid'
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@material-ui/icons/Add';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'

import { useStyles } from "./../../styles"

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Pets = () => {
  const classes = useStyles();

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
          rows={rows}
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