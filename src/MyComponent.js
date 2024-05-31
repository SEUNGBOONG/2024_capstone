import React, { useState, useEffect } from "react";
import { Button, Grid, CircularProgress } from "@material-ui/core";

const App = () => {
  const [bluetoothDevice, setBluetoothDevice] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);
  const [progress, setProgress] = useState(0); // 초기 달성률은 0으로 설정

  useEffect(() => {
    const timer = setInterval(() => {
      // 시간당 0.0001씩 달성률 증가
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 0.0001));
    }, 3600000); // 1시간(3600초)마다 실행

    return () => {
      clearInterval(timer);
    };
  }, []);

  const sendDataToArduino = async () => {
    if (!bluetoothDevice || !characteristic) {
      console.error('Bluetooth device or characteristic not set.');
      return;
    }

    try {
      await characteristic.writeValue(new TextEncoder().encode('f'));
      console.log('Sent command to Arduino: f');
    } catch (error) {
      console.error('Error sending data to Arduino:', error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
      <Grid container spacing={1} justify="center">
        <Grid item>
          <Button variant="contained" color="primary" style={{ width: "160px", height: "160px" }} onClick={sendDataToArduino}>
            <h2>정방향</h2>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" style={{ width: "160px", height: "160px" }} onClick={sendDataToArduino}>
            <h2>역방향</h2>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="gray" style={{ width: "160px", height: "160px" }} onClick={sendDataToArduino}>
            <h2>정지</h2>
          </Button>
        </Grid>
      </Grid>
      <div style={{ position: 'absolute' }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={160}
          thickness={4}
          color="primary"
        />
      </div>
    </div>
  );
};

export default App;
