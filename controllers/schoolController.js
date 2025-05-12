const School = require('../models/school');
const haversine = require('haversine-distance');

// Add a school
exports.addSchool = async (req, res) => {
  console.log('Received POST request with body:', req.body);
  const { name, address, latitude, longitude } = req.body;

  // Enhanced validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'School name is required and must be a valid string' });
  }
  
  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    return res.status(400).json({ error: 'Address is required and must be a valid string' });
  }
  
  // Validate latitude and longitude
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  
  if (isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: 'Latitude must be a valid number between -90 and 90' });
  }
  
  if (isNaN(lng) || lng < -180 || lng > 180) {
    return res.status(400).json({ error: 'Longitude must be a valid number between -180 and 180' });
  }
  try {
    await School.create({ name, address, latitude: lat, longitude: lng });
    console.log('\n=== New School Added Successfully ===');
    console.log(`Name: ${name}`);
    console.log(`Address: ${address}`);
    console.log(`Location: ${lat}, ${lng}`);
    console.log('====================================\n');
    res.status(201).json({ 
      message: 'School added successfully',
      school: { name, address, latitude: lat, longitude: lng }
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to add school to database' });
  }
};

// Get schools and calculate distances
exports.getSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Enhanced validation for query parameters
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required query parameters' });
  }
  
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  
  if (isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: 'Latitude must be a valid number between -90 and 90' });
  }
  
  if (isNaN(lng) || lng < -180 || lng > 180) {
    return res.status(400).json({ error: 'Longitude must be a valid number between -180 and 180' });
  }

  try {
    const schools = await School.getAll();
    const userLocation = { lat, lon: lng };

    const schoolsWithDistance = schools.map((school) => {
      const schoolLocation = { lat: school.latitude, lon: school.longitude };
      // Calculate distance in meters
      const distanceInMeters = haversine(userLocation, schoolLocation);
      
      return { 
        id: school.id,
        name: school.name, 
        address: school.address, 
        latitude: school.latitude, 
        longitude: school.longitude,
        distance: {
          meters: distanceInMeters,
          kilometers: (distanceInMeters / 1000).toFixed(2)
        }
      };
    });

    // Sort schools by distance (ascending)
    schoolsWithDistance.sort((a, b) => a.distance.meters - b.distance.meters);
    
    res.json({
      userLocation: { latitude: lat, longitude: lng },
      schools: schoolsWithDistance
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve schools from database' });
  }
};
