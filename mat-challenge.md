# Kitronik :MOVE Motor - Line Following with Obstacle Detection

## Introduction @showdialog
Program your buggy to follow a black line on the Kitronik mat and stop when it detects obstacles! You'll learn to use line sensors and the ultrasonic distance sensor.

## Step 1: Add the Extension
Click on **Extensions** in the toolbox. Search for **Kitronik :MOVE Motor** and click to add it.

## Step 2: Show Ready Icon
From ``||basic:Basic||``, drag ``||basic:show icon||`` into ``||basic:on start||``. Choose the **Heart** icon to show the program is ready.
```blocks
basic.showIcon(IconNames.Heart)
```

## Step 3: Create Speed Variable
From ``||variables:Variables||``, click "Make a Variable" and create **speed**. Set it to **20** in ``||basic:on start||``. This controls how fast the buggy moves.
```blocks
let speed = 0
basic.showIcon(IconNames.Heart)
speed = 20
```

## Step 4: Create Threshold Variable
Create another variable called **threshold**. Set it to **500** in ``||basic:on start||``. This value tells the buggy what counts as "on the line" vs "off the line". You'll need to test and adjust this based on your lighting and mat!
```blocks
let threshold = 0
let speed = 0
basic.showIcon(IconNames.Heart)
speed = 20
threshold = 500
```

## Step 5: Create Obstacle Distance Variable
Create a variable called **obstacleDistance**. Set it to **15** in ``||basic:on start||``. The buggy will stop if it detects something within 15cm.
```blocks
let obstacleDistance = 0
let threshold = 0
let speed = 0
basic.showIcon(IconNames.Heart)
speed = 20
threshold = 500
obstacleDistance = 15
```

## Step 6: Create Running Flag
Create a variable called **running** and set it to **false** in ``||basic:on start||``. This tracks whether the buggy should be moving.
```blocks
let running = false
let obstacleDistance = 0
let threshold = 0
let speed = 0
basic.showIcon(IconNames.Heart)
speed = 20
threshold = 500
obstacleDistance = 15
running = false
```

## Step 7: Test Line Sensors
Let's test the line sensors first! From ``||input:Input||``, drag ``||input:on button A pressed||`` into your workspace. Inside, use ``||basic:show number||`` to display ``||Kitronik_Move_Motor:read left line sensor||``.
```blocks
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left))
})
```

Download and test: Place the buggy on your mat. Press A when the left sensor is on the black line, then off the line. The numbers should be very different! Write down roughly what values you see - this helps you set the **threshold** variable.

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
From ``||logic:Logic||``, add an ``||logic:if then else if then else||`` block (click the + to add else if sections). 

For the first condition, check if **both sensors** see the line: ``||logic:leftSensor < threshold AND rightSensor < threshold||``. If true, move forward.
```blocks
let threshold = 0
let speed = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    }
}
```

## Step 11: Add Turn Left Logic
In the first ``||logic:else if||``, check if only the **left sensor** sees the line: ``||logic:leftSensor < threshold||``. If true, spin left to get back on the line.
```blocks
let threshold = 0
let speed = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (leftSensor < threshold) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    }
}
```

## Step 12: Add Turn Right Logic
In the second ``||logic:else if||``, check if only the **right sensor** sees the line: ``||logic:rightSensor < threshold||``. If true, spin right.
```blocks
let threshold = 0
let speed = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (leftSensor < threshold) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (rightSensor < threshold) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    }
}
```

## Step 13: Add Off-Line Logic
In the final ``||logic:else||``, if neither sensor sees the line, stop the motors.
```blocks
let threshold = 0
let speed = 0
function followLine () {
    let leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    let rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    if (leftSensor < threshold && rightSensor < threshold) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (leftSensor < threshold) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (rightSensor < threshold) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    } else {
        Kitronik_Move_Motor.stop()
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
From ``||input:Input||``, drag ``||input:on button B pressed||``. Set ``||variables:running||`` to **false**, stop the motors, and show the **No** icon.
```blocks
let running = false
input.onButtonPressed(Button.B, function () {
    running = false
    Kitronik_Move_Motor.stop()
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

**Test it!** Download to your micro:bit, place on the line, press A. The buggy should follow the line! Press B to stop. If it doesn't work well, adjust the **threshold** variable and try again.

## Step 17: Create Check Obstacle Function
Now let's add obstacle detection! From ``||functions:Functions||``, create a function called **checkObstacle**.
```blocks
function checkObstacle () {
	
}
```

## Step 18: Read Distance Sensor
Inside **checkObstacle**, create a variable **distance** and set it to ``||Kitronik_Move_Motor:measure distance||`` (in cm).
```blocks
function checkObstacle () {
    let distance = Kitronik_Move_Motor.measure(Kitronik_Move_Motor.Distance.Centimeters)
}
```

## Step 19: Stop if Obstacle Detected
Add an ``||logic:if||`` to check if ``||variables:distance < obstacleDistance||``. If true, set ``||variables:running||`` to **false**, stop the motors, and show the **Skull** icon to indicate an obstacle was detected.
```blocks
let running = false
let obstacleDistance = 0
function checkObstacle () {
    let distance = Kitronik_Move_Motor.measure(Kitronik_Move_Motor.Distance.Centimeters)
    if (distance < obstacleDistance) {
        running = false
        Kitronik_Move_Motor.stop()
        basic.showIcon(IconNames.Skull)
    }
}
```

## Step 20: Add Obstacle Check to Loop
In your ``||basic:forever||`` loop, call ``||functions:checkObstacle||`` **before** calling ``||functions:followLine||``. This checks for obstacles first, then follows the line if clear.
```blocks
let running = false
basic.forever(function () {
    if (running) {
        checkObstacle()
        followLine()
    }
})
```

## Complete! @showdialog
Excellent work! Your buggy can now follow a line AND stop when it detects obstacles!

**How to use:**
1. Place buggy on the black line
2. Press **A** to start line following (Arrow icon shows)
3. Buggy follows the line automatically
4. If it detects an obstacle within 15cm, it stops and shows Skull icon
5. Remove the obstacle, then press **A** again to resume
6. Press **B** anytime to stop (No icon shows)

**Calibration Tips:**
- If buggy doesn't follow line well, adjust **threshold** (try 400 or 600)
- If it stops too early/late for obstacles, adjust **obstacleDistance**
- If it moves too fast/slow, adjust **speed**
- Make sure your mat is on a flat surface with consistent lighting

**Challenge Ideas:**
- Add a counter to track how many obstacles were detected
- Make the buggy reverse when obstacle detected, then resume
- Add sound effects when obstacles are detected
- Try different Kitronik mat challenges!
