export const calculateReadingTime = (text: string): string => {
  // Remove HTML tags
  const plainText = text.replace(/<[^>]*>/g, "");
  
  // Average reading speed: 200 words per minute for Greek text
  const wordsPerMinute = 200;
  
  // Count words (split by spaces and filter empty strings)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Return formatted string
  if (readingTimeMinutes === 1) {
    return "1 λεπτό";
  } else if (readingTimeMinutes < 60) {
    return `${readingTimeMinutes} λεπτά`;
  } else {
    const hours = Math.floor(readingTimeMinutes / 60);
    const minutes = readingTimeMinutes % 60;
    if (minutes === 0) {
      return hours === 1 ? "1 ώρα" : `${hours} ώρες`;
    } else {
      return hours === 1 
        ? `1 ώρα ${minutes} λεπτά` 
        : `${hours} ώρες ${minutes} λεπτά`;
    }
  }
};