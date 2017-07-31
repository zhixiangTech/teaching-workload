var config = require('../../config/authorityConfig');

/**
 * 查询权限
 * @param {Object} req
 * @param {Object} res
 */
module.exports = function (req, res) {
    res.status(200).json(config);
};