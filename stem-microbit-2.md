# Your Robot's Dance Routine

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
basic.showIcon(IconNames.SmallSquare)
```

## Introduction @showdialog
Your robot already knows how to move. Now it's going to **perform**.

In this tutorial you'll choreograph a dance routine using arcs — curved moves that look much more interesting than straight lines. You'll use **functions** to keep your code tidy, and **two buttons** to control two different parts of the routine.

## Step 1: Set the Turn Radius
Your template already has ``||Kitronik_Move_Motor:set turn radius Standard||`` in ``||basic:on start||``. This controls how sharply the robot curves — **Tight** means a small arc, **Wide** means a big sweeping curve.

Leave it on **Standard** for now. You can change it later and see what happens to the routine.

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

Add ``||basic:show icon||`` with an **eighth note** at the start. Then call ``||functions:forwardArc||`` **twice**. Then add ``||basic:show icon||`` with a **small square** at the end.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.EighthNote)
    forwardArc()
    forwardArc()
    basic.showIcon(IconNames.SmallSquare)
})
```

Download and test. Press A — the robot should arc right, arc left, arc right, arc left.

## Step 4: Create a backwardSteps Function
From ``||functions:Functions||``, make a new function called **backwardSteps**.

Two reverse moves with pauses — the robot steps straight back twice.

```blocks
function backwardSteps () {
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

## Step 5: Call backwardSteps Twice on Button B
Drag ``||input:on button B pressed||`` into the workspace. Same structure as button A — eighth note, call **backwardSteps** twice, small square.

```blocks
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.EighthNote)
    backwardSteps()
    backwardSteps()
    basic.showIcon(IconNames.SmallSquare)
})
```

Download and test. A does the forward routine, B does the backward routine.

## Step 6: Adjust and Explore
Try changing these and re-downloading each time:
- The **turn radius** in ``||basic:on start||`` — try **Tight** or **Wide**
- The **pause lengths** inside the functions — longer means bigger arcs
- The **speed** — slower looks more graceful, faster looks more energetic

Notice that changing the function changes **both** calls at once. That's the point of functions — one edit, everywhere it's used.

## Complete! @showdialog
Your robot now has a two-part routine controlled by two buttons.

Two things to take away. First, **functions**: one edit changes every place the function is called. Second, **when** something runs matters as much as **what** it does — moving actions into button presses means the robot waits for your cue, just like a real performer.

**Next tutorial:** you'll sync two robots using radio so they perform together at exactly the same time.
