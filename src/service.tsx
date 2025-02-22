export const fetchUserData = async () => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
