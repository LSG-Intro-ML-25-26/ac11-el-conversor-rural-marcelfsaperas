@namespace
class SpriteKind:
    Resource = SpriteKind.create()
    House = SpriteKind.create()

# ========== VARIABLES GLOBALES ==========
playerWood = 0
playerCabras = 0
playerChicken = 0
playerPotatoes = 0
playerEggs = 0
playerHorse = 0
last_text_time = 0
last_time_dialogue = 0
tiempo_actual = 0
arbre: Sprite = None
nena: Sprite = None
casa: Sprite = None
chop_cooldown = 2000
regrowth_time = 3000
text_cooldown = 2000
last_chop_time = 0
current_time2 = 0
myMenu: miniMenu.MenuSprite = None
myMenu2: miniMenu.MenuSprite = None
menu_open = False
shop_open = False
backpack: List[miniMenu.MenuItem] = []
tree_cut_time = 0
tree_cut = False
cantidades_recursos: List[number] = []
nombres_recursos: List[str] = []

# Variables para el sistema de cantidad
opciones_cantidad_texto: List[str] = []
opciones_cantidad_valores: List[number] = []
producto_seleccionado = ""
menu_cantidad: miniMenu.MenuSprite = None

# Listas para manejar recursos
nombres_recursos = ["Wood", "Chickens", "Potatoes", "Goats", "Eggs", "Horses"]
cantidades_recursos = [0, 0, 0, 0, 0, 0]

# ========== FUNCIONES DE ANIMACIÓN ==========
def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        200,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        200,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

# ========== FUNCIONES DEL JUEGO ==========
def cortar_arbol():
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
    actualizar_cantidades()

def regenerar_arbol():
    global tree_cut
    if tree_cut:
        current_time = game.runtime()
        if current_time - tree_cut_time >= regrowth_time:
            arbre.set_image(assets.image("""
                treePine
                """))
            tree_cut = False

# ========== SISTEMA DE COMPRA CON CANTIDAD ==========
def abrir_menu_cantidad(producto: str):
    global shop_open, producto_seleccionado, opciones_cantidad_valores, opciones_cantidad_texto, menu_cantidad
    
    # Crear items del menú
    items: List[miniMenu.MenuItem] = []
    shop_open = True
    producto_seleccionado = producto
    
    # Opciones de cantidad disponibles
    opciones_cantidad_valores = [1, 2, 3, 5, 10]
    opciones_cantidad_texto = ["1", "2", "3", "5", "10", "Cancelar"]
    
    # Crear los items del menú
    for opcion in opciones_cantidad_texto:
        items.append(miniMenu.create_menu_item(opcion))
    
    # Crear el menú de cantidad
    menu_cantidad = miniMenu.create_menu_from_array(items)
    menu_cantidad.set_title("Cantidad de " + producto)
    menu_cantidad.set_position(80, 60)
    
    # Función para cuando se selecciona una cantidad
    def on_button_pressed(selection, selected_index):
        global shop_open
        menu_cantidad.close()
        shop_open = False
        
        # Si selecciona "Cancelar" (índice 5)
        if selected_index == 5:
            return
        
        # Obtener la cantidad seleccionada
        cantidad = opciones_cantidad_valores[selected_index]
        realizar_compra_con_cantidad(producto, cantidad)
    
    # Función para cerrar con B
    def on_button_pressed_b(selection, selected_index):
        global shop_open
        menu_cantidad.close()
        shop_open = False
    
    menu_cantidad.on_button_pressed(controller.A, on_button_pressed)
    menu_cantidad.on_button_pressed(controller.B, on_button_pressed_b)

def realizar_compra_con_cantidad(producto: str, cantidad: number):
    global playerWood, playerChicken, playerPotatoes, playerCabras, playerEggs, playerHorse
    
    # Calcular madera necesaria según el producto
    if producto == "Chickens":
        madera_necesaria = cantidad * 6
    elif producto == "Potatoes":
        madera_necesaria = cantidad * 2
    elif producto == "Goats":
        madera_necesaria = cantidad * 5
    elif producto == "Eggs":
        madera_necesaria = cantidad * 3
    elif producto == "Horses":
        madera_necesaria = cantidad * 12
    else:
        madera_necesaria = 0
    
    # Verificar si tiene suficiente madera
    if playerWood >= madera_necesaria:
        # Restar la madera gastada
        playerWood -= madera_necesaria
        
        # Añadir los productos obtenidos
        if producto == "Chickens":
            playerChicken += cantidad
            game.splash("Recibiste " + str(cantidad) + " gallina(s)")
            game.splash("Coste: " + str(madera_necesaria) + " madera")
        elif producto == "Potatoes":
            # 1.5kg de patatas por cada 2 de madera
            patatas_recibidas = Math.round(cantidad * 1.5)
            playerPotatoes += patatas_recibidas
            game.splash("Recibiste " + str(patatas_recibidas) + "kg de patatas")
            game.splash("Coste: " + str(madera_necesaria) + " madera")
        elif producto == "Goats":
            playerCabras += cantidad
            game.splash("Recibiste " + str(cantidad) + " cabra(s)")
            game.splash("Coste: " + str(madera_necesaria) + " madera")
        elif producto == "Eggs":
            # 6 huevos por cada 3 de madera
            huevos_recibidos = cantidad * 6
            playerEggs += huevos_recibidos
            game.splash("Recibiste " + str(huevos_recibidos) + " huevos")
            game.splash("Coste: " + str(madera_necesaria) + " madera")
        elif producto == "Horses":
            playerHorse += cantidad
            game.splash("Recibiste " + str(cantidad) + " caballo(s)")
            game.splash("Coste: " + str(madera_necesaria) + " madera")
        
        # Actualizar cantidades y mostrar inventario
        actualizar_cantidades()
        mostrar_inventario()
    else:
        # No tiene suficiente madera
        game.splash("¡No tienes suficiente madera!")
        game.splash("Necesitas: " + str(madera_necesaria) + " madera")
        game.splash("Tienes: " + str(playerWood) + " madera")

