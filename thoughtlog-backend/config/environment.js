var config = {
    local: {
        mode: 'local',
        port: 8021
    },
    production: {
        mode: 'production',
        port: 8021
    }
}
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}