```template
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
    radio.sendValue(channel, GO)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, STOP)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, FOLLOW)
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
let sensorDifference = 0
let rightSensor = 0
let leftSensor = 0
let currentAction = 0
let channel = ""
let GO = 0
let FOLLOW = 0
let STOP = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
STOP = 0
FOLLOW = 1
GO = 2
channel = "Roger"
currentAction = STOP
basic.forever(function () {
    if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Introduction @showdialog

In the last tutorial, your remote had one button per command:

- **A** sent GO
- **B** sent FOLLOW
- **A+B** sent STOP

That works for three commands, but a micro:bit only has a few button combinations.

In this tutorial, you will change the remote into a **cycle-and-select controller**:

- Press **A** to cycle through all available commands
- Press **B** to send the selected command
- Press **A+B** to send STOP immediately

By the end, your controller will support six commands:

- Stop
- Follow line
- Forward
- Spin left
- Spin right
- Reverse

**Before you start:** check that `radio.setGroup()` and `channel` are set to your assigned values. Both micro:bits must use the same group and channel or they will not communicate.

## Step 1: Understand the Goal

The current program sends commands directly from buttons.

We are going to replace that with a menu system.

The new pattern is:

1. `menuIndex` stores the currently selected command (using the same values as the command constants)
2. Press **A** to advance `menuIndex` and call `showCurrentAction()` to update the display
3. Press **B** to send `menuIndex` over radio
4. The receiving micro:bit calls the same `showCurrentAction()` function — so both micro:bits stay in sync

This means both the remote and the robot use the same logic. Whatever icon the remote shows is what the robot is doing.

## Step 2: Add More Command Variables

Create these new variables:

- `SPIN_LEFT`
- `SPIN_RIGHT`
- `REVERSE`
- `menuIndex`

Then set up your command values:

```blocks
STOP = 0
FOLLOW = 1
GO = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
```

Update your setup code so it starts at STOP:

```blocks
currentAction = STOP
menuIndex = STOP
```

## Step 3: Create `showCurrentAction`

Create a new function called `showCurrentAction`.

This function checks `menuIndex`, sets `currentAction` to match, and shows the matching icon.

```blocks
function showCurrentAction () {
    if (menuIndex == FOLLOW) {
        currentAction = FOLLOW
        basic.showArrow(ArrowNames.North)
    } else if (menuIndex == GO) {
        currentAction = GO
        basic.showIcon(IconNames.Yes)
    } else if (menuIndex == SPIN_LEFT) {
        currentAction = SPIN_LEFT
        basic.showArrow(ArrowNames.West)
    } else if (menuIndex == SPIN_RIGHT) {
        currentAction = SPIN_RIGHT
        basic.showArrow(ArrowNames.East)
    } else if (menuIndex == REVERSE) {
        currentAction = REVERSE
        basic.showArrow(ArrowNames.South)
    } else {
        currentAction = STOP
        basic.showIcon(IconNames.No)
    }
}
```

The icons are:

| Icon | Command |
|------|---------|
| No | STOP |
| North arrow | FOLLOW |
| Yes | GO |
| West arrow | SPIN LEFT |
| East arrow | SPIN RIGHT |
| South arrow | REVERSE |

Call it once at the end of your setup so both micro:bits show the starting state when the program loads:

```blocks
showCurrentAction()
```

## Step 4: Replace Button A

Button A used to send GO immediately.

Now it cycles through the menu:

```blocks
input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 5) {
        menuIndex = 0
    }
    showCurrentAction()
})
```

Each press increases `menuIndex` by 1. When it goes past 5, it wraps back to 0.

The menu order is:

STOP → FOLLOW → GO → SPIN LEFT → SPIN RIGHT → REVERSE → STOP

## Step 5: Replace Button B

Button B used to send FOLLOW immediately.

Now it sends whatever `menuIndex` is currently selected:

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, menuIndex)
})
```

