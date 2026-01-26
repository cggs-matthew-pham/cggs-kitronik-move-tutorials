# Kitronik :MOVE Motor - Autonomous Square

## Introduction @showdialog
Program your buggy to drive in a square pattern all by itself! You'll learn to create movement functions and combine them into sequences.

## Step 1: Add the Extension
Click on **Extensions** in the toolbox. Search for **Kitronik :MOVE Motor** and click to add it.

## Step 2: Show Start Icon
From ``||basic:Basic||``, drag ``||basic:show icon||`` into ``||basic:on start||``. Choose the **Heart** icon to show the program is ready.
```blocks
basic.showIcon(IconNames.Heart)
```

## Step 3: Create Forward Time Variable
We'll use variables to control how long the buggy moves and turns. This makes it easy to adjust later!

From ``||variables:Variables||``, click "Make a Variable" and create **forwardTime**. From ``||variables:Variables||``, drag ``||variables:set forwardTime to 0||`` into ``||basic:on start||`` after the icon. Set it to **1000** (1 second).
```blocks
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
```

## Step 4: Create Turn Time Variable
Create another variable called **turnTime**. Add ``||variables:set turnTime to 0||`` and set it to **500** (half a second).
```blocks
let turnTime = 0
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
```

## Step 5: Create Drive Forward Function
From ``||functions:Functions||`` (under Advanced), click "Make a Function". Name it **driveForward** and click Done.
```blocks
function driveForward () {
	
}
```

## Step 6: Add Forward Movement
From ``||Kitronik_Move_Motor:Kitronik :MOVE Motor||``, drag ``||Kitronik_Move_Motor:move Forward at speed 0||`` into your ``||functions:driveForward||`` function. Set the speed to **30**.
```blocks
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
}
```

## Step 7: Add Pause Using Variable
From ``||basic:Basic||``, drag ``||basic:pause||`` into your function. Instead of typing a number, drag the ``||variables:forwardTime||`` variable from ``||variables:Variables||`` into the pause block.
```blocks
let forwardTime = 0
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(forwardTime)
}
```

## Step 8: Stop After Moving
From ``||Kitronik_Move_Motor:Kitronik :MOVE Motor||``, drag ``||Kitronik_Move_Motor:stop||`` to the end of your function.
```blocks
let forwardTime = 0
function driveForward () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    basic.pause(forwardTime)
    Kitronik_Move_Motor.stop()
}
```

## Step 9: Test Forward Movement
From ``||functions:Functions||``, drag ``||functions:call driveForward||`` into ``||basic:on start||`` at the end. Download to your micro:bit and test! Adjust the **forwardTime** variable if needed.
```blocks
let turnTime = 0
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
driveForward()
```

## Step 10: Create Turn Function
From ``||functions:Functions||``, create another function called **turnRight** (or **turnLeft** if you prefer).
```blocks
function turnRight () {
	
}
```

## Step 11: Add Spin Movement
From ``||Kitronik_Move_Motor:Kitronik :MOVE Motor||``, drag ``||Kitronik_Move_Motor:spin Clockwise at speed 0||`` into your turn function. Set speed to **20**.
```blocks
function turnRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
}
```

## Step 12: Add Pause Using Turn Variable
Add ``||basic:pause||`` and drag the ``||variables:turnTime||`` variable into it. This controls the turn angle - you'll need to test and adjust for exactly 90 degrees!
```blocks
let turnTime = 0
function turnRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
    basic.pause(turnTime)
}
```

## Step 13: Stop After Turning
Add ``||Kitronik_Move_Motor:stop||`` to complete the turn.
```blocks
let turnTime = 0
function turnRight () {
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
    basic.pause(turnTime)
    Kitronik_Move_Motor.stop()
}
```

## Step 14: Build the Square - Side 1
In ``||basic:on start||``, add ``||functions:call driveForward||`` and ``||functions:call turnRight||`` at the end.
```blocks
let turnTime = 0
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
driveForward()
turnRight()
```

## Step 15: Complete the Square
Add three more pairs of ``||functions:driveForward||`` and ``||functions:turnRight||`` to complete all four sides of the square.
```blocks
let turnTime = 0
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
driveForward()
turnRight()
driveForward()
turnRight()
driveForward()
turnRight()
driveForward()
turnRight()
```

## Step 16: Add Finish Icon
At the end of ``||basic:on start||``, add ``||basic:show icon||`` and choose the **Yes** (checkmark) icon to celebrate completion!
```blocks
let turnTime = 0
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
driveForward()
turnRight()
driveForward()
turnRight()
driveForward()
turnRight()
driveForward()
turnRight()
basic.showIcon(IconNames.Yes)
```

## Step 17: Use a Loop (Challenge)
Instead of repeating ``||functions:driveForward||`` and ``||functions:turnRight||`` four times, we can use a loop! 

From ``||loops:Loops||``, drag ``||loops:repeat 4 times||`` into ``||basic:on start||`` (delete your four pairs of function calls first). Put one ``||functions:driveForward||`` and one ``||functions:turnRight||`` inside the loop.
```blocks
let turnTime = 0
let forwardTime = 0
basic.showIcon(IconNames.Heart)
forwardTime = 1000
turnTime = 500
for (let index = 0; index < 4; index++) {
    driveForward()
    turnRight()
}
basic.showIcon(IconNames.Yes)
```

**Why use loops?** Instead of writing the same code 4 times, the loop does it for you! This makes your code shorter and easier to change. If you wanted to make a hexagon (6 sides), you'd just change it to ``||loops:repeat 6 times||``!

## Complete! @showdialog
Excellent work! Download your code and watch your buggy drive in a square!

**Calibration Tips:**
- If your square isn't closing properly, adjust the **turnTime** variable (try 450 or 550)
- If sides are too short/long, adjust the **forwardTime** variable
- Make sure your buggy has fresh batteries and is on a smooth, flat surface
- You only need to change the variables at the top - the functions will use the new values automatically!
