import "./App.css";
import React, { useState, useEffect } from "react";
import table from "./Table_Input.csv";
import { read, utils } from "xlsx";
import { Stack, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Card,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Header from "./component/Header";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';


function App() {
  const [csvData, setCsvData] = useState([]);
  const [firstIndex, setFirstIndex] = useState("");
  const [secondIndex, setSecondIndex] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("+");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [result, setResult] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; // Default operation is addition

  useEffect(() => {
    // Read the csv file
    (async () => {
      const f = await fetch(table);
      const ab = await f.arrayBuffer();

      const wb = read(ab);

      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const data = utils.sheet_to_json(ws); // generate objects

      setCsvData(data); // update state

      const result = calculateValue(firstIndex, secondIndex, selectedOperation);
      if(!result){
        setResult(0);
      }else{
      setResult(parseFloat(result).toFixed(2));
      }
      
    })();
  }, [firstIndex, secondIndex, selectedOperation]);

  // Handle changes in the form
  const handleFirstIndexChange = (event) => {
    setFirstIndex(event.target.value);
  };

  const handleSecondIndexChange = (event) => {
    setSecondIndex(event.target.value);
  };

  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };

  // Calculate the value of the selected operation
  const calculateValue = (firstIndex, secondIndex, selectedOperation) => {
    const firstInd = csvData.find((row) => row["Index #"] === firstIndex);
    const secondInd = csvData.find((row) => row["Index #"] === secondIndex);

    if (!firstInd || !secondInd) {
      console.log("Index not found");
      return;
    }
    const first = parseInt(firstInd.Value);
    const second = parseInt(secondInd.Value);

    parseInt(secondIndex);
    switch (selectedOperation) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      default:
        break;
    }
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Box
      sx={{
        backgroundImage: `url(${"https://e1.pxfuel.com/desktop-wallpaper/43/739/desktop-wallpaper-abstract-gray-waves-in-motion-at-top-and-bottom-on-white-backgrounds-white-background.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backdropFilter: "blur(10px)",
      }}
    >

      <Grid
      item xs={12} sm={6} md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 0, sm: 2 },
        }}
      >
        <Header />

        <Snackbar
        open= {!isMobile}
          autoHideDuration={500}
          message="This page is responsive on mobile devices."
          sx={{ bottom: { xs: 10, sm: 10 } }}
        />

        <Container component="main" maxWidth="xs">
          <Grid item xs={12} sm={6} md={4}
            sx={{
              
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              

            }}
          >
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <Card
                sx={{
                  minWidth: isMobile ? '60%' : 445,
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: { xs: 2, sm: 2 },
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
              >
                <h2>Table 1</h2>
                <TableContainer component={Paper} >
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>Index #</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {csvData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow key={row["Index #"]}>
                            <TableCell>{row["Index #"]}</TableCell>
                            <TableCell>{row["Value"]}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={csvData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
              <Card
                sx={{
                  minWidth: isMobile ? '60%' : 445,
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: { xs: 2, sm: 2 },
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
              >
                <h2>Table 2</h2>
                <TableContainer
                  component={Paper}
                 
                >
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Alpha</TableCell>
                        <TableCell>
                          {calculateValue("A5", "A20", "+")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Beta</TableCell>
                        <TableCell>
                          {calculateValue("A15", "A7", "/")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Charlie</TableCell>
                        <TableCell>
                          {calculateValue("A13", "A12", "*")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell >
                          <Stack spacing={2}>
                            <Typography >
                              Custom Operation :{" "}
                            </Typography>
                            <form>
                              <Stack direction="row" spacing={2}>
                                <Box>
                                  <InputLabel>First Index</InputLabel>
                                  <Select
                                    value={firstIndex}
                                    label="First Index"
                                    onChange={handleFirstIndexChange}
                                    placeholder="Select Index"
                                  >
                                    {csvData.map((row) => (
                                      <MenuItem
                                        value={row["Index #"]}
                                        key={row["Index #"]}
                                      >
                                        {row["Index #"]}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Box>
                                <Box>
                                  <InputLabel>Operation</InputLabel>
                                  <Select
                                    value={selectedOperation}
                                    onChange={handleOperationChange}
                                  >
                                    <MenuItem value="+">+</MenuItem>
                                    <MenuItem value="-">-</MenuItem>
                                    <MenuItem value="*">*</MenuItem>
                                    <MenuItem value="/">/</MenuItem>
                                  </Select>
                                </Box>
                                <Box>
                                  <InputLabel>Second Index</InputLabel>
                                  <Select
                                    value={secondIndex}
                                    label="Second Index"
                                    onChange={handleSecondIndexChange}
                                   
                                    placeholder="Select Index"
                                  >
                                    {csvData.map((row) => (
                                      <MenuItem
                                        value={row["Index #"]}
                                        key={row["Index #"]}
                                      >
                                        {row["Index #"]}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Box>
                              </Stack>
                              <Box />
                            </form>{" "}
                          </Stack>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                        <Typography variant="h2">{result}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Stack>
          </Grid>
        </Container>
      </Grid>
    </Box>

  );
}

export default App;
