import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ActivityLogPage({ activityLogs }) {
  // Your rendering logic for activity logs
  // Similar to DatasGallery.jsx
}

ActivityLogPage.propTypes = {
  activityLogs: PropTypes.arrayOf(
    PropTypes.shape({
      // Define the structure of your activity log object
    })
  ),
};

export default ActivityLogPage;
