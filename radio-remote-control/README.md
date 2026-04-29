# Kitronik :MOVE Motor - Radio Remote Control

## Introduction @showdialog
Build a radio-controlled Move Motor! You'll write **one program** and flash it onto **both** micro:bits - one plugged into your Move, one held as a remote. Same code on both. Each device behaves based on what's attached: the Move drives; the remote is a handheld controller.

You'll need **two** micro:bits in total.

## Step 1: Set the Radio Group
From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Set it to **1**.

Every micro:bit on the same radio group hears each other's messages. In a classroom, multiple pairs on group 1 will hear each other - the **Radio Channels** tutorial next will show you how to fix that.
```blocks
radio.setGroup(1)
```

## Step 2: Show a Ready Icon
From ``||basic:Basic||``, drag ``||basic:show icon||`` after the radio group block. Pick the **Small Square** icon so you know the program is running.
```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 3: Create Named Commands (GO and STOP)
We're going to send **numbers** over radio - but numbers on their own are hard to read. Is 1 "forward" or "stop"? Much clearer if we use variables to give numbers a meaningful name.

From ``||variables:Variables||``, click "Make a Variable" and create **GO**. Then do it again and create **STOP**.

Drag ``||variables:set GO to 0||`` into ``||basic:on start||`` and change it to **1**.
Drag ``||variables:set STOP to 0||`` into ``||basic:on start||`` and leave it as **0**.

Now `GO` always means the number 1 and `STOP` always means 0. Your code will read like English.
```blocks
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
```

## Step 4: Create a Speed Variable
From ``||variables:Variables||``, create a variable called **speed**. Drag ``||variables:set speed to 0||`` into ``||basic:on start||`` and set it to **40**.

Putting the speed in a variable means you can tweak it later without hunting through your code.
```blocks
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
speed = 40
```

## Step 5: Send GO on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||`` into the workspace. From ``||radio:Radio||``, drag ``||radio:radio send number||`` inside it. Instead of typing a number, drag the ``||variables:GO||`` variable from ``||variables:Variables||`` into the send block.

This sends the "GO" message to every micro:bit on the same radio group - including ourselves. We'll deal with the receiving end next.
```blocks
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(GO)
})
```

## Step 6: Send STOP on Button B
Drag another ``||input:on button B pressed||`` into the workspace. Inside it, ``||radio:radio send number||`` with the ``||variables:STOP||`` variable.
```blocks
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(GO)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(STOP)
})
```

Your code now reads "send GO" and "send STOP" - much clearer than sending "1" and "0".

## Step 7: Create a driveForward Function
Now let's build the receiving end. We'll put each action the bot can do into its own **function**. This is a pattern you'll reuse across every tutorial - every time you want the bot to do something new, you'll add a new function.

From ``||functions:Functions||`` (under Advanced), click **Make a Function**. Name it **driveForward** and click Done.
```blocks
function driveForward () {
	
}
```

## Step 8: Add the Forward Movement
Inside ``||functions:driveForward||``, drag ``||Kitronik_Move_Motor:move Forward at speed||`` from the Kitronik category. Drag the ``||variables:speed||`` variable into the speed slot.

Then add ``||basic:show arrow||`` from ``||basic:Basic||`` and pick **North** (up arrow). This gives you a visual confirmation on the display when GO is received.
```blocks
let speed = 0
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    basic.showArrow(ArrowNames.North)
}
```

## Step 9: Create a stopBot Function
From ``||functions:Functions||``, click **Make a Function** again. Name it **stopBot** and click Done.

Inside, drag ``||Kitronik_Move_Motor:stop||`` from the Kitronik category. Then add ``||basic:show icon||`` and pick **Small Square** — so the display shows a square when STOP is received.
```blocks
function stopBot () {
    Kitronik_Move_Motor.stop()
    basic.showIcon(IconNames.SmallSquare)
}
```

## Step 10: Handle Received Numbers
From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||`` into the workspace. This block runs every time the micro:bit receives a number from another micro:bit on the same radio group.
```blocks
radio.onReceivedNumber(function (receivedNumber) {
	
})
```

## Step 11: Dispatch to the Right Function
Inside ``||radio:on radio received||``, add an ``||logic:if then else||`` block.

In the **if** condition, check whether ``||variables:receivedNumber||`` equals ``||variables:GO||``. Inside the **if**, add ``||functions:call driveForward||``. In the **else**, add ``||functions:call stopBot||``.

Your radio handler doesn't do any moving itself - it just decides *which function to call*. This is the **dispatcher pattern**. You'll add more commands later by adding more functions and more `else if` checks.
```blocks
let speed = 0
let GO = 0
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    basic.showArrow(ArrowNames.North)
}
function stopBot () {
    Kitronik_Move_Motor.stop()
    basic.showIcon(IconNames.SmallSquare)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == GO) {
        driveForward()
    } else {
        stopBot()
    }
})
```

Notice how your code now reads "if receivedNumber equals GO" instead of "if receivedNumber equals 1". That's why the named constants matter.

## Step 12: Test in the Simulator
Look at the simulator on the left of your screen. As soon as you use radio blocks, a **second simulator micro:bit** appears. Both run the same code.

Click button **A** on either simulated micro:bit - you should see them both react (the receiving one runs `driveForward`, though without a real Move attached it won't show anything visible).

Click button **B** - they receive the STOP message.

The simulator is useful for checking the radio messages are flowing correctly, even though it can't show real Move motor movement.

## Step 13: Download to Both Micro:bits
Click **Download** and copy the file onto **both** your micro:bits. Same code on both.

Label one "REMOTE" (this is the one you'll hold) and the other "MOVE" (this one plugs into your Move Motor).

Plug the MOVE micro:bit into the edge connector on the Move Motor and switch the Move on.

## Step 14: Test It!
Turn on both micro:bits. Place the Move on the floor or a desk with plenty of space.

Press button **A** on the REMOTE - the Move should drive forward.
Press button **B** - it should stop.

If something's wrong:
- Check both micro:bits are powered on (Move's power switch plus fresh batteries)
- Move them closer together to rule out range issues
- Try pressing buttons a couple of times - radio messages occasionally get missed

## Complete! @showdialog
You've built a radio-controlled Move Motor. More importantly, you've set up the **dispatcher pattern**: the radio handler's only job is to call the right function. The functions do the actual work. Every tutorial from here builds on this.

**A note on the buttons:** both micro:bits run the same code. That means pressing buttons on the Move itself *also* sends radio messages. They'll be received by the remote, which will run `driveForward` or `stopBot` with no motors attached - so nothing visible happens. Not a bug, just how unified code works. Later tutorials will use this to let each device do different jobs based on its **role**.

**Tips for your project:**
- **Tweak speed**: change the speed variable (try 30 for slower, 60 for faster)
- **Add more commands**: add a new named command (e.g. `TURN_RIGHT = 2`), write a function for it, and add another `else if` to the dispatcher
- **Keep this project**: you'll reuse it as the starting point for every other tutorial

**Next step**: classrooms full of Moves often have multiple pairs on the same radio group, causing interference. The **Radio Channels** tutorial fixes that with small additions to the same project.
