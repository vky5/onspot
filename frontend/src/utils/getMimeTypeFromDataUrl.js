// get MIME type from Data URL
export const getMimeTypeFromDataUrl = (dataUrl) => {
    // Split the data URL to get the MIME type part
    const mimeTypePart = dataUrl.split(";")[0];

    // Extract the MIME type
    const mimeType = mimeTypePart.split(":")[1];

    return mimeType;
  };