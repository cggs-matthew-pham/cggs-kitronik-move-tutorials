```template
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == GO) {
        driveForward()
    } else {
        stopBot()
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(GO)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(STOP)
})
function stopBot () {
    Kitronik_Move_Motor.stop()
}
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
}
let speed = 0
let STOP = 0
let GO = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
GO = 1
STOP = 0
speed = 40

```

# Kitronik :MOVE Motor - Radio Basics

## Introduction @showdialog
Learn how to make two micro:bits talk to each other over radio. This is the foundation of almost everything: controllers, signals, remote triggers. You'll need **two** micro:bits for this - one to send, one to receive.

## Step 1: Add the Extension
Click on **Extensions** in the toolbox. Search for **Kitronik :MOVE Motor** and click to add it. You'll need this extension even for just the sender micro:bit, because you'll re-use this project later.

## Step 2: Set the Radio Group
From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Set it to **1**.

Every micro:bit on the same radio group hears each other's messages. If another pair in the class uses group 1, you'll hear their messages too - so pick a number between 1 and 100 that your pair agrees on.
```blocks
radio.setGroup(1)
```

## Step 3: Show a Ready Icon
From ``||basic:Basic||``, drag ``||basic:show icon||`` into ``||basic:on start||`` after the radio group block. Pick the **Small Square** icon to show the micro:bit is ready to go.
```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 4: Send a Message on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||`` into the workspace. From ``||radio:Radio||``, drag ``||radio:radio send string||`` inside it and type **"HELLO"** in the message slot.
```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
input.onButtonPressed(Button.A, function () {
    radio.sendString("HELLO")
})
```

## Step 5: Download to the Sender Micro:bit
Click **Download** and copy the file onto your **first** micro:bit. Label this one "SENDER" with a sticky note so you don't mix them up.

This micro:bit is now ready to send a "HELLO" message whenever you press button A. But nothing is listening yet - let's fix that.

## Step 6: Start a New Project for the Receiver
Click the **Home** button to go back. Create a **New Project** and call it something like "Radio Receiver". This will go on your **second** micro:bit.

## Step 7: Add the Extension Again
Click **Extensions** and add **Kitronik :MOVE Motor** again. Even though we're not using the Move for this tutorial, you'll want this project to extend later.

## Step 8: Set the Same Radio Group
From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Set it to **1** - the same number your sender uses. Both devices must be on the same group to hear each other.
```blocks
radio.setGroup(1)
```

## Step 9: Handle Received Messages
From ``||radio:Radio||``, drag ``||radio:on radio received receivedString||`` into the workspace. This block runs every time the micro:bit receives a string message.
```blocks
radio.setGroup(1)
radio.onReceivedString(function (receivedString) {
	
})
```

## Step 10: Show the Received Message
From ``||basic:Basic||``, drag ``||basic:show string||`` inside the ``||radio:on radio received||`` block. Drag the ``||variables:receivedString||`` variable (from the block's parameter) into the string slot.
```blocks
radio.setGroup(1)
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
```

## Step 11: Download to the Receiver Micro:bit
Click **Download** and copy the file onto your **second** micro:bit. Label this one "RECEIVER".

## Step 12: Test It!
Turn on both micro:bits. Press button **A** on the sender.

You should see "HELLO" scroll across the receiver's display. If you don't:
- Check both are on the same group number
- Check both are actually turned on
- Move them closer together

## Step 13: Send a Different Message on Button B
Back on the **sender** project, add another ``||input:on button B pressed||`` block. Inside it, send a different string - try **"GOODBYE"**.
```blocks
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
input.onButtonPressed(Button.A, function () {
    radio.sendString("HELLO")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("GOODBYE")
})
```

## Step 14: Re-download and Test
Download the updated sender code. Now you have two messages you can send. Press A, see "HELLO" on the receiver. Press B, see "GOODBYE."

The receiver doesn't need changing - it just shows whatever string it receives.

## Complete! @showdialog
You've got two micro:bits talking! This is the foundation of everything else - voice command stand-ins, remote controls, object recognition, checkpoints. In the next tutorial you'll use this skill to make a Move Motor respond to radio commands.

**Tips:**
- If messages stop working in class, check nobody else is on your group number - change to a different number between 1 and 100
- The sender can use the **same code** for lots of different projects - it's a reusable controller
- You can also use ``||radio:radio send number||`` if you want to send numbers instead of strings
