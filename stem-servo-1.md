# Robot Arms

```template
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)
basic.showIcon(IconNames.SmallSquare)
```

## Introduction @showdialog

Your robot can move and dance. Now it's getting arms.

In this tutorial you will connect two servo motors to the Move Motor board and program them to move independently — one arm per button, and both arms together using the logo press.

You will need:
- Your micro:bit plugged into the Move Motor
- Two servo motors connected to the servo pins
- LEGO arms attached to each servo

## Step 1: Understand the Starting Positions

Your template already sets both servos to their resting positions:
- **Servo 1** starts at **0°**
- **Servo 2** starts at **180°**

These are mirrored because the two arms are mounted on **opposite sides** of the robot. If both started at 0°, one arm would point up and the other down. By mirroring the angles, both arms rest in the same position relative to the robot's body.

```blocks
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Create a moveLeftArm Function

From ``||functions:Functions||`` (under Advanced), click **Make a Function**. Name it **moveLeftArm**.

Inside, add:
- ``||Kitronik_Move_Motor:write servo pin servo1 to 90||`` → ``||basic:pause 500 ms||``
- ``||Kitronik_Move_Motor:write servo pin servo1 to 0||`` → ``||basic:pause 500 ms||``

This sweeps the left arm up to 90° and back to its resting position.

```blocks
function moveLeftArm () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 90)
    basic.pause(500)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
    basic.pause(500)
}
```

## Step 3: Create a moveRightArm Function

Make a new function called **moveRightArm**.

Same pattern, but using **servo2** — sweep to **90°** then back to **180°**.

Notice servo2 returns to 180° instead of 0° — again because it is mounted on the opposite side.

```blocks
function moveRightArm () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 90)
    basic.pause(500)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)
    basic.pause(500)
}
```

## Step 4: Create a moveBothArms Function

Make a third function called **moveBothArms**.

Move both servos to **90°** at the same time, pause, then return both to their resting positions.

```blocks
function moveBothArms () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 90)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 90)
    basic.pause(500)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)
    basic.pause(500)
}
```

## Step 5: Connect to Buttons

From ``||input:Input||``, drag ``||input:on button A pressed||``. Call ``||functions:moveRightArm||`` inside it.

Drag ``||input:on button B pressed||``. Call ``||functions:moveLeftArm||`` inside it.

```blocks
input.onButtonPressed(Button.A, function () {
    moveRightArm()
})
input.onButtonPressed(Button.B, function () {
    moveLeftArm()
})
```

## Step 6: Connect to Logo Press

From ``||input:Input||``, drag ``||input:on logo pressed||``. Call ``||functions:moveBothArms||`` inside it.

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    moveBothArms()
})
```

## Step 7: Download and Test

Download to your micro:bit and switch on the Move Motor.

Check that:
- Button A raises and lowers the right arm
- Button B raises and lowers the left arm
- Logo press raises and lowers both arms together
- Both arms rest in the same position when idle

If an arm moves the wrong way, try swapping the two angle values in that function.

## Complete! @showdialog

Your robot now has working arms — each one controlled independently, or together.

The key idea is **mirrored angles**: because the servos face opposite directions, the same physical movement requires different numbers on each side.

In the next tutorial your robot will respond to radio signals — raising its arms in time with the music.
