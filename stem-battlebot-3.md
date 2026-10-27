# Battle Bot 3: Safety Stop (Robot)

```template
let channel = ""
channel = "duck"
radio.setGroup(101)
let teamLights = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
teamLights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
basic.showIcon(IconNames.Duck)
input.onButtonPressed(Button.A, function () {
    radio.sendValue(channel, 3)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, 0)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, 2)
})
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == 3) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
        } else if (value == 0) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
        } else if (value == 2) {
            Kitronik_Move_Motor.stop()
        } else if (value == 1) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
        } else if (value == 4) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        }
    }
})
```

## Introduction @showdialog
In Battle Bot 2 you found a problem: if the **stop** message gets lost, the robot keeps driving — maybe right out of the sumo ring.

Real battle bots have a **safety stop**: if the robot stops hearing from its controller, it stops itself.

Your template is your code from Battle Bot 1. You'll change how the robot listens, so it can tell when it has lost contact.

This tutorial is part 1 of 2. Next you'll update the **controller** too.

## Step 1: Remove the Remote Buttons
The Arcade controller is your remote now, so the robot doesn't need the button blocks.

Delete ``||input:on button A pressed||``, ``||input:on button B pressed||`` and ``||input:on button A+B pressed||``.

## Step 2: Two New Variables
From ``||variables:Variables||``, make two new variables:
- **command** — the last move the driver asked for
- **lastHeard** — the time we last got a message

In ``||basic:on start||``, add ``||variables:set command to 2||`` so the robot starts stopped.

```blocks
let lastHeard = 0
let command = 0
let channel = ""
channel = "duck"
radio.setGroup(101)
let teamLights = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
teamLights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
basic.showIcon(IconNames.Duck)
command = 2
```

## Step 3: Listen, Don't Move
Up to now, the robot moved **straight away** inside ``||radio:on radio received||``. That's the problem — if no message comes, nothing happens.

Drag the big ``||logic:if else if||`` block (the one with all the moves) **out** of the radio block and leave it to one side. You'll use it in the next step.

Inside the name check, add:
- ``||variables:set command to||`` ``||variables:value||``
- ``||variables:set lastHeard to||`` ``||input:running time (ms)||``

Now the radio block just **remembers** what the driver wants and **when** they said it.

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        command = value
        lastHeard = input.runningTime()
    }
})
```

## Step 4: Move in a Forever Loop
From ``||basic:Basic||``, drag a ``||basic:forever||`` loop. Put your moves block inside it.

Change every ``||variables:value||`` in it to ``||variables:command||``.

The forever loop checks ``||variables:command||`` again and again, many times every second.

```blocks
basic.forever(function () {
    if (command == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    } else if (command == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
    } else if (command == 2) {
        Kitronik_Move_Motor.stop()
    } else if (command == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
    } else if (command == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    }
})
```

## Step 5: Add the Safety Stop
Now the important part. At the **top** of the ``||basic:forever||`` loop, add:

- If ``||input:running time (ms)||`` − ``||variables:lastHeard||`` > **500**: ``||variables:set command to 2||``

In plain words: *"If I haven't heard from my driver for half a second, stop."*

```blocks
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 2
    }
    if (command == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    } else if (command == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
    } else if (command == 2) {
        Kitronik_Move_Motor.stop()
    } else if (command == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
    } else if (command == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    }
})
```

## Step 6: Download to the Robot
Download and flash this onto the micro:bit in your Move.

**Wait!** If you try your Battle Bot 2 controller now, the robot will drive for half a second, then stop — even while you hold the button. Why?

Your controller only sends a message when a button is **pressed** or **released**. Holding a button sends nothing — so the robot thinks it has lost contact.

The fix is in the next tutorial: a controller that keeps talking. Open **Battle Bot 3: Safety Stop (Controller)** in MakeCode Arcade:

https://arcade.makecode.com/#tutorial:github:cggs-matthew-pham/cggs-arcade-tutorials/battlebot-3-controller

## Complete! @showdialog
Your robot now **listens** in one place and **acts** in another.

The radio block remembers the latest command. The forever loop acts on it — and notices if the messages stop coming. Splitting "listening" from "doing" is what makes the safety stop possible.
