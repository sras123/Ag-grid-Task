import React from 'react'
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [selectedTab, setSelected] = useState(0);

    const handleChange = (event, newValue) => {
        setSelected(newValue);
    };
    return (
        <>

            <React.Fragment>
                <AppBar sx={{ background: '#3E3F3E' }}>
                    <Toolbar>
                        <PlaceIcon />
                        <Tabs textColor='inherit' value={selectedTab} onChange={handleChange}>
                            <Tab label="Home"
                                component={Link}
                                to="/"
                                sx={{
                                    backgroundColor: selectedTab === 0 ? '#D6B507' : 'inherit',
                                }} />
                            <Tab label="Countries"
                                component={Link}
                                to="/countries"
                                sx={{
                                    backgroundColor: selectedTab === 1 ? '#D6B507' : 'inherit',
                                }} />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        </>
    )
}

export default Navbar