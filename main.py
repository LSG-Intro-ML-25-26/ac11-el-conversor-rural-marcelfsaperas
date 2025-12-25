@namespace
class SpriteKind:
    Resource = SpriteKind.create()
def menu_casa():
    pass
def chop_tree():
    global tree_cut, tree_cut_time, playerWood
    arbre.set_image(img("""
        ................................
        ............f...................
        ............8f..8..f.......ff...
        ......f......8..f..f....fff.....
        .....8......f8..f.f....ff.......
        fff..8f.....f8..f.f...ff..ff....
        ...f8f8f....f8f..8....88...f....
        .....ff8f....ff..88..f8....8f...
        .......f88...fff.f8f.8f....ff...
        .......fffff..ff..ff.8f...88fff.
        .........ff8f.fff.ff88f..f8ff...
        ...........fffffff.f8f..ffff....
        ....88888f..ffffffffff.f8f......
        ...f....f8ff88fffff8fffff.......
        ...f......8fff88fffff88f........
        ..............f88fffffff........
        ...............88ffffff.........
        ...............f88ffff..........
        ................88ffff..........
        ................88fff...........
        ................88fff...........
        ................88fff...........
        ................88fff...........
        ................88fff...........
        ................88fff...........
        ...............f8ffff...........
        ...............88ffff...........
        ..............888fffff..........
        .............f8fffffff..........
        .........f88f88f.fffffff........
        ......8ff8f.fff..f8f.ff.ff......
        ....f8f....f......f...fff.ffff..
        """))
    tree_cut = True
    tree_cut_time = game.runtime()
    playerWood = playerWood + 2

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def regenerate_tree():
    global tree_cut
    if tree_cut:
        current_time = game.runtime()
        if current_time - tree_cut_time >= regrowth_time:
            arbre.set_image(assets.image("""
                treePine
                """))
            tree_cut = False

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_menu_pressed():
    global myMenu, menu_open
    if menu_open == False:
        myMenu = miniMenu.create_menu_from_array(backpack)
        menu_open = True
        myMenu.set_dimensions(100, 90)
        myMenu.set_title("Inventory")
        myMenu.set_frame(img("""
            8888.....88....888....888...8888.
            867788..8768..86768..8678.887768.
            8767768.877788676768877788677678.
            87767768676778776778776786776778.
            .877876667767877677876778678778..
            .867786686766867676866766687768..
            ..8666868867688686886768686668...
            .88866688888888888888888866688...
            8777768866666666666666668886688..
            86767768666666666666666688677778.
            .8776678666666666666666686776768.
            ..87766866666666666666668766778..
            ..8888886666666666666666866778...
            .86776886666666666666666888888...
            8677776866666666666666668867768..
            87666688666666666666666686777768.
            86777768666666666666666688666678.
            .8677688666666666666666686777768.
            ..88888866666666666666668867768..
            ..8776686666666666666666888888...
            .87766786666666666666666866778...
            8676776866666666666666668766778..
            87777688666666666666666686776768.
            .8866888666666666666666688677778.
            ..88666888888888888888888666888..
            ..8666868676886868867688686668...
            .867786667668676768667686687768..
            .877876877678776778767766678778..
            87767768767787767787767686776778.
            876776887778867676887778.8677678.
            867788.8768..86768..8678..887768.
            8888...888....888....88.....8888.
            .................................
            """))
        myMenu.set_position(80, 60)
        myMenu.set_style_property(miniMenu.StyleKind.TITLE,
            miniMenu.StyleProperty.ALIGNMENT,
            5)
        myMenu.set_style_property(miniMenu.StyleKind.SELECTED,
            miniMenu.StyleProperty.BACKGROUND,
            8)
    else:
        myMenu.close()
        menu_open = False
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

last_chop_time = 0
current_time2 = 0
myMenu: miniMenu.MenuSprite = None
tree_cut_time = 0
tree_cut = False
menu_open = False
backpack: List[miniMenu.MenuItem] = []
regrowth_time = 0
playerWood = 0
nena: Sprite = None
arbre: Sprite = None
tiempo_actual = 0
last_time_dialogue = 0
last_text_time = 0
playerHorse = 0
playerEggs = 0
playerPotatoes = 0
playerChicken = 0
playerCabras = 0
playerWood = 0
chop_cooldown = 2000
regrowth_time = 3000
nena = None
arbre = None
text_cooldown = 2000
regrowth_time = 3000
scene.set_background_image(assets.image("""
    seasonalTree1
    """))
arbre = sprites.create(assets.image("""
    treePine
    """), SpriteKind.Resource)
