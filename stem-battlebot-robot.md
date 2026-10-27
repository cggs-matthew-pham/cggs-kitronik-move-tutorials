# Battle Bot: The Robot

```template
let action = 0
let command = 0
let lastHeard = 0
let speed = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Introduction @showdialog
Time to build a **battle bot**.

In this tutorial you will program the micro:bit that sits in your Kitronik Move. It will **listen** for commands from an Arcade controller and drive however the driver tells it.

The controller sends a **number** many times a second. Each number means a move:

| Number | Move |
|---|---|
| 0 | Stop |
| 1 | Forward |
| 2 | Reverse |
| 3 | Spin left |
| 4 | Spin right |
| 5 | Curve left |
| 6 | Curve right |
| +10 | Turbo (e.g. 11 = turbo forward) |
| 99 | Attack! |

## Step 1: Set Your Radio Group
Your template has ``||radio:radio set group 1||``. Change **1** to the group number your teacher gives you.

Your Arcade controller must use the **same number**, and no other team can use it — otherwise you'll be driving someone else's robot!

```blocks
let action = 0
let command = 0
let lastHeard = 0
let speed = 0
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Remember the Last Command
From ``||radio:Radio||``, drag ``||radio:on radio received receivedNumber||``.

Inside it:
- ``||variables:set command to||`` ``||variables:receivedNumber||``
- ``||variables:set lastHeard to||`` ``||input:running time (ms)||``

The radio block doesn't drive the robot — it just **remembers** what the driver wants and **when** we last heard from them.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    command = receivedNumber
    lastHeard = input.runningTime()
})
```

## Step 3: Drive Forward and Stop
From ``||basic:Basic||``, drag a ``||basic:forever||`` loop. Inside it add an ``||logic:if then else||``.

- If ``||variables:action||`` = **1**: ``||Kitronik_Move_Motor:move Forward at speed||`` ``||variables:speed||``
- Else: ``||Kitronik_Move_Motor:stop||``

Before the ``||logic:if||``, make a new variable **action** and add:
- ``||variables:set action to||`` ``||variables:command||``
- ``||variables:set speed to 50||``

The loop works on its own copy, **action**, so it can change it without forgetting what the driver asked for.

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 4: Add Reverse and Spins
Click the **+** on your ``||logic:if||`` block to add more ``||logic:else if||`` branches:

- **2** → ``||Kitronik_Move_Motor:move Reverse||``
- **3** → ``||Kitronik_Move_Motor:spin Left||``
- **4** → ``||Kitronik_Move_Motor:spin Right||``

Keep ``||Kitronik_Move_Motor:stop||`` in the final **else**.

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 2) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 3) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 5: Curve While Driving
A spin turns on the spot. A **curve** turns while still moving — great for chasing an opponent.

To curve, run the two wheels at **different** speeds with ``||Kitronik_Move_Motor:turn Motor on||``.

- **5** (curve left): left motor slow, right motor fast
- **6** (curve right): left motor fast, right motor slow

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 2) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 3) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    } else if (action == 5) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
    } else if (action == 6) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 6: Turbo Mode
The controller adds **10** when the driver holds **B**. So 11 means turbo forward, 13 means turbo spin left.

At the top of your ``||basic:forever||`` loop, after ``||variables:set speed to 50||``, add an ``||logic:if||``:
- If ``||variables:action||`` ≥ **10**: ``||variables:set speed to 100||`` and ``||variables:change action by -10||``

Now every move below works at turbo speed — without writing any new move blocks.

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action >= 10) {
        speed = 100
        action += -10
    }
    if (action == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 2) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 3) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    } else if (action == 5) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
    } else if (action == 6) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 7: The Safety Stop
What happens if the controller's batteries die while your robot is charging forward at turbo? It keeps going — forever.

Real battle bots have a **failsafe**: if the robot stops hearing the controller, it stops itself.

At the very top of the ``||basic:forever||`` loop (before ``||variables:set action||``), add:
- If ``||input:running time (ms)||`` − ``||variables:lastHeard||`` > **500**: ``||variables:set command to 0||``

Test it: drive forward, then switch the controller off. The robot should stop within half a second.

```blocks
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 0
    }
    action = command
    speed = 50
    if (action >= 10) {
        speed = 100
        action += -10
    }
    if (action == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 2) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 3) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    } else if (action == 5) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
    } else if (action == 6) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 8: Attack!
Attach a servo to **Servo 1** on the Move — this is your flipper or hammer.

Make a function called **attack**:
- ``||Kitronik_Move_Motor:set servo 1 to 180||``
- ``||basic:pause 300 ms||``
- ``||Kitronik_Move_Motor:set servo 1 to 0||``

Then update ``||radio:on radio received||``: if ``||variables:receivedNumber||`` = **99**, call ``||functions:attack||``. Otherwise, store the command as before.

Why not just set ``||variables:command||`` to 99? Because then the robot would stop driving to attack. This way it can **drive and attack at the same time**.

```blocks
function attack () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 180)
    basic.pause(300)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 99) {
        attack()
    } else {
        command = receivedNumber
        lastHeard = input.runningTime()
    }
})
```

## Step 9: Download to the Robot
Download and flash this code onto the micro:bit that goes **in the Move**. Switch the Move on.

Nothing will happen yet — it's waiting for a controller. Next, open the **Battle Bot: The Controller** tutorial in **MakeCode Arcade**:

https://arcade.makecode.com/#tutorial:github:cggs-matthew-pham/arcade-tutorials/battlebot-controller

## Complete! @showdialog
Your robot is ready for battle.

The key idea is **state**: the radio block only *remembers* the latest command, and the forever loop *acts* on it. Separating "listening" from "doing" is what lets you add a safety stop, turbo, and attacks without the code turning into a mess.
