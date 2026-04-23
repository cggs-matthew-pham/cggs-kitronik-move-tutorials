# Kitronik :MOVE Motor - Radio Channels

```template
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
speed = 40

function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
}

function stopBot () {
    Kitronik_Move_Motor.stop()
}

input.onButtonPressed(Button.A, function () {
    radio.sendNumber(GO)
})

input.onButtonPressed(Button.B, function () {
    radio.sendNumber(STOP)
})

radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == GO) {
        driveForward()
    } else {
        stopBot()
    }
})
```

## Introduction @showdialog
Your Radio Remote Control project works! But in a classroom of ten pairs all on radio group 1, every Move responds to every remote. Chaos.

This tutorial adds a **channel** to your messages so your pair only hears its own. The trick: instead of sending just a number, you send a **name** with the number. The receiver checks the name and ignores anything that isn't yours.

Your existing code from **Radio Remote Control** is already loaded. We'll extend it.

## Step 1: Look at What's Already There
Take a moment to check the starter code. You should see:

- `on start` with the radio group, icon, and GO/STOP/speed variables
- Two `on button pressed` blocks sending GO and STOP
- An `on radio received` block dispatching to `driveForward` or `stopBot`
- Two functions: `driveForward` and `stopBot`

This is exactly where you finished the previous tutorial. We'll now upgrade it to use channels.

## Step 2: Create a Channel Variable
From ``||variables:Variables||``, click "Make a Variable" and create **channel**. Drag ``||variables:set channel to||`` into ``||basic:on start||``.

This block will hold a piece of text - your pair's unique code name. Instead of the default number, click the value slot and change it to a **string** value (look for the string version).

Pick a unique code name for your pair - anything you like, as long as it's not boring. "Roger", "TacoBot", "Jellyfish" - whatever. **Both your remote and your Move need to use exactly the same name**, including capital letters.

For this tutorial, we'll use **"Roger"**.
```blocks
let channel = ""
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
speed = 40
channel = "Roger"
```

## Step 3: Change Button A to Send with the Channel
You're going to replace ``||radio:radio send number||`` with ``||radio:radio send value||``. The new block sends two things at once: a **name** (your channel) and a **number** (the command).

From ``||radio:Radio||``, find ``||radio:radio send value||``. Drag it into your ``||input:on button A pressed||`` block, replacing the ``||radio:radio send number||``.

Set the **name** slot to the ``||variables:channel||`` variable, and the **value** slot to the ``||variables:GO||`` variable.
```blocks
let channel = ""
let GO = 0
input.onButtonPressed(Button.A, function () {
    radio.sendValue(channel, GO)
})
```

## Step 4: Change Button B to Send with the Channel
Do the same thing for button B - replace ``||radio:radio send number||`` with ``||radio:radio send value||`` using ``||variables:channel||`` and ``||variables:STOP||``.
```blocks
let channel = ""
let STOP = 0
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, STOP)
})
```

## Step 5: Delete the Old Receive Block
Right-click the existing ``||radio:on radio received receivedNumber||`` block and select **Delete Block**.

Don't worry - we're replacing it with a new version that handles the channel check.

## Step 6: Add a New Receive Block for Named Messages
From ``||radio:Radio||``, drag ``||radio:on radio received name value||`` into the workspace. This is the block that receives **both** the name and the value.
```blocks
radio.onReceivedValue(function (name, value) {
	
})
```

## Step 7: Check if the Name Matches Your Channel
Inside ``||radio:on radio received name value||``, add an ``||logic:if then||`` block from ``||logic:Logic||``.

The condition checks whether the received ``||variables:name||`` equals your ``||variables:channel||``. If it does, this message is for you. If not, ignore it.

Drag ``||logic:0 = 0||`` into the if. In the first slot, drag the ``||variables:name||`` parameter from the block. In the second slot, drag the ``||variables:channel||`` variable.
```blocks
let channel = ""
radio.onReceivedValue(function (name, value) {
    if (name == channel) {

    }
})
```

## Step 8: Add the Dispatcher Inside the Channel Check
Now put the dispatcher logic from Tutorial 1 **inside** the if block. If the name matches, run the if/else on the value.

Add an ``||logic:if then else||`` block inside the outer if. Check if ``||variables:value||`` equals ``||variables:GO||``. Inside the inner **if**, add ``||functions:call driveForward||``. In the inner **else**, add ``||functions:call stopBot||``.
```blocks
let channel = ""
let GO = 0
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == GO) {
            driveForward()
        } else {
            stopBot()
        }
    }
})
```

Your bot now only acts on messages with **your** channel name. Messages from other pairs still arrive, but the first `if` check filters them out.

## Step 9: Test in the Simulator
With the simulator's two micro:bits, click button **A** on one. The other should receive the message with name "Roger" and value GO, and call `driveForward`.

Both simulated devices are running the same code with the same channel, so messages flow between them. That's the test passing.

## Step 10: Download to Both Micro:bits
Click **Download** and copy onto both your micro:bits - same code on both. Test with your Move: button A = drive forward, button B = stop. Should still work exactly as before.

## Step 11: Test with Another Pair (Optional, Recommended)
Now the real test. Ask another pair in the classroom to do the following:

1. Open their Radio Remote Control project
2. Change their `channel` variable to something **different** from yours - e.g. they use "TacoBot" while you use "Roger"
3. Download to their devices
4. Try pressing buttons on their remote while your Move is running

**Result**: their remote doesn't control your Move. Their messages arrive with name "TacoBot", your check says `if (name == "Roger")`, it's not, so nothing happens. Perfect.

Swap channels to match temporarily and confirm the other direction works - their remote *can* control your Move when channels match.

## Complete! @showdialog
Your pair is now isolated from other pairs' messages. This is the same idea real robots use for identifying which controller they belong to - every device has a unique name, and messages are filtered by that name.

**Spelling matters.** "Roger" and "roger" are different strings. If your remote and Move don't have **exactly** the same channel (capital letters included), messages won't get through. If something stops working, this is the first thing to check.

**Tips for your project:**
- **Pick a distinctive name**. "pair1", "pair2" etc are fine but boring; something unique is less likely to clash.
- **The radio group still matters too**. If no messages flow at all, check both devices are on radio group 1 first, then check channels.

**A note on channels vs groups**: radio groups are a limit set by the radio hardware - you can only listen to one group at a time. Channels are a *filter you write in code* - you can listen to all messages on your group and decide in software which ones are for you. That's what makes channels more flexible.

**Next step**: time to do something more interesting than just drive forward. The **Adapting Line Following** tutorial brings the Kitronik line-following code into your dispatcher as a new `followLine` function you can trigger over radio.
