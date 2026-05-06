# Kitronik :MOVE Motor - Two-Way Radio with Roles

```template
let currentCommand = 0
let menuIndex = 0
let sensorDifference = 0
let rightSensor = 0
let leftSensor = 0
let currentAction = 0
let REVERSE = 0
let SPIN_RIGHT = 0
let SPIN_LEFT = 0
let FOLLOW = 0
let channel_commands = ""
let channel_status = ""
let role = ""
let STOP = 0
let GO = 0
let ARRIVED = 0
let HELP = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
FOLLOW = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
ARRIVED = 1
HELP = 2
channel_commands = "Roger_cmd"
channel_status = "Roger_status"
role = "REMOTE"
currentAction = STOP
menuIndex = 0
currentCommand = GO
Kitronik_Move_Motor.measureDistancesIn(Kitronik_Move_Motor.DistanceUnit.Cm)

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

function spinLeft () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
}

function spinRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
}

function driveReverse () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 30)
}

function showCurrentCommand () {
    if (menuIndex == 0) {
        currentCommand = GO
        basic.showArrow(ArrowNames.North)
    } else if (menuIndex == 1) {
        currentCommand = STOP
        basic.showIcon(IconNames.No)
    } else if (menuIndex == 2) {
        currentCommand = FOLLOW
        basic.showIcon(IconNames.Diamond)
    } else if (menuIndex == 3) {
        currentCommand = SPIN_LEFT
        basic.showArrow(ArrowNames.West)
    } else if (menuIndex == 4) {
        currentCommand = SPIN_RIGHT
        basic.showArrow(ArrowNames.East)
    } else if (menuIndex == 5) {
        currentCommand = REVERSE
        basic.showArrow(ArrowNames.South)
    }
}

showCurrentCommand()

input.onButtonPressed(Button.A, function () {
    if (role == "REMOTE") {
        menuIndex += 1
        if (menuIndex > 5) {
            menuIndex = 0
        }
        showCurrentCommand()
    }
})

input.onButtonPressed(Button.B, function () {
    if (role == "REMOTE") {
        radio.sendValue(channel_commands, currentCommand)
    }
})

input.onButtonPressed(Button.AB, function () {
    if (role == "REMOTE") {
        role = "BOT"
        basic.showIcon(IconNames.Heart)
    } else {
        role = "REMOTE"
        basic.showIcon(IconNames.SmallSquare)
    }
})

radio.onReceivedValue(function (name, value) {
    if (role == "BOT" && name == channel_commands) {
        if (value == FOLLOW) {
            currentAction = FOLLOW
            basic.showIcon(IconNames.Diamond)
        } else if (value == GO) {
            currentAction = GO
            basic.showArrow(ArrowNames.North)
        } else if (value == SPIN_LEFT) {
            currentAction = SPIN_LEFT
            basic.showArrow(ArrowNames.West)
        } else if (value == SPIN_RIGHT) {
            currentAction = SPIN_RIGHT
            basic.showArrow(ArrowNames.East)
        } else if (value == REVERSE) {
            currentAction = REVERSE
            basic.showArrow(ArrowNames.South)
        } else {
            currentAction = STOP
            basic.showIcon(IconNames.SmallSquare)
        }
    } else if (role == "REMOTE" && name == channel_status) {
        if (value == ARRIVED) {
            basic.showIcon(IconNames.Yes)
            basic.pause(1000)
            showCurrentCommand()
        } else if (value == HELP) {
            basic.showIcon(IconNames.No)
            basic.pause(1000)
            showCurrentCommand()
        }
    }
})

basic.forever(function () {
    if (role == "BOT") {
        if (Kitronik_Move_Motor.measure() < 5) {
            radio.sendValue(channel_status, ARRIVED)
            basic.pause(1000)
        } else if (Kitronik_Move_Motor.measure() < 15 && currentAction == FOLLOW) {
            radio.sendValue(channel_status, HELP)
            basic.pause(1000)
        }
    }
    if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        goForward()
    } else if (currentAction == SPIN_LEFT) {
        spinLeft()
    } else if (currentAction == SPIN_RIGHT) {
        spinRight()
    } else if (currentAction == REVERSE) {
        driveReverse()
    } else {
        stopBot()
    }
})
```

## Introduction @showdialog
Until now, messages flow **one way**: remote → bot. The remote sends commands, the bot acts. But real robots usually report back - "I've arrived," "there's an obstacle," "task complete."

This capstone tutorial adds **two-way communication**, triggered by the bot's own **ultrasonic sensor**. When something blocks the bot during line-following, it automatically sends HELP to the remote. When something sits directly in front (very close), it sends ARRIVED - as if the bot has reached its pickup point.

