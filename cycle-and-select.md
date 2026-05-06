# Kitronik :MOVE Motor - Cycle-and-Select Controller

```template
let leftSensor = 0
let rightSensor = 0
let sensorDifference = 0
let FOLLOW = 0
let GO = 0
let STOP = 0
let currentAction = 0
let channel = ""
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
STOP = 0
GO = 1
FOLLOW = 2
channel = "Roger"
currentAction = FOLLOW

function followLine () {
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorDifference = leftSensor - rightSensor
    if (sensorDifference > 10) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else if (sensorDifference < -10) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
}

function goForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
}

function stopBot () {
    Kitronik_Move_Motor.stop()
}

input.onButtonPressed(Button.A, function () {
    radio.sendValue(channel, GO)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, FOLLOW)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, STOP)
})

radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == FOLLOW) {
            currentAction = FOLLOW
            basic.showIcon(IconNames.Diamond)
        } else if (value == GO) {
            currentAction = GO
            basic.showArrow(ArrowNames.North)
        } else {
            currentAction = STOP
            basic.showIcon(IconNames
