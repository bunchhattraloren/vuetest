export default {
    data() {
        return {
            logs: [],
        }
    },
    methods: {
        addLog(message) {
            this.logs.unshift({
                id: Date.now() + Math.random(),
                time: new Date().toLocaleTimeString(),
                message,
            })
        },
        clearLogs() {
            this.logs = []
        },
    },
}
