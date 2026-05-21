```template
input.onButtonPressed(Button.A, function () {
    readyToSend = true
    basic.showIcon(IconNames.Yes)
})
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
let readyToSend = false
radio.setGroup(1)
let STOP = 0
let FOLLOW = 1
let GO = 2
let SPIN_LEFT = 3
let SPIN_RIGHT = 4
let REVERSE = 5
let CUSTOM_ACTION = 6
let channel = "Roger"
readyToSend = false
basic.showIcon(IconNames.No)
basic.forever(function () {
    if (readyToSend == true) {
        if (Kitronik_Move_Motor.measure() >= 7 && Kitronik_Move_Motor.measure() <= 10) {
            readyToSend = false
            basic.showIcon(IconNames.No)
            radio.sendValue(channel, CUSTOM_ACTION)
            moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
            moveMotorZIP.showRainbow(1, 360)
            moveMotorZIP.show()
            basic.pause(500)
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

## Introduction @showdialog

In this tutorial, a second Move Motor acts as a **tripwire robot**.

It sits stationary beside the track. When the first robot passes in front of its ultrasonic sensor, the tripwire robot detects it and sends `CUSTOM_ACTION` over radio — triggering the first robot to run its preprogrammed sequence.

The robot from Tutorial 6 does not change. This tutorial is only about the tripwire robot.

**Before you start:** check that `radio.setGroup()` and `channel` match your assigned values. Both robots must be on the same group and channel.

## Step 1: Understand the Pattern

The tripwire works in two stages:

1. **Arm:** press **A** to signal the tripwire is ready. It shows a Yes icon.
2. **Trigger:** when the first robot passes within 7–10 cm, `CUSTOM_ACTION` is sent and the tripwire disarms itself.

The arm step prevents accidental triggers — the sensor is not checked until you deliberately press A first.

## Step 2: Understand the Distance Check

The forever loop only acts when `readyToSend` is true.

Inside that check, the distance is read twice:

```blocks
if (Kitronik_Move_Motor.measure() >= 7 && Kitronik_Move_Motor.measure() <= 10) {
```

Using a range rather than a single threshold filters out errant readings near 0 and ignores objects that are too far away. A robot passing at the right distance will consistently fall within 7–10 cm.

You may need to adjust the range depending on how close the tripwire is placed to the track.

## Step 3: Understand What Happens on Trigger

When the condition is met:

```blocks
readyToSend = false
basic.showIcon(IconNames.No)
radio.sendValue(channel, CUSTOM_ACTION)
```

The tripwire disarms immediately and sends `CUSTOM_ACTION` over radio. It then plays a brief rainbow on its own ZIP LEDs as confirmation, before clearing them.

The first robot receives `CUSTOM_ACTION` and runs `doCustomAction()` — the same as if it had been sent from the remote.

## Step 4: Position and Test

Download this code to the tripwire robot. Leave the first robot running the Tutorial 6 code unchanged.

Position the tripwire robot beside the track so the sensor faces across the path of the first robot.

To test:

1. Press **A** on the tripwire — it shows a Yes icon.
2. Drive the first robot toward the tripwire using the remote.
3. When it passes within range, the tripwire fires: lights flash, signal is sent.
4. The first robot runs its custom action.

If the tripwire fires too early or too late, adjust its position or narrow the range (e.g. `>= 8 && <= 9`).

## Complete! @showdialog

You now have two ways to trigger the custom action on the first robot:

- **Remote control:** cycle to the custom action icon and press B
- **Tripwire:** the first robot triggers it automatically by passing the second robot

Both send the same `CUSTOM_ACTION` value over radio. The first robot does not know or care which sender triggered it — it just runs the sequence.
