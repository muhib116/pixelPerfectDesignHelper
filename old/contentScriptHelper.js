const _id = (id) => document.getElementById(id)
const syncData = () => {}

const ref = (obj) => {
    return new Proxy(obj, {
        get: (target, key) => {
            return target[key]
        },
        set: (target, key, value) => {
            target[key] = value
        }
    })
}