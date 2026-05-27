## Introduction @showdialog

In this tutorial your micro:bit will listen for radio signals from the Melody Composer and respond — first by displaying the phrase letter, then by moving the robot.

You will need two micro:bits:
- **Conductor** — running the Melody Composer code from the previous tutorial
- **Robot** — this micro:bit, plugged into the Move Motor

## Step 1: Set Radio Group

From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Use the **same group number** as your Conductor micro:bit.

```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Handle Received Numbers

From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||``.

Inside it, add an ``||logic:if then else if then else||`` block with three branches:

- If ``||variables:receivedNumber||`` equals **0**: ``||basic:show string "A"||``
- Else if ``||variables:receivedNumber||`` equals **1**: ``||basic:show string "B"||``
- Else: ``||basic:show string "C"||``

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showString("A")
    } else if (receivedNumber == 1) {
        basic.showString("B")
    } else {
        basic.showString("C")
    }
})
```

## Step 3: Download and Test the Display

Download to your Robot micro:bit — you do not need the Move Motor yet for this step.

Have your partner press **A** on the Conductor to start the melody.

Check that:
- Your display shows **A** when the first phrase starts
- It changes to **B** for the second phrase
- It changes to **C** for the third and fourth phrases
- It returns to **A** and **B** for the final two phrases

If nothing appears, check both micro:bits are on the same radio group number.

## Step 4: Add Move Functions

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

## Step 5: Connect Movement to Radio

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
    } else {
        basic.showString("C")
        phraseC()
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## Step 6: Download and Test with the Move Motor

Plug your micro:bit into the Move Motor and switch it on.

Have your partner press **A** on the Conductor.

Check that:
- The robot moves forward during A phrases
- The robot reverses during B phrases
- The robot spins during C phrases

## Step 7: Adjust the Timing

The pause length inside each function controls how long the robot moves. Each phrase lasts roughly 4 seconds at 120 BPM.

Try adjusting the pause values so the movement fills the phrase without running into the next one. What value feels best?

## Complete! @showdialog

Your robot is now dancing to a melody it cannot hear — responding to signals from the Conductor instead.

In the next tutorial you will design your own move sequences to replace the simple forward, reverse and spin movements.
