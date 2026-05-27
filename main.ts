input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.stop()
})
music.play(music.stringPlayable("C", 120), music.PlaybackMode.UntilDone)
basic.forever(function () {
	
})
