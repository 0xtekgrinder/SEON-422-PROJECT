export const getInputReplicas = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/replica/input`);
  const data = await res.json();
  return data;
};

export const getOutputReplicas = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/replica/output`);
  const data = await res.json();
  return data;
};
