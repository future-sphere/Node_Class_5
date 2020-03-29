const handler = ({ res, success, data, error }) => {
  console.log(res, success, data, error);
  if (error) {
    return res.json({
      data: error,
      success: false,
    });
  }
  return res.json({
    success,
    data,
  });
};

export default handler;
