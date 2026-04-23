# Combining Techniques

Real projects rarely use just one technique. This guide shows how the patterns from different tutorials combine into working systems.

## The pattern stack

Each tutorial adds a layer. By T6 you have a stack that looks like this:

```
              Two-way communication (T6)
              Role-based behaviour (T6)
Cycle-and-select menu (T5)        │
                    ↕
Line-following behaviour (T4)     │
                    ↕
State pattern: forever + variable (T3)
                    ↕
Channel filtering (T2)
                    ↕
Dispatcher pattern: functions + if-else (T1)
                    ↕
Radio send/receive (T1)
```

Each layer plugs into the ones below. Adding a new behaviour at the top doesn't require changing the bottom.

## Common combinations

### "Driveable bot that can also line-follow"
**T1 + T3 + T4**

The dispatcher routes commands to functions. The state variable tracks which behaviour is active. The forever loop runs the line-follow logic only when the state says FOLLOW.

This is the baseline for most scenarios.

### "Driveable bot with many commands"
**T1 + T5**

Dispatcher handles many commands. Menu lets the operator pick from them without needing many buttons.

Works for scenarios where the bot does a lot of different small actions on demand.

### "Autonomous bot that alerts the operator"
**T1 + T3 + T4 + T6**

Line-follow runs in the background. Sensor checks in the forever loop trigger status messages back to the operator. Operator sees alerts and decides whether to intervene.

This is the classic "patrol and alert" pattern.

### "Full two-way mixed autonomy"
**T1 + T2 + T3 + T4 + T5 + T6**

Menu-driven commands from operator. Continuous behaviours on the bot. Sensor-triggered alerts back. Role variable distinguishes the two devices.

The capstone scenario. Everything working together.

## Patterns of behaviour

### Fire-and-forget command
Operator sends a command. Bot receives it. Bot does it until told otherwise or until something else happens.

*Example*: "Drive forward" - bot drives until STOP or crash.

**Implementation**: dispatcher calls a function that sets state. Forever loop reads state and acts.

**Tutorials**: T1 for basic send/receive, T3 for the state pattern.

### Continuous behaviour
Bot does something that requires ongoing work each cycle - reading sensors, adjusting, reading again.

*Example*: Line-following requires constant sensor reads and steering adjustments.

**Implementation**: state variable (currentAction) + forever loop + conditional logic. The forever loop runs the relevant code block based on what state the bot is in.

**Tutorials**: T3 establishes the pattern, T4 applies it to line-follow.

### Event-triggered response
Something in the world changes. The bot detects it. Behaviour changes automatically.

*Example*: Ultrasonic sees something close - bot sends HELP.

**Implementation**: sensor check inside the forever loop. When condition is met, take action.

**Tutorials**: T6 uses this for status messages. You can use the same pattern for any sensor input.

### User override
Bot is doing something autonomous. Operator sends a new command. Bot switches.

*Example*: Bot is line-following, operator sends STOP - bot stops.

**Implementation**: this is essentially free with the state pattern. When the dispatcher receives STOP, it calls `stopBot()` which sets the state to STOP. The forever loop reads the new state on its next cycle.

**Tutorials**: automatic in T3's state pattern. No extra code needed.

### Bi-directional dialogue
Operator sends commands, bot reports events back, both streams happening in parallel.

*Example*: Operator tells bot to follow line. Bot detects obstacle, reports it. Operator sends REVERSE.

**Implementation**: two channels (commands and status), roles to distinguish who listens to what.

**Tutorials**: T6.

## Scenario-specific combination examples

### Scenario: Autonomous warehouse robot

**Behaviours needed:**
- Line-follow between shelves
- Detect when at a shelf (ultrasonic close)
- Report arrival
- Accept manual override (go back, turn around)

**Techniques combined:**
- T1 dispatcher routes commands
- T3 state pattern handles both FOLLOW and manual commands
- T4 does the line-following
- T6 handles the two-way alerts and the ultrasonic-triggered arrival detection
- T5 optional - if the warehouse has many zones and you want a menu

### Scenario: Classroom spill detector

**Behaviours needed:**
- Patrol a fixed route
- Detect line-change (analogous to detecting a spill via sensor)
- Alert the operator
- Remote kill switch

**Techniques combined:**
- T3 state pattern for the ongoing patrol
- T4 line-following for the route
- T6 for sensor-triggered alerts and operator kill switch
- T5 not needed - you only have one command really (stop)

### Scenario: Performance bot (dance, demo)

**Behaviours needed:**
- Many different choreographed commands
- Operator-triggered (not autonomous)

**Techniques combined:**
- T1 dispatcher
- T2 channels (don't interfere with other pairs' demos)
- T5 cycle-and-select for a rich menu of commands
- T3, T4, T6 not needed - the bot is purely reactive

## When combinations break

### Problem: bot responds to its own status messages

**Symptom**: bot sends ARRIVED, then immediately behaves as if it received an ARRIVED command.

**Cause**: using one channel for both commands and status.

**Fix**: split into `channel_commands` and `channel_status` (T6).

### Problem: state gets stuck

**Symptom**: bot won't stop following the line even when you send STOP.

**Cause**: the forever loop isn't reading the state variable, or the dispatcher isn't setting it correctly.

**Fix**: trace the chain - does the dispatcher call `stopBot()`? Does `stopBot()` set `currentAction = STOP`? Does the forever loop check `currentAction`?

### Problem: commands get duplicated

**Symptom**: press A once, bot acts twice.

**Cause**: both micro:bits run the same code. Pressing A on the bot sends a message too, which the bot then receives and acts on.

**Fix**: wrap the button handler in a role check (T6). The bot shouldn't send commands on button presses - that's the remote's job.

### Problem: everyone's bot responds to everyone's remote

**Symptom**: chaos in the classroom.

**Cause**: all pairs on the same radio group with no channel filter.

**Fix**: add channels (T2). Give each pair a unique channel name.

## Tutorial references

- T1 Radio Remote Control
- T2 Radio Channels
- T3 State and Forever Loop
- T4 Adapting Line Following
- T5 Cycle-and-Select Controller
- T6 Two-Way Radio with Roles
