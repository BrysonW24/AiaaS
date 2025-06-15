import { useState, useEffect } from 'react';
import { barberService } from '../services/api';

export const useBarberSearch = (initialLocation = 'Sydney, NSW') => {
  const [location, setLocation] = useState(initialLocation);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxDistance: 10,
    priceRange: [0, 100],
    specialties: [],
  });

  const searchBarbers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await barberService.getBarbers(location);
      setBarbers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredBarbers = barbers.filter(barber => {
    return (
      barber.rating >= filters.minRating &&
      barber.distance <= filters.maxDistance &&
      barber.price >= filters.priceRange[0] &&
      barber.price <= filters.priceRange[1] &&
      (filters.specialties.length === 0 || 
       filters.specialties.includes(barber.specialty))
    );
  });

  useEffect(() => {
    searchBarbers();
  }, [location]);

  return {
    location,
    setLocation,
    barbers: filteredBarbers,
    loading,
    error,
    filters,
    updateFilters,
    searchBarbers,
  };
}; 