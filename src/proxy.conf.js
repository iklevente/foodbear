const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: (process.env?.['BACKEND_HOST'] || "http://localhost") + ":" + (process.env?.['BACKEND_PORT'] || 3000),
        secure: false
    }
]

module.exports = PROXY_CONFIG;