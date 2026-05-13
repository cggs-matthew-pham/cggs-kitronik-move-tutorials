# Your Robot's Dance Routine

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
basic.showIcon(IconNames.SmallSquare)
```

## Introduction @showdialog
Your robot already knows how to move. Now it's going to **perform**.

In this tutorial you'll program two dance moves — a wiggle left and a wiggle right. You'll use **functions** to keep your code tidy, and **two buttons** to trigger each move.

## Step 1: Set the Turn Radius
Your template already has ``||Kitronik_Move_Motor:set turn radius Tight||`` in ``||basic:on start||``. Leave it as is.

## Step 2: Create a wiggleLeft Function
From ``||functions:Functions||`` (under Advanced), click **Make a Function**. Name it **wiggleLeft** and click Done.

Inside, add:
- ``||Kitronik_Move_Motor:spin Left at speed 30||`` → ``||basic:pause 400 ms||`` → ``||Kitronik_Move_Motor:stop||`` → ``||basic:pause 300 ms||``
- ``||Kitronik_Move_Motor:move Forward at speed 30||`` → ``||basic:pause 800 ms||`` → ``||Kitronik_Move_Motor:stop||`` → ``||basic:pause 300 ms||``
- ``||Kitronik_Move_Motor:spin Right at speed 30||`` → ``||basic:pause 400 ms||`` → ``||Kitronik_Move_Motor:stop||`` → ``||basic:pause 300 ms||``

```blocks
function wiggleLeft () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
}
```

## Step 3: Create a wiggleRight Function
From ``||functions:Functions||``, make a new function called **wiggleRight**.

Same pattern, but start with a **right** spin and end with a **left** spin.

```blocks
function wiggleRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(800)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(300)
}
```

## Step 4: Call wiggleLeft on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||``.

Add ``||basic:show arrow||`` pointing **East** at the start. Then call ``||functions:wiggleLeft||``. Then show a **small square** at the end.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.East)
    wiggleLeft()
    basic.showIcon(IconNames.SmallSquare)
})
```

## Step 5: Call wiggleRight on Button B
Drag ``||input:on button B pressed||``. Same structure — **West** arrow, call ``||functions:wiggleRight||``, small square.

```blocks
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.West)
    wiggleRight()
    basic.showIcon(IconNames.SmallSquare)
})
```

Download and test. Press A — the robot wiggles left. Press B — it wiggles right.

## Step 6: Adjust and Explore
Try changing these and re-downloading:
- The **spin pause** — longer means a bigger turn
- The **forward pause** — longer means more of a step forward
- The **speed** — slower looks more deliberate

Notice that changing the function changes both the move and every place it's called. That's the point of functions — one edit, everywhere.

## Complete! @showdialog
Your robot now has two dance moves triggered by two buttons.

The key idea is **functions**: write the move once, call it anywhere. In the next tutorial you'll add radio so a partner robot can mirror your moves — when yours wiggles left, theirs wiggles right.
