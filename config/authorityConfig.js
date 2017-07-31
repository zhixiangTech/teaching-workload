/**
 * 权限配置
 */
module.exports = [
    {
        name: 'allAuth',
        description: '所有权限',
        code: 100000
    },
    {
        name: 'secretary',
        description: '教务秘书',
        authorities: [
            {
                name: 'read',
                description: '查看',
                code: 100100
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100101
            }
        ]
    }
];