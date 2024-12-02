import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip'; // Import Tooltip from react-tooltip

import './ProgressBar.css'; // Custom CSS for styling

const MyProgressBarJumbo = ({containerWidth, progressBarId,jumboId }) => {
  // Find the segment with the furthest end point to use for scaling
  const [segments,setSegments] = useState([]);
  
  console.log('segments in jumbobar',segments,containerWidth, progressBarId,jumboId);

  const maxEnd = Math.max(...segments.map(segment => segment.end));

  // Generate a timestamp or unique identifier to further ensure uniqueness
  const uniqueSuffix = `${Date.now()}-${Math.random()}`;
 
  const updater =(width)=>{
    // console.log('width',width);
    return width;
  }

   const faults = (FaultData)=>{
    console.log(FaultData);

    const FaultSegmentArray = FaultData.map((fault)=>{
        return {
            start: fault.fault_start_point,
            end : Number(fault.fault_start_point) + Number(fault.fault_length),
            color: '#EB455F',
            code:fault.id
        }
      });
      console.log('FaultSegmentArray',FaultSegmentArray);

    return FaultSegmentArray;
   }

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs/?jumbo_roll_id=${jumboId}&small_roll_id=0`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      setSegments(faults(result?.faultlogs));

      console.log('result fault................ in jumbo progress bar',result.faultlogs);
    };
    fetchData();
  }, []);

  return (
       <div style={{padding:'10px'}}>  
                      <div>
                        {" Jumbo Roll Reverse Life Cycle Assessment (RLCA)" }
                      </div>
                     {/* <ProgressBar  now={220} label={`${170}m`} className='progress_bar_color1' variant="info"/> */}
                       <div className="progress-bar-container-modal"> {/* Fixed visual width */}
                        {segments.length >0 ?segments.map((segment) => {
                          // Scale the width and position relative to the containerWidth
                          const width = ((segment.end - segment.start) / containerWidth) * 100;
                          const left = (segment.start / containerWidth) * 100;

                          // Determine the class for rounded corners based on position
                          let className = 'progress-segment';
                          if (segment.start === 0) className += ' first-segment'; // First segment
                          if (segment.end === maxEnd) className += ' last-segment'; // Segment that ends at the furthest point

                          return (
                            <div
                              key={`${progressBarId}-${segment.start}-${updater(segment.end)}-${segment.code}-${uniqueSuffix}`} // Ensure unique keys across progress bars
                              className={className}
                              style={{
                                width: `${updater(width)}%`,
                                backgroundColor: updater(segment.color),
                                position: 'absolute',
                                left: `${left}%`, // Position relative to the containerWidth
                                top: '0',
                                height: '100%',
                                zIndex: segments.length - segments.indexOf(segment),
                              }}
                              data-tooltip-id={`tooltip-${progressBarId}-${segment.start}-${updater(segment.end)}-${segment.code}-${uniqueSuffix}`} // Unique ID for each tooltip
                              data-tooltip-html={`<strong>Code:</strong> ${segment.code}<br><strong>Start:</strong> ${segment.start}m<br><strong>End:</strong> ${updater(segment.end)}m`}
                            />
                          );
                        }):''}
                        {/* Fill the remaining space with the base color if not fully used by segments */}
                        {maxEnd < containerWidth && (
                          <div
                            className="progress-segment remaining-segment"
                            style={{
                              width: `${((containerWidth - maxEnd) / containerWidth) * 100}%`, // Fill the remaining space
                              backgroundColor: '#31E1F7', // Base color of the container
                              position: 'absolute',
                              left: `${(maxEnd / containerWidth) * 100}%`,
                              top: '0',
                              height: '100%',
                              borderRadius:'0px 10px 10px 0px',
                              zIndex: 1,
                            }}
                          />
                        )}
                        {segments.length >0?segments.map((segment) => (
                          <Tooltip
                            key={`tooltip-${progressBarId}-${segment.start}-${segment.end}-${segment.code}-${uniqueSuffix}`} // Ensure matching and unique ID for tooltip
                            id={`tooltip-${progressBarId}-${segment.start}-${segment.end}-${segment.code}-${uniqueSuffix}`} // Use unique IDs to match data-tooltip-id
                            place="top"
                            type="dark"
                            effect="float"
                            multiline // Use the boolean attribute correctly
                          />
                        )):''}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>0m</span>
                              <span>{containerWidth}m</span>
                          </div>
                   
                      
                      {
                        segments.length < 1 && <div style={{padding:"20px 0px", background:'#8EF3C5'}}>
                           No faults have been reported, but remain alert for any unexpected faults.
                        </div>
                      }
                        
                 
                    <div>
                        {" Reverse Life Cycle Assessment Corrected " }
                      </div>
                     {/* <ProgressBar  now={220} label={`${170}m`} className='progress_bar_color1' variant="warning"/> */}
                  
                </div>

    
  );
};

MyProgressBarJumbo.propTypes = {
//   segments: PropTypes.arrayOf(
//     PropTypes.shape({
//       start: PropTypes.number.isRequired,
//       end: PropTypes.number.isRequired,
//       color: PropTypes.string.isRequired,
//       code: PropTypes.string.isRequired,
//     })
//   ).isRequired,
  containerWidth: PropTypes.number.isRequired, // Represents the full width value (e.g., 300m)
  progressBarId: PropTypes.string.isRequired, // Unique identifier for each progress bar instance
  jumboId: PropTypes.string.isRequired, // Unique identifier for each progress bar instance
};

export default MyProgressBarJumbo;