The remote no longer needs a separate button for each command. It only needs:

- one button to choose
- one button to send

## Step 6: Update Button A+B

Button A+B already sends STOP. Update it so it also resets `menuIndex` to match — that way the remote display stays in sync after an emergency stop.

```blocks
input.onButtonPressed(Button.AB, function () {
    menuIndex = STOP
    radio.sendValue(channel, STOP)
})
```

## Step 7: Update the Radio Receiver

Previously, the receiver had a separate branch for each command and set `currentAction` directly.

Now the receiver just sets `menuIndex` and calls `showCurrentAction()` — the same function the remote uses:

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        menuIndex = value
        showCurrentAction()
    }
})
```

This means the robot's display always matches the remote. If the remote shows a West arrow, so does the robot.

## Step 8: Update the Dispatcher

Update the forever loop to handle all six actions. The motor commands are written directly here rather than in separate functions:

```blocks
basic.forever(function () {
    if (currentAction == STOP) {
        Kitronik_Move_Motor.stop()
    } else if (currentAction == FOLLOW) {
        followLine()
    } else if (currentAction == GO) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    } else if (currentAction == SPIN_LEFT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    } else if (currentAction == SPIN_RIGHT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    } else if (currentAction == REVERSE) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 30)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

`followLine()` is still a function because it has internal logic. The other actions are single lines, so they sit directly in the dispatcher.

## Step 9: Download and Test

Download the same code to both micro:bits.

One micro:bit will act as the remote. The other plugs into the Move Motor.

Test the menu:

1. Press **A** to cycle through icons on the remote.
2. Stop on the command you want.
3. Press **B** to send it — check that the robot's display updates to match.
4. Press **A+B** while the robot is moving to stop it immediately.

Try each command:

| Icon | Expected behaviour |
|------|--------------------|
| No | Robot stops |
| North arrow | Follows the line |
| Yes | Drives forward |
| West arrow | Spins left |
| East arrow | Spins right |
| South arrow | Reverses |

## Step 10: Check the Complete Program

```blocks
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
basic.showIcon(IconNames.SmallSquare)
STOP = 0
FOLLOW = 1
GO = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
channel = "Roger"
currentAction = STOP
menuIndex = STOP

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

function showCurrentAction () {
    if (menuIndex == FOLLOW) {
        currentAction = FOLLOW
        basic.showArrow(ArrowNames.North)
    } else if (menuIndex == GO) {
        currentAction = GO
        basic.showIcon(IconNames.Yes)
    } else if (menuIndex == SPIN_LEFT) {
        currentAction = SPIN_LEFT
        basic.showArrow(ArrowNames.West)
    } else if (menuIndex == SPIN_RIGHT) {
        currentAction = SPIN_RIGHT
        basic.showArrow(ArrowNames.East)
    } else if (menuIndex == REVERSE) {
        currentAction = REVERSE
        basic.showArrow(ArrowNames.South)
    } else {
        currentAction = STOP
        basic.showIcon(IconNames.No)
    }
}

showCurrentAction()

input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 5) {
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
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    } else if (currentAction == SPIN_LEFT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    } else if (currentAction == SPIN_RIGHT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    } else if (currentAction == REVERSE) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 30)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Complete! @showdialog

You have turned the remote into a cycle-and-select controller.

Your program now uses:

- `menuIndex` to track the selected command (using the same values as the constants)
- `showCurrentAction()` to update the icon and set `currentAction` — on both micro:bits
- Button A to cycle through commands
- Button B to send the selected command
- Button A+B as a quick-stop shortcut
- A dispatcher loop to run the matching behaviour

The key design insight: both micro:bits run the same `showCurrentAction()` function. The remote calls it when cycling; the robot calls it when a radio message arrives. The displays stay in sync automatically.

**Next tutorial:** the remote can now send commands to the bot, but the bot still cannot report anything back. The Two-Way Radio tutorial adds roles, two radio channels, and sensor-triggered status messages.
