function formatDateToMonthDay(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
  
    // Define options for formatting
    const options = {
      month: 'long', // Full month name
      day: 'numeric' // Day of the month
    };
  
    // Use Intl.DateTimeFormat to format the date
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  }
  
export default formatDateToMonthDay