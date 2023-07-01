import React from 'react';
import './countries.css';
import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';

const Countries = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleRowClicked = (event) => {
    setSelectedCountry(event.data);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <div className='content'>
      <Navbar />
      <div className='ag-theme-alpine-dark' style={{ height: 500 }}>
        {loading ? (
          <div className='loading'>
            <h1>Loading the table. Wait...</h1>
          </div>
        ) : (
          <AgGridReact rowData={rowData} columnDefs={columnDefs} onRowClicked={handleRowClicked} />

        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-container"
      >
        <h2 className='name'>Country Profile</h2>
        {selectedCountry && (
          <div className='modal-content'>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1 }}>
                <h2 className='box'>Name</h2>
                <h2 className='box'><strong>Capital</strong> </h2>
                <h2 className='box'><strong>Region</strong></h2>
                <h2 className='box'><strong>Languages</strong> </h2>
              </div>
              <div style={{ flex: 2, marginLeft: '10px' }} >
                <h2 className='box-side'>{selectedCountry.name.common}</h2>
                <h2 className='box-side'>{selectedCountry.capital}</h2>
                <h2 className='box-side'>{selectedCountry.region}</h2>
                <h2 className='box-side'>{Object.values(selectedCountry.languages).join(', ')}</h2>
              </div>
            </div>
            <button onClick={closeModal} className="close-button">
              <CloseIcon />
            </button>
          </div>

        )}

      </Modal>
    </div>
  )
}

export default Countries;