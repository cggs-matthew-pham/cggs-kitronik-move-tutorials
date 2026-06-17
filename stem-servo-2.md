# Robot Arms and Music

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
basic.showIcon(IconNames.SmallSquare)
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)

function moveLeftArm () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 90)
    basic.pause(500)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
    basic.pause(500)
}

function moveRightArm () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 90)
    basic.pause(500)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)
    basic.pause(500)
}

function moveBothArms () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 90)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 90)
    basic.pause(500)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo2, 180)
    basic.pause(500)
}
```

## Introduction @showdialog

Your robot can dance to music. Now it's going to wave its arms.

In this tutorial your robot will listen for radio signals from the Melody Composer and respond with arm gestures — one arm per phrase, both arms for the third.

You will need two micro:bits:
- **Conductor** — running the Melody Composer code from stem-music-1
- **Robot** — this micro:bit, plugged into the Move Motor with servo arms attached

## Step 1: Explore the Template

Your template already includes the three arm functions from stem-servo-1, plus servo resting positions in ``||basic:on start||``.

Download and confirm both arms rest in their correct positions before continuing.

## Step 2: Set Your Radio Group

From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Use the **same group number** as your Conductor micro:bit.

```blocks
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 3: Add the Radio Handler

From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||``.

Add an ``||logic:if then else if then else if||`` block with three branches.

- If ``||variables:receivedNumber||`` equals **0**: show string **"A"**, call ``||functions:moveRightArm||``, show small square
- Else if equals **1**: show string **"B"**, call ``||functions:moveLeftArm||``, show small square
- Else if equals **2**: show string **"C"**, call ``||functions:moveBothArms||``, show small square

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showString("A")
        moveRightArm()
        basic.showIcon(IconNames.SmallSquare)
    } else if (receivedNumber == 1) {
        basic.showString("B")
        moveLeftArm()
        basic.showIcon(IconNames.SmallSquare)
    } else if (receivedNumber == 2) {
        basic.showString("C")
        moveBothArms()
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## Step 4: Download and Test

Download to your Robot micro:bit and switch on the Move Motor.

Use button controls on a second micro:bit running stem-music-2 to trigger each phrase manually.

Check that:
- Sending 0 raises the right arm and returns it to rest
- Sending 1 raises the left arm and returns it to rest
- Sending 2 raises both arms and returns them to rest
- Arms return to idle between phrases

Once that works, switch the Conductor to the Melody Composer (stem-music-1) and confirm the arms respond to the song phrases.

## Step 5: Adjust the Timing

The 500ms pause controls how long the arm takes to reach 90°. If the arm looks rushed, increase it. If it looks too slow for the music, decrease it.

Try a few values and find what feels best with the melody.

## Complete! @showdialog

Your robot is now gesturing in response to music — each phrase triggering a different arm movement.

In the next tutorial you will add wheel movement so the arms and motors run at the same time.
