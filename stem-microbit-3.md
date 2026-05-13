# Partner Dancing with Radio

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
basic.showIcon(IconNames.SmallSquare)

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

## Introduction @showdialog
Your robot has two dance moves. Now it needs a partner.

In this tutorial two students each control their own robot using a handheld remote. Press **A** to wiggle left, press **B** to wiggle right. When one robot wiggles left, the other wiggles right — a mirror image, like partner dancing.

You'll need **four** micro:bits in total — two remotes, two robots.

## Step 1: Set Your Radio Group
From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``.

Each pair needs their own unique group number so your remote only controls your robot. **Agree on a number with your teacher** — your partner uses the same number as you, but it must be different from every other pair in the room.

```blocks
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Send 0 on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||``. Inside it, add ``||radio:radio send number 0||`` and ``||basic:show arrow West||``.

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
    basic.showArrow(ArrowNames.West)
})
```

## Step 3: Send 1 on Button B
Drag ``||input:on button B pressed||``. Inside it, add ``||radio:radio send number 1||`` and ``||basic:show arrow East||``.

```blocks
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(1)
    basic.showArrow(ArrowNames.East)
})
```

## Step 4: Handle Received Numbers
From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||``.

Inside it, add an ``||logic:if then else||`` block.

- If ``||variables:receivedNumber||`` equals **0**: show an **East** arrow, call ``||functions:wiggleLeft||``, then show a **small square**
- Else: show a **West** arrow, call ``||functions:wiggleRight||``, then show a **small square**

The arrows are mirrored from the remote because the robot is facing you — East on the remote looks like West from the robot's perspective.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showArrow(ArrowNames.East)
        wiggleLeft()
        basic.showIcon(IconNames.SmallSquare)
    } else {
        basic.showArrow(ArrowNames.West)
        wiggleRight()
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## Step 5: Download to Both Micro:bits in Your Pair
Click **Download** and copy the file onto **both** your micro:bits — same code on both.

Label one **REMOTE** (you hold this) and one **ROBOT** (this plugs into the Move). Switch the Move on.

## Step 6: Test Your Own Robot
Press **A** — your robot should wiggleLeft.
Press **B** — your robot should wiggleRight.

If it doesn't respond, check both micro:bits are on the same radio group number.

## Step 7: Partner Up
Find your partner. They have their own remote and robot on a **different** radio group number.

Place both robots facing each other. Now try to coordinate:
- You press A, they press B at the same time — your robot wiggles left, theirs wiggles right
- Swap — you press B, they press A
- Try to keep a rhythm going back and forth

There's no code for this step. The challenge is watching each other and timing your presses.

## Complete! @showdialog
You've built a radio remote and used it to coordinate with a partner.

The robots don't know about each other — the sync happens because two humans are paying attention and timing their cues. That's what makes it feel like dancing rather than just moving.
