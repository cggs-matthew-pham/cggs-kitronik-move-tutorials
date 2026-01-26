# Kitronik :MOVE Motor - Obstacle Navigation Challenge

## Introduction @showdialog
Use your movement functions to navigate from point A to point B, avoiding obstacles! This challenge tests your planning and sequencing skills.

## Step 1: Set Up the Course
Your teacher will set up an obstacle course with:
- A **Start (A)** marked with tape
- A **Finish (B)** marked with tape
- Random obstacles (books, blocks, cones) in between

Place your buggy at the start position.

## Step 2: Add the Extension
Click on **Extensions** in the toolbox. Search for **Kitronik :MOVE Motor** and click to add it.

## Step 3: Set Up Variables and Icon
From ``||basic:Basic||``, add ``||basic:show icon||`` (Heart) to ``||basic:on start||``. Create variables **forwardTime** (1000) and **turnTime** (500) like in the square tutorial.
```blocks
let forwardTime = 0
let turnTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
```

## Step 4: Create Drive Forward Function
From ``||functions:Functions||``, create a function called **driveForward**. Add the forward movement code with pause and stop.
```blocks
let forwardTime = 0
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(forwardTime)
    Kitronik_Move_Motor.stop()
}
```

## Step 5: Create Turn Right Function
Create a function called **turnRight** with spin right movement, pause, and stop.
```blocks
let turnTime = 0
function turnRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
    basic.pause(turnTime)
    Kitronik_Move_Motor.stop()
}
```

## Step 6: Create Turn Left Function
Create a function called **turnLeft**. Drag ``||Kitronik_Move_Motor:spin Left at speed 0||`` and set speed to **20**. Add pause using **turnTime** and stop.
```blocks
let turnTime = 0
function turnLeft () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
    basic.pause(turnTime)
    Kitronik_Move_Motor.stop()
}
```

## Step 7: Create Drive Backward Function (Optional)
If you need to reverse, create **driveBackward**. Use ``||Kitronik_Move_Motor:move Backward at speed 0||`` with **forwardTime** and stop.
```blocks
let forwardTime = 0
function driveBackward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 30)
    basic.pause(forwardTime)
    Kitronik_Move_Motor.stop()
}
```

## Step 8: Plan Your Route
**Before coding:** Look at your obstacle course. On paper, draw or write the sequence of moves needed:
- How many times forward?
- Which way to turn?
- Do you need to go backward?

Planning first makes coding easier!

## Step 9: Create Button A Event
From ``||input:Input||``, drag ``||input:on button A pressed||`` into your workspace. This is where you'll build your navigation sequence.
```blocks
input.onButtonPressed(Button.A, function () {
	
})
```

## Step 10: Code Your Route
Using your plan from Step 8, add function calls to button A in the correct order. For example, if you need to go forward, turn right, forward again:
```blocks
input.onButtonPressed(Button.A, function () {
    driveForward()
    turnRight()
    driveForward()
})
```

**Your sequence will be different!** Add as many function calls as you need to reach point B.

## Step 11: Add Finish Celebration
At the end of your sequence, add ``||basic:show icon||`` with the **Yes** checkmark to celebrate reaching point B!
```blocks
input.onButtonPressed(Button.A, function () {
    driveForward()
    turnRight()
    driveForward()
    basic.showIcon(IconNames.Yes)
})
```

## Step 12: Test and Adjust
Download your code to the micro:bit. Place the buggy at point A and press **A**.

**Did it work?**
- ✅ Reached point B? Success!
- ❌ Hit an obstacle? Adjust your sequence
- ❌ Turns not 90 degrees? Adjust **turnTime**
- ❌ Not moving far enough? Adjust **forwardTime**

Keep testing and adjusting until you successfully navigate from A to B!

## Complete! @showdialog
Excellent work! You've successfully navigated an obstacle course using planning, functions, and problem-solving.

**Challenge Extensions:**
- Can you find a different route to point B?
- Can you complete the course faster (fewer moves)?
- Try your classmate's obstacle course!
- Create your own course and challenge others to solve it!

**What you learned:**
- Planning before coding saves time
- Breaking complex problems into simple functions
- Testing and debugging are part of programming
- The same functions can solve many different problems!
