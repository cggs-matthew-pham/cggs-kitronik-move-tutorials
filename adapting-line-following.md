```template
let leftSensor = 0
let rightSensor = 0
let sensorDifference = 0
basic.forever(function () {
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
})
```

## Introduction @showdialog
You already have a working line-follower. This tutorial shows you how to refactor it using the **state pattern** from Tutorial 3, so line-following becomes just another radio-triggered behaviour alongside GO and STOP.

You'll start with the bare line-following logic and end up with a full multi-behaviour bot, controlled by radio.

## Step 1: Understand the Starting Code
The template is a working line-follower. Each tick of the forever loop:

1. Reads both light sensors
2. Calculates `sensorDifference = leftSensor - rightSensor` (signed — which side is bigger matters)
3. If the difference is **more than 10**, the bot has drifted right — turn left by powering only the left motor
4. If the difference is **less than -10**, the bot has drifted left — turn right by powering only the right motor
5. Otherwise both sensors roughly agree — drive straight

Get familiar with this logic before we restructure it.

## Step 2: Extract the Logic into Functions
The forever loop currently has three branches. We're going to pull each one into a named function so the loop itself just decides *what to do*, not *how to do it*.

Create three functions: **followLine**, **goForward**, and **stopBot**.

Move the line-following logic into `followLine`:

```blocks
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
```

Then add the other two:

```blocks
function goForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
}
function stopBot () {
    Kitronik_Move_Motor.stop()
}
```

## Step 3: Add the State Variables and Radio Setup
Now add the infrastructure from Tutorial 3: state constants, a `currentAction` variable, radio group, and channel.

```blocks
let STOP = 0
let GO = 1
let FOLLOW = 2
let channel = "Roger"
let currentAction = FOLLOW
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

Make sure `channel` matches the value you're using on the remote.

## Step 4: Rewrite the Forever Loop as a Dispatcher
Replace the old forever loop with one that just reads `currentAction` and calls the right function:

```blocks
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

The logic is gone from the loop — it's now only in the functions. The loop just dispatches.

## Step 5: Add the Radio Receiver
Add a ``||radio:on received value||`` handler. When the correct channel name arrives, update `currentAction` and show an icon so you can see the state:

```blocks
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
```

## Step 6: Set Up the Remote Buttons
On the **remote micro:bit**, map the three button combinations:

- **A** → send GO
- **B** → send FOLLOW
- **A+B** → send STOP

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendValue(channel, GO)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, FOLLOW)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, STOP)
})
```

Note the layout: A+B is now STOP, not B alone. Make sure both micro:bits have the same `channel` and `radio.setGroup` value.

## Step 7: Download and Test
Download to both micro:bits.

- Press **A** on the remote: Move drives straight forward
- Press **B**: Move starts following the line
- Press **A+B**: Move stops

If the bot overshoots corners, lower the motor speed from 30. If it loses the line easily, check your surface — good contrast between line and background makes a big difference.

## Complete! @showdialog
You've refactored a working line-follower into the state pattern. The forever loop doesn't contain any driving logic — it just reads a variable and calls a function.

**This is the key insight:** any continuous behaviour plugs in the same way:
1. Write a function containing the behaviour
2. Add a state constant
3. Add a branch in the dispatcher
4. Add a radio trigger

**Challenge: add obstacle avoidance as a third state**

You may have also built a standalone obstacle avoider in a previous tutorial. Its forever loop looks like this — drive forward until something is closer than 10 cm, then stop, reverse, and spin away:

Can you add it to this project as a new state?

Here's what you'd need to do:
- Create a function called `avoidObstacle()` containing that logic
- Add a new state constant `AVOID = 3`
- Add an `else if (currentAction == AVOID)` branch in the forever loop that calls `avoidObstacle()`
- Add an `else if (value == AVOID)` branch in the radio receiver that sets `currentAction = AVOID`
- Add a button on the remote that sends AVOID

If you get that working, the bot can switch between three completely different behaviours — all triggered by radio, all using the same pattern.

**Next tutorial**: the remote currently has 3 commands across 3 button combos. The **Cycle-and-Select Controller** tutorial shows how to send many more commands using just 2 buttons.re commands using just 2 buttons.
