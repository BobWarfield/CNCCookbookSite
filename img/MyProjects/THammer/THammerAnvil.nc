( T-Hammer Anvil              )( by Bob Warfield.  12/8/2013 )
( Safe Starting Conditions )G0 G40 G49 G50 G80 G28
( Pull to Stop and Face: 0.1" allowance from stop to face.  Stop @ 2" from Chuck Jaws )
( Pull to Stop )
X0Z0
M0 (Program stopped:  Operator, please pull stock to stop and start program.)
( Face.  Stock's at 0.0
X-1.4 ( Leave a nice big margin in X )
F14 S800
M3 G01
( Z0.0 Roughing Pass )
Z0
X0.0
( Z-0.040 Roughing Pass )
G00 X-1.4
G01 Z-0.040
X0.0
( Z-0.080 Roughing Pass )
G00 X-1.4
G01 Z-0.080
X0.0
( Z-0.100 Finishing Pass )
G00 X-1.4
G01 Z-0.1
X0.0
G00 X-1.4 (Done Facing)

( OD Turn: 1" OD )
(OD Turn G-code generated:)
(   Mon Dec  2 17:02:59 2013)

(Units = G20 inches)
(Work Offset = G54)

(CSS Max. Spindle RPM = 1100)
(Tool Number = 1)
(Tool Type = ftp_turn)
(Tool Orientation = 3)
(Tool Radius = 0.0158)

(Rough CSS = 100 feet/minute)
(Rough Feed inches/revolution = 0.0180)
(Rough Depth of Cut = 0.0500)

(Finish CSS = 150 feet/minute)
(Finish Feed inches/revolution = 0.0040)
(Finish Depth of Cut 0.0150)

(Initial Diameter = -1.2000)
(Final Diameter = -1.0000)
(Z Start Location = 0.0000)
(Z End  Location = -1.2000)
(Fillet Radius = 0.0000)
(Tool Clearance = 0.1000)
(Tool on - side)


G7  (Dia. Mode)

G18 (XZ Plane)

G90 (Absolute Distance Mode)
G20
G54

(Set Roughing Parameters)
(CSS, Spindle - feet/minute, Maximum RPM)
G96 S 100 D 1100
(Feed Rate - inches/revolution)
G95 F 0.0180

G28

T0101
M3
M8

(Number of roughing passes = 2)
(Adjusted roughing DoC = 0.0425)

G0 X -1.2000 Z 0.1000

(Pass 1)
G0 X -1.1150
G1 Z -1.1850
G1 X -1.2000
G0 Z 0.1000

(Pass 2)
G0 X -1.0300
G1 Z -1.1850
G1 X -1.1150
G0 Z 0.1000

(Set Finishing Parameters)
(CSS, Spindle - feet/minute, Maximum RPM)
G96 S 150 D 1100
(Feed Rate - inches/revolution)
G95 F 0.0040

(Finish Pass 3)
G0 X -1.0000
G1 Z -1.2000
G0 X -1.2000 Z -1.1000
G0 X -1.4000
G0 Z -1.2000
G1 X -1.0000

G0 X -1.4000 Z 0.1000

G28

M5
M9
M30

( Drill for Tap: 5/8" Deep, Tap Drill #5 )
( Tap: 1/4-20 Tap )
( Chamfer End: Plunge from 1" to 0.825" )
( Part Off: 1" Dia, 1" Length + 0.1" Facing Allowance )
( Flip and Reinstall:  )
( Pull to Stop and Face: 0.1" allowance from stop to face.  Stop @ 2" from Chuck Jaws )

