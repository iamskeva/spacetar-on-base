export const dateFormat = ( timestamp ) => {
    const date = new Date(timestamp)

    const hours = date.getHours()
    const minutes = date.getMinutes()

    return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0');
}
export const getFirstLetter = (name) => {
    const lettersArray = name
        .split(' ')
        .map(word => word[0]);
    

    if(lettersArray.length === 1) {
        return lettersArray[0]
        .toString()
        .toUpperCase();
    }

    const firstLetters = [lettersArray[0], lettersArray[lettersArray.length - 1]]
    .join('')
    .toUpperCase();

    return firstLetters;
}

export const getUser = (name) => {
    const lettersArray = name
      .split(' ')
      .map(word => {
        const randomIndex = Math.floor(Math.random() * word.length);
        const randomChar = word[randomIndex];
  
        // Check if the character is a letter or a number
        if (isNaN(randomChar)) {
          return randomChar.toUpperCase();
        } else {
          return randomChar;
        }
      });
  
    if (lettersArray.length === 1) {
      return lettersArray[0];
    }
  
    const userLetters = [lettersArray[0], lettersArray[lettersArray.length - 1]].join('');
    return userLetters;
  };
  