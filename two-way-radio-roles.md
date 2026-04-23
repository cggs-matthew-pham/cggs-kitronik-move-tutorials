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
let channel = ""
let speed = 0
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
speed = 40
channel = "Roger"
currentAction = STOP
menuIndex = 0
currentCommand = GO

function driveForward () {
    currentAction = GO
}

function stopBot () {
    currentAction = STOP
}

function followLine () {
    currentAction = FOLLOW
}

function spinLeft () {
    currentAction = SPIN_LEFT
}

function spinRight () {
    currentAction = SPIN_RIGHT
}

function driveReverse () {
    currentAction = REVERSE
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
    }
}

showCurrentCommand()

input.onButtonPressed(Button.A, function () {
    menuIndex += 1
    if (menuIndex > 4) {
        menuIndex = 0
    }
    showCurrentCommand()
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, currentCommand)
})

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
    } else if (currentAction == SPIN_LEFT) {
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

## Introduction @showdialog
Until now, messages flow **one way**: remote → bot. The remote sends commands, the bot acts. But real robots usually report back - "I've arrived," "there's an obstacle," "task complete."

This capstone tutorial adds **two-way communication**, triggered by the bot's own **ultrasonic sensor**. When something blocks the bot during line-following, it automatically sends HELP to the remote. When something sits directly in front (very close), it sends ARRIVED - as if the bot has reached its pickup point.

Two channels (commands and status) plus a **role** variable (REMOTE or BOT) let both devices run the same code but behave differently.

## Step 1: Check Your Setup
The template has your full cycle-and-select code with all five command states. Make sure `channel` matches what you've been using.

One heads-up: you'll rename your single `channel` variable to `channel_commands` and add `channel_status` and `role` alongside it. Simple find-and-replace.

## Step 2: Replace channel with Two Channels Plus a Role
Delete your existing `channel` variable from ``||basic:on start||``. From ``||variables:Variables||``, create three new variables:

- **channel_commands** - used for remote-to-bot messages
- **channel_status** - used for bot-to-remote messages
- **role** - holds either "REMOTE" or "BOT"

In ``||basic:on start||``, set them:
- `channel_commands` = your base channel + "_cmd" (e.g. "Roger_cmd")
- `channel_status` = your base channel + "_status" (e.g. "Roger_status")
- `role` = "REMOTE" (the default - you'll press A+B to switch a device to BOT mode later)
```blocks
let role = ""
let channel_status = ""
let channel_commands = ""
channel_commands = "Roger_cmd"
channel_status = "Roger_status"
role = "REMOTE"
```

## Step 3: Update Button B to Use channel_commands
Find your ``||input:on button B pressed||`` handler (the one that sends the current command). Change it to send on ``||variables:channel_commands||`` instead of the old `channel`.

Wrap the send in an if that checks `role == "REMOTE"` - because if this device is in BOT mode, pressing B shouldn't send commands.
```blocks
let role = ""
let channel_commands = ""
let currentCommand = 0
input.onButtonPressed(Button.B, function () {
    if (role == "REMOTE") {
        radio.sendValue(channel_commands, currentCommand)
    }
})
```

## Step 4: Do the Same for Button A (Menu Scroll)
Menu scrolling only makes sense on the REMOTE. Wrap it in a role check too.
```blocks
let role = ""
let menuIndex = 0
input.onButtonPressed(Button.A, function () {
    if (role == "REMOTE") {
        menuIndex += 1
        if (menuIndex > 4) {
            menuIndex = 0
        }
        showCurrentCommand()
    }
})
```

## Step 5: Add Status Constants
The bot will send two kinds of status messages. Create two new variables:

- **ARRIVED** - when the bot detects something very close (standing in for "reached the target")
- **HELP** - when the bot detects an obstacle during line-following

Set them in ``||basic:on start||``:
- **ARRIVED = 1**
- **HELP = 2**

(These are separate from the command constants. The channel name distinguishes command traffic from status traffic, so we can reuse the numbers.)
```blocks
let ARRIVED = 0
let HELP = 0
ARRIVED = 1
HELP = 2
```

## Step 6: Update the Receiver to Branch on Role
Open your ``||radio:on radio received name value||`` block. The existing check is `name == channel`. Change it to handle both roles:

- If `role == "BOT"` **and** `name == channel_commands`: this is a command, run the dispatcher (existing code)
- If `role == "REMOTE"` **and** `name == channel_status`: this is a status message from the bot, show an icon
```blocks
let role = ""
let channel_commands = ""
let channel_status = ""
let ARRIVED = 0
let HELP = 0
radio.onReceivedValue(function (name, value) {
    if (role == "BOT" && name == channel_commands) {
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
```

After showing the status icon for one second, the display returns to the menu.

## Step 7: Add an A+B Role Toggle
You need a way to switch one device into BOT mode. Add a new ``||input:on button A+B pressed||`` handler that toggles the role and shows an icon to confirm.
```blocks
let role = ""
input.onButtonPressed(Button.AB, function () {
    if (role == "REMOTE") {
        role = "BOT"
        basic.showIcon(IconNames.Heart)
    } else {
        role = "REMOTE"
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

Square = REMOTE, Heart = BOT.

## Step 8: Set the Ultrasonic Unit
Before we use the ultrasonic sensor, we need to tell it what units to measure in. Add ``||Kitronik_Move_Motor:measure distances in cm||`` to your ``||basic:on start||`` block.

This only needs to happen once, at startup. From now on, `measure` will return distances in centimetres.
```blocks
Kitronik_Move_Motor.measureDistancesIn(Kitronik_Move_Motor.DistanceUnit.Cm)
```

## Step 9: Wrap the Forever Loop Content in a Role Check
The bot's sensor-watching logic needs to happen *only when the device is the BOT*. The REMOTE doesn't need to check its ultrasonic - it's in someone's hand, not pointed at anything meaningful.

Open your ``||basic:forever||`` loop. We'll add an outer `if (role == "BOT")` wrapper that we'll fill in over the next few steps.

Right now, don't move any of the existing state-dispatch logic. Just add the wrapper *above* the existing code - we'll put the status-sending inside it.
```blocks
let role = ""
basic.forever(function () {
    if (role == "BOT") {

    }
    // All your existing state-dispatch logic stays here, unchanged
})
```

## Step 10: Add the ARRIVED Trigger
Inside the `if (role == "BOT")` block, add your first status trigger.

Add an ``||logic:if then||`` block. The condition checks whether the ultrasonic distance is less than **5** - i.e. something is very close in front of the bot.

Inside the if, ``||radio:radio send value||`` with ``||variables:channel_status||`` and ``||variables:ARRIVED||``. Then add ``||basic:pause||`` for **1000** ms to stop the bot spamming the same message every tick.
```blocks
let role = ""
let channel_status = ""
let ARRIVED = 0
basic.forever(function () {
    if (role == "BOT") {
        if (Kitronik_Move_Motor.measure() < 5) {
            radio.sendValue(channel_status, ARRIVED)
            basic.pause(1000)
        }
    }
    // existing state-dispatch logic stays here
})
```

**Quick test at this point**: download and set the bot role. Put your hand or a book in front of the bot - the remote should flash a tick icon.

## Step 11: Add the HELP Trigger
Now for the second status trigger - HELP, when an obstacle shows up during line-following.

Add an ``||logic:else if||`` branch to the existing if. The condition has two parts joined by **and**:

1. Ultrasonic distance is less than **15**
2. `currentAction` equals `FOLLOW`

Both need to be true. The bot only sends HELP when it's following a line *and* something blocks the path.

Inside, ``||radio:radio send value||`` with ``||variables:channel_status||`` and ``||variables:HELP||``. Then another ``||basic:pause||`` of **1000** ms.
```blocks
let role = ""
let channel_status = ""
let ARRIVED = 0
let HELP = 0
let currentAction = 0
let FOLLOW = 0
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
    // existing state-dispatch logic stays here
})
```

Notice the order matters: ARRIVED (< 5) is checked *first*. If the bot is very close to something, that's ARRIVED, not HELP. The `else if` means HELP only fires when ARRIVED didn't.

## Step 12: Download to Both Micro:bits
Download to both. Both start as REMOTE (Small Square icon).

On the one that plugs into the Move, press **A+B** once - it switches to BOT mode and shows a heart icon.

## Step 13: Test the Full Two-Way Flow
Set up a line for the Move. Place an obstacle in the middle of the line (a book, box, anything taller than 5cm).

- Press the menu to FOLLOW on the remote, press B to send
- Move starts following the line
- When it approaches the obstacle (within 15cm), it automatically sends HELP
- Remote flashes the **No** icon for a second
- Physically lift the Move, or move the obstacle, so it's within 5cm of something
- Move sends ARRIVED - remote flashes the **Yes** icon

The bot is now reporting back to the operator automatically, based on what it sees.

## Complete! @showdialog
You've built the foundation of real two-way robot control. Your project now has:

- **Two channels** (commands and status) carrying different kinds of messages
- **Two roles** (REMOTE and BOT) determining which channel each device uses
- **Sensor-triggered status** - the bot watches the world and reports back automatically
- **The same unified code** running on both devices - role is decided at runtime by A+B

**Two patterns this supports:**

- **Bot-initiated alert**: the bot detects something and tells the operator (e.g. HELP when blocked). The operator sees the alert, decides what to do, and sends a new command.
- **User-initiated override**: the operator watches the bot and sends commands regardless of what the bot is doing - stopping, redirecting, resuming. The bot just listens and acts.

Both patterns use the same two channels. You don't need to choose one - both are available at all times.

**For your project, think about:**

- **What real-world events should trigger ARRIVED?** Line sensors detecting a specific marker? A certain ultrasonic distance?
- **What should trigger HELP?** Obstacles? Getting lost (line sensors both showing light for too long)? Low battery?
- **Could the bot send something else?** E.g. a "STARTED" message when it begins line-following?

You now have all the patterns you need. The rest is your design.
