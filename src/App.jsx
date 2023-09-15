import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { weights } from "./weights";

const App = () => {
  const [data, setData] = useState(weights);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubgroup, setSelectedSubgroup] = useState("");
  const [length, setLength] = useState("");
  const [result, setResult] = useState("");
  const [selectedGroupData, setSelectedGroupData] = useState({});


  const handleGroupChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    setSelectedSubgroup("");
    if (group in data) {
      setSelectedGroupData(data[group]);
    } else {
      setSelectedGroupData({});
    }
  };

  const handleSubgroupChange = (e) => {
    const subgroup = e.target.value;
    setSelectedSubgroup(subgroup);
  };

  const calculateWeight = () => {
    if (selectedGroup in data) {
      if (selectedGroupData && typeof selectedGroupData === "object") {
        const weightPerKm = selectedGroupData[selectedSubgroup][0].value;
        debugger;
        if (weightPerKm) {
          const totalWeight = parseFloat(length) * weightPerKm;
          setResult(totalWeight.toFixed(1) + " кг");
        } else {
          setResult("Свойство 'Расчетная масса (вес)' не найдено.");
        }
      } else {
        setResult("Выбранная группа не является объектом.");
      }
    } else {
      setResult("Выбранная группа не найдена.");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "500px",
        height: "500px",
        border: "3px double #ccc", 
        borderRadius: "30px", 
        padding: "20px", 
        marginTop: "150px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Калькулятор массы кабеля
      </Typography>

  <FormControl fullWidth variant="filled">
  <InputLabel id="group-label">Группа марка-размера:</InputLabel>
  <Select
    labelId="group-label"
    id="group-select"
    value={selectedGroup}
    onChange={handleGroupChange}
    sx={{ width: "100%" }}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: "300px",
          overflowY: "auto",  
        },
      },
    }}
  >
    <MenuItem value="">
      <em>Выберите группу</em>
    </MenuItem>
    {Object.keys(data).map((group) => (
      <MenuItem key={group} value={group}>
        {group}
      </MenuItem>
    ))}
  </Select>
</FormControl>
      <FormControl fullWidth variant="filled">
        <InputLabel id="subgroup-label">Подгруппа марка-размера:</InputLabel>
        <Select
          labelId="subgroup-label"
          id="subgroup-select"
          value={selectedSubgroup}
          onChange={handleSubgroupChange}
          disabled={!selectedGroup}
          sx={{ width: "100%" }} 
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "220px", 
                overflowY: "auto",
              },
            },
          }}
        >
          <MenuItem value="">
            <em>Выберите подгруппу</em>
          </MenuItem>
          {selectedGroup &&
            Object.keys(selectedGroupData).map((subgroup) => {
              const trimmedSubgroup = subgroup.replace(`${selectedGroup} `, "");
              return (
                <MenuItem key={subgroup} value={subgroup}>
                  {trimmedSubgroup}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        id="length-input"
        label="Длина кабеля (км)"
        variant="outlined"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={calculateWeight}>
        Рассчитать
      </Button>
      <div style={{width:'100%'}}>
        <Typography variant="h6">
          Результат: <span>{result}</span>
        </Typography>
      </div>
    </Container>
  );
}

export default App;
