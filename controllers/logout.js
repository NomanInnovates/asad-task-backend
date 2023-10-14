const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.end();
};

module.exports = logout;
