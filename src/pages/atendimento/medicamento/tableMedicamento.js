import React, { useEffect, useCallback } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Visibility from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button'
import find from "lodash/find"
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { fetchAnimals } from '../../../redux/actions'

const listSelector = createSelector(
  (state) => state.animals.animals,
  (list, id) => id,
  (list, id) => {
    let newList = find(list, { "_id": id })
    return newList ? newList.medicamentos : []
  }
)

const ProntuarioTable = ({ id, viewTratamento, onEdit }) => {
  const dispatch = useDispatch()
  const result = useSelector(state => listSelector(state, id))

  useEffect(() => {
    dispatch(fetchAnimals())
  }, [dispatch])

  const showView = useCallback(e => {
    viewTratamento(true)
    onEdit(e)
  }, [onEdit, viewTratamento])

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Data</TableCell>
          <TableCell>Medicamentos</TableCell>
          <TableCell>Veterinário</TableCell>
          <TableCell></TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {result.map((row) => (
          <TableRow key={row._id}>
            <TableCell>{row.data}</TableCell>
            <TableCell>{row.medicamento}</TableCell>
            <TableCell>{row.veterinario}</TableCell>
            <TableCell>
              <Button onClick={() => showView(row)} > <Visibility /> </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  );
};


export default ProntuarioTable