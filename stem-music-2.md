# Robot Dancer

## Introduction @showdialog

In this tutorial your micro:bit will listen for radio signals and respond — first by displaying the phrase letter, then by moving the robot.

This micro:bit works in two modes:
- **Remote** — hold it in your hand and press buttons to send signals
- **Robot** — plug it into the Move Motor and it responds to signals from any Conductor

You will need:
- This micro:bit (plugged into the Move Motor when testing movement)
- A second micro:bit running the Melody Composer, or this micro:bit used as a remote to control another robot

## Step 1: Set Radio Group

From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Use the **same group number** as your Conductor micro:bit.

```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Add Button Controls

Add three input handlers so you can send phrase numbers manually — useful for testing without the Melody Composer.

- Button A sends **0** (phrase A)
- Button B sends **1** (phrase B)
- Logo sends **2** (phrase C)

Logo is used for phrase C instead of A+B to avoid accidentally triggering both single-button handlers at the same time.

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
    basic.showString("A")
    basic.showIcon(IconNames.SmallSquare)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(1)
    basic.showString("B")
    basic.showIcon(IconNames.SmallSquare)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(2)
    basic.showString("C")
    basic.showIcon(IconNames.SmallSquare)
})
```

Download to two micro:bits on the same group. Press buttons on one — confirm the other receives and displays the phrase letter.

## Step 3: Handle Received Numbers

From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||``.

Inside it, add an ``||logic:if then else if then else if||`` block with three branches:

- If ``||variables:receivedNumber||`` equals **0**: ``||basic:show string "A"||``
- Else if ``||variables:receivedNumber||`` equals **1**: ``||basic:show string "B"||``
- Else if ``||variables:receivedNumber||`` equals **2**: ``||basic:show string "C"||``

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showString("A")
    } else if (receivedNumber == 1) {
        basic.showString("B")
    } else if (receivedNumber == 2) {
        basic.showString("C")
    }
})
```

## Step 4: Test the Display

Download to your Robot micro:bit — you do not need the Move Motor yet.

Use the button controls on a second micro:bit to send signals. Once that works, try switching the Conductor to the Melody Composer (stem-music-1) and confirm the display responds to the song phrases.

Check that:
- Display shows **A** when 0 is received
- Display shows **B** when 1 is received
- Display shows **C** when 2 is received

If nothing appears, check both micro:bits are on the same radio group number.

## Step 5: Add Move Functions

Now add three functions — one for each phrase.

**phraseA** moves the robot forward:

```blocks
function phraseA () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1500)
    Kitronik_Move_Motor.stop()
}
```

**phraseB** moves the robot in reverse:

```blocks
function phraseB () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    basic.pause(1500)
    Kitronik_Move_Motor.stop()
}
```

**phraseC** spins the robot:

```blocks
function phraseC () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
    basic.pause(1500)
    Kitronik_Move_Motor.stop()
}
```

## Step 6: Connect Movement to Radio

Update your ``||radio:on radio received||`` block to call the move functions instead of just showing letters.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showString("A")
        phraseA()
        basic.showIcon(IconNames.SmallSquare)
    } else if (receivedNumber == 1) {
        basic.showString("B")
        phraseB()
        basic.showIcon(IconNames.SmallSquare)
    } else if (receivedNumber == 2) {
        basic.showString("C")
        phraseC()
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## Step 7: Download and Test with the Move Motor

Plug your micro:bit into the Move Motor and switch it on.

Use button controls on a second micro:bit to trigger each phrase, or run the Melody Composer.

Check that:
- The robot moves forward when 0 is received
- The robot reverses when 1 is received
- The robot spins when 2 is received

## Step 8: Adjust the Timing

The pause length inside each function controls how long the robot moves. Each phrase lasts roughly 4 seconds at 120 BPM.

Try adjusting the pause values so the movement fills the phrase without running into the next one. What value feels best?

## Complete! @showdialog

Your robot is now dancing to signals it receives over radio — whether from a handheld remote or a Melody Composer.

In the next tutorial you will attach servo arms to your robot and program them to move — adding a whole new dimension to the performance.
