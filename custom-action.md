```template
function showCurrentAction () {
    if (menuIndex == FOLLOW) {
        currentAction = FOLLOW
        basic.showIcon(IconNames.Yes)
    } else if (menuIndex == GO) {
        currentAction = GO
        basic.showArrow(ArrowNames.North)
    } else if (menuIndex == SPIN_LEFT) {
        currentAction = SPIN_LEFT
        basic.showArrow(ArrowNames.West)
    } else if (menuIndex == SPIN_RIGHT) {
        currentAction = SPIN_RIGHT
        basic.showArrow(ArrowNames.East)
    } else if (menuIndex == REVERSE) {
        currentAction = REVERSE
        basic.showArrow(ArrowNames.South)
    } else if (menuIndex == STOP) {
        currentAction = STOP
        basic.showIcon(IconNames.No)
    } else {
        currentAction = STOP
        basic.showIcon(IconNames.No)
    }
}
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
input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 5) {
        menuIndex = 0
    }
    showCurrentAction()
})
input.onButtonPressed(Button.AB, function () {
    menuIndex = STOP
    radio.sendValue(channel, STOP)
    showCurrentAction()
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, menuIndex)
})
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        menuIndex = value
        showCurrentAction()
    }
})
let sensorDifference = 0
let rightSensor = 0
let leftSensor = 0
let menuIndex = 0
let currentAction = 0
let channel = ""
let REVERSE = 0
let SPIN_RIGHT = 0
let SPIN_LEFT = 0
let GO = 0
let FOLLOW = 0
let STOP = 0
radio.setGroup(1)
STOP = 0
FOLLOW = 1
GO = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
channel = "Roger"
currentAction = STOP
showCurrentAction()
basic.forever(function () {
    if (currentAction == STOP) {
        Kitronik_Move_Motor.stop()
    } else if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 5)
    } else if (currentAction == SPIN_LEFT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 5)
    } else if (currentAction == SPIN_RIGHT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 5)
    } else if (currentAction == REVERSE) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 5)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Introduction @showdialog

So far, the remote controls the robot in real time. Every command you send moves the robot immediately, at low speed so you have time to react.

In this tutorial you will add a **custom action** — a preprogrammed sequence the robot runs on its own when triggered.

Unlike remote control, a custom action runs at full speed because the timing is controlled by the code, not by a human operator.

You will:

1. Add a `CUSTOM_ACTION` command to the menu
2. Write a `doCustomAction()` function with your own sequence
3. Extend the dispatcher to run it

**Before you start:** check that `radio.setGroup()` and `channel` match your assigned values.

## Step 1: Add the CUSTOM_ACTION Variable

Add a new variable:

- `CUSTOM_ACTION`

Then add it to your setup code:

```blocks
CUSTOM_ACTION = 6
```

Update the menu wrap in Button A so it includes the new option:

```blocks
if (menuIndex > 6) {
    menuIndex = 0
}
```

## Step 2: Add CUSTOM_ACTION to the Menu

Add a new branch to `showCurrentAction`:

```blocks
} else if (menuIndex == CUSTOM_ACTION) {
    currentAction = CUSTOM_ACTION
    basic.showIcon(IconNames.Happy)
}
```

Choose any icon you like for your custom action. Happy face is just a suggestion.

## Step 3: Write doCustomAction

Create a new function called `doCustomAction`.

This is your preprogrammed sequence. It runs entirely on the robot — no input from the remote while it is running.

Here is an example sequence that spins left, then right, with lights:

```blocks
function doCustomAction () {
    let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    moveMotorZIP.showRainbow(1, 360)
    moveMotorZIP.show()
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 100)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 100)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    moveMotorZIP.clear()
    moveMotorZIP.show()
}
```

Notice the speed is 100, not 5. Remote control uses speed 5 so the operator has time to react. A preprogrammed sequence controls its own timing with `basic.pause`, so it can run at full speed.

Write your own sequence — this is the creative part.

## Step 4: Update the Dispatcher

Add a branch for `CUSTOM_ACTION` to the forever loop.

After the custom action finishes, reset `currentAction` to STOP so the robot does not loop the sequence:

```blocks
} else if (currentAction == CUSTOM_ACTION) {
    doCustomAction()
    currentAction = STOP
}
```

## Step 5: Download and Test

Download to both micro:bits.

1. Cycle with **A** until you see your custom action icon.
2. Press **B** to send it.
3. The robot should run your sequence, then stop.
4. Press **A+B** at any point to send an emergency stop.

Note that the emergency stop sends STOP over radio, but if the robot is mid-sequence it will finish the current `basic.pause` before responding. This is expected — the robot is not checking for new commands while paused.

## Step 6: Check the Complete Program

```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
let sensorDifference = 0
let rightSensor = 0
let leftSensor = 0
let menuIndex = 0
let currentAction = 0
let channel = ""
let CUSTOM_ACTION = 0
let REVERSE = 0
let SPIN_RIGHT = 0
let SPIN_LEFT = 0
let GO = 0
let FOLLOW = 0
let STOP = 0
radio.setGroup(1)
STOP = 0
FOLLOW = 1
GO = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
CUSTOM_ACTION = 6
channel = "Roger"
currentAction = STOP
showCurrentAction()

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

function doCustomAction () {
    let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    moveMotorZIP.showRainbow(1, 360)
    moveMotorZIP.show()
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 100)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 100)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    moveMotorZIP.clear()
    moveMotorZIP.show()
}

function showCurrentAction () {
    if (menuIndex == FOLLOW) {
        currentAction = FOLLOW
        basic.showIcon(IconNames.Yes)
    } else if (menuIndex == GO) {
        currentAction = GO
        basic.showArrow(ArrowNames.North)
    } else if (menuIndex == SPIN_LEFT) {
        currentAction = SPIN_LEFT
        basic.showArrow(ArrowNames.West)
    } else if (menuIndex == SPIN_RIGHT) {
        currentAction = SPIN_RIGHT
        basic.showArrow(ArrowNames.East)
    } else if (menuIndex == REVERSE) {
        currentAction = REVERSE
        basic.showArrow(ArrowNames.South)
    } else if (menuIndex == CUSTOM_ACTION) {
        currentAction = CUSTOM_ACTION
        basic.showIcon(IconNames.Happy)
    } else {
        currentAction = STOP
        basic.showIcon(IconNames.No)
    }
}

input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 6) {
        menuIndex = 0
    }
    showCurrentAction()
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, menuIndex)
})

input.onButtonPressed(Button.AB, function () {
    menuIndex = STOP
    radio.sendValue(channel, STOP)
    showCurrentAction()
})

radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        menuIndex = value
        showCurrentAction()
    }
})

basic.forever(function () {
    if (currentAction == STOP) {
        Kitronik_Move_Motor.stop()
    } else if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 5)
    } else if (currentAction == SPIN_LEFT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 5)
    } else if (currentAction == SPIN_RIGHT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 5)
    } else if (currentAction == REVERSE) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 5)
    } else if (currentAction == CUSTOM_ACTION) {
        doCustomAction()
        currentAction = STOP
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Complete! @showdialog

You have added a preprogrammed custom action to the remote control system.

The key distinction in this tutorial:

- **Remote control** runs at low speed — the human operator is in the loop
- **Custom action** runs at full speed — the code controls the timing with `basic.pause`

**Next tutorial:** instead of selecting a command from a menu, a second micro:bit will trigger the custom action using a distance gesture — holding your hand at a specific range in front of the sensor.
