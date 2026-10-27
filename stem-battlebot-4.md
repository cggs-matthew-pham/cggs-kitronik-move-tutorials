# Battle Bot 4: Battle Upgrades (Robot)

```template
let lastHeard = 0
let command = 0
let channel = ""
channel = "roger"
radio.setGroup(101)
basic.showString(channel)
basic.showIcon(IconNames.Happy)
command = 2
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        command = value
        lastHeard = input.runningTime()
    }
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 2
    }
    if (command == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    } else if (command == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
    } else if (command == 2) {
        Kitronik_Move_Motor.stop()
    } else if (command == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
    } else if (command == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    }
})
```

## Introduction @showdialog
Your robot drives safely. Now get it ready for **sumo**.

You'll add three upgrades:
- **Curves** — turn while still driving forward
- **Turbo** — full speed when you hold B
- **Attack** — swing a servo arm when you press A (optional, for flag knock)

New numbers join the protocol:

| Number | Move |
|---|---|
| 5 | Curve left |
| 6 | Curve right |
| +10 | Turbo (e.g. 13 = turbo forward) |
| 99 | Attack! |

Your template is your robot code from Battle Bot 3. This is part 1 of 2 — the controller comes next.

## Step 1: A Speed Variable
Make a new variable called **speed**. At the top of the ``||basic:forever||`` loop, just **after** the safety stop, add ``||variables:set speed to 50||``.

Then swap the numbers in the move blocks:
- Forward and reverse: change **50** to ``||variables:speed||``
- Both spins: change **20** to ``||variables:speed||`` ÷ **2**

Now one number controls how fast everything goes.

```blocks
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 2
    }
    speed = 50
    if (command == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (command == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed / 2)
    } else if (command == 2) {
        Kitronik_Move_Motor.stop()
    } else if (command == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed / 2)
    } else if (command == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    }
})
```

## Step 2: Curves
A spin turns on the spot. A **curve** turns while still moving — great for chasing an opponent around the ring.

To curve, run the two wheels at **different** speeds with ``||Kitronik_Move_Motor:turn Motor on||``. Add two ``||logic:else if||`` branches:

- **5** (curve left): left motor ``||variables:speed||`` ÷ 3, right motor ``||variables:speed||``
- **6** (curve right): left motor ``||variables:speed||``, right motor ``||variables:speed||`` ÷ 3

```blocks
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 2
    }
    speed = 50
    if (command == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (command == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed / 2)
    } else if (command == 2) {
        Kitronik_Move_Motor.stop()
    } else if (command == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed / 2)
    } else if (command == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (command == 5) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
    } else if (command == 6) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
    }
})
```

## Step 3: Turbo
The controller will add **10** when the driver holds **B**. So **13** means turbo forward, **10** means turbo spin left.

We need to spot the 10, set full speed, then take the 10 off so the right move still runs. But we mustn't change ``||variables:command||`` itself — that's the driver's message.

So make a variable called **action**, a copy we're allowed to change:
1. After ``||variables:set speed to 50||``, add ``||variables:set action to||`` ``||variables:command||``
2. Then: if ``||variables:action||`` ≥ **10** → ``||variables:set speed to 100||`` and ``||variables:change action by -10||``
3. In every move check below, change ``||variables:command||`` to ``||variables:action||``

```blocks
basic.forever(function () {
    if (input.runningTime() - lastHeard > 500) {
        command = 2
    }
    speed = 50
    action = command
    if (action >= 10) {
        speed = 100
        action += -10
    }
    if (action == 3) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    } else if (action == 0) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, speed / 2)
    } else if (action == 2) {
        Kitronik_Move_Motor.stop()
    } else if (action == 1) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, speed / 2)
    } else if (action == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, speed)
    } else if (action == 5) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
    } else if (action == 6) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed / 3)
    }
})
```

## Step 4: Attack! (Optional)
For **flag knock** battles, attach a servo to **Servo 1** on the Move, with an arm made from a lolly stick or LEGO beam.

Make a function called **attack**:
- ``||Kitronik_Move_Motor:set servo 1 to 180||``
- ``||basic:pause 300 ms||``
- ``||Kitronik_Move_Motor:set servo 1 to 0||``

Then update ``||radio:on radio received||``: inside the name check, if ``||variables:value||`` = **99**, call ``||functions:attack||``. Otherwise, remember the command as before.

Why not just set ``||variables:command||`` to 99? Then the robot would stop driving to attack. This way it can **drive and attack at the same time**.

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

## Step 5: Download to the Robot
Download and flash this onto the micro:bit in your Move.

Your Battle Bot 3 controller still works with it — but it can't send the new moves yet. Open **Battle Bot 4: Battle Upgrades (Controller)** in MakeCode Arcade:

https://arcade.makecode.com/#tutorial:github:cggs-matthew-pham/cggs-arcade-tutorials/battlebot-4-controller

## Complete! @showdialog
Your robot is ready for sumo, soccer or flag knock — same code, different arena.

Notice how little you had to change: the safety stop and the radio listening stayed the same. You just taught the robot new numbers.
