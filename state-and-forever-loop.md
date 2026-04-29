# Kitronik :MOVE Motor - State and the Forever Loop

```template
let channel = ""
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
speed = 40
channel = "Roger"

function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    basic.showArrow(ArrowNames.North)
}

function stopBot () {
    Kitronik_Move_Motor.stop()
    basic.showIcon(IconNames.SmallSquare)
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
        } else {
            stopBot()
        }
    }
})
```

## Introduction @showdialog
Your bot can drive forward and stop over radio. But right now, your functions *do things directly* - `driveForward` turns motors on, `stopBot` turns them off.

To add behaviours like **line following** - which needs to keep running and checking sensors continuously - you need a different pattern. This tutorial refactors your code so functions **set what the bot should be doing** and a `forever` loop **does it**.

No new features added - this is a setup tutorial that makes the next one much easier.

## Step 1: Why We're Doing This
Think about line following for a moment. To follow a line, the bot needs to:
- Read the sensors
- Decide which way to go
- Move
- Read the sensors again
- Decide again
- Move again
- Forever.

A single function call can't do "forever." But a ``||basic:forever||`` loop can. What we need is a way to tell the forever loop *what it should be doing right now*.

That's what a **state variable** does. It holds "what I'm currently meant to be doing," and the forever loop reads it every tick.

## Step 2: Check Your Channel
The template uses `channel = "Roger"`. If you picked a different channel name in the previous tutorial, update this to match what you and your Move were using.

## Step 3: Create a currentAction Variable
From ``||variables:Variables||``, click "Make a Variable" and create **currentAction**. Drag ``||variables:set currentAction to 0||`` into ``||basic:on start||`` (somewhere after the other variable setups).

This is your state variable. It tracks what the bot is currently doing. A value of **STOP** (which is 0) means "do nothing," **GO** (which is 1) means "drive forward."
```blocks
let currentAction = 0
let channel = ""
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
speed = 40
channel = "Roger"
currentAction = STOP
```

## Step 4: Change driveForward to Set the State
Open your ``||functions:driveForward||`` function. Right now it directly calls the move block and shows an arrow. We're going to replace both.

Delete everything inside ``||functions:driveForward||``.

Drag in ``||variables:set currentAction to||`` from ``||variables:Variables||`` and set its value to ``||variables:GO||``.

The display will move into the forever loop in a moment — the function just sets state now.
```blocks
let GO = 0
let currentAction = 0
function driveForward () {
    currentAction = GO
}
```

The function no longer moves the bot directly. It just records "I want to be going forward." Something else will do the actual moving.

## Step 5: Change stopBot to Set the State
Do the same for ``||functions:stopBot||``. Delete everything inside it, and replace with ``||variables:set currentAction to STOP||``.
```blocks
let STOP = 0
let currentAction = 0
function stopBot () {
    currentAction = STOP
}
```

## Step 6: Add a Forever Loop
From ``||basic:Basic||``, drag ``||basic:forever||`` into the workspace.

The forever loop will read `currentAction` every tick and decide what to do.
```blocks
basic.forever(function () {
	
})
```

## Step 7: Decide What to Do Based on currentAction
Inside the forever loop, add an ``||logic:if then else||`` block.

In the condition, check if ``||variables:currentAction||`` equals ``||variables:GO||``. In the **if**, drag in ``||Kitronik_Move_Motor:move Forward||`` and set the speed to ``||variables:speed||``, then add ``||basic:show arrow North||``. In the **else**, drag in ``||Kitronik_Move_Motor:stop||`` and ``||basic:show icon Small Square||``.

The display now lives in the forever loop where it belongs — it reflects what the bot is actually doing each tick.
```blocks
let speed = 0
let GO = 0
let currentAction = 0
basic.forever(function () {
    if (currentAction == GO) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
        basic.showArrow(ArrowNames.North)
    } else {
        Kitronik_Move_Motor.stop()
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

The forever loop is now the **engine** of your bot. Every tick, it reads `currentAction` and does the right thing.

## Step 8: Test in the Simulator
Behaviour should be exactly the same as before. Button A on the remote triggers GO, which eventually sets `currentAction = GO`, which the forever loop reads and runs the move block. Button B triggers STOP.

Try it. If something doesn't work, check:
- `currentAction` is declared at the top
- The forever loop is reading `currentAction` (not `receivedNumber` or anything else)
- `driveForward` and `stopBot` are *setting* `currentAction`, not calling motor blocks directly

## Step 9: Download and Test on the Move
Download to both micro:bits. Test with your Move. Everything should behave identically to how it did at the end of Radio Channels.

Why bother, then? Because this pattern lets us add complex behaviours next.

## Complete! @showdialog
You've refactored your bot to use a **state variable** pattern. Your code now has a clear separation:

- **Functions** decide what the bot *should* be doing (they set `currentAction`)
- **The forever loop** does the actual work (it reads `currentAction` and acts)

This feels like more work for the same result, but the payoff comes in the next tutorial. Line following needs to run continuously, checking sensors on every tick. With this pattern, adding line following is just:

1. Create a new state value (like `FOLLOW_LINE`)
2. Add a function that sets `currentAction = FOLLOW_LINE`
3. Add an `else if` in the forever loop that runs the line-follow logic

No changes to any other part of the code.

**Next step**: **Adapting Line Following** drops the Kitronik line-following algorithm into your forever loop as a new state. You'll be able to radio-trigger line following from your remote.
