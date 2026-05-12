Custom Conquest by andy6170 Version 9.4
================================================================================================================
Just want to play?
Conquest Template: j51w
Winter Offensive: zsekg

Included is the full package to get you started.
The 3 folders contain the full content for Custom Conquest.

Godot Spatial Editor Scene:
This includes the tscn level for Godot. Extract the file to:
GodotProject\levels


Exported Maps:
There are instances where copying the experience may not keep the map attached.
If this happens you an use the included JSON map already exported and upload it to the portal website in the map rotation.


Portal Blocks:
When some people open the experience link they are unable to see the blocks.
If this happens you can import the included JSON of the template onto the Portal website within the block editor via the Import button.


ObjID Assignment:
200 - 226 Capture points (A must start from 200)
1100-1199 Area Trigger for Team 1 Spawn Protection
1200-1299 Area Trigger for Team 2 Spawn Protection
1300-1399 Area Trigger for Out of Bounds for Everyone
1400 Area Trigger for Infantry Combat Area
901 - AI Spawner for Team 1
902 - AI Spawner for Team 2
998 - Team Switcher 1
999 - Team Switcher 2
700-749 - Repel Trigger
750-799 - Repel Target

As map detection is not working. I have set ranges based on the flag for capturepoint vehicle spawner ObjIDs: 
A 200 = 600-609
B 201 = 610-619
C 202 = 620-629 ect



To add Air Boundaries, add an Area Trigger with a polygon volume for the ground boundaries and give it ObjID 1400. Then use the combat area to set the air boundaries.

This will now tell the game to use a custom UI for out of bounds and will handle everything, including when players enter/exit the vehicles.

As of game version 1.1.3 Default AI (Backfill and static) will now play the objectives on Premium maps. However these will only work in server hosted and not local hosted. If you wish to use local hosted or RedSec maps I recommend setting AI to non and using the EnableAI function in the MOD to enable the custom AI in the script.

Currently Backfill bots only fill 12 slots. However using the Custom AI instead will allow you to backfill to a default of 60 if there are enough slots. This number can be increased however runs the risk of performance impact.

Notes about AI:
Turn off backfill and static AI.
If you set the teams to 32v32 and you set this to 100, then 36 bots will join. 
If you set the teams to 1v1 then 98 bots will join. 
Recommended maximum 60 for server performance.


Knows Issues:
Scoreboard at the end of round may break.
AI pathfinding may have issues in Redsec maps (The Developers will fix this in an updating update)
When hosting locally the scoreboard will break when changing team. If hosted on a server it will work correctly.
Vehicles spawn on the map and cannot be selected from the spawn menu.
AI will not drive/fly on some maps.


================================================================================================================
================================================================================================================

Changes in this update:

V9.4

Snow toggle added for all maps
Snow colour filter added 
Various performance improvements (Capture UI, Bots and calculations reworked)
Repel workaround system added. (Create a trigger and then a target in Godot)
700-749 - Repel Trigger
750-799 - Repel Target
Added both normal and snow variants of Contamination and Liberation peak


New Maps Added:
Contamination
Manhattan Bridge (Created by Martstok)





================================================================================================================
================================================================================================================

Previous Update Changes:

V9.3

Updated capturing UI to split status and player count
Flashing UI for the objectives currently being taken
Borders added objective UI
AI will now occupy multiple vehicle seats
Updated Capturing tick sound to a mono sound 
Various performance improvements
Added BF3 and BF4 colour filters (Only use 1 at a time if using)

New Maps Added:
Operation Firestorm
Liberation Peak

As map detection is not working. I have set ranges based on the flag for capturepoint vehicle spawner ObjIDs: 
A 200 = 600-609
B 201 = 610-619
C 202 = 620-629 ect


V9.2 (Hotfix)

Fixes UI redrawing the container when players join the game.

V9.1

Added setting to set number of bots at the top of the MOD
Capture UI has additional states
Capture UI now in capital text to look more uniform
General UI has been completely rebuilt now using a fraction of the blocks
Capture point speed is now controlled via the flags and not the players to improve performance
Players no longer gain kills against themselves or their team on the scoreboard
AI scanning is on a lower tick rate to improve performance
AI in vehicles will use the Battlefield Behaviour
Fixed Out of Bounds triggering twice when leaving the enemy HQ into the air space while on foot
When flags are captured, the Enter/Exit event is triggered however this will be patched. In advance I have updated the UI and Bot logic in preparation for this.

V9.0

Added Support For Air boundaries (Example in Cairo)
Scoreboard now shows faction and team score
Objective vehicles spawns will now use SetVehicleAutoSpawn to allow respawns
AI behaviours improved when capturing objectives
AI will now leave vehicles if they are unable to drive them
AI now have a chance to take objective vehicles
AI will no longer drain tickets if they die when failing to path find
AI have a higher chance to spawn on objectives
Updated the spatial maps
Redline Storage now has a forest for infantry focused combat



V8.0

VO Announcers Added
Music Added
New UI Animation For Ticket Bleed
Capture Speed Now Works
End of Round Screen Added
Increased Custom Bot Spawn speed so they fill the lobby quicker
Custom AI Slightly Smarter(ish)
Added support for multiple ticket bleed styles suitable for CQ or Domination
Increased the Custom Bot count to 50
Multiple HQ spawn protection supported (Team 1 protection: 1100-1199 Team 2 protection: 1200-1299)
Out of Bounds for all added (ObjID 1300-1399)
UI updates in sync when capture point changes state

Additional Settings added for tweaking at the top of the MOD:
Set tickets when near end music starts
Choose ticket bleed type (both teams or only one with less flags)
Choose if player deaths remove tickets
Toggle whether to enable/disable Total Control bonus ticket bleed
Set the number of tickets removed when in total control
Set the ticket bleed speed from flags
Set the capture and neutralisation times
Enable/Disable VO

New Maps Added:
Area 22B (Military RnD)
Redline Storage (Military Storage)
Empire State (Aftermath)



V7.2
Fixed UI when players join
Added new draw call rule for UI no longer relying on GetObjectives. Instead it will now run from ObjID 200 for A to 225 for Z

V7.1
Fixes critical error with AI crashing the server
Fixes sounds crashing servers when reaching object limit
Fixes capture times breaking after being contested
Fixes UI breaking when entering and leaving capture points

V7.0
Added UI progress bar for capturing objectives
Out of Bounds added for HQs
Sounds for capturing objectives
Custom bots will now spawn at objectives
AI Tweaked for vehicles (nowhere near decent, but it's a start)
Further fixes to the UI
Compatibility for 1.1.1
Spatial Map updated with HQ Area Triggers with 801 and 802 ObjIds

Now includes 3 maps: 
Siege of Cairo
Iberian Offensive
Tech Center 

V6.1
Fixes critical error where the UI would fail when 10+ players would join the match
AI behaviour changed to make them less likely to run past sprinting
UI Score sizes adjusted to closer match the original design


V6.0
Custom AI has been implemented (use AI spawners in your map to use with Obj ID 901 for Team1 and 902 for Team2)
Added team switcher (uses Obj ID 998 and 999)
UI bug fixed so it will update for players joining mid match.
Kills now correctly no longer count if the player kills themselves or switches team.
