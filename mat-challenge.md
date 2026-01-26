# Kitronik :MOVE Motor - Line Following

## Introduction @showdialog
Program your buggy to follow a black line using line sensors! You'll learn to read sensors and control motors independently to create smooth line following.

## Step 1: Add the Extension
Click on **Extensions** in the toolbox. Search for **Kitronik :MOVE Motor** and click to add it.

## Step 2: Show Ready Icon
From ``||basic:Basic||``, drag ``||basic:show icon||`` into ``||basic:on start||``. Choose the **Heart** icon to show the program is ready.
```blocks
basic.showIcon(IconNames.Heart)
```

## Step 3: Create Fast Speed Variable
From ``||variables:Variables||``, click "Make a Variable" and create **fastSpeed**. Set it to **30** in ``||basic:on start||``. 

This is the speed for the faster motor when turning. When the buggy needs to turn, one motor runs fast while the other runs slow, creating a smooth curve while still moving forward.
```blocks
let fastSpeed = 0
basic.showIcon(IconNames.Heart)
fastSpeed = 30
```

## Step 4: Create Slow Speed Variable
Create another variable called **slowSpeed**. Set it to **15** in ``||basic:on start||``. 

This is the speed for the slower motor when turning. By running one motor at half speed (15) and the other at full speed (30), the buggy turns smoothly without stopping or spinning in place.
```blocks
let slowSpeed = 0
let fastSpeed = 0
basic.showIcon(IconNames.Heart)
fastSpeed = 30
slowSpeed = 15
```

## Step 5: Create Threshold Variable
Create a variable called **threshold**. Set it to **500** in ``||basic:on start||``. 

This number determines what the sensors consider "on the line" vs "off the line". Lower sensor readings (darker surfaces like the black line) will be below this number. Higher readings (lighter surfaces) will be above it. You'll need to test and adjust this based on your lighting and surface!
```blocks
let threshold = 0
let slowSpeed = 0
let fastSpeed = 0
basic.showIcon(IconNames.Heart)
fastSpeed = 30
slowSpeed = 15
threshold = 500
```

## Step 6: Create Running Flag
Create a variable called **running** and set it to **false** in ``||basic:on start||``. This tracks whether the buggy should be following the line or stopped.
```blocks
let running = false
let threshold = 0
let slowSpeed = 0
let fastSpeed = 0
basic.showIcon(IconNames.Heart)
fastSpeed = 30
slowSpeed = 15
threshold = 500
running = false
```

## Step 7: Test Line Sensors
Let's test the line sensors first! From ``||input:Input||``, drag ``||input:on button A pressed||`` into your workspace. Inside, use ``||basic:show number||`` to display ``||Kitronik_Move_Motor:read left line sensor||``.
```blocks
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left))
})
```

Download and test: Place the buggy on a black line (use electrical tape on white paper/floor). Press A when the left sensor is on the black line, then off the line. The numbers should be very different! Write down roughly what values you see - this helps you set the **threshold** variable.

## Step 8: Create Follow Line Function
Now let's make the line following work! From ``||functions:Functions||``, create a function called **followLine**.
```blocks
function followLine () {
	
}
```

## Step 9: Read Both Sensors
Inside **followLine**, create two variables: **leftSensor** and **rightSensor**. Set them to read the left and right line sensors.
```blocks
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
}
```

## Step 10: Add Line Following Logic - Both On Line
From ``||logic:Logic||``, add an ``||logic:if then else if then else||`` block (click the **+** to add else if sections). 

For the first condition, check if **both sensors** see the line: ``||logic:leftSensor < threshold AND rightSensor < threshold||``. If true, both motors run at **fastSpeed** to go straight forward.

From ``||Kitronik_Move_Motor:Kitronik :MOVE Motor||``, drag ``||Kitronik_Move_Motor:motor left on forward speed 0||`` and set it to **fastSpeed**. Add another for the right motor at **fastSpeed**.
```blocks
let fastSpeed = 0
let threshold = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    }
}
```

## Step 11: Add Turn Left Logic
In the first ``||logic:else if||``, check if only the **left sensor** sees the line: ``||logic:leftSensor < threshold||``. 

