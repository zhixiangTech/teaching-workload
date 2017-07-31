/**
 * 路由表
 */
module.exports = {
    /**
     * 当前用户账号
     */
    '/account':{
        all: 'account.check',
        get: 'account.current',
        put:[109001, 'account.update'],

        '/login': {
            put: 'account.login'
        },

        '/logout': {
            put: 'account.logout'
        }
    },

    /**
     * 检查是否登录
     */
    '/*': {
        all: 'account.check'
    },

    // 权限列表
    '/authorities': {
        get: 'authorities'
    }

};