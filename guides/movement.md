# Movement

What the Move Motor can actually do. Use this when planning behaviours - check here first before inventing something the hardware can't do.

## Direct control (driving)

The Move has two tracked motors with independent control.

### Move block
`Kitronik_Move_Motor.move(direction, speed)`

- **direction**: Forward, Reverse, Left, Right
- **speed**: 0 to 100

**Forward/Reverse** drive straight. **Left/Right** still drive forward, but curve to one side - they don't spin on the spot.

Used in: T1 (driveForward function), T4 (line-follow), T5 (new direction commands).

### Spin block
`Kitronik_Move_Motor.spin(direction, speed)`

- **direction**: Left or Right
- **speed**: 0 to 100

Spins on the spot - one track forward, the other reverse. Used for sharp turns, line-follow corrections, and recovery from being off-path.

Used in: T4 (line-follow correction), T5 (SPIN_LEFT and SPIN_RIGHT commands).

### Stop block
`Kitronik_Move_Motor.stop()`

Stops both motors. Used everywhere.

### Individual motor control (advanced)
`Kitronik_Move_Motor.motorOn(motor, direction, speed)` and `motorOff(motor)`

Lets you control the left and right motors separately. Not used in the tutorials, but useful for custom line-follow algorithms or diagonal movement.

## Sensor inputs

### Line following sensors
Two infrared sensors on the underside of the Move, near the front. They detect how much light reflects back.

- **Dark surface (e.g. black tape)**: low sensor value
- **Light surface (e.g. white paper)**: high sensor value

Read with:
`Kitronik_Move_Motor.readSensor(LfSensor.Left)` or `LfSensor.Right`

The values are analogue (roughly 0-1023). You don't usually care about the exact number - you compare left vs right to decide what to do.

**Typical uses**:
- Following a line (T4)
- Detecting a colour-changed zone (dark patch = "arrived")
- Finding the edge of a table

**Limitations**: the sensors are close together. They only see a narrow strip directly under the front of the bot. If the line is wider than the gap between sensors, both sensors might read the same way and the bot thinks it's tracking straight.

### Ultrasonic distance sensor
One sensor at the front of the Move, pointing forward. Measures the distance to the nearest object in front.

- Set units: `Kitronik_Move_Motor.measureDistancesIn(Cm)` or `Inches`
- Read distance: `Kitronik_Move_Motor.measure()`

**Typical uses**:
- Obstacle detection (T6)
- Arrival detection when approaching a wall
- Distance-keeping (follow at 20cm behind something)

**Limitations**: only sees directly forward. Narrow cone (around 15°). Struggles with soft surfaces (foam, cloth) that absorb sound. Maximum range is around 200cm.

## Outputs (besides motors)

### 5x5 LED display (on the micro:bit itself)
Standard micro:bit LED matrix. Shows icons, arrows, numbers, short strings.

**Typical uses**:
- Role indicator (square = REMOTE, heart = BOT)
- Status feedback (tick = ARRIVED, cross = HELP)
- Menu display (arrows for direction)
- Debug output during testing

### ZIP LEDs (4 RGB LEDs on the Move)
Full-colour programmable LEDs on the top of the Move. Can show any colour, individually addressable.

- Set up: `Kitronik_Move_Motor.createMoveMotorZIPLED(4)`
- Colours: preset names or custom RGB

**Typical uses**:
- Status indicator visible from across the room (green = running, red = stopped)
- Turn signals (flash the left ZIP LEDs when turning left)
- Celebration effects when ARRIVED

Not used in the tutorials but genuinely useful for projects. See the Kitronik Lights & Sound tutorial for how to use them.

### Horn and siren
- `Kitronik_Move_Motor.beepHorn()` - short beep
- `Kitronik_Move_Motor.soundSiren(OnOffSelection.On)` - continuous siren until turned off

**Typical uses**:
- Audible alert when the bot detects something
- Celebration when ARRIVED

Again, not in the tutorials, but adds a lot of character to a project.

## What the Move *can't* do

Good to know before planning:

- **No camera** - it can't recognise images or colours
- **No GPS or positioning** - it doesn't know where it is except relative to lines
- **No accelerometer control of driving** - the motor is tracked, tilt doesn't affect movement
- **No servos** - it can't open/close claws or lift things
- **No extra sensors out of the box** - you can add some via the edge connector, but it's fiddly

If your scenario needs something the Move can't do, you're probably using a **radio trick** - a second micro:bit sends a message that *represents* the missing feature. See the Simulation Techniques guide for how.

## Driving behaviours by speed

Rough speed guide for planning:

- **20-30**: delicate movement, good for line-following corrections, tight spaces
- **40-50**: normal operation, good general default
- **60-80**: fast movement, might overshoot turns, batteries drain faster
- **90-100**: maximum speed, mostly useful for straight-line testing

The tutorials default to `speed = 40` which is a good middle ground.

## Calibration

Motors aren't always equal - one side often drifts. The Kitronik Advanced Motor Adjustment tutorial shows how to add a bias correction. Worth doing if your bot consistently veers one way when driving straight.

## Tutorial references

- T1 Radio Remote Control - basic move and stop
- T3 State and Forever Loop - using state to control ongoing movement
- T4 Adapting Line Following - line sensors and spin for corrections
- T5 Cycle-and-Select - multiple direction commands
- T6 Two-Way Radio - ultrasonic sensor as trigger source
