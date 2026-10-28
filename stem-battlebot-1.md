# Battle Bot 1: Remote Control Robot

```template
let channel = ""
// CHANGE THIS: your robot's icon - duck, heart, ghost, rabbit, giraffe or snake
channel = "duck"
// CHANGE THIS: your team's group number
radio.setGroup(101)
basic.showIcon(IconNames.Duck)
```

## Introduction @showdialog
You've seen the soccer robot demo. Now you'll build it yourself.

You'll write **one program** and put it on **two** micro:bits:
- one plugs into your Move — the **robot**
- one you hold — the **remote**

Same code on both. The remote's buttons send commands; the robot listens and moves.

## Step 1: Choose Your Group and Icon
Your template has three things to change:
- ``||radio:radio set group||`` — your **team's group number** (check with your teacher that nobody else is using it)
- ``||basic:show icon||`` — pick your robot's **icon**. It stays on the screen so everyone can tell the robots apart
- ``||variables:set channel to||`` — type your icon's **name**, e.g. **duck**

Pick one of these six icons. They match the ready-made pictures on the Arcade controller later, so your screen will show the same picture as your robot.

| Pick this in show icon | Type this name |
|---|---|
| Duck | duck |
| Heart | heart |
| Ghost | ghost |
| Rabbit | rabbit |
| Giraffe | giraffe |
| Snake | snake |

Each team in the same group needs a **different** icon.

**Want your own icon?** Instead of ``||basic:show icon||``, use ``||basic:show leds||`` and draw your own 5×5 picture. Then make up a name for it — **8 letters or fewer**, no spaces. Check with your teacher that nobody else has the same one.

Why a group **and** a name? The **group** keeps teams apart. The **name** is a second check — even if another team picks the same group by mistake, your robot only obeys messages with **its** name.

```blocks
let channel = ""
channel = "duck"
radio.setGroup(101)
basic.showIcon(IconNames.Duck)
```

## Step 2: Team Colour
Your Move has four colour lights on top. Use them to show which **team** your robot is on — easy to see from across the soccer pitch or sumo ring.

From ``||Kitronik_Move_Motor:Move Motor||``, add these to the end of ``||basic:on start||``:
- ``||variables:set teamLights to||`` ``||Kitronik_Move_Motor:Move Motor with 4 ZIP LEDs||``
- ``||Kitronik_Move_Motor:teamLights show color red||``

Your teacher will tell you which team you're on: **red** or **blue**. To swap teams later, just change the colour and download again.

```blocks
let channel = ""
channel = "duck"
radio.setGroup(101)
let teamLights = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
teamLights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
basic.showIcon(IconNames.Duck)
```

## Step 3: The Robot's Commands
Robots don't understand words, so we use **numbers**. Here is the agreement between remote and robot:

| Number | Move |
|---|---|
| 0 | Spin left |
| 1 | Spin right |
| 2 | Stop |
| 3 | Forward |
| 4 | Reverse |

There's no code in this step. Keep this table — every Battle Bot tutorial uses it.

## Step 4: Listen for Your Name
From ``||radio:Radio||``, drag ``||radio:on radio received name value||``.

Inside it, add an ``||logic:if||`` block: if ``||variables:name||`` = ``||variables:channel||``.

Everything inside this ``||logic:if||`` only happens if the message was meant for **your** robot.

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
    	
    }
})
```

## Step 5: Forward, Spin and Stop
Inside the name check, add an ``||logic:if else if||`` that checks ``||variables:value||``:

- **3** → ``||Kitronik_Move_Motor:move Forward at speed 50||``
- **0** → ``||Kitronik_Move_Motor:spin Left at speed 20||``
- **2** → ``||Kitronik_Move_Motor:stop||``

Why no arrows on the screen? Blocks like ``||basic:show arrow||`` take over half a second to draw. While the robot is drawing, it **can't listen** — so your robot would be slow to react. A battle bot needs to be fast!

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == 3) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
        } else if (value == 0) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
        } else if (value == 2) {
            Kitronik_Move_Motor.stop()
        }
    }
})
```

## Step 6: Teach It the Rest
Your remote will only send three commands — but teach the robot **all five** anyway. You'll be glad later!

Add two more ``||logic:else if||`` branches:
- **1** → ``||Kitronik_Move_Motor:spin Right at speed 20||``
- **4** → ``||Kitronik_Move_Motor:move Reverse at speed 50||``

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == channel) {
        if (value == 3) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
        } else if (value == 0) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 20)
        } else if (value == 2) {
            Kitronik_Move_Motor.stop()
        } else if (value == 1) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 20)
        } else if (value == 4) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        }
    }
})
```

## Step 7: The Remote's Buttons
Now the remote side. From ``||input:Input||``, add three button blocks. Each one sends a number with your robot's name:

- ``||input:on button A pressed||`` → ``||radio:radio send value||`` ``||variables:channel||`` = **3** (forward)
- ``||input:on button B pressed||`` → ``||radio:radio send value||`` ``||variables:channel||`` = **0** (spin left)
- ``||input:on button A+B pressed||`` → ``||radio:radio send value||`` ``||variables:channel||`` = **2** (stop)

```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendValue(channel, 3)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(channel, 0)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue(channel, 2)
})
```

## Step 8: Download to Both
Download and flash the code onto **both** micro:bits. Plug one into the Move and switch it on.

Test with the remote:
- **A** — the robot drives forward and **keeps going**
- **B** — it spins left and **keeps spinning**
- **A+B** — it stops

If nothing happens, check both micro:bits show the same icon, and the same name is typed in ``||variables:set channel to||``.

## Step 9: Drive It
Try to drive your robot to a target and stop on it. Then try a game of soccer.

While you play, notice:
- What's hard about stopping in the right place?
- Which moves do you wish you had?

Your robot already knows five moves — the remote just can't send them all. That's what the next tutorial fixes. Open **Battle Bot 2** in MakeCode Arcade:

https://arcade.makecode.com/#tutorial:github:cggs-matthew-pham/cggs-arcade-tutorials/battlebot-2-controller

## Complete! @showdialog
You've built a radio-controlled robot.

The key idea is a **protocol**: remote and robot agree on what each number means. As long as they agree, you can swap in a completely different remote — which is exactly what you'll do next, with an **Arcade controller**.
