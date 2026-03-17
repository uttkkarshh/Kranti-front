import { useMapEvents } from 'react-leaflet';

export const useMapTap = ({ onClick }) => {
  return useMapEvents({
    click: (e) => {
      if (onClick) onClick(e.latlng);
    },
  });
};

export const useMapZoomLogger = () => {
  return useMapEvents({
    zoomend: (event) => {
      const map = event.target;
      console.log('Map zoom changed to', map.getZoom());
    },
  });
};