Two channels (commands and status) plus a **role** variable (REMOTE or BOT) let both devices run the same code but behave differently.

## Step 1: Check Your Setup
The template has your full cycle-and-select code with all six command states. Make sure your channel names make sense - the template uses "Roger_cmd" and "Roger_status". Both micro:bits need matching values.

## Step 2: Understand the Two Channels and Role
Instead of one `channel` variable, the template uses three:

- **channel_commands** - remote → bot (sending commands)
- **channel_status** - bot → remote (sending status)
- **role** - either "REMOTE" or "BOT", set at runtime by pressing A+B

Both devices run identical code. The role variable decides which channel each device listens and speaks on. You'll press A+B on whichever device is plugged into the Move to switch it to BOT mode.

## Step 3: Understand the Role Toggle
Find the ``||input:on button A+B pressed||`` handler in the template. It toggles between "REMOTE" and "BOT" and shows an icon to confirm:

- **Small Square** = REMOTE
- **Heart** = BOT

Both devices start as REMOTE. Before testing, press A+B once on the device that will drive the Move.

## Step 4: Understand the Button Guards
Button A (menu scroll) and button B (send command) both check `role == "REMOTE"` before doing anything. This means if a device is in BOT mode, its buttons don't accidentally send commands. The bot's micro:bit is focused on driving and reporting - not on the menu.

## Step 5: Understand the Receiver Branching
Open the ``||radio:on radio received name value||`` handler. It has two outer branches:

- `role == "BOT" && name == channel_commands` → run the command dispatcher, set `currentAction`, show icon
- `role == "REMOTE" && name == channel_status` → show a status icon for one second, then return to the menu

Each device only responds to the channel relevant to its role.

## Step 6: Add Status Constants
The bot sends two kinds of status. Create two new variables:

- **ARRIVED = 1** - something is very close in front (bot has reached its target)
- **HELP = 2** - something is blocking the path during line-following

These are already in the template. Check that they're set in ``||basic:on start||``.

```blocks
let ARRIVED = 0
let HELP = 0
ARRIVED = 1
HELP = 2
```

## Step 7: Understand the Forever Loop Structure
The forever loop has two parts:

**Part 1** - status sending (only runs when `role == "BOT"`):
- If something is closer than **5 cm**: send ARRIVED, pause 1 second
- Else if something is closer than **15 cm** AND `currentAction == FOLLOW`: send HELP, pause 1 second

**Part 2** - state dispatch (always runs):
- Calls `followLine()`, `goForward()`, `spinLeft()`, etc. based on `currentAction`

The dispatch runs on both devices. On the REMOTE, `currentAction` stays STOP the whole time, so `stopBot()` runs every tick - harmless, since there are no motors connected.

## Step 8: Set the Ultrasonic Unit
The template already calls ``||Kitronik_Move_Motor:measure distances in cm||`` in ``||basic:on start||``. This only needs to happen once - after that, `measure()` returns centimetres.

Check it's there before downloading.

```blocks
Kitronik_Move_Motor.measureDistancesIn(Kitronik_Move_Motor.DistanceUnit.Cm)
```

## Step 9: Download to Both Micro:bits
Download to both. Both start as REMOTE (Small Square icon).

On the micro:bit that plugs into the Move, press **A+B** once - it switches to BOT mode and shows a heart icon.

## Step 10: Test the Full Two-Way Flow
Set up a line for the Move. Place an obstacle partway along it.

- On the remote, scroll the menu to FOLLOW (diamond icon), press B to send
- Move starts following the line
- When it approaches the obstacle (within 15 cm), it sends HELP automatically
- Remote flashes the **No** icon for a second, then returns to the menu
- Move the bot so something is within 5 cm of the front
- Move sends ARRIVED - remote flashes the **Yes** icon

The bot is now reporting back to the operator automatically, based on what it detects.

## Complete! @showdialog
You've built the foundation of real two-way robot control. Your project now has:

- **Two channels** carrying different kinds of messages
- **Two roles** determining how each device behaves
- **Sensor-triggered status** - the bot watches the world and reports back automatically
- **The same code on both devices** - role is decided at runtime

**Two patterns this supports:**

- **Bot-initiated alert**: the bot detects something and tells the operator (HELP, ARRIVED). The operator sees the alert, decides what to do, sends a new command.
- **Operator override**: the operator sends commands at any time regardless of what the bot is doing. The bot just listens and acts.

**For your project, think about:**

- **What should trigger ARRIVED?** A specific ultrasonic distance? Line sensors detecting a marker?
- **What should trigger HELP?** An obstacle? Both line sensors reading light for too long (bot lost the line)?
- **Could the bot send other status?** A "STARTED" message when line-following begins? A "STUCK" message after spinning too long?

You now have all the patterns you need. The rest is your design.
