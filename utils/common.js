module.exports.getToken = req => {
    try {
        const token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : ""

        return token
    } catch (err) {
        return ""
    }
}