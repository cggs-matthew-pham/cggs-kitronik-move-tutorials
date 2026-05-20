# Robot Dance Showcase

```template
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)

function wiggleLeft () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(200)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(600)
    Kitronik_Move_Motor.stop()
    basic.pause(200)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(200)
}

function wiggleRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(200)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(600)
    Kitronik_Move_Motor.stop()
    basic.pause(200)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
    basic.pause(400)
    Kitronik_Move_Motor.stop()
    basic.pause(200)
}

function myMove () {
    // Design your own dance move here
}

function shortRoutine () {
    wiggleLeft()
    wiggleRight()
}

function fullRoutine () {
    loops.repeat(3, function () {
        wiggleLeft()
        wiggleRight()
    })
    myMove()
}

input.onButtonPressed(Button.A, function () {
    basic.showString("A")
    shortRoutine()
    basic.showIcon(IconNames.SmallSquare)
})

input.onButtonPressed(Button.B, function () {
    basic.showString("B")
    fullRoutine()
    basic.showIcon(IconNames.SmallSquare)
})

input.onButtonPressed(Button.AB, function () {
    myMove()
})

radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        wiggleLeft()
    } else if (receivedNumber == 1) {
        wiggleRight()
    } else {
        myMove()
    }
})
` ``

## Introduction @showdialog

You've learned how to:
- Move your robot
- Create reusable functions
- Control actions with buttons
- Send and receive radio signals

Now it's time to design your own robot performance.

## Step 1: Explore the Template

Run the code and observe what it does.

Your program already includes:
- Two working dance moves: ``||functions:wiggleLeft||`` and ``||functions:wiggleRight||``
- A space to create your own move: ``||functions:myMove||``
- Two routines: ``||functions:shortRoutine||`` and ``||functions:fullRoutine||``
- Button controls and optional radio behaviour

## Step 2: Design Your Own Move

Edit the ``||functions:myMove||`` function. Your move should include:
- At least one spin
- At least one movement (forward or reverse)
- Pauses to control timing

## Step 3: Build Your Routine

Modify ``||functions:fullRoutine||``.

Ideas:
- Change how many times the loop repeats
- Change the order of moves
- Add your new move in different places

Try to make your routine feel like a pattern, not random movement.

## Step 4: Customise the Controls

Decide how your robot performs:
- **Button A** → short routine
- **Button B** → full routine
- **A+B** → special move

Optional: use radio to trigger moves between robots.

## Step 5: Refine the Performance

Test and improve your dance. Adjust timing (pause lengths) and speed. Watch carefully — does it look smooth or sharp? Small changes can make a big difference.

## Step 6: Perform @showdialog

Show your dance.

If working with a partner:
- Face robots toward each other
- Try to stay in sync
- Use radio or timing to coordinate

## Complete! @showdialog

You are now designing systems, not just following instructions.

Your robot doesn't just move — it performs.
```

The main changes from the source material: stripped the success criteria checklist (doesn't render usefully in MakeCode tutorials), moved the goal/overview into the `Introduction @showdialog`, and tightened step text to match the register of your T-series tutorials.
