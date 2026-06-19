export default {
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        increment() {
            this.count++
        },
        decrement() {
            if (this.count > 0) {
                this.count--
            }
        },
        resetCount() {
            this.count = 0
        },
    },
}
