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
currentAction = STOP

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
            basic.showIcon(IconNames.SmallSquare)
        }
    }
})

basic.forever(function () {
    if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        goForward()
    } else {
        stopBot()
    }
})
```

## Introduction @showdialog
You have a bot that follows lines and a bot that avoids obstacles. What if it did both at once?

This tutorial adds a **PATROL** state. When patrolling, the bot follows the line — but if something blocks its path, it automatically evades and keeps going. The remote just switches it into patrol mode; everything else happens autonomously.

This is a genuinely harder design problem. The `patrol()` function has to make its own decisions based on two different sensors. You're not just adding another state — you're adding behaviour that branches internally.

## Step 1: Check Your Setup
The template is your completed state-pattern code with GO, STOP, and FOLLOW. Make sure `channel` matches yours and the ultrasonic unit is set to cm.

Add ``||Kitronik_Move_Motor:measure distances in cm||`` to ``||basic:on start||`` if it isn't there already:

```blocks
Kitronik_Move_Motor.measureDistancesIn(Kitronik_Move_Motor.DistanceUnit.Cm)
```

## Step 2: Create the patrol() Function
This is the core of the tutorial. Create a new function called **patrol**.

Inside it, check the ultrasonic sensor first. If something is closer than **10 cm**, run the evasion sequence — stop, reverse, spin. Otherwise, follow the line as normal.

```blocks
let PATROL = 0
function patrol () {
    if (Kitronik_Move_Motor.measure() < 10 && Kitronik_Move_Motor.measure() != 0) {
        Kitronik_Move_Motor.stop()
        basic.pause(500)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        basic.pause(500)
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    } else {
        followLine()
    }
}
```

Notice the `else` branch just calls `followLine()` — you already have that function, so there's no need to repeat the sensor logic. Functions calling other functions is normal and good.

## Step 3: Update the Forever Loop Branch
Open your ``||basic:forever||`` loop. Replace the followLine action with patrol. Now your robot follows a line but reverses and turns around if it detects an obstacle.

```blocks
let PATROL = 0
let currentAction = 0
basic.forever(function () {
    if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        goForward()
    } else if (currentAction == PATROL) {
        patrol()
    } else {
        stopBot()
    }
})
```

## Step 4: Download and Test
Download to both micro:bits. Set up a line with an obstacle placed across it.

- Press **B**: bot follows the line normally
- Press **A+B**: bot enters PATROL mode — follows the line, but evades when it detects the obstacle
- Press **A**: bot drives straight forward, ignoring both line and obstacle

Watch what happens during the evasion sequence. The bot stops responding to radio commands for about 1.5 seconds while the pause blocks run. That's a real limitation of this approach — something to notice, even if we're not fixing it here.

## Complete! @showdialog
You've built a function that combines two sensors and two behaviours into one autonomous mode. The remote just says "patrol" — the bot decides everything else.

**What's actually happening in patrol():**
- Every tick, it checks the ultrasonic sensor first
- If something is close, it runs the evasion sequence and returns
- If nothing is close, it hands off to `followLine()` which checks the light sensors
- Two sensors, one function, no extra state variables

**Next tutorial**: with PATROL added, you now have four commands and only three button combinations. The **Cycle-and-Select Controller** shows how to send as many commands as you want using just two buttons.
