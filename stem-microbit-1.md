# Making Your Robot Move

## Introduction @showdialog
Time to drive your robot!

In this tutorial you will make your Kitronik Move robot go **forward**, **backward**, **spin**, and **stop**.

By the end you will have a robot that performs a short sequence of moves — all by itself.

## Step 1: Go Forward
Let's start simple. Make the robot drive forward for one second, then stop.

From ``||Kitronik_Move_Motor:Move Motor||``, drag ``||Kitronik_Move_Motor:move Forward at speed 50||`` into the ``||basic:on start||`` block.

Then add ``||basic:pause 1000 ms||`` underneath — that means wait one second.

Then add ``||Kitronik_Move_Motor:stop||``.

```blocks
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
basic.pause(1000)
Kitronik_Move_Motor.stop()
```

Download and try it. Does the robot drive forward and stop?

## Step 2: Change the Speed
The number in ``||Kitronik_Move_Motor:move Forward at speed 50||`` controls how fast the robot goes. **0** is stopped, **100** is full speed.

Try changing **50** to **30**. Download again. Is it slower?

Try **80**. Is it faster?

Pick a speed you like — somewhere between 30 and 60 works well for most surfaces.

## Step 3: Go in Reverse
Now add a reverse move after the stop.

Add another ``||Kitronik_Move_Motor:move||`` block — this time change the direction to **Reverse**.
Add a ``||basic:pause||`` and another ``||Kitronik_Move_Motor:stop||``.

```blocks
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
basic.pause(1000)
Kitronik_Move_Motor.stop()
basic.pause(500)
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
basic.pause(1000)
Kitronik_Move_Motor.stop()
```

The ``||basic:pause 500||`` between moves gives the robot a moment to fully stop before changing direction. Try it without the pause — what happens?

## Step 4: Spin
Now add a spin. From ``||Kitronik_Move_Motor:Move Motor||``, find ``||Kitronik_Move_Motor:spin Left at speed 50||``.

Add it after your reverse stop, with a pause and a stop.

```blocks
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

Try changing **Left** to **Right**. Try different spin speeds and pause lengths — a longer pause means a bigger turn.

## Step 5: Design Your Own Sequence
Now it's your turn. Rearrange and extend the moves to create your own sequence.

Some ideas:
- Forward, spin, forward again
- Reverse then spin to face a new direction
- Short fast bursts vs long slow glides

Try to make something that looks deliberate — like the robot knows what it's doing.

**If you finish early:** can you help someone nearby who is still on an earlier step?

## Complete! @showdialog
You can now make your robot move in any direction, at any speed, for any amount of time.

The key idea is **sequence** — the robot does exactly what you tell it, in order, one step at a time. The ``||basic:pause||`` block controls timing, which is what makes movements look intentional rather than random.

**Next tutorial:** you'll trigger your sequence with a button press — so the robot sits still until you tell it to go.
