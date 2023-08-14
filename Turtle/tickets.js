document.addEventListener('DOMContentLoaded', function () {
  // JavaScript code to handle the dynamic updates and calculations

   // Function to populate the Duration dropdown dynamically
   function populateDurationDropdown() {
    const dropdown = document.getElementById('time-slot');
    const startTime = 7; // 07:00 am (start time in 24-hour format)
    const endTime = 18; // 06:00 pm (end time in 24-hour format)

    // Loop through the time slots with 1-hour gaps
    for (let hour = startTime; hour <= endTime; hour++) {
      let slot;
      if ((hour >= 10 && hour <= 12) || (hour >= 15 && hour <= 18)) {
        slot = hour < 10 ? `0${hour}.00 am - ${(hour + 1)}.00 am (Peak)` : `${hour}.00 am - ${(hour + 1)}.00 am (Peak)`;
      } else {
        if (hour === 12) {
          slot = `${hour}.00 pm - 01.00 pm`;
        } else if (hour > 12) {
          slot = `${hour - 12}.00 pm - ${(hour - 11)}.00 pm`;
        } else {
          slot = hour < 10 ? `0${hour}.00 am - ${(hour + 1)}.00 am` : `${hour}.00 am - ${(hour + 1)}.00 am`;
        }
      }
      const option = document.createElement('option');
      option.text = slot;
      dropdown.add(option);
    }
  }


  function calculateDuration(selectedTimeSlot) {
    // Get the start and end times of the selected time slot
    const startTime = selectedTimeSlot.split('-')[0];
    const endTime = selectedTimeSlot.split('-')[1];
  
    // Calculate the duration in hours
    const duration = (endTime - startTime) / 3600;
  
    // Check if the time slot is peak hour
    const isPeakHour = (startTime >= '10:00' && startTime <= '12:00') ||
      (startTime >= '15:00' && startTime <= '18:00');
  
    // Return the duration in hours, including the peak hour multiplier
    return duration * (isPeakHour ? 1.5 : 1);
  }
  
  // Function to update the summary table
  function updateSummaryTable() {
    // Get selected values from the inputs
    const selectedDate = document.getElementById('date-picker')?.value || '';
    const selectedTimeSlot = document.getElementById('time-slot')?.value || '';
    const slAdultTickets = parseInt(document.getElementById('sl-adult')?.value) || 0;
    const slChildTickets = parseInt(document.getElementById('sl-child')?.value) || 0;
    const foreignerAdultTickets = parseInt(document.getElementById('foreigner-adult')?.value) || 0;
    const foreignerChildTickets = parseInt(document.getElementById('foreigner-child')?.value) || 0;
    const infantTickets = parseInt(document.getElementById('infant')?.value) || 0;
  
    const duration = calculateDuration(selectedTimeSlot); // Calculate the duration

    // Calculate total payable amount
    // Add your calculation logic based on the provided pricing information
    const totalPayable = calculateTotalPayable(slAdultTickets, slChildTickets, foreignerAdultTickets, foreignerChildTickets);

    // Update the summary table with the new values
    const summaryTable = document.getElementById('summary-table');
    summaryTable.innerHTML = `
       <tr>
    <td>Date</td>
    <td>${selectedDate}</td>
  </tr>
  <tr>
    <td>Time</td>
    <td>${selectedTimeSlot}</td>
  </tr>
  <tr>
    <td>SL Adult</td>
    <td>${slAdultTickets}</td>
  </tr>
  <tr>
    <td>SL Child</td>
    <td>${slChildTickets}</td>
  </tr>
  <tr>
    <td>Foreigner Adult</td>
    <td>${foreignerAdultTickets}</td>
  </tr>
  <tr>
    <td>Foreigner Child</td>
    <td>${foreignerChildTickets}</td>
  </tr>
  <tr>
    <td>Infant</td>
    <td>${infantTickets}</td>
  </tr>
  <tr>
    <td>Total Payable</td>
    <td>$${totalPayable}</td>
  </tr>
    `;
      
    
    // Store the selected values in local storage
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedTimeSlot', selectedTimeSlot);
    localStorage.setItem('slAdultTickets', slAdultTickets);
    localStorage.setItem('slChildTickets', slChildTickets);
    localStorage.setItem('foreignerAdultTickets', foreignerAdultTickets);
    localStorage.setItem('foreignerChildTickets', foreignerChildTickets);
    localStorage.setItem('infantTickets', infantTickets);
    
  }

  // Function to calculate the total payable amount
  function calculateTotalPayable(slAdultTickets, slChildTickets, foreignerAdultTickets, foreignerChildTickets) {
    // Add your calculation logic based on the provided pricing information
    // You can use the selected time slot to determine normal or peak hour pricing
    // For example:
    const normalChargeSLAdult = 4;
    const peakChargeSLAdult = 6;
    const normalChargeSLChild = 2;
    const peakChargeSLChild = 3;
    const normalChargeForeignerAdult = 10;
    const peakChargeForeignerAdult = 13;
    const normalChargeForeignerChild = 5;
    const peakChargeForeignerChild = 8;

    const totalSLAdultCharge = (slAdultTickets * normalChargeSLAdult) + (slChildTickets * peakChargeSLAdult);
    const totalSLChildCharge = (slChildTickets * normalChargeSLChild) + (slChildTickets * peakChargeSLChild);
    const totalForeignerAdultCharge = (foreignerAdultTickets * normalChargeForeignerAdult) + (foreignerChildTickets * peakChargeForeignerAdult);
    const totalForeignerChildCharge = (foreignerChildTickets * normalChargeForeignerChild) + (foreignerChildTickets * peakChargeForeignerChild);

    const totalPayable = totalSLAdultCharge + totalSLChildCharge + totalForeignerAdultCharge + totalForeignerChildCharge;

    return totalPayable;
  }

  // Rest of the code remains unchanged...

  // Duration dropdown on page load
  populateDurationDropdown();
  document.getElementById('date-picker')?.addEventListener('change', updateSummaryTable);
  document.getElementById('time-slot')?.addEventListener('change', updateSummaryTable);
  document.getElementById('sl-adult')?.addEventListener('change', updateSummaryTable);
  document.getElementById('sl-child')?.addEventListener('change', updateSummaryTable);
  document.getElementById('foreigner-adult')?.addEventListener('change', updateSummaryTable);
  document.getElementById('foreigner-child')?.addEventListener('change', updateSummaryTable);
  document.getElementById('infant')?.addEventListener('change', updateSummaryTable);


   // Initial update of the summary table when the page loads for the first time
   const currentDate = new Date().toLocaleDateString('en-GB');
   const initialTimeSlot = '07.00 am - 08.00 am';
   document.getElementById('date-picker').value = '';
   document.getElementById('time-slot').value = initialTimeSlot;
   document.getElementById('sl-adult').value = 0;
   document.getElementById('sl-child').value = 0;
   document.getElementById('foreigner-adult').value = 1;
   document.getElementById('foreigner-child').value = 0;
   document.getElementById('infant').value = 0;
 
   
  // Initial update of the summary table
  updateSummaryTable();
  

  
});
