function house_menu3() {
    let house_menu: string[];
    let myMenu2: miniMenu.MenuSprite;
    let shop_open: boolean;
    [house_menu, myMenu2, shop_open]
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
    //  Asignar botones al menú
    myMenu2.onButtonPressed(controller.A, function on_button_pressed_a(selection2: any, selectedIndex2: any) {
        let gallinas_recibidas: number;
        let intercambios: number;
        let patatas_recibidas: number;
        let huevos_recibidos: number;
        let shop_open: boolean;
        [playerWood, playerChicken, playerPotatoes, playerCabras, playerEggs, playerHorse, shop_open]
        if (selectedIndex2 == 0) {
            if (playerWood >= 6) {
                gallinas_recibidas = Math.idiv(playerWood, 6)
                if (gallinas_recibidas > 0) {
                    let playerWood += 0 - gallinas_recibidas * 6
                    let playerChicken += gallinas_recibidas
                    game.splash("Recibiste " + ("" + gallinas_recibidas) + " gallina(s)")
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
                    let playerPotatoes += patatas_recibidas
                    game.splash("Recibiste " + ("" + patatas_recibidas) + "kg de patatas")
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
                    let playerCabras += intercambios
                    game.splash("Recibiste " + ("" + intercambios) + " cabra(s)")
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
                    let playerEggs += huevos_recibidos
                    game.splash("Recibiste " + ("" + huevos_recibidos) + " huevos")
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
                    let playerHorse += intercambios
                    game.splash("Recibiste " + ("" + intercambios) + " caballo(s)")
                } else {
                    game.splash("Necesitas al menos 12 madera")
                }
                
            } else {
                game.splash("No tienes suficiente madera")
            }
            
        }
        
        myMenu2.close()
        shop_open = false
    })
    myMenu2.onButtonPressed(controller.B, function on_button_pressed_b(selection: any, selectedIndex: any) {
        let shop_open: boolean;
        shop_open
        myMenu2.close()
        shop_open = false
    })
    myMenu2.setTitle("Shop")
    myMenu2.setPosition(80, 60)
    shop_open = true
}

