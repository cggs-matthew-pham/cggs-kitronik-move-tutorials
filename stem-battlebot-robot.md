# Battle Bot: The Robot

```template
let action = 0
let command = 2
let lastHeard = 0
let speed = 0
let channel = ""
// CHANGE THIS: your robot's name - roger, rihanna, rocket, bob, bluey or biscuit
channel = "roger"
// CHANGE THIS: your team's group number
radio.setGroup(101)
basic.showString(channel)
basic.showIcon(IconNames.SmallSquare)
```

## Introduction @showdialog
Time to build a **battle bot** — ready for **sumo** or **soccer**.

You've seen a robot driven by radio in the soccer demo. This version is upgraded: it's driven by an **Arcade controller** with more buttons, it can **curve**, **turbo** and **attack**, and it has a **safety stop**.

The controller sends a **number** 10 times every second. Each number means a move:

| Number | Move |
|---|---|
| 0 | Spin left |
| 1 | Spin right |
| 2 | Stop |
| 3 | Forward |
| 4 | Reverse |
| 5 | Curve left |
| 6 | Curve right |
| +10 | Turbo (e.g. 13 = turbo forward) |
| 99 | Attack! |

## Step 1: Choose Your Group and Name
Your template has two lines to change:
- ``||radio:radio set group||`` — choose your **team's group number** (your teacher will help you pick one nobody else is using)
- ``||variables:set channel to||`` — your **robot's name**

Your Arcade controller must use the **same group** and the **same name**. The group keeps teams apart; the name is a second check so your robot only obeys **your** controller.

```blocks
let action = 0
let command = 2
let lastHeard = 0
let speed = 0
let channel = ""
channel = "roger"
radio.setGroup(101)
basic.showString(channel)
basic.showIcon(IconNames.SmallSquare)
```

## Step 2: Remember the Last Command
From ``||radio:Radio||``, drag ``||radio:on radio received name value||``.

Inside it, add ``||logic:if||`` ``||variables:name||`` = ``||variables:channel||``, then:
- ``||variables:set command to||`` ``||variables:value||``
- ``||variables:set lastHeard to||`` ``||input:running time (ms)||``

In the demo, the robot moved **straight away** inside this block. Now it only **remembers** what the driver wants and **when** we last heard from them. You'll see why in Step 7.

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        command = value
        lastHeard = input.runningTime()
    }
})
```

## Step 3: Drive Forward and Stop
From ``||basic:Basic||``, drag a ``||basic:forever||`` loop. Inside it:
- ``||variables:set action to||`` ``||variables:command||``
- ``||variables:set speed to 50||``
- An ``||logic:if then else||``: if ``||variables:action||`` = **3**, ``||Kitronik_Move_Motor:move Forward at speed||`` ``||variables:speed||``. Else, ``||Kitronik_Move_Motor:stop||``.

The loop works on its own copy, **action**, so it can change it without forgetting what the driver asked for.

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 4: Add Reverse and Spins
Click the **+** on your ``||logic:if||`` block to add ``||logic:else if||`` branches — the same numbers as the demo:

- **0** → ``||Kitronik_Move_Motor:spin Left||``
- **1** → ``||Kitronik_Move_Motor:spin Right||``
- **4** → ``||Kitronik_Move_Motor:move Reverse||``

Keep ``||Kitronik_Move_Motor:stop||`` in the final **else** — that handles **2**, and anything unexpected.

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

## Step 5: Curve While Driving
A spin turns on the spot. A **curve** turns while still moving — great for chasing an opponent or steering a ball.

To curve, run the two wheels at **different** speeds with ``||Kitronik_Move_Motor:turn Motor on||``.

- **5** (curve left): left motor slow, right motor fast
- **6** (curve right): left motor fast, right motor slow

```blocks
basic.forever(function () {
    action = command
    speed = 50
    if (action == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 1) {
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
The controller adds **10** when the driver holds **B**. So 13 means turbo forward, 10 means turbo spin left.

After ``||variables:set speed to 50||``, add an ``||logic:if||``:
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
    if (action == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 1) {
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
In the demo, what happened if the controller lost signal while the robot was driving forward? It kept going. In sumo, that means driving straight out of the ring.

Real battle bots have a **failsafe**: if the robot stops hearing the controller, it stops itself.

At the very top of the ``||basic:forever||`` loop (before ``||variables:set action||``), add:
- If ``||input:running time (ms)||`` − ``||variables:lastHeard||`` > **500**: ``||variables:set command to 2||`` (stop)

Test it: drive forward, then switch the controller off. The robot should stop within half a second.

```blocks
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 2
    }
    action = command
    speed = 50
    if (action >= 10) {
        speed = 100
        action += -10
    }
    if (action == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed)
    } else if (action == 1) {
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

## Step 8: Attack! (Optional)
For **flag knock** battles, attach a servo to **Servo 1** on the Move with an arm made from a lolly stick or LEGO beam.

Make a function called **attack**:
- ``||Kitronik_Move_Motor:set servo 1 to 180||``
- ``||basic:pause 300 ms||``
- ``||Kitronik_Move_Motor:set servo 1 to 0||``

Then update ``||radio:on radio received||``: inside the name check, if ``||variables:value||`` = **99**, call ``||functions:attack||``. Otherwise, store the command as before.

Why not just set ``||variables:command||`` to 99? Because then the robot would stop driving to attack. This way it can **drive and attack at the same time**.

```blocks
function attack () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 180)
    basic.pause(300)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
}
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == 99) {
            attack()
        } else {
            command = value
            lastHeard = input.runningTime()
        }
    }
})
```

## Step 9: Download to the Robot
Download and flash this code onto the micro:bit that goes **in the Move**. Switch the Move on — it shows its name, then a small square.

Nothing will move yet — it's waiting for a controller. Next, open the **Battle Bot: The Controller** tutorial in **MakeCode Arcade**:

https://arcade.makecode.com/#tutorial:github:cggs-matthew-pham/cggs-arcade-tutorials/battlebot-controller

## Complete! @showdialog
Your robot is ready for sumo, soccer or flag knock — same code, different arena.

The key idea is **state**: the radio block only *remembers* the latest command, and the forever loop *acts* on it. Separating "listening" from "doing" is what lets you add a safety stop, turbo and attacks without the code turning into a mess.
