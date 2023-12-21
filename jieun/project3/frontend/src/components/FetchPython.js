import React from 'react'

const FetchPython = () => {

    const fetchData2 = async () => {
        try {
          const response2 = await fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newWeatherData, spdValue, momentDateValue }),
          });
      
          if (!response2.ok) {
            throw new Error(`HTTP error! Status: ${response2.status}`);
          }
      
          const result = await response2.json();
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData2();
  return (
    <div>FetchPython</div>
  )
}

export default FetchPython