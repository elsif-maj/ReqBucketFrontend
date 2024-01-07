import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as binService from '../services/bins';
import { Bin } from '../types';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BinsList = () => {
  const [bins, setBins] = useState<Bin[]>([]);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const allBins = await binService.getAllBins();
        setBins(allBins);
        console.log(`Fetched ${allBins.length} bins, first one is:`, allBins[0]);
      } catch (error) {
        console.error("Failed to fetch bins:", error);
        // Handle the error appropriately here
      }
    };

    fetchBins();
  }, []);

  return (
    <div>
      <h2>List of Bins</h2>
      <ul>
        {bins.map(bin => (
          <li key={bin.binPath}>
            <Link to={`/bins/${bin.binPath}`}>{bin.binPath}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BinsList;
