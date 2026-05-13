# Your Robot's Dance Routine

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
basic.showIcon(IconNames.SmallSquare)
```

## Introduction @showdialog
Your robot already knows how to move. Now it's going to **perform**.

In this tutorial you'll choreograph a dance routine using arcs — curved moves that look much more interesting than straight lines. You'll use **functions** to keep your code tidy, and **two buttons** to control two different parts of the routine.

## Step 1: Set the Turn Radius
Your template already has ``||Kitronik_Move_Motor:set turn radius Tight||`` in ``||basic:on start||``. This controls how sharply the robot curves — **Tight** means a small arc, **Wide** means a big sweeping curve.

Leave it on **Tight** for now. You can change it later and see what happens to the routine.

## Step 2: Create a forwardArc Function
From ``||functions:Functions||`` (under Advanced), click **Make a Function**. Name it **forwardArc** and click Done.

Inside, add:
- ``||Kitronik_Move_Motor:move Right at speed 50||`` → ``||basic:pause 800 ms||`` → ``||Kitronik_Move_Motor:stop||`` → ``||basic:pause 300 ms||``
- ``||Kitronik_Move_Motor:move Left at speed 50||`` → ``||basic:pause 800 ms||`` → ``||Kitronik_Move_Motor:stop||`` → ``||basic:pause 300 ms||``

```blocks
function forwardArc () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 50)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 50)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
}
```

One right arc, one left arc. That's one full swing.

## Step 3: Call forwardArc Twice on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||``.

Add ``||basic:show icon||`` with a **music note** at the start. Then call ``||functions:forwardArc||`` **twice**. Then add ``||basic:show icon||`` with a **small square** at the end.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Music)
    forwardArc()
    forwardArc()
    basic.showIcon(IconNames.SmallSquare)
})
```

Download and test. Press A — the robot should arc right, arc left, arc right, arc left.

## Step 4: Create a backwardArc Function
From ``||functions:Functions||``, make a new function called **backwardArc**.

Same pattern as forwardArc, but use **Reverse** instead of Right and Left.

```blocks
function backwardArc () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
}
```

## Step 5: Call backwardArc Twice on Button B
Drag ``||input:on button B pressed||`` into the workspace. Same structure as button A — music note, call **backwardArc** twice, small square.

```blocks
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Music)
    backwardArc()
    backwardArc()
    basic.showIcon(IconNames.SmallSquare)
})
```

Download and test. Press B — notice anything? The robot goes straight back instead of arcing. That's because **Reverse** doesn't use the turn radius setting. We'll fix that next.

## Step 6: Adjust and Explore
Try changing these and re-downloading each time:
- The **turn radius** in ``||basic:on start||`` — try **Wide** or **Spot**
- The **pause lengths** inside the functions — longer means bigger arcs
- The **speed** — slower looks more graceful, faster looks more energetic

Notice that changing the function changes **both** calls at once. That's the point of functions — one edit, everywhere it's used.

## Step 7: Fix the Backward Arc with Motor Control
To arc backwards, we need to control each motor individually and run them at **different speeds** — the outer motor faster, the inner motor slower. That speed difference is what creates the curve.

Update your **backwardArc** function. Delete the Reverse blocks and replace them with individual motor blocks from ``||Kitronik_Move_Motor:Move Motor||``.

For a **backward-right** arc: left motor is the outer wheel, so it runs faster.
For a **backward-left** arc: right motor is the outer wheel, so it runs faster.

```blocks
function backwardArc () {
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, 50)
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Reverse, 25)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Reverse, 50)
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, 25)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
}
```

Download and test. The backward routine should now arc in both directions.

Try changing the slower motor's speed — **25** is half of 50, but experiment. A bigger difference means a tighter arc; a smaller difference means a gentler curve.

## Complete! @showdialog
Your robot now has a two-part routine controlled by two buttons, with proper arcs in both directions.

Two things to take away. First, **functions**: one edit changes every place the function is called. Second, **abstraction levels**: `move Right` is a convenient shortcut that works well going forward, but sometimes you need to drop down to individual motor control to get exactly the behaviour you want.

**Next tutorial:** you'll sync two robots using radio so they perform together at exactly the same time.
