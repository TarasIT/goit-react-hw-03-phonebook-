export const parseDataFromLS = (key, initialValue = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export const saveContactsToLS = (key, contact) => {
  try {
    return localStorage.setItem(key, JSON.stringify(contact));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};
