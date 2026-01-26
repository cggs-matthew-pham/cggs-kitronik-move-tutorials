# Kitronik :MOVE Motor Test

## Introduction @showdialog
Test your Kitronik :MOVE motor by making it drive forward and stop using the A and B buttons!

## Step 1: Add the Extension
Click on **Extensions** in the toolbox. Search for **Kitronik :MOVE Motor** and click to add it.

## Step 2: Drive Forward on Button A
From ``||input:Input||``, drag ``||input:on button A pressed||`` into your workspace.

From ``||Kitronik_Move_Motor:Kitronik :MOVE Motor||``, drag ``||Kitronik_Move_Motor:move Forward at speed 0||`` inside the button A block. Change the speed to **30**.
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
})
```

## Step 3: Stop on Button B
From ``||input:Input||``, drag another ``||input:on button A pressed||`` into your workspace. Click on the **A** and change it to **B**.

From ``||Kitronik_Move_Motor:Kitronik :MOVE Motor||``, drag ``||Kitronik_Move_Motor:stop||`` inside the button B block.
```blocks
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.stop()
})
```

## Complete! @showdialog
Great job! Download your code to the micro:bit, then:
- Press **A** to make the buggy drive forward
- Press **B** to stop the buggy

Make sure your buggy has fresh batteries and is on a flat surface!
