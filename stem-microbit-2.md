# Your Robot's Dance Routine

```template
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
basic.pause(1000)
Kitronik_Move_Motor.stop()
basic.pause(500)
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
basic.pause(1000)
Kitronik_Move_Motor.stop()
basic.pause(500)
Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
basic.pause(500)
Kitronik_Move_Motor.stop()
```

## Introduction @showdialog
Your robot can already move. But right now it starts the moment it's switched on — not ideal for a performance!

In this tutorial you'll move your sequence into a **button press**, so the robot waits on stage until you tell it to go. Then you'll extend the sequence to make it more interesting.

## Step 1: Move Your Sequence to Button A
Right now your moves are in ``||basic:on start||`` — they run immediately when the micro:bit turns on.

We want them to run when you press **button A** instead.

From ``||input:Input||``, drag ``||input:on button A pressed||`` into the workspace.

Now move all your existing blocks from ``||basic:on start||`` into the new ``||input:on button A pressed||`` block.

```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
})
```

Download and test. The robot should sit still until you press A.

## Step 2: Show a Ready Signal
It would be useful to know when the robot is ready and when it is performing. Let's add some icons.

Add ``||basic:show icon||`` with a **small square** at the very start of ``||basic:on start||`` — this shows when the robot is ready and waiting.

Then add ``||basic:show icon||`` with a **music note** at the start of your button A sequence — this shows when the routine is running.

```blocks
basic.showIcon(IconNames.SmallSquare)

input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Music)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    basic.pause(500)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
    basic.showIcon(IconNames.SmallSquare)
})
```

The square at the end brings the display back to "ready" when the routine finishes.

## Step 3: Extend Your Routine
A good performance needs more than three moves. Add at least **four more moves** to your sequence.

Think about:
- Mixing fast and slow speeds
- Short sharp moves vs long smooth ones
- Spinning different directions
- Pausing in place for dramatic effect — just a ``||basic:pause||`` with no movement

There is no right answer. You are choreographing a performance.

**If you finish early:** look at what the person next to you has made and give them one suggestion.

## Complete! @showdialog
Your robot now waits for your signal before performing — just like a real stage performer.

You've learned that **when** something runs matters just as much as **what** it does. Moving the sequence into a button press didn't change the moves at all, but it completely changed how useful the program is.

**Next tutorial:** you'll sync two robots together using radio, so they perform at exactly the same time.
