// components/TrafficDashboard.js

import { LiveData } from "../types/trafficData";
import styles from "../page.module.css";
const TrafficDashboard = ({ liveData }: { liveData: LiveData }) => {
  return (
    <div className={styles.dashboardContainer}>
      <h2>Traffic Dashboard</h2>
      <div className={styles.dataGrid}>
        <div className={styles.dataItem}>
          <strong>Jams Count:</strong> {liveData.JamsCount}
        </div>
        <div className={styles.dataItem}>
          <strong>Total Length of Jams:</strong> {liveData.JamsLength} km
        </div>
        <div className={styles.dataItem}>
          <strong>Traffic Index:</strong> {liveData.TrafficIndexLive}
        </div>
        <div className={styles.dataItem}>
          <strong>Last Update:</strong> {liveData.UpdateWeekDay},{" "}
          {liveData.UpdateDate} at {liveData.UpdateTime}
        </div>
      </div>
      {/* You can add charts or graphs here if needed */}
    </div>
  );
};

export default TrafficDashboard;
