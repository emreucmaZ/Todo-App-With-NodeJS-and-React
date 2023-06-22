function getDate(date){
    const filteredDate = `${("0" + date.getDate()).slice(-2)}/${("0" + date.getMonth())}/${date.getFullYear()}`
    return filteredDate
}

module.exports = getDate;