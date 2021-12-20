const convertData = (obj) => {
  const res = {};
  Object.entries(obj).forEach(([key, value]) => (res[key] = value["field"]));
  return res;
};
export default convertData;
