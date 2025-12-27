namespace SpriteKind {
    export const Resource = SpriteKind.create()
    export const House = SpriteKind.create()
}
// ========== FUNCIONES DE ANIMACIÓN ==========
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    200,
    false
    )
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shop_open) {
        if (myMenu2) {
            myMenu2.close()
        }
        if (menu_cantidad) {
            menu_cantidad.close()
        }
        shop_open = false
        return
    }
    if (menu_open) {
        myMenu.close()
        menu_open = false
        return
    }
    if (!(tree_cut) && nena.overlapsWith(arbre)) {
        if (current_time2 - last_chop_time >= chop_cooldown) {
            last_chop_time = current_time2
            cortar_arbol()
        }
        return
    }
})
// ========== MENÚ DE TIENDA ==========
// Crear items del menú principal
function abrir_tienda () {
    let items2: miniMenu.MenuItem[] = []
    if (shop_open || menu_open) {
        return
    }
    opciones_tienda = [
    "Chickens",
    "Potatoes",
    "Goats",
    "Eggs",
    "Horses",
    "Ver Inventario",
    "Cerrar Tienda"
    ]
    for (let opcion2 of opciones_tienda) {
        items2.push(miniMenu.createMenuItem(opcion2))
    }
    // Crear el menú principal
    myMenu2 = miniMenu.createMenuFromArray(items2)
    myMenu2.setFrame(img`
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
        `)
    myMenu2.setDimensions(100, 90)
    myMenu2.setTitle("Tienda")
    myMenu2.setPosition(80, 60)
    // Función para manejar selecciones
    // Función para cerrar con B
    myMenu2.onButtonPressed(controller.A, function (selection, selected_index) {
        opcion_seleccionada = opciones_tienda[selected_index]
        if (opcion_seleccionada == "Cerrar Tienda") {
            myMenu2.close()
            shop_open = false
        } else if (opcion_seleccionada == "Ver Inventario") {
            myMenu2.close()
            shop_open = false
        } else {
            myMenu2.close()
            abrir_menu_cantidad(opcion_seleccionada)
        }
    })
    myMenu2.onButtonPressed(controller.B, function (selection, selected_index) {
        myMenu2.close()
        shop_open = false
    })
    shop_open = true
}
// ========== FUNCIONES DEL JUEGO ==========
function cortar_arbol () {
    arbre.setImage(img`
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
        `)
    tree_cut = true
    tree_cut_time = game.runtime()
    playerWood = playerWood + 2
    actualizar_cantidades()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena.overlapsWith(casa) && !(shop_open) && !(menu_open)) {
        abrir_tienda()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
function realizar_compra_con_cantidad (producto: string, cantidad: number) {
    let madera_necesaria: number;
let patatas_recibidas: number;
let huevos_recibidos: number;
// Calcular madera necesaria según el producto
    if (producto == "Chickens") {
        madera_necesaria = cantidad * 6
    } else if (producto == "Potatoes") {
        madera_necesaria = cantidad * 2
    } else if (producto == "Goats") {
        madera_necesaria = cantidad * 5
    } else if (producto == "Eggs") {
        madera_necesaria = cantidad * 3
    } else if (producto == "Horses") {
        madera_necesaria = cantidad * 12
    } else {
        madera_necesaria = 0
    }
    // Verificar si tiene suficiente madera
    if (playerWood >= madera_necesaria) {
        // Restar la madera gastada
        playerWood += 0 - madera_necesaria
        // Añadir los productos obtenidos
        if (producto == "Chickens") {
            playerChicken += cantidad
            game.splash("Recibiste " + ("" + cantidad) + " gallina(s)")
        } else if (producto == "Potatoes") {
            // 1.5kg de patatas por cada 2 de madera
            patatas_recibidas = Math.round(cantidad * 1.5)
            playerPotatoes += patatas_recibidas
            game.splash("Recibiste " + ("" + patatas_recibidas) + "kg de patatas")
        } else if (producto == "Goats") {
            playerCabras += cantidad
            game.splash("Recibiste " + ("" + cantidad) + " cabra(s)")
        } else if (producto == "Eggs") {
            // 6 huevos por cada 3 de madera
            huevos_recibidos = cantidad * 6
            playerEggs += huevos_recibidos
            game.splash("Recibiste " + ("" + huevos_recibidos) + " huevos")
        } else if (producto == "Horses") {
            playerHorse += cantidad
            game.splash("Recibiste " + ("" + cantidad) + " caballo(s)")
        }
        // Actualizar cantidades y mostrar inventario
        actualizar_cantidades()
    } else {
        // No tiene suficiente madera
        game.splash("¡No tienes suficiente madera!")
        game.splash("Necesitas: " + ("" + madera_necesaria) + " madera")
        game.splash("Tienes: " + ("" + playerWood) + " madera")
    }
}
function actualizar_cantidades () {
    cantidades_recursos[0] = playerWood
    cantidades_recursos[1] = playerChicken
    cantidades_recursos[2] = playerPotatoes
    cantidades_recursos[3] = playerCabras
    cantidades_recursos[4] = playerEggs
    cantidades_recursos[5] = playerHorse
}
function crear_menu_inventario () {
    let item_texto: string;
backpack = []
    actualizar_cantidades()
    while (i < nombres_recursos.length) {
        item_texto = "" + nombres_recursos[i] + ": " + ("" + cantidades_recursos[i])
        backpack.push(miniMenu.createMenuItem(item_texto))
        i += 1
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    200,
    false
    )
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu_open == false && !(shop_open)) {
        crear_menu_inventario()
        myMenu = miniMenu.createMenuFromArray(backpack)
        menu_open = true
        myMenu.setDimensions(100, 90)
        myMenu.setTitle("Inventory")
        myMenu.setFrame(img`
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
            `)
        myMenu.setPosition(80, 60)
        myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Alignment, 5)
        myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 8)
    } else {
        myMenu.close()
        menu_open = false
    }
})
// ========== SISTEMA DE COMPRA CON CANTIDAD ==========
// Crear items del menú
function abrir_menu_cantidad (producto: string) {
    let items: miniMenu.MenuItem[] = []
    shop_open = true
    producto_seleccionado = producto
    // Opciones de cantidad disponibles
    opciones_cantidad_valores = [
    1,
    2,
    3,
    5,
    10
    ]
    opciones_cantidad_texto = [
    "1",
    "2",
    "3",
    "5",
    "10",
    "Cancelar"
    ]
    // Crear los items del menú
    for (let opcion of opciones_cantidad_texto) {
        items.push(miniMenu.createMenuItem(opcion))
    }
    // Crear el menú de cantidad
    menu_cantidad = miniMenu.createMenuFromArray(items)
    menu_cantidad.setTitle("Cantidad de " + producto)
    menu_cantidad.setPosition(80, 60)
    // Función para cuando se selecciona una cantidad
    // Función para cerrar con B
    menu_cantidad.onButtonPressed(controller.A, function (selection, selected_index) {
        menu_cantidad.close()
        shop_open = false
        // Si selecciona "Cancelar" (índice 5)
        if (selected_index == 5) {
            return
        }
        // Obtener la cantidad seleccionada
        cantidad = opciones_cantidad_valores[selected_index]
        realizar_compra_con_cantidad(producto, cantidad)
    })
    menu_cantidad.onButtonPressed(controller.B, function (selection, selected_index) {
        menu_cantidad.close()
        shop_open = false
    })
}
function regenerar_arbol () {
    let current_time: number;
if (tree_cut) {
        current_time = game.runtime()
        if (current_time - tree_cut_time >= regrowth_time) {
            arbre.setImage(assets.image`treePine`)
            tree_cut = false
        }
    }
}
let cantidad = 0
let opciones_cantidad_texto: string[] = []
let opciones_cantidad_valores: number[] = []
let producto_seleccionado = ""
let i = 0
let backpack: miniMenu.MenuItem[] = []
let playerHorse = 0
let playerEggs = 0
let playerCabras = 0
let playerPotatoes = 0
let playerChicken = 0
let playerWood = 0
let tree_cut_time = 0
let opcion_seleccionada = ""
let opciones_tienda: string[] = []
let last_chop_time = 0
let current_time2 = 0
let tree_cut = false
let myMenu: miniMenu.MenuSprite = null
let menu_open = false
let menu_cantidad: miniMenu.MenuSprite = null
let myMenu2: miniMenu.MenuSprite = null
let shop_open = false
let nena: Sprite = null
let casa: Sprite = null
let arbre: Sprite = null
let cantidades_recursos: number[] = []
let nombres_recursos: string[] = []
let regrowth_time = 0
let chop_cooldown = 0
let tiempo_actual = 0
let last_time_dialogue = 0
let last_text_time = 0
chop_cooldown = 2000
regrowth_time = 3000
let text_cooldown = 2000
// Listas para manejar recursos
nombres_recursos = [
"Wood",
"Chickens",
"Potatoes",
"Goats",
"Eggs",
"Horses"
]
cantidades_recursos = [
0,
0,
0,
0,
0,
0
]
scene.setBackgroundImage(assets.image`seasonalTree1`)
arbre = sprites.create(assets.image`treePine`, SpriteKind.Resource)
casa = sprites.create(img`
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
    `, SpriteKind.Player)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
arbre.setPosition(128, 68)
nena.setPosition(70, 74)
casa.setPosition(27, 67)
controller.moveSprite(nena, 100, 0)
// ========== BUCLE PRINCIPAL ==========
forever(function () {
    current_time2 = game.runtime()
    regenerar_arbol()
})
