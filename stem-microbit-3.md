# Partner Dancing with Radio

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
basic.showIcon(IconNames.SmallSquare)

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

## Introduction @showdialog
Your robot can perform. Now it needs a partner.

In this tutorial two students each control their own robot using a handheld remote. The challenge isn't the code — it's the coordination. Can you and your partner time your button presses so the robots move together like dancers?

You'll need **four** micro:bits in total — two remotes, two robots.

## Step 1: Set Your Radio Group
From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``.

Each pair needs their own unique group number so your remote only controls your robot. **Agree on a number with your teacher** — your partner uses the same number as you, but it must be different from every other pair in the room.

```blocks
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Send 0 on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||``. Inside it, add ``||radio:radio send number 0||``.

This is the forward cue.

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
})
```

## Step 3: Send 1 on Button B
Drag ``||input:on button B pressed||``. Inside it, add ``||radio:radio send number 1||``.

This is the backward cue.

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(1)
})
```

## Step 4: Handle Received Numbers
From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||``.

Inside it, add an ``||logic:if then else||`` block.

- If ``||variables:receivedNumber||`` equals **0**: show a **north arrow**, call ``||functions:forwardArc||`` twice, then show a **small square**
- Else: show a **south arrow**, call ``||functions:backwardSteps||`` twice, then show a **small square**

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showArrow(ArrowNames.North)
        forwardArc()
        forwardArc()
        basic.showIcon(IconNames.SmallSquare)
    } else {
        basic.showArrow(ArrowNames.South)
        backwardSteps()
        backwardSteps()
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## Step 5: Download to Both Micro:bits in Your Pair
Click **Download** and copy the file onto **both** your micro:bits — same code on both.

Label one **REMOTE** (you hold this) and one **ROBOT** (this plugs into the Move). Switch the Move on.

## Step 6: Test Your Own Robot
Before partnering up, test that your remote controls your robot.

Press **A** — your robot should do the forward routine.
Press **B** — your robot should do the backward routine.

If it doesn't respond, check both micro:bits are on the same radio group number.

## Step 7: Partner Up
Now find your partner. They have their own remote and robot on a **different** radio group number.

Place both robots facing each other or side by side. The challenge: can you coordinate your button presses so the routines look like partner dancing?

Try these:
- Both press A at the same time — mirror image forward routines
- One presses A while the other presses B — one goes forward, one goes back
- Take turns leading and following

There's no code to write for this step. The challenge is all about timing and communication.

## Complete! @showdialog
You've built a radio remote control and used it to coordinate with another performer.

The sync happens because two humans are watching, listening, and timing their cues — the robots don't know about each other at all. That's what makes it interesting, and also what makes it hard.

**Next tutorial:** you'll pre-program a choreographed routine so both robots move in sync automatically — no manual timing needed.
