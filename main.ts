namespace SpriteKind {
    export const Resource = SpriteKind.create()
    export const House = SpriteKind.create()
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 200, false)
})
function conseguir_gallina() {
    
    playerChicken += 1
}

function conseguir_caballo() {
    
    playerHorse += 1
}

function cortar_arbol() {
    
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

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (nena.overlapsWith(casa)) {
        house_menu3()
    }
    
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 500, false)
})
function house_menu3() {
    
    let menu_items : miniMenu.MenuItem[] = []
    house_menu = ["Chickens", "Potatoes", "Goats", "Eggs", "Horses"]
    for (let item of house_menu) {
        menu_items.push(miniMenu.createMenuItem(item))
    }
    myMenu2 = miniMenu.createMenuFromArray(menu_items)
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
    myMenu2.onButtonPressed(controller.A, function on_button_pressed(selection2: any, selectedIndex2: any) {
        let gallinas_recibidas: number;
        let intercambios: number;
        let patatas_recibidas: number;
        let huevos_recibidos: number;
        
        if (selectedIndex2 == 0) {
            if (playerWood >= 6) {
                gallinas_recibidas = Math.idiv(playerWood, 6)
                if (gallinas_recibidas > 0) {
                    playerWood += 0 - gallinas_recibidas * 6
                    playerChicken += gallinas_recibidas
                    game.splash("Recibiste " + ("" + ("" + gallinas_recibidas)) + " gallina(s)")
                } else {
                    game.splash("Necesitas al menos 6 madera")
                }
                
            } else {
                game.splash("No tienes suficiente madera")
            }
            
        } else if (selectedIndex2 == 1) {
            if (playerWood >= 2) {
                intercambios = Math.idiv(playerWood, 2)
                if (intercambios > 0) {
                    playerWood += 0 - intercambios * 2
                    patatas_recibidas = Math.round(intercambios * 1.5)
                    playerPotatoes += patatas_recibidas
                    game.splash("Recibiste " + ("" + ("" + patatas_recibidas)) + "kg de patatas")
                } else {
                    game.splash("Necesitas al menos 2 madera")
                }
                
            } else {
                game.splash("No tienes suficiente madera")
            }
            
        } else if (selectedIndex2 == 2) {
            if (playerWood >= 5) {
                intercambios = Math.idiv(playerWood, 5)
                if (intercambios > 0) {
                    playerWood += 0 - intercambios * 5
                    playerCabras += intercambios
                    game.splash("Recibiste " + ("" + ("" + intercambios)) + " cabra(s)")
                } else {
                    game.splash("Necesitas al menos 5 madera")
                }
                
            } else {
                game.splash("No tienes suficiente madera")
            }
            
        } else if (selectedIndex2 == 3) {
            if (playerWood >= 3) {
                intercambios = Math.idiv(playerWood, 3)
                if (intercambios > 0) {
                    playerWood += 0 - intercambios * 3
                    huevos_recibidos = intercambios * 6
                    playerEggs += huevos_recibidos
                    game.splash("Recibiste " + ("" + ("" + huevos_recibidos)) + " huevos")
                } else {
                    game.splash("Necesitas al menos 3 madera")
                }
                
            } else {
                game.splash("No tienes suficiente madera")
            }
            
        } else if (selectedIndex2 == 4) {
            if (playerWood >= 12) {
                intercambios = Math.idiv(playerWood, 12)
                if (intercambios > 0) {
                    playerWood += 0 - intercambios * 12
                    playerHorse += intercambios
                    game.splash("Recibiste " + ("" + ("" + intercambios)) + " caballo(s)")
                } else {
                    game.splash("Necesitas al menos 12 madera")
                }
                
            } else {
                game.splash("No tienes suficiente madera")
            }
            
        }
        
        myMenu2.close()
    })
    myMenu2.setTitle("Shop")
    myMenu2.setPosition(80, 60)
    house_inventory = myMenu2
}

function actualizar_cantidades() {
    cantidades_recursos[0] = playerWood
    cantidades_recursos[1] = playerChicken
    cantidades_recursos[2] = playerPotatoes
    cantidades_recursos[3] = playerCabras
    cantidades_recursos[4] = playerEggs
    cantidades_recursos[5] = playerHorse
}

function crear_menu_inventario() {
    let item_texto: string;
    
    backpack = []
    actualizar_cantidades()
    while (i < nombres_recursos.length) {
        item_texto = "" + nombres_recursos[i] + ": " + ("" + ("" + cantidades_recursos[i]))
        backpack.push(miniMenu.createMenuItem(item_texto))
        i += 1
    }
}

function conseguir_huevo() {
    
    playerEggs += 1
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 500, false)
})
function conseguir_patata() {
    
    playerPotatoes += 1
}

function conseguir_cabra() {
    
    playerCabras += 1
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 200, false)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function on_menu_pressed() {
    
    if (menu_open == false) {
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
        myMenu.onButtonPressed(controller.A, function on_button_pressed2(selection: any, selectedIndex: any) {
            
        })
    } else {
        myMenu.close()
        menu_open = false
    }
    
})
function regenerar_arbol() {
    let current_time: number;
    
    if (tree_cut) {
        current_time = game.runtime()
        if (current_time - tree_cut_time >= regrowth_time) {
            arbre.setImage(assets.image`
                treePine
                `)
            tree_cut = false
        }
        
    }
    
}

let last_chop_time = 0
let current_time2 = 0
let menu_open = false
let i = 0
let backpack : miniMenu.MenuItem[] = []
let house_inventory : miniMenu.MenuSprite = null
let playerEggs = 0
let playerCabras = 0
let playerPotatoes = 0
let myMenu : miniMenu.MenuSprite = null
let myMenu2 : miniMenu.MenuSprite = null
let house_menu : string[] = []
let playerWood = 0
let tree_cut_time = 0
let tree_cut = false
let playerHorse = 0
let playerChicken = 0
let nena : Sprite = null
let casa : Sprite = null
let arbre : Sprite = null
let cantidades_recursos : number[] = []
let nombres_recursos : string[] = []
let regrowth_time = 0
let house_menu2 : number[] = []
let last_text_time = 0
let last_time_dialogue = 0
let tiempo_actual = 0
let chop_cooldown = 2000
regrowth_time = 3000
let text_cooldown = 2000
nombres_recursos = ["Wood", "Chickens", "Potatoes", "Goats", "Eggs", "Horses"]
cantidades_recursos = [0, 0, 0, 0, 0, 0]
scene.setBackgroundImage(assets.image`
    seasonalTree1
    `)
arbre = sprites.create(assets.image`
    treePine
    `, SpriteKind.Resource)
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
nena = sprites.create(assets.image`
    nena-front
    `, SpriteKind.Player)
arbre.setPosition(128, 68)
nena.setPosition(70, 74)
casa.setPosition(27, 67)
controller.moveSprite(nena, 100, 0)
let dialogue_cooldown = 1000
forever(function on_forever() {
    
    current_time2 = game.runtime()
    regenerar_arbol()
    if (!tree_cut) {
        if (nena.overlapsWith(arbre) && controller.B.isPressed()) {
            if (current_time2 - last_chop_time >= chop_cooldown) {
                last_chop_time = current_time2
                cortar_arbol()
            }
            
        }
        
    }
    
    if (menu_open == true && controller.B.isPressed()) {
        menu_open = false
        myMenu.close()
    }
    
})
