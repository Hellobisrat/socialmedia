// Format timestamps like "2h ago"
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) return `${value}${key[0]} ago`;
  }

  return "just now";
}

// Convert file to Base64 (useful for previews)
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Capitalize first letter
export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Extract safe error message from axios
export function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
  );
}

// Check if file is image or video
export function getMediaType(file) {
  if (!file) return null;
  const type = file.type;

  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  return "unknown";
}