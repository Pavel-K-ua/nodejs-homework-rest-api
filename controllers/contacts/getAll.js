const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const favorite = req.query.favorite;
  const filter = {};

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const options = {
    page,
    limit,
    // sort: { name: 1 },
  };
  console.log(options);
  console.log(filter);

  const { _id: owner } = req.user;
  const query = await Contact.find({ owner }, "name email phone favorite owner")
    .populate("owner", "email")
    .find(filter);
  console.log(query);

  const result = await Contact.paginate({}, options);
  res.json(result);
};

module.exports = getAll;
