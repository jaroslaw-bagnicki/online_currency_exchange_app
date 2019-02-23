module.exports = (req, res, next) => {
  res.set(config.RES_HEADERS);
  if (req.method === 'OPTIONS') {
    res.set(config.OPT_RES_HEADERS);
    return res.sendStatus(200);
  }
  next();
}