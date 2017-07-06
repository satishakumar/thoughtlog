var config = {
    local: {
        mode: 'local',
        port: 9000
    },
    production: {
        mode: 'production',
        port: 9000
    }
}
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}