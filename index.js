// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
      firstName: `${array[0]}`,
      familyName: `${array[1]}`,
      title: `${array[2]}`,
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    }
    return employeeRecord
};

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    let TimeIn = {
        type: "TimeIn",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    }
    employeeRecord.timeInEvents.push(TimeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    let TimeOut = {
        type: "TimeOut",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(TimeOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(function(event) {return event.date === date})
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(element => element.date)
    const total = datesWorked.reduce(function(wageTotal,date){
        return wagesEarnedOnDate(employeeRecord, date) + wageTotal
    }, 0)
    return total
}

function calculatePayroll(employeeArray) {
    const wagesArray = employeeArray.map(employee => allWagesFor(employee))
    const total = wagesArray.reduce((total, element) => element + total)
    return total
}

function findEmployeeByFirstName(employeeArray, nameString) {
    return employeeArray.find(employee => employee.firstName === nameString)
}