import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import vehiclesData from '../data/vehicles.json';

export default function ContactForm() {
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    setSelectedBrand('');
    setSelectedModel('');
    setBrandOptions(
      vehicles.filter((vehicle) => vehicle.Year === year).map((vehicle) => vehicle.Brand)
    );
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedModel('');
    setModelOptions(
      vehicles.filter((vehicle) => vehicle.Year === selectedYear && vehicle.Brand === brand)
        .map((vehicle) => vehicle.Model)
    );
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <form>
      <TextField label="Name" variant="outlined" margin="normal" fullWidth required />
      <TextField label="Surname" variant="outlined" margin="normal" fullWidth required />
      <TextField label="Phone" variant="outlined" margin="normal" fullWidth required />

      <Select
        label="Year"
        variant="outlined"
        margin="normal"
        fullWidth
        value={selectedYear}
        onChange={handleYearChange}
        required
      >
        <MenuItem value="">-- Select Year --</MenuItem>
        {Array.from(new Set(vehicles.map((vehicle) => vehicle.Year))).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      <Select
        label="Brand"
        variant="outlined"
        margin="normal"
        fullWidth
        value={selectedBrand}
        onChange={handleBrandChange}
        required
        disabled={!selectedYear}
      >
        <MenuItem value="">-- Select Brand --</MenuItem>
        {brandOptions.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </Select>

      <Select
        label="Model"
        variant="outlined"
        margin="normal"
        fullWidth
        value={selectedModel}
        onChange={handleModelChange}
        required
        disabled={!selectedBrand}
      >
        <MenuItem value="">-- Select Model --</MenuItem>
        {modelOptions.map((model) => (
          <MenuItem key={model} value={model}>
            {model}
          </MenuItem>
        ))}
      </Select>

      <TextField label="Colour" variant="outlined" margin="normal" fullWidth required />
      <TextField label="Plate" variant="outlined" margin="normal" fullWidth required />

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}