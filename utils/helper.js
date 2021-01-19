module.exports.calculateProfit = ({ buyTime, goldPerSecond }) => {
    const numberOfSeconds = (new Date().getTime() - buyTime) / 1000
    return numberOfSeconds * goldPerSecond
}