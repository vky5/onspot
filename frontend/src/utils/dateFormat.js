export default function formatDate(rawDate) {
    const date = new Date(rawDate);
    const formattedDate = date.toLocaleDateString();
    
    return formattedDate;
  }