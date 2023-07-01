import React from 'react';
import './countries.css';
import {useState, useEffect} from 'react';
import Navbar from '../../Components/Navbar';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';


const Countries = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnDefs = [
    { field: 'name.common', headerName: 'Common Name' },
    { field: 'capital', headerName: 'Capital' },
    { field: 'region', headerName: 'Region' },
    {
      field: 'languages',
      headerName: 'Languages',
      valueGetter: ({ data }) => {
        if (data.languages) {
          const languageNames = Object.values(data.languages);
          return languageNames.join(', ');
        }
        return '';
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setRowData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className='ag-theme-alpine-dark' style={{height:500}}>
      {loading ? (
          <div className='loading'>
            <h1>Loading the table. Wait...</h1>
            </div>
        ) : (
          <AgGridReact rowData={rowData} columnDefs={columnDefs} />
        )}
    </div>
    </div>
  )
}

export default Countries;