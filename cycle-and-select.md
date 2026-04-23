# Kitronik :MOVE Motor - Cycle-and-Select Controller

```template
let sensorDifference = 0
let rightSensor = 0
let leftSensor = 0
let FOLLOW = 0
let currentAction = 0
let channel = ""
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
FOLLOW = 2
speed = 40
channel = "Roger"
currentAction = STOP

function driveForward () {
    currentAction = GO
}

function stopBot () {
    currentAction = STOP
}

function followLine () {
    currentAction = FOLLOW
}

input.onButtonPressed(Button.A, function () {
    radio.sendValue(channel, GO)
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, STOP)
})

input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, FOLLOW)
})

radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == GO) {
            driveForward()
        } else if (value == FOLLOW) {
            followLine()
        } else {
            stopBot()
        }
    }
})

basic.forever(function () {
    if (currentAction == FOLLOW) {
        leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        sensorDifference = Math.abs(leftSensor - rightSensor)
        if (sensorDifference > 10) {
            if (leftSensor > rightSensor) {
                Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
            } else {
                Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
            }
        } else {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
        }
    } else if (currentAction == GO) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Introduction @showdialog
Your remote has 3 commands using A, B, and A+B. That's it for buttons. What if you want 6 commands? 10?

This tutorial builds a **cycle-and-select controller**. Press **A** to scroll through a menu of commands shown on the display. Press **B** to send the currently-displayed command. Two buttons, as many commands as you want.

You'll add new commands for spin-left, spin-right, and reverse alongside your existing ones.

## Step 1: Check Your Setup
The template has your full working code from the previous tutorial - drive, stop, and line follow all working. Make sure `channel` matches yours.

## Step 2: Add New State Values
From ``||variables:Variables||``, create three new variables: **SPIN_LEFT**, **SPIN_RIGHT**, and **REVERSE**.

In ``||basic:on start||``, set them to the next available numbers:
- **SPIN_LEFT = 3**
- **SPIN_RIGHT = 4**
- **REVERSE = 5**

(GO is 1, STOP is 0, FOLLOW is 2, so 3, 4, 5 are next.)
```blocks
let REVERSE = 0
let SPIN_RIGHT = 0
let SPIN_LEFT = 0
SPIN_LEFT = 3
SPIN_RIGHT = 4
REVERSE = 5
```

## Step 3: Add Functions for the New Behaviours
From ``||functions:Functions||``, create three new functions: **spinLeft**, **spinRight**, and **driveReverse**. Each one just sets `currentAction` to the matching state.
```blocks
let SPIN_LEFT = 0
let SPIN_RIGHT = 0
let REVERSE = 0
let currentAction = 0
function spinLeft () {
    currentAction = SPIN_LEFT
}
function spinRight () {
    currentAction = SPIN_RIGHT
}
function driveReverse () {
    currentAction = REVERSE
}
```

## Step 4: Add Forever-Loop Logic for Each New State
Open your ``||basic:forever||`` loop. Click **+** on the if/else to add three more **else if** branches - one for each new state.

- When `currentAction == SPIN_LEFT`: use ``||Kitronik_Move_Motor:spin Left at speed||`` with speed 30
- When `currentAction == SPIN_RIGHT`: use ``||Kitronik_Move_Motor:spin Right at speed||`` with speed 30
- When `currentAction == REVERSE`: use ``||Kitronik_Move_Motor:move Reverse at speed||`` with the ``||variables:speed||`` variable
```blocks
let SPIN_LEFT = 0
let SPIN_RIGHT = 0
let REVERSE = 0
let currentAction = 0
let speed = 0
basic.forever(function () {
    if (currentAction == SPIN_LEFT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    } else if (currentAction == SPIN_RIGHT) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    } else if (currentAction == REVERSE) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

(Keep the existing GO, STOP, and FOLLOW branches - just add these three alongside them.)

## Step 5: Add Dispatcher Branches for the New Commands
Open your ``||radio:on radio received name value||`` block. Add three more **else if** branches to the inner dispatcher - one for each new command - calling the matching function.
```blocks
let channel = ""
let SPIN_LEFT = 0
let SPIN_RIGHT = 0
let REVERSE = 0
let GO = 0
let FOLLOW = 0
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == GO) {
            driveForward()
        } else if (value == FOLLOW) {
            followLine()
        } else if (value == SPIN_LEFT) {
            spinLeft()
        } else if (value == SPIN_RIGHT) {
            spinRight()
        } else if (value == REVERSE) {
            driveReverse()
        } else {
            stopBot()
        }
    }
})
```

## Step 6: Remove the Old Button Handlers
Your remote currently sends GO, STOP, and FOLLOW on button A, B, and A+B. We're replacing this with the cycle-and-select system.

Delete all three existing ``||input:on button||`` blocks from the workspace (A, B, and A+B).
```blocks
// Your on-button-A, on-button-B, and on-button-A+B
// blocks should all be gone now.
```

## Step 7: Create a Menu Variable
The menu is the list of commands the user can cycle through. We'll use a **number variable** that tracks which command is currently shown.

From ``||variables:Variables||``, create a variable called **menuIndex**. Set it to **0** in ``||basic:on start||``.

Also create a variable called **currentCommand** which will hold the actual command number to send. Set it to ``||variables:GO||`` (since GO is the first command).
```blocks
let currentCommand = 0
let menuIndex = 0
let GO = 0
menuIndex = 0
currentCommand = GO
```

## Step 8: Show the Current Command on the Display
Add a new function called **showCurrentCommand**. This reads ``||variables:menuIndex||`` and shows the right icon on the display.

We have 5 commands in our menu: GO, STOP, FOLLOW, SPIN_LEFT, SPIN_RIGHT (we'll leave REVERSE as an exercise later).

For each index, show a different icon. We'll also set ``||variables:currentCommand||`` to match, so button B knows what to send.
```blocks
let menuIndex = 0
let currentCommand = 0
let GO = 0
let STOP = 0
let FOLLOW = 0
let SPIN_LEFT = 0
let SPIN_RIGHT = 0
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
    }
}
```

## Step 9: Call showCurrentCommand at Startup
At the end of ``||basic:on start||``, call ``||functions:showCurrentCommand||`` so the display shows the first menu item when the bot starts.
```blocks
let menuIndex = 0
let currentCommand = 0
let GO = 0
menuIndex = 0
currentCommand = GO
showCurrentCommand()
```

## Step 10: Button A - Scroll Through the Menu
Add a new ``||input:on button A pressed||`` block. Inside:

1. Increase ``||variables:menuIndex||`` by 1
2. If ``||variables:menuIndex||`` is greater than **4** (our last menu item), wrap it back to **0**
3. Call ``||functions:showCurrentCommand||`` to update the display
```blocks
let menuIndex = 0
input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 4) {
        menuIndex = 0
    }
    showCurrentCommand()
})
```

Now pressing A scrolls through the menu: North arrow → No icon → Diamond → West arrow → East arrow → back to North.

## Step 11: Button B - Send the Current Command
Add a new ``||input:on button B pressed||`` block. Inside, ``||radio:radio send value||`` with ``||variables:channel||`` and ``||variables:currentCommand||``.
```blocks
let channel = ""
let currentCommand = 0
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, currentCommand)
})
```

That's the cycle-and-select pattern complete. A scrolls, B sends.

## Step 12: Test in the Simulator
Click the simulator. You should see a North arrow as the starting icon on both devices. Press **A** a few times on the left simulator - the icon cycles through the menu. Press **B** - the command is sent to the other simulator.

Remember: both simulators run the same code, so both have their own menu. Only the one you press affects the receiver.

## Step 13: Download and Test
Download to both micro:bits. With your Move running, use the remote:

- Press **A** to cycle through commands (icon changes each time)
- When the icon shows what you want, press **B** to send it

Try scrolling to the FOLLOW state (diamond icon), pressing B, and watch the bot start following a line. Scroll to STOP (no icon), press B, and it stops.

## Complete! @showdialog
You've built a proper multi-command remote. The menu is just a variable tracking position, the display shows what you've selected, and one button sends the chosen command.

**The pattern scales.** Want 10 commands? Add state values, add dispatcher branches, add forever-loop branches, and extend the `showCurrentCommand` function. Same structure, just more entries.

**Tips for your project:**
- **Add more commands**: try REVERSE (index 5), a custom celebration dance, or a sensor-check command
- **Improve the display**: instead of icons, use `basic.showString` to scroll command names like "GO" or "STOP"
- **Add a "send confirmation"**: when B is pressed, briefly flash a heart before returning to the menu icon

**Next step**: the final tutorial, **Two-Way Radio with Roles**, introduces a big idea - the bot can *send* messages back to the remote automatically, triggered by its own sensors. The bot can tell the operator "I've arrived" or "there's an obstacle" without the operator asking.