def mostrar_inventario():
    info_text = "TU INVENTARIO\n"
    info_text += "══════════════════\n"
    info_text += "Madera: " + str(playerWood) + "\n"
    info_text += "Gallinas: " + str(playerChicken) + "\n"
    info_text += "Patatas: " + str(playerPotatoes) + " kg\n"
    info_text += "Cabras: " + str(playerCabras) + "\n"
    info_text += "Huevos: " + str(playerEggs) + "\n"
    info_text += "Caballos: " + str(playerHorse) + "\n"
    info_text += "══════════════════"
    game.show_long_text(info_text, DialogLayout.FULL)

# ========== MENÚ DE TIENDA ==========
def abrir_tienda():
    global shop_open, myMenu2
    
    if shop_open or menu_open:
        return
    
    # Crear items del menú principal
    items: List[miniMenu.MenuItem] = []
    opciones_tienda = ["Chickens", "Potatoes", "Goats", "Eggs", "Horses", "Ver Inventario", "Cerrar Tienda"]
    
    for opcion in opciones_tienda:
        items.append(miniMenu.create_menu_item(opcion))
    
    # Crear el menú principal
    myMenu2 = miniMenu.create_menu_from_array(items)
    myMenu2.set_frame(img("""
        ..bbbbbbbbbbbbbbbbbbbb..
        .bd111111111111111111db.
        bd1dbbbbbbbbbbbbbbbbd1db
        b1dbbbbbbbbbbbbbbbbbbd1b
        b1bd1111111111111111db1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1bd1111111111111111db1b
        bd1bbbbbbbbbbbbbbbbbb1db
        bbd111111111111111111dbb
        .bbbbbbbbbbbbbbbbbbbbbb.
        ..bbbbbbbbbbbbbbbbbbbb..
        """))
    myMenu2.set_dimensions(100, 90)
    myMenu2.set_title("Tienda")
    myMenu2.set_position(80, 60)
    
    # Función para manejar selecciones
    def on_button_pressed_tienda(selection, selected_index):
        global shop_open
        opcion_seleccionada = opciones_tienda[selected_index]
        
        if opcion_seleccionada == "Cerrar Tienda":
            myMenu2.close()
            shop_open = False
        elif opcion_seleccionada == "Ver Inventario":
            myMenu2.close()
            shop_open = False
            mostrar_inventario()
        else:
            myMenu2.close()
            abrir_menu_cantidad(opcion_seleccionada)
    
    # Función para cerrar con B
    def on_button_pressed_tienda_b(selection, selected_index):
        global shop_open
        myMenu2.close()
        shop_open = False
    
    myMenu2.on_button_pressed(controller.A, on_button_pressed_tienda)
    myMenu2.on_button_pressed(controller.B, on_button_pressed_tienda_b)
    shop_open = True

def on_a_pressed():
    if nena.overlaps_with(casa) and not shop_open and not menu_open:
        abrir_tienda()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    global menu_open, shop_open, last_chop_time, current_time2
    
    if shop_open:
        if myMenu2:
            myMenu2.close()
        if menu_cantidad:
            menu_cantidad.close()
        shop_open = False
        return
    
    if menu_open:
        myMenu.close()
        menu_open = False
        return
    
    if not tree_cut and nena.overlaps_with(arbre):
        if current_time2 - last_chop_time >= chop_cooldown:
            last_chop_time = current_time2
            cortar_arbol()
        return
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_menu_pressed():
    global myMenu, menu_open, shop_open
    if menu_open == False and not shop_open:
        crear_menu_inventario()
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
        
        def on_button_pressed_inventario(selection, selectedIndex):
            pass
        myMenu.on_button_pressed(controller.A, on_button_pressed_inventario)
        
    else:
        myMenu.close()
        menu_open = False
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

def actualizar_cantidades():
    cantidades_recursos[0] = playerWood
    cantidades_recursos[1] = playerChicken
    cantidades_recursos[2] = playerPotatoes
    cantidades_recursos[3] = playerCabras
    cantidades_recursos[4] = playerEggs
    cantidades_recursos[5] = playerHorse

def crear_menu_inventario():
    global backpack
    backpack = []
    actualizar_cantidades()
    
    i = 0
    while i < len(nombres_recursos):
        item_texto = nombres_recursos[i] + ": " + str(cantidades_recursos[i])
        backpack.append(miniMenu.create_menu_item(item_texto))
        i += 1

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

# ========== BUCLE PRINCIPAL ==========
def on_forever():
    global current_time2
    current_time2 = game.runtime()
    regenerar_arbol()
    
forever(on_forever)