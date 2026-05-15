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

In the last tutorial, your remote could send three commands:

- **A** sent GO
- **B** sent FOLLOW
- **A+B** sent STOP

That works, but it does not scale well. A micro:bit only has a few button combinations.

In this tutorial, you will change the remote into a **cycle-and-select controller**:

- Press **A** to cycle through command choices
- Press **B** to send the selected command

By the end, your controller will support six commands:

- Forward
- Stop
- Follow line
- Spin left
- Spin right
- Reverse

## Step 1: Understand the Goal

The current program sends commands directly from buttons:

- Button A sends GO
- Button B sends FOLLOW
- Button A+B sends STOP

We are going to replace that with a menu system.

The new pattern is:

1. Store the selected menu item in `menuIndex`
2. Use `showCurrentCommand()` to display the selected command
3. Store the selected command in `currentCommand`
4. Press B to send `currentCommand`

This means one button can scroll through many commands, and one button can send whichever command is selected.

## Step 2: Add More Command Variables

Create these new variables:

- `SPIN_LEFT`
- `SPIN_RIGHT`
- `REVERSE`
- `menuIndex`
- `currentCommand`

Then update your setup code so the command values are:

```blocks
STOP = 0
GO = 1
FOLLOW = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
```

Also set the menu to start at the first option:

```blocks
menuIndex = 0
currentCommand = GO
```

Your setup section should now include these values:

```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
STOP = 0
GO = 1
FOLLOW = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
channel = "Roger"
currentAction = FOLLOW
menuIndex = 0
currentCommand = GO
```

## Step 3: Add Functions for the New Actions

You already have these action functions:

- `followLine()`
- `goForward()`
- `stopBot()`

Now add three more action functions.

```blocks
function spinLeft () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
}

function spinRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
}

function driveReverse () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 30)
}
```

These functions do not decide when to run. They only describe what each action does.

The `currentAction` variable will decide which one runs later.

## Step 4: Create the Menu Display Function

Create a new function called `showCurrentCommand`.

This function checks `menuIndex`, chooses the matching command, and shows an icon on the remote.

```blocks
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
```

The menu icons are:

- North arrow = GO
- No icon = STOP
- Diamond = FOLLOW
- West arrow = SPIN LEFT
- East arrow = SPIN RIGHT
- South arrow = REVERSE

## Step 5: Show the First Menu Option

At the end of your setup code, call the new function once.

```blocks
showCurrentCommand()
```

This makes the remote show the first selected command when the program starts.

Since `menuIndex` starts at `0`, the first command shown is GO.

## Step 6: Replace Button A

Button A used to send GO immediately.

Now Button A should cycle through the menu instead.

Replace the old Button A code with this:

```blocks
input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 5) {
        menuIndex = 0
    }
    showCurrentCommand()
})
```

This increases `menuIndex` by 1 each time you press A.

When it goes past 5, it wraps back to 0.

The menu order is:

GO → STOP → FOLLOW → SPIN LEFT → SPIN RIGHT → REVERSE → GO

## Step 7: Replace Button B

Button B used to send FOLLOW immediately.

Now Button B should send the currently selected command.

Replace the old Button B code with this:

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, currentCommand)
})
```

This is the key change.

The remote no longer needs a separate button for each command. It only needs:

- one button to choose
- one button to send

## Step 8: Remove the A+B Stop Shortcut

In the old version, Button A+B sent STOP.

You can delete the A+B handler because STOP is now part of the menu.

Remove this old block:

```blocks
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, STOP)
})
```

STOP is now selected by cycling to the No icon, then pressing B.

## Step 9: Update the Radio Receiver

The bot already receives GO, FOLLOW, and STOP.

Now update the receiver so it can also receive:

- `SPIN_LEFT`
- `SPIN_RIGHT`
- `REVERSE`

Replace the receiver with this version:

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
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
    }
})
```

The receiver does not run the motors directly.

It only updates `currentAction`.

The forever loop will read `currentAction` and run the matching behaviour.

## Step 10: Update the Dispatcher

The forever loop is the dispatcher.

It already chooses between FOLLOW, GO, and STOP.

Update it so it can choose all six actions.

```blocks
basic.forever(function () {
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

STOP is still handled by the final `else`.

That means if `currentAction` is not FOLLOW, GO, SPIN LEFT, SPIN RIGHT, or REVERSE, the bot stops.

## Step 11: Download and Test

Download the same code to both micro:bits.

One micro:bit will act as the remote. The other will be plugged into the Move Motor.

Test the menu:

1. Press **A** to cycle through the icons.
2. Stop on the command you want.
3. Press **B** to send it.
4. Check that the Move Motor changes behaviour.

Try each command:

- North arrow: drive forward
- No icon: stop
- Diamond: follow line
- West arrow: spin left
- East arrow: spin right
- South arrow: reverse

## Step 12: Check the Complete Program

Your final code should follow this structure:

```blocks
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
let channel = ""
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
FOLLOW = 2
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
channel = "Roger"
currentAction = STOP
menuIndex = 0
currentCommand = GO

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
    menuIndex += 1
    if (menuIndex > 5) {
        menuIndex = 0
    }
    showCurrentCommand()
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, currentCommand)
})

radio.onReceivedValue(function (name, value) {
    if (name == channel) {
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
    }
})

basic.forever(function () {
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

## Complete! @showdialog

You have turned the remote into a cycle-and-select controller.

Your program now uses:

- `menuIndex` to track the selected menu position
- `currentCommand` to store the command that will be sent
- `showCurrentCommand()` to update the icon and selected command
- Button A to cycle through commands
- Button B to send the selected command
- `currentAction` to store what the bot should do
- a dispatcher loop to run the matching behaviour

This pattern makes the controller much easier to extend.

Instead of needing one button per command, you can add more commands by:

1. Creating a new command value
2. Adding it to the menu
3. Adding a receiver branch
4. Adding a dispatcher branch

**Next tutorial:** the remote can now send commands to the bot, but the bot still cannot report anything back. The Two-Way Radio tutorial adds roles, two radio channels, and sensor-triggered status messages.