casa = sprites.create(img("""
        ....................e2e22e2e....................
        .................222eee22e2e222.................
        ..............222e22e2e22eee22e222..............
        ...........e22e22eeee2e22e2eeee22e22e...........
        ........eeee22e22e22e2e22e2e22e22e22eeee........
        .....222e22e22eeee22e2e22e2e22eeee22e22e222.....
        ...22eeee22e22e22e22eee22eee22e22e22e22eeee22...
        4cc22e22e22eeee22e22e2e22e2e22e22eeee22e22e22cc4
        6c6eee22e22e22e22e22e2e22e2e22e22e22e22e22eee6c6
        46622e22eeee22e22eeee2e22e2eeee22e22eeee22e22664
        46622e22e22e22eeee22e2e22e2e22eeee22e22e22e22664
        4cc22eeee22e22e22e22eee22eee22e22e22e22eeee22cc4
        6c622e22e22eeee22e22e2e22e2e22e22eeee22e22e226c6
        466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
        46622e22eeee22e22e22e2e22e2e22e22e22eeee22e22664
        4cc22e22e22e22e22eeee2e22e2eeee22e22e22e22e22cc4
        6c622eeee22e22eeee22eee22eee22eeee22e22eeee226c6
        46622e22e22eeee22e22e2e22e2e22e22eeee22e22e22664
        466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
        4cc22e22eeee22e22e22e2e22e2e22e22e22eeee22e22cc4
        6c622e22e22e22e22e22eee22eee22e22e22e22e22e226c6
        46622eeee22e22e22eeecc6666cceee22e22e22eeee22664
        46622e22e22e22eeecc6666666666cceee22e22e22e22664
        4cceee22e22eeecc66666cccccc66666cceee22e22eeecc4
        6c622e22eeecc66666cc64444446cc66666cceee22e226c6
        46622e22cc66666cc64444444444446cc66666cc22e22664
        46622cc6666ccc64444444444444444446ccc6666cc22664
        4ccc6666ccc6444bcc666666666666ccb4446ccc6666ccc4
        cccccccc6666666cb44444444444444bc6666666cccccccc
        64444444444446c444444444444444444c64444444444446
        66cb444444444cb411111111111111114bc444444444bc66
        666cccccccccccd166666666666666661dccccccccccc666
        6666444444444c116eeeeeeeeeeeeee611c4444444446666
        666e2222222e4c16e4e44e44e44e44ee61c4e2222222e666
        666eeeeeeeee4c16e4e44e44e44e44ee61c4eeeeeeeee666
        666eddddddde4c66f4e4effffffe44ee66c4eddddddde666
        666edffdffde4c66f4effffffffff4ee66c4edffdffde666
        666edccdccde4c66f4effffffffffeee66c4edccdccde666
        666eddddddde4c66f4eeeeeeeeeeeeee66c4eddddddde666
        c66edffdffde4c66e4e44e44e44e44ee66c4edffdffde66c
        c66edccdccde4c66e4e44e44e44e44ee66c4edccdccde66c
        cc66666666664c66e4e44e44e44feeee66c46666666666cc
        .c66444444444c66e4e44e44e44ffffe66c44444444466c.
        ..c64eee4eee4c66f4e44e44e44f44fe66c4eee4eee46c..
        ...c4eee4eee4c66f4e44e44e44effee66c4eee4eee4c...
        ....644444444c66f4e44e44e44e44ee66c444444446....
        .....64eee444c66f4e44e44e44e44ee66c444eee46.....
        ......6ccc666c66e4e44e44e44e44ee66c666ccc6......
        """),
    SpriteKind.player)
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
arbre.set_position(128, 68)
nena.set_position(70, 74)
casa.set_position(27, 67)
controller.move_sprite(nena, 100, 0)
dialogue_cooldown = 1000
backpack = [miniMenu.create_menu_item("Chickens"),
    miniMenu.create_menu_item("Potatoes"),
    miniMenu.create_menu_item("Goats"),
    miniMenu.create_menu_item("Eggs"),
    miniMenu.create_menu_item("Horses")]
menu_open = False

def on_forever():
    global current_time2, last_chop_time
    current_time2 = game.runtime()
    regenerate_tree()
    if not (tree_cut):
        if nena.overlaps_with(arbre) and controller.B.is_pressed():
            if current_time2 - last_chop_time >= chop_cooldown:
                last_chop_time = current_time2
                chop_tree()
    if menu_open == True and controller.B.is_pressed():
        myMenu.close()
forever(on_forever)
