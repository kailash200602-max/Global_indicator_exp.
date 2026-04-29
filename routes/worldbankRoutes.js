import express from 'express';
import axios from 'axios';

const router = express.Router();

const WB_BASE_URL = 'https://api.worldbank.org/v2';

// Fetch Indicator Data for a Country
router.get('/country/:code/indicator/:indicatorId', async (req, res) => {
  const { code, indicatorId } = req.params;
  try {
    const response = await axios.get(`${WB_BASE_URL}/country/${code}/indicator/${indicatorId}?format=json&per_page=100`);
    if (response.data && response.data[1]) {
      // Filter out null values and sort by year ascending
      const data = response.data[1]
        .filter(item => item.value !== null)
        .map(item => ({
          year: parseInt(item.date),
          value: item.value,
          country: item.country.value
        }))
        .sort((a, b) => a.year - b.year);
      res.json(data);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching World Bank data' });
  }
});

// Fetch Global Map Data for a specific year (2021)
router.get('/global/:indicatorId', async (req, res) => {
  const { indicatorId } = req.params;
  try {
    const response = await axios.get(`${WB_BASE_URL}/country/all/indicator/${indicatorId}?date=2021&format=json&per_page=500`);
    if (response.data && response.data[1]) {
      const data = response.data[1]
        .filter(item => item.value !== null && item.countryiso3code)
        .map(item => ({
          countryId: item.countryiso3code,
          value: item.value
        }));
      res.json(data);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error('Global Map Error:', error.message);
    res.status(500).json({ message: 'Error fetching Global World Bank data' });
  }
});

// Compare Multiple Countries for an Indicator
router.get('/compare', async (req, res) => {
  const { countries, indicator } = req.query;
  if (!countries || !indicator) return res.status(400).json({ message: 'Missing parameters' });
  
  const countryList = countries.split(';');
  try {
    const promises = countryList.map(code => 
      axios.get(`${WB_BASE_URL}/country/${code}/indicator/${indicator}?format=json&per_page=100`)
    );
    
    const results = await Promise.all(promises);
    
    let formatted = [];
    results.forEach(response => {
      if (response.data && response.data[1]) {
        const countryData = response.data[1]
          .filter(item => item.value !== null)
          .map(item => ({
            year: parseInt(item.date),
            value: item.value,
            country: item.country.value,
            countryId: item.countryiso3code
          }));
        formatted = [...formatted, ...countryData];
      }
    });
    
    formatted.sort((a, b) => a.year - b.year);
    res.json(formatted);
  } catch (error) {
    console.error('Compare Map Error:', error.message);
    res.status(500).json({ message: 'Error fetching World Bank data' });
  }
});

export default router;
