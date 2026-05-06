# Remote Control

```template
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

## Introduction @showdialog
So far your robot starts when you press a button on the robot itself. But what if you want to control it from across the room?

In this tutorial you'll set up a **remote control** — a separate micro:bit with no robot attached. Press **A** to drive, press **B** to stop, press **A+B** to trigger the dance routine. Two robots will both respond to the same remote at the same time.

You'll write two separate programs: one for the remote, one for the robots.

## Step 1: Understand the Setup
You need **three micro:bits** for this tutorial:
- **1 remote** — held by the operator, no robot attached
- **2 robots** — the Kitronik Move kits, both running identical code

All three need to be on the same radio group.

## Step 2: Remote Code — Radio Group and Icons
Start a **fresh project** for the remote micro:bit.

Add ``||radio:radio set group||`` to ``||basic:on start||``. Set it to **1** (or whatever group number your teacher has assigned).

Add ``||basic:show icon||`` with a **small square** — this is the idle state.

```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 3: Remote Code — Button A Sends GO
Add ``||input:on button A pressed||``.

Inside it, ``||radio:radio send number 1||`` — this is the GO signal.

Then show a **tick** icon to confirm the signal was sent.

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
    basic.showIcon(IconNames.Yes)
})
```

## Step 4: Remote Code — Button B Sends STOP
Add ``||input:on button B pressed||``.

Inside it, ``||radio:radio send number 0||`` — this is the STOP signal.

Then show a **cross** icon to confirm.

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    basic.showIcon(IconNames.No)
})
```

## Step 5: Remote Code — Button A+B Sends ROUTINE
Add ``||input:on button A+B pressed||``.

Inside it, ``||radio:radio send number 2||`` — this is the ROUTINE signal.

Then show a **music note** icon to confirm.

```blocks
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(2)
    basic.showIcon(IconNames.Music)
})
```

The remote code is done. Download it to the remote micro:bit.

## Step 6: Robot Code — Radio Group
Now open your **robot project** from the previous tutorial.

Add ``||radio:radio set group||`` to ``||basic:on start||``. Use the same group number as the remote.

```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 7: Robot Code — Listen for Signals
Add ``||radio:on radio received receivedNumber||``.

Inside it, check what number arrived:
- If **1** (GO): show a **diamond** and drive forward
- If **2** (ROUTINE): show a **heart** and run the dance routine
- Otherwise (STOP): show a **square** and stop

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Diamond)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Heart)
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
    } else {
        basic.showIcon(IconNames.SmallSquare)
        Kitronik_Move_Motor.stop()
    }
})
```

Replace the routine moves above with your own choreography from the previous tutorial.

Download this to **both** robot micro:bits — identical code on each.

## Step 8: Test It
Power on all three micro:bits. All three should show a small square.

- Press **A** on the remote — both robots drive forward, remote shows tick, robots show diamond
- Press **B** — both robots stop, remote shows cross, robots show square
- Press **A+B** — both robots perform their routine, remote shows music note, robots show heart

If only one robot responds, check it is on the same radio group number.

## Complete! @showdialog
You now have a remote that drives and performs with two robots simultaneously.

The icon language makes it easy to see what is happening from across the room:
- **Tick / Cross** on the remote — a control signal was sent
- **Music note** on the remote — a performance cue was sent
- **Diamond** on the robots — driving
- **Heart** on the robots — performing
- **Square** on everything — standing by

**For your OnStage performance:** the remote operator can be a performer too — walking on stage and cueing the robots at the right moment in the music. The robots don't need to be touched once the show starts.
