import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import icon from './icons-loc.png'
import './chart.css'


// Custom marker icon
const customMarkerIcon = L.icon({
  iconUrl: icon,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const CovidMap = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/countries');
      setCountryData(response.data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return (
    <div className='mapcontainer'>
      <h2>COVID-MAP</h2>
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '450px', width: '100%', }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countryData.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={customMarkerIcon}
        >
          <Popup>
            <div>
              <h3>{country.country}</h3>
              <p>Cases: {country.cases}</p>
              <p>Deaths: {country.deaths}</p>
              <p>Recovered: {country.recovered}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default CovidMap;
