// AdminDashboard.tsx
"use client"
import React, { useState } from 'react';
import AddFlight from '../adminOnly/addFlight/page';
import AddFlightSchedule from '../adminOnly/addFlightSchedule/page';
import AddAirport from '../adminOnly/addairport/page';
import AddAircraft from '../adminOnly/addAircraft/page';
import './page.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('addFlight');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="tabs">
                <button 
                    className={activeTab === 'addFlight' ? 'active' : ''}
                    onClick={() => handleTabChange('addFlight')}
                >
                    Add Flight
                </button>
                <button
                    className={activeTab === 'addFlightSchedule' ? 'active' : ''}
                    onClick={() => handleTabChange('addFlightSchedule')}
                >
                    Add Flight Schedule
                </button>
                <button
                    className={activeTab === 'addAirport' ? 'active' : ''}
                    onClick={() => handleTabChange('addAirport')}
                >
                    Add Airport
                </button>
                <button
                    className={activeTab === 'addAircraft' ? 'active' : ''}
                    onClick={() => handleTabChange('addAircraft')}
                >
                    Add Aircraft
                </button>
            </div>
            {activeTab === 'addFlight' && <AddFlight />}
            {activeTab === 'addFlightSchedule' && <AddFlightSchedule />}
            {activeTab === 'addAirport' && <AddAirport />}
            {activeTab === 'addAircraft' && <AddAircraft />}
        </div>
    );
};

export default AdminDashboard;