This means the buggy is drifting right and needs to turn left to get back on the line. To turn left **while still moving forward**, the **left motor** runs at **slowSpeed** and the **right motor** runs at **fastSpeed**. This creates a smooth left curve.
```blocks
let fastSpeed = 0
let slowSpeed = 0
let threshold = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    } else if (leftSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, slowSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    }
}
```

## Step 12: Add Turn Right Logic
In the second ``||logic:else if||``, check if only the **right sensor** sees the line: ``||logic:rightSensor < threshold||``.

This means the buggy is drifting left and needs to turn right to get back on the line. To turn right **while still moving forward**, the **right motor** runs at **slowSpeed** and the **left motor** runs at **fastSpeed**. This creates a smooth right curve.
```blocks
let fastSpeed = 0
let slowSpeed = 0
let threshold = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    } else if (leftSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, slowSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    } else if (rightSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, slowSpeed)
    }
}
```

## Step 13: Add Off-Line Logic
In the final ``||logic:else||``, if neither sensor sees the line, stop both motors. This means the buggy has completely lost the line.
```blocks
let fastSpeed = 0
let slowSpeed = 0
let threshold = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    } else if (leftSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, slowSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
    } else if (rightSensor < threshold) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, fastSpeed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, slowSpeed)
    } else {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    }
}
```

## Step 14: Start Line Following on Button A
Delete your sensor test code from button A. Instead, set ``||variables:running||`` to **true** and show the **Arrow North** icon to indicate line following mode.
```blocks
let running = false
input.onButtonPressed(Button.A, function () {
    running = true
    basic.showIcon(IconNames.ArrowNorth)
})
```

## Step 15: Stop on Button B
From ``||input:Input||``, drag ``||input:on button B pressed||``. Set ``||variables:running||`` to **false**, turn off both motors, and show the **No** icon.
```blocks
let running = false
input.onButtonPressed(Button.B, function () {
    running = false
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    basic.showIcon(IconNames.No)
})
```

## Step 16: Run Line Following Loop
From ``||basic:Basic||``, drag ``||basic:forever||`` into your workspace. Inside, add an ``||logic:if||`` that checks if ``||variables:running||`` is **true**. If so, call ``||functions:followLine||``.
```blocks
let running = false
basic.forever(function () {
    if (running) {
        followLine()
    }
})
```

## Complete! @showdialog
Excellent work! Your buggy can now follow a black line smoothly!

**How to test:**
1. Create a straight black line using electrical tape on a white surface (or use the Kitronik mat)
2. Place the buggy so the line is between the two sensors
3. Press **A** to start (Arrow icon shows)
4. The buggy should follow the line, turning smoothly to stay on track
5. Press **B** to stop anytime (No icon shows)

**Calibration Tips:**
- **If buggy doesn't follow the line:** Adjust **threshold** value (try 400 or 600). Remember: lower numbers = darker surface
- **If buggy moves too fast/jerky:** Lower **fastSpeed** (try 20)
- **If turns are too gentle/sharp:** Adjust the difference between **fastSpeed** and **slowSpeed** (try fastSpeed=30, slowSpeed=10 for sharper turns)
- **Best results:** Consistent lighting, high contrast between line and surface, flat surface

**Understanding the logic:**
- Both sensors on line → Go straight (both motors at fastSpeed)
- Left sensor on line → Turn left (left motor at slowSpeed, right at fastSpeed)
- Right sensor on line → Turn right (right motor at slowSpeed, left at fastSpeed)
- Neither sensor on line → Stop (lost the line)

**Why does this work?**
When one motor runs slower than the other, the buggy naturally curves toward the slower side while still moving forward. This creates smooth line following instead of jerky stop-and-spin movements!

**Ready for challenges?**
Now try your line following on:
- Curved lines
- Sharp corners
- The Kitronik challenge mats
- Your own custom line patterns!

The same code works for all line following challenges - just let your buggy do the work!

**Advanced Tip: Handling Very Tight Corners**
If your buggy struggles with very sharp corners on the Kitronik mats, you can make turns more aggressive by using negative speeds:
- Instead of `slowSpeed = 15`, try `slowSpeed = -10`
- This makes one motor go backward while the other goes forward, creating a tighter turn
- Warning: This can make the buggy "hunt" more on gentle curves, so only use if needed for your specific track!
