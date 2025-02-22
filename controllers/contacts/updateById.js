const { updateService } = require("../../services/");

const updateById = async (req, res) => {
  const result = await updateService(req);

  res.status(200).json(result);
};

module.exports = updateById;
