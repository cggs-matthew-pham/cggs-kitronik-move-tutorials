# Kitronik :MOVE Motor - Adapting Line Following

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
You already know line following from Kitronik's line-following tutorial. This tutorial shows you how to plug that knowledge into the **state pattern** from Tutorial 3 - so line-following becomes just another radio-triggered behaviour.

The template code has it all wired up already. Your job is to understand it, add the radio trigger, test it, and move on.

## Step 1: Check Your Setup
The template includes:

- Everything from the previous tutorials (radio, channel, GO/STOP, state + forever loop)
- A new state constant **FOLLOW = 2**
- A new function **followLine** that sets `currentAction = FOLLOW`
- A new `else if (value == FOLLOW)` branch in the dispatcher that calls `followLine()`
- A new `if (currentAction == FOLLOW)` branch at the top of the forever loop that runs the line-following algorithm

Make sure `channel` matches yours.

## Step 2: Understand How It Fits Together
The line-following logic lives inside the forever loop, in the FOLLOW branch. Every tick:

1. Read both line sensors
2. Calculate the difference between them (using the **absolute value** so we ignore whether left is bigger or right is bigger at first)
3. If the difference is **more than 10**, the sensors disagree: one is on the line, one isn't. Spin toward the line.
4. If the difference is **10 or less**, both sensors agree: we're tracking straight. Drive forward.

This is exactly the algorithm from Kitronik's line-following tutorial - it's just now wrapped in an if-check that only runs when `currentAction == FOLLOW`. That's the key: line-following only happens when the state says it should.

## Step 3: Add the Radio Trigger (Button A+B)
Right now the remote sends GO on button A and STOP on button B, but nothing sends FOLLOW. Let's fix that.

From ``||input:Input||``, drag ``||input:on button A+B pressed||`` into the workspace. Inside it, ``||radio:radio send value||`` with ``||variables:channel||`` and ``||variables:FOLLOW||``.
```blocks
let channel = ""
let FOLLOW = 0
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, FOLLOW)
})
```

Now pressing A+B on the remote sends FOLLOW, which triggers `followLine()`, which sets `currentAction = FOLLOW`, which the forever loop reads and starts running the line-follow logic.

## Step 4: Test in the Simulator
The simulator can't actually follow a line (no physical sensors), but you can verify the radio path works:

- Press A on one simulator → both show GO is received
- Press A+B on one → the other's dispatcher receives FOLLOW

If the radio path works, the logic on real hardware will work too.

## Step 5: Download and Test on the Move
Download to both micro:bits. Set your Move on a line (black tape on white paper works well).

- Press **A** on the remote: Move drives straight forward, not following
- Press **A+B**: Move starts following the line
- Press **B**: Move stops

## Step 6: Tune for Your Setup
Line following depends on the surface, the line colour, and the lighting. The template uses:

- **Tolerance of 10** for "difference is significant"
- **Spin speed of 20** for turning onto the line
- **Forward speed** = your `speed` variable (default 40)

If the bot wobbles too much, try a tolerance of 15 or 20 (less twitchy). If it misses turns, try 5 or 8 (more sensitive). If it spins too fast and overshoots, drop the spin speed to 15.

These are the numbers in your forever loop's FOLLOW branch. Tweak them until the bot tracks your line smoothly.

## Complete! @showdialog
You've added line following as a new state in your dispatcher. Three behaviours now, all triggered by radio, all using the same pattern.

**What matters here isn't the line-follow code itself - it's the pattern.** Any continuous behaviour (patrolling, obstacle-avoiding, searching) would plug in the same way:

1. Create a new state constant
2. Create a function that sets `currentAction` to the new state
3. Add a dispatcher branch that calls the function
4. Add a forever-loop branch with the actual logic

**Tips for your project:**
- **Combine commands**: press A+B to follow, then B to stop at a specific point
- **Add a REVERSE state**: useful if the bot gets stuck
- **Use ZIP LEDs to show state**: green during FOLLOW, amber during GO, red during STOP - makes debugging easier

**Next step**: your remote has 3 commands on 3 button combos. What if you want 6 or 8? The **Cycle-and-Select Controller** tutorial shows how to build a remote that can send lots of commands using just 2 buttons.
