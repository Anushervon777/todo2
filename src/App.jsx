import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function App() {
  const [data, setData] = React.useState([
    { name: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4.0, id: 1 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3, id: 2 },
    { name: 'Eclair', calories: 262, fat: 16, carbs: 54, protein: 6.0, id: 3 },
    { name: 'Cupcake', calories: 305, fat: 17, carbs: 67, protein: 4.0, id: 4 },
  ]);
  const [open, setOpen] = React.useState(false);
  const [nameValue, setNameValue] = React.useState('');
  const [caloriesValue, setCaloriesValue] = React.useState('');
  const [currentId, setCurrentId] = React.useState(null);

  const handleOpen = (id, name, calories) => {
    setCurrentId(id);
    setNameValue(name);
    setCaloriesValue(calories);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const saveEdit = () => {
    setData(
      data.map((el) =>
        el.id === currentId
          ? { ...el, name: nameValue, calories: caloriesValue } // Update the specific item
          : el
      )
    );
    handleClose(); 
  };

  const del = (id) => {
    setData(data.filter((el) => el.id !== id));
  };

  const [addOpen, setAddOpen] = React.useState(false);
  const addOpenHandler = () => setAddOpen(true);
  const addCloseHandler = () => setAddOpen(false);
  const [addName, setAddName] = React.useState('');
  const [addCalories, setAddCalories] = React.useState('');

  const addItem = () => {
    if (addName && addCalories) {
      setData([
        ...data,
        { name: addName, calories: addCalories, id: data.length + 1 }, 
      ]);
      setAddName('');
      setAddCalories('');
      addCloseHandler(); 
    }
  };

  let [searchInp, setSearchInp] = React.useState('')

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <AddIcon onClick={addOpenHandler} style={{ cursor: 'pointer', margin: '10px' }} />
        </div>
        <TextField 
          id="outlined-basic" 
          label="Search" 
          variant="outlined" 
          value={searchInp} 
          onChange={(e) => setSearchInp(e.target.value)} 
          style={{ width: "500px" }} 
        />
        <Modal
          open={addOpen}
          onClose={addCloseHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              style={{ margin: '10px' }}
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              style={{ margin: '10px' }}
              value={addCalories}
              onChange={(e) => setAddCalories(e.target.value)}
              id="outlined-basic"
              label="Calories"
              variant="outlined"
            />
            <div style={{ marginTop: '10px' }}>
              <CancelIcon onClick={addCloseHandler} style={{ cursor: 'pointer' }} />
              <SaveIcon onClick={addItem} style={{ cursor: 'pointer' }} />
            </div>
          </Box>
        </Modal>
      </div>

      <div style={{ margin: '20px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((el) => el.name.toLowerCase().includes(searchInp.toLowerCase().trim())) 
                .map((el) => (
                  <TableRow key={el.id}>
                    <TableCell>{el.name}</TableCell>
                    <TableCell align="right">{el.calories}</TableCell>
                    <TableCell align="right">{el.fat}</TableCell>
                    <TableCell align="right">{el.carbs}</TableCell>
                    <TableCell align="right">{el.protein}</TableCell>
                    <TableCell align="right">
                      <DeleteIcon onClick={() => del(el.id)} style={{ cursor: 'pointer' }} />
                      <EditIcon onClick={() => handleOpen(el.id, el.name, el.calories)} style={{ cursor: 'pointer' }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ margin: 'auto' }}>
            <TextField
              style={{ margin: '10px' }}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              style={{ margin: '10px' }}
              value={caloriesValue}
              onChange={(e) => setCaloriesValue(e.target.value)}
              id="outlined-basic"
              label="Calories"
              variant="outlined"
            />
            <div style={{ marginTop: '10px' }}>
              <CancelIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
              <SaveIcon onClick={saveEdit} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
