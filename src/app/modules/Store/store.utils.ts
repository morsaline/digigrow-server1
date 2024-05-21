export async function generateStoreId(restaurantName: string) {
  // Unique identifier (e.g., initials)

  const firstChar = restaurantName.charAt(0).toUpperCase();
  const lastChar = restaurantName
    .charAt(restaurantName.length - 1)
    .toUpperCase();
  const middleChars = shuffleString(
    restaurantName.substring(1, restaurantName.length - 1).toUpperCase(),
  );

  // Generate a random four-digit number
  const fourDigitNumber = Math.floor(1000 + Math.random() * 9000);

  // Combine and return the ID
  const restaurantId =
    `${firstChar}${lastChar}${middleChars}-${fourDigitNumber}`.replace(
      /\s/g,
      '',
    );

  return restaurantId;
}

/**
 * Shuffles a string and returns a new shuffled string.
 * @param {string} str - The string to shuffle.
 * @returns {string} The shuffled string.
 */
function shuffleString(str: string) {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}